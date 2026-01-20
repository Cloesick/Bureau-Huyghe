import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

const toApiUser = (user: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  company: string | null;
}) => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  phone: user.phone || undefined,
  vatNumber: undefined,
  companyName: user.company || undefined,
  legalForm: undefined,
  street: undefined,
  city: undefined,
  postalCode: undefined,
  howDidYouHear: undefined,
  profileCompleted: Boolean(user.phone || user.company),
  mfaEnabled: false,
  gdprConsentAt: undefined,
});

router.get('/', async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ success: false, error: 'Authentication required' });
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    res.status(404).json({ success: false, error: 'User not found' });
    return;
  }

  res.json({ success: true, data: toApiUser(user) });
});

router.put('/', async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ success: false, error: 'Authentication required' });
    return;
  }

  const { companyName, phone } = req.body as {
    companyName?: string;
    phone?: string;
  };

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      company: companyName,
      phone,
    },
  });

  res.json({ success: true, data: toApiUser(user) });
});

export default router;
