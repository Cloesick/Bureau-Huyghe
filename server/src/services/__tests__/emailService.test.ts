import { sendEmail, transporter } from '../emailService';
import nodemailer from 'nodemailer';

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-id' })
  })
}));

describe('Email Service', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  let mockSendMail: jest.Mock;

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();

    // Setup mock transport
    mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-id' });
    const mockTransporter = {
      sendMail: mockSendMail
    };
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);
    (transporter as any) = mockTransporter;
  });

  it('should send contact form submission email', async () => {
    const testData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '0470123456',
      category: 'property',
      message: 'Test message'
    };

    await sendEmail({
      to: 'nicolas.cloet@gmail.com',
      subject: 'Test Contact Form Submission',
      template: 'contact-form-admin',
      data: testData
    });

    // Verify email was sent with correct data
    expect(mockSendMail).toHaveBeenCalledTimes(1);
    const sentMailOptions = mockSendMail.mock.calls[0][0];
    expect(sentMailOptions.to).toBe('nicolas.cloet@gmail.com');
    expect(sentMailOptions.subject).toBe('Test Contact Form Submission');
    expect(sentMailOptions.html).toContain('John Doe');
    expect(sentMailOptions.html).toContain('john.doe@example.com');
  });

  it('should include service-specific content for property surveys', async () => {
    const testData = {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      category: 'property',
      message: 'Need property survey',
      propertySize: '500m²'
    };

    await sendEmail({
      to: 'nicolas.cloet@gmail.com',
      subject: 'Property Survey Request',
      template: 'contact-form-admin',
      data: testData
    });

    const sentMailOptions = mockSendMail.mock.calls[0][0];
    expect(sentMailOptions.html).toContain('property');
    expect(sentMailOptions.html).toContain('Need property survey');
  });

  it('should handle email scheduling', async () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 1);

    const trackingId = await sendEmail({
      to: 'nicolas.cloet@gmail.com',
      subject: 'Scheduled Email',
      template: 'contact-form-admin',
      data: { name: 'Test User' },
      scheduledFor: futureDate
    });

    // Verify email wasn't sent immediately
    expect(mockSendMail).not.toHaveBeenCalled();
    expect(trackingId).toBeDefined();
  });

  it('should add tracking pixel to emails', async () => {
    await sendEmail({
      to: 'nicolas.cloet@gmail.com',
      subject: 'Tracked Email',
      template: 'contact-form-admin',
      data: { name: 'Test User' }
    });

    const sentMailOptions = mockSendMail.mock.calls[0][0];
    expect(sentMailOptions.html).toContain('<img src=');
    expect(sentMailOptions.html).toContain('width="1" height="1"');
  });
});
