import nodemailer from 'nodemailer';
import path from 'path';
import { promises as fs } from 'fs';
import handlebars from 'handlebars';
import crypto from 'crypto';

interface EmailOptions {
  to: string;
  cc?: string[];
  subject: string;
  template: string;
  data: Record<string, any>;
  scheduledFor?: Date;
  trackingId?: string;
}

interface EmailTracking {
  id: string;
  sentAt: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  bounced: boolean;
  bounceReason?: string;
  clickCount: number;
}

interface EmailSchedule {
  id: string;
  scheduledFor: Date;
  options: EmailOptions;
  sent: boolean;
  error?: string;
}

interface AdminNotification {
  contactId: string;
  name: string;
  email: string;
  hasFiles: boolean;
}

// In-memory storage for demo (use Redis/DB in production)
const emailTracking = new Map<string, EmailTracking>();
const emailSchedules = new Map<string, EmailSchedule>();

// Email tracking pixel
const generateTrackingPixel = (trackingId: string) => `
  <img src="${process.env.API_URL}/email-tracking/${trackingId}/open" width="1" height="1" />
`;

// Add tracking links
const addTracking = (html: string, trackingId: string) => {
  const trackingPixel = generateTrackingPixel(trackingId);
  return html + trackingPixel;
};

// Schedule management
const scheduleEmail = async (options: EmailOptions) => {
  const id = crypto.randomUUID();
  const schedule: EmailSchedule = {
    id,
    scheduledFor: options.scheduledFor || new Date(),
    options,
    sent: false
  };
  emailSchedules.set(id, schedule);
  return id;
};

// Process scheduled emails
setInterval(async () => {
  const now = new Date();
  for (const [, schedule] of emailSchedules) {
    if (!schedule.sent && schedule.scheduledFor <= now) {
      try {
        await sendEmail({ ...schedule.options, scheduledFor: undefined });
        schedule.sent = true;
      } catch (error) {
        schedule.error = error.message;
      }
    }
  }
}, 60000); // Check every minute

// Bounce handling
export const handleBounce = async (trackingId: string, reason: string): Promise<void> => {
  const tracking = emailTracking.get(trackingId);
  if (tracking) {
    tracking.bounced = true;
    tracking.bounceReason = reason;
    // Notify admin
    await sendEmail({
      to: 'nicolas.cloet@gmail.com',
      subject: 'Email Bounce Notification',
      template: 'email-bounce',
      data: { trackingId, reason }
    });
  }
};

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (options: EmailOptions) => {
  // Handle scheduling
  if (options.scheduledFor && options.scheduledFor > new Date()) {
    return await scheduleEmail(options);
  }

  // Setup tracking
  const trackingId = options.trackingId || crypto.randomUUID();
  emailTracking.set(trackingId, {
    id: trackingId,
    sentAt: new Date(),
    bounced: false,
    clickCount: 0
  });

  // Load template
  const templatePath = path.join(__dirname, '../templates', `${options.template}.html`);
  const template = await fs.readFile(templatePath, 'utf8');

  // Add service-specific content
  if (options.data.category) {
    const serviceTemplatePath = path.join(__dirname, '../templates', `service-${options.data.category}.html`);
    try {
      const serviceTemplate = await fs.readFile(serviceTemplatePath, 'utf8');
      handlebars.registerPartial('serviceContent', serviceTemplate);
    } catch (error) {
      console.warn(`No specific template for service: ${options.data.category}`);
    }
  }

  // Compile template with Handlebars
  const compiledTemplate = handlebars.compile(template);
  let html = compiledTemplate(options.data);

  // Add tracking
  html = addTracking(html, trackingId);

  // Send email
  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'nicolas.cloet@gmail.com',
    to: options.to,
    cc: options.cc,
    subject: options.subject,
    html,
  });

  return trackingId;
};

export const sendAdminNotification = async ({
  contactId,
  name,
  email,
  hasFiles,
}: AdminNotification) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'info@bureau-huyghe.be';
  const dashboardUrl = `${process.env.ADMIN_URL}/contacts/${contactId}`;

  const html = `
    <h2>Nieuwe contactaanvraag</h2>
    <p>Er is een nieuwe contactaanvraag binnengekomen van:</p>
    <ul>
      <li><strong>Naam:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
      ${hasFiles ? '<li><strong>Bijlagen:</strong> Ja</li>' : ''}
    </ul>
    <p>
      <a href="${dashboardUrl}" style="background-color: #003876; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Bekijk aanvraag
      </a>
    </p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'noreply@bureau-huyghe.be',
    to: adminEmail,
    subject: 'Nieuwe contactaanvraag - Bureau Huyghe',
    html,
  });
};
