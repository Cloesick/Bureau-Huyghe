import { Router, Request, Response } from 'express';
import crypto from 'crypto';

const router = Router();

type ChatStatus = 'ACTIVE' | 'RESOLVED' | 'ESCALATED';

type ChatMessage = {
  id: string;
  sessionId: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  content: string;
  sources: string;
  createdAt: string;
};

type ChatSession = {
  id: string;
  userId: string;
  status: ChatStatus;
  escalatedAt?: string;
  escalationReason?: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
};

const sessionsByUser = new Map<string, ChatSession[]>();

const getUserSessions = (userId: string): ChatSession[] => {
  const existing = sessionsByUser.get(userId);
  if (existing) return existing;
  const created: ChatSession[] = [];
  sessionsByUser.set(userId, created);
  return created;
};

router.get('/sessions', (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ success: false, error: 'Authentication required' });
    return;
  }

  res.json({ success: true, data: getUserSessions(userId) });
});

router.post('/sessions', (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ success: false, error: 'Authentication required' });
    return;
  }

  const now = new Date().toISOString();
  const session: ChatSession = {
    id: crypto.randomUUID(),
    userId,
    status: 'ACTIVE',
    createdAt: now,
    updatedAt: now,
    messages: [],
  };

  const sessions = getUserSessions(userId);
  sessions.unshift(session);

  res.status(201).json({ success: true, data: session });
});

router.get('/sessions/:id', (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ success: false, error: 'Authentication required' });
    return;
  }

  const sessions = getUserSessions(userId);
  const session = sessions.find((s) => s.id === req.params.id);
  if (!session) {
    res.status(404).json({ success: false, error: 'Session not found' });
    return;
  }

  res.json({ success: true, data: session });
});

router.post('/sessions/:id/messages', (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ success: false, error: 'Authentication required' });
    return;
  }

  const { content } = req.body as { content: string };
  if (!content) {
    res.status(400).json({ success: false, error: 'Missing content' });
    return;
  }

  const sessions = getUserSessions(userId);
  const session = sessions.find((s) => s.id === req.params.id);
  if (!session) {
    res.status(404).json({ success: false, error: 'Session not found' });
    return;
  }

  const msg: ChatMessage = {
    id: crypto.randomUUID(),
    sessionId: session.id,
    role: 'USER',
    content,
    sources: '',
    createdAt: new Date().toISOString(),
  };

  session.messages.push(msg);
  session.updatedAt = new Date().toISOString();

  res.status(201).json({ success: true, data: session });
});

export default router;
