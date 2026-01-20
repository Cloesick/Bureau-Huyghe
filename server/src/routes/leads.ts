import { Router, Request, Response } from 'express';
import { PrismaClient, ServiceCategory, ContactStatus } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req: Request, res: Response) => {
  const { name, email, phone, company, service, message } = req.body as {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    message: string;
  };

  if (!name || !email || !message) {
    res.status(400).json({ success: false, error: 'Missing required fields' });
    return;
  }

  await prisma.contactForm.create({
    data: {
      name,
      email,
      phone,
      company,
      category: ServiceCategory.GENERAL,
      message: service ? `[Service: ${service}]\n${message}` : message,
      status: ContactStatus.NEW,
    },
  });

  res.status(201).json({ success: true, data: { message: 'Lead created' } });
});

export default router;
