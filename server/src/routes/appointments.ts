import { Router, Request, Response } from 'express';
import { PrismaClient, AppointmentStatus, AppointmentType } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

const staff = [
  {
    id: 'staff-1',
    firstName: 'Bureau',
    lastName: 'Huyghe',
    role: 'LANDMETER',
    specializations: 'PROPERTY_SURVEY,CONSTRUCTION_SURVEY,TECHNICAL_DOCUMENTATION,LEGAL_SERVICE',
  },
];

const defaultSlots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
];

const mapServiceTypeToAppointmentType = (_serviceType: string): AppointmentType => {
  return AppointmentType.INITIAL_CONSULTATION;
};

const toApiAppointment = (appointment: {
  id: string;
  clientId: string;
  date: Date;
  status: AppointmentStatus;
  notes: string | null;
}) => {
  let parsed: any = {};
  try {
    parsed = appointment.notes ? JSON.parse(appointment.notes) : {};
  } catch {
    parsed = {};
  }

  const staffId = typeof parsed.staffId === 'string' ? parsed.staffId : 'staff-1';
  const serviceType = typeof parsed.serviceType === 'string' ? parsed.serviceType : 'INITIAL_CONSULTATION';
  const topic = typeof parsed.topic === 'string' ? parsed.topic : '';
  const description = typeof parsed.description === 'string' ? parsed.description : undefined;

  return {
    id: appointment.id,
    userId: appointment.clientId,
    staffId,
    serviceType,
    status: appointment.status === AppointmentStatus.CANCELLED ? 'CANCELLED' : 'PENDING',
    scheduledAt: appointment.date.toISOString(),
    durationMinutes: 60,
    topic,
    description,
    documentsNeeded: '',
    staff: staff.find((s) => s.id === staffId) || staff[0],
  };
};

router.get('/', async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ success: false, error: 'Authentication required' });
    return;
  }

  const appointments = await prisma.appointment.findMany({
    where: { clientId: userId },
    orderBy: { date: 'asc' },
  });

  res.json({ success: true, data: appointments.map((a) => toApiAppointment(a)) });
});

router.get('/staff', (req: Request, res: Response) => {
  const serviceType = typeof req.query.serviceType === 'string' ? req.query.serviceType : undefined;
  const filtered = serviceType
    ? staff.filter((s) => s.specializations.includes(serviceType))
    : staff;
  res.json({ success: true, data: filtered });
});

router.get('/available-slots', (_req: Request, res: Response) => {
  res.json({ success: true, data: defaultSlots });
});

router.post('/', async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ success: false, error: 'Authentication required' });
    return;
  }

  const { staffId, serviceType, scheduledAt, topic, description } = req.body as {
    staffId: string;
    serviceType: string;
    scheduledAt: string;
    topic: string;
    description?: string;
  };

  if (!staffId || !serviceType || !scheduledAt || !topic) {
    res.status(400).json({ success: false, error: 'Missing required fields' });
    return;
  }

  const date = new Date(scheduledAt);
  if (Number.isNaN(date.getTime())) {
    res.status(400).json({ success: false, error: 'Invalid scheduledAt' });
    return;
  }

  const created = await prisma.appointment.create({
    data: {
      clientId: userId,
      date,
      type: mapServiceTypeToAppointmentType(serviceType),
      status: AppointmentStatus.SCHEDULED,
      notes: JSON.stringify({ staffId, serviceType, topic, description }),
    },
  });

  res.status(201).json({ success: true, data: toApiAppointment(created) });
});

router.patch('/:id/cancel', async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ success: false, error: 'Authentication required' });
    return;
  }

  const existing = await prisma.appointment.findFirst({
    where: { id: req.params.id, clientId: userId },
  });

  if (!existing) {
    res.status(404).json({ success: false, error: 'Appointment not found' });
    return;
  }

  const reason = (req.body as { reason?: string }).reason;

  const updated = await prisma.appointment.update({
    where: { id: existing.id },
    data: {
      status: AppointmentStatus.CANCELLED,
      notes: JSON.stringify({ ...(existing.notes ? JSON.parse(existing.notes) : {}), cancelReason: reason }),
    },
  });

  res.json({ success: true, data: toApiAppointment(updated) });
});

export default router;
