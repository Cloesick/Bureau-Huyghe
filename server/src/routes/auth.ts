import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth';

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

router.post(
  '/login',
  [body('email').isEmail(), body('password').isString().notEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const { email, password } = req.body as { email: string; password: string };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        user: toApiUser(user),
        token,
      },
    });
  }
);

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isString().isLength({ min: 8 }),
    body('firstName').isString().notEmpty(),
    body('lastName').isString().notEmpty(),
    body('gdprConsent').isBoolean(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, error: 'Invalid registration data' });
      return;
    }

    const {
      email,
      password,
      firstName,
      lastName,
      gdprConsent,
    } = req.body as {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      gdprConsent: boolean;
    };

    if (!gdprConsent) {
      res.status(400).json({ success: false, error: 'GDPR consent required' });
      return;
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ success: false, error: 'Email already registered' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        firstName,
        lastName,
      },
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      data: {
        user: toApiUser(user),
        token,
      },
    });
  }
);

router.get('/me', authenticateToken, async (req: Request, res: Response) => {
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

export default router;
