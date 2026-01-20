import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ success: false, error: 'Authentication required' });
    return;
  }

  const projects = await prisma.project.findMany({
    where: { clientId: userId },
    orderBy: { updatedAt: 'desc' },
  });

  res.json({ success: true, data: projects });
});

router.get('/:id', async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ success: false, error: 'Authentication required' });
    return;
  }

  const project = await prisma.project.findFirst({
    where: { id: req.params.id, clientId: userId },
  });

  if (!project) {
    res.status(404).json({ success: false, error: 'Project not found' });
    return;
  }

  res.json({ success: true, data: project });
});

export default router;
