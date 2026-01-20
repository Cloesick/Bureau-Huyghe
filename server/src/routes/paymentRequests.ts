import { Router, Request, Response } from 'express';
import { PrismaClient, PaymentRequestStatus } from '@prisma/client';
import { sendEmail } from '../services/emailService';
import {
  createEpcQrPayload,
  createEpcQrPngBuffer,
  createStructuredCommunication,
  formatAmount,
} from '../services/paymentRequestService';
import type { Attachment } from 'nodemailer/lib/mailer';

const router = Router();
const prisma = new PrismaClient();

function assertAdmin(req: Request, res: Response): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const email = req.user?.email;

  if (!adminEmail) {
    res.status(500).json({ success: false, error: 'ADMIN_EMAIL is not configured' });
    return false;
  }

  if (!email || email.toLowerCase() !== adminEmail.toLowerCase()) {
    res.status(403).json({ success: false, error: 'Admin access required' });
    return false;
  }

  return true;
}

router.get('/', async (req: Request, res: Response) => {
  if (!assertAdmin(req, res)) return;

  const items = await prisma.paymentRequest.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  res.json({ success: true, data: items });
});

router.post('/', async (req: Request, res: Response) => {
  if (!assertAdmin(req, res)) return;

  const {
    recipientEmail,
    recipientName,
    amountCents,
    message,
    userId,
    contactFormId,
  } = req.body as {
    recipientEmail: string;
    recipientName?: string;
    amountCents: number;
    message?: string;
    userId?: string;
    contactFormId?: string;
  };

  if (!recipientEmail || typeof amountCents !== 'number' || Number.isNaN(amountCents)) {
    res.status(400).json({ success: false, error: 'recipientEmail and amountCents are required' });
    return;
  }

  if (amountCents <= 0) {
    res.status(400).json({ success: false, error: 'amountCents must be > 0' });
    return;
  }

  const iban = process.env.BANK_IBAN;
  const bic = process.env.BANK_BIC;
  const beneficiaryName = process.env.BANK_BENEFICIARY_NAME;

  if (!iban || !beneficiaryName) {
    res.status(500).json({
      success: false,
      error: 'BANK_IBAN and BANK_BENEFICIARY_NAME must be configured',
    });
    return;
  }

  const reference = createStructuredCommunication();

  const created = await prisma.paymentRequest.create({
    data: {
      recipientEmail,
      recipientName,
      amountCents,
      iban,
      bic,
      beneficiaryName,
      reference,
      message,
      status: PaymentRequestStatus.SENT,
      sentAt: null,
      userId,
      contactFormId,
    },
  });

  try {
    const payload = createEpcQrPayload({
      iban,
      bic,
      beneficiaryName,
      amountCents,
      remittanceInformation: reference,
      message,
    });

    const qrPng = await createEpcQrPngBuffer(payload);

    const qrCid = `payment-request-${created.id}@bureau-huyghe`;

    const attachments: Attachment[] = [
      {
        filename: 'betaling-qr.png',
        content: qrPng,
        contentType: 'image/png',
        cid: qrCid,
      },
    ];

    await sendEmail({
      to: recipientEmail,
      subject: 'Betalingsverzoek - Bureau Huyghe',
      template: 'payment-request',
      data: {
        recipientName: recipientName || recipientEmail,
        amount: formatAmount(amountCents),
        iban,
        beneficiaryName,
        reference,
        message: message || '',
        qrCid,
      },
      attachments,
    });

    const updated = await prisma.paymentRequest.update({
      where: { id: created.id },
      data: { sentAt: new Date() },
    });

    res.status(201).json({ success: true, data: updated });
  } catch (e) {
    await prisma.paymentRequest.update({
      where: { id: created.id },
      data: { status: PaymentRequestStatus.CANCELLED, cancelledAt: new Date() },
    });

    res.status(500).json({ success: false, error: 'Failed to send payment request email' });
  }
});

router.patch('/:id/status', async (req: Request, res: Response) => {
  if (!assertAdmin(req, res)) return;

  const { status } = req.body as { status: 'PAID' | 'CANCELLED' };
  if (!status || (status !== 'PAID' && status !== 'CANCELLED')) {
    res.status(400).json({ success: false, error: 'Invalid status' });
    return;
  }

  const existing = await prisma.paymentRequest.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    res.status(404).json({ success: false, error: 'Payment request not found' });
    return;
  }

  const updated = await prisma.paymentRequest.update({
    where: { id: existing.id },
    data:
      status === 'PAID'
        ? { status: PaymentRequestStatus.PAID, paidAt: new Date() }
        : { status: PaymentRequestStatus.CANCELLED, cancelledAt: new Date() },
  });

  res.json({ success: true, data: updated });
});

export default router;
