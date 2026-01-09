import { handleContactSubmission } from '../contactService';
import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../emailService';

jest.mock('@prisma/client', () => {
  const mockCreate = jest.fn();
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      contactForm: {
        create: mockCreate
      }
    }))
  };
});
jest.mock('../emailService');

describe('Contact Service', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  let prisma: any;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    prisma = new PrismaClient();
    (sendEmail as jest.Mock).mockResolvedValue('test-tracking-id');
  });

  it('should handle property survey submission with specific fields', async () => {
    const testData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '0470123456',
      category: 'PROPERTY' as const,
      message: 'Need property survey',
      serviceFields: {
        perceelgrootte: '500',
        kadastraleGegevens: 'Section A123',
        typeAfbakening: 'permanent',
        typeTerrein: 'residential'
      }
    };

    const mockResponse = { id: 'test-id', ...testData, createdAt: new Date(), updatedAt: new Date() };
    prisma.contactForm.create.mockResolvedValueOnce(mockResponse);

    await handleContactSubmission(testData);

    expect(prisma.contactForm.create).toHaveBeenCalledWith({
      data: {
        name: testData.name,
        email: testData.email,
        phone: testData.phone,
        company: undefined,
        address: undefined,
        category: testData.category,
        message: testData.message,
        status: 'NEW',
        propertyFields: testData.serviceFields,
        constructionFields: undefined,
        technicalFields: undefined,
        legalFields: undefined,
        files: undefined
      }
    });

    expect(sendEmail).toHaveBeenCalledTimes(2);

    // Verify admin notification
    expect(sendEmail).toHaveBeenCalledWith({
      to: 'nicolas.cloet@gmail.com',
      cc: [],
      subject: `Nieuwe ${testData.category} aanvraag van ${testData.name}`,
      template: 'contact-form-admin',
      data: {
        ...testData,
        adminUrl: `${process.env.ADMIN_URL}/contacts/test-id`,
        submissionDate: expect.any(String)
      }
    });

    // Verify client confirmation
    expect(sendEmail).toHaveBeenCalledWith({
      to: testData.email,
      subject: 'Ontvangstbevestiging - Bureau Huyghe',
      template: 'contact-form-client',
      data: {
        name: testData.name,
        category: testData.category,
        referenceNumber: 'test-id'
      }
    });
  });

  it('should handle construction project submission with specific fields', async () => {
    const testData = {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '0470789012',
      category: 'CONSTRUCTION' as const,
      message: 'New construction project',
      serviceFields: {
        typeProject: 'nieuwbouw',
        projectfase: 'voorontwerp',
        oppervlakte: '200',
        startDatum: '2024-02-01'
      }
    };

    const mockResponse = { id: 'test-id', ...testData, createdAt: new Date(), updatedAt: new Date() };
    prisma.contactForm.create.mockResolvedValueOnce(mockResponse);

    await handleContactSubmission(testData);

    expect(prisma.contactForm.create).toHaveBeenCalledWith({
      data: {
        name: testData.name,
        email: testData.email,
        phone: testData.phone,
        company: undefined,
        address: undefined,
        category: testData.category,
        message: testData.message,
        status: 'NEW',
        propertyFields: undefined,
        constructionFields: testData.serviceFields,
        technicalFields: undefined,
        legalFields: undefined,
        files: undefined
      }
    });
  });

  it('should handle file uploads', async () => {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      category: 'TECHNICAL' as const,
      message: 'With attachments',
      files: [
        {
          fileId: 'file1',
          fileName: 'plan.pdf',
          url: 'http://example.com/files/plan.pdf'
        },
        {
          fileId: 'file2',
          fileName: 'measurements.dwg',
          url: 'http://example.com/files/measurements.dwg'
        }
      ]
    };

    const mockResponse = { id: 'test-id', ...testData, createdAt: new Date(), updatedAt: new Date() };
    prisma.contactForm.create.mockResolvedValueOnce(mockResponse);

    await handleContactSubmission(testData);

    expect(prisma.contactForm.create).toHaveBeenCalledWith({
      data: {
        name: testData.name,
        email: testData.email,
        category: testData.category,
        message: testData.message,
        status: 'NEW',
        company: undefined,
        address: undefined,
        propertyFields: undefined,
        constructionFields: undefined,
        technicalFields: undefined,
        legalFields: undefined,
        files: {
          create: testData.files.map(file => ({
            fileId: file.fileId,
            fileName: file.fileName,
            url: file.url
          }))
        }
      }
    });

    expect(sendEmail).toHaveBeenCalledTimes(2);

    // Verify admin notification
    expect(sendEmail).toHaveBeenCalledWith({
      to: 'nicolas.cloet@gmail.com',
      cc: [],
      subject: `Nieuwe ${testData.category} aanvraag van ${testData.name}`,
      template: 'contact-form-admin',
      data: {
        ...testData,
        adminUrl: `${process.env.ADMIN_URL}/contacts/test-id`,
        submissionDate: expect.any(String)
      }
    });

    // Verify client confirmation
    expect(sendEmail).toHaveBeenCalledWith({
      to: testData.email,
      subject: 'Ontvangstbevestiging - Bureau Huyghe',
      template: 'contact-form-client',
      data: {
        name: testData.name,
        category: testData.category,
        referenceNumber: 'test-id'
      }
    });
  });

  it('should validate required service-specific fields', async () => {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      category: 'PROPERTY' as const,
      message: 'Missing required fields',
      serviceFields: {
        // Missing required 'perceelgrootte' and 'typeAfbakening'
        kadastraleGegevens: 'Section A123'
      }
    };

    await expect(handleContactSubmission(testData)).rejects.toThrow('Missing required fields');
  });

  it('should handle form data persistence', async () => {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      category: 'LEGAL' as const,
      message: 'Test message',
      serviceFields: {
        typeGeschil: 'grensgeschil',
        urgentie: 'hoog',
        betrokkenPartijen: 'Neighbor dispute',
        rechtbankBetrokken: 'nee'
      }
    };

    const mockResponse = { id: 'test-id', ...testData, createdAt: new Date(), updatedAt: new Date() };
    prisma.contactForm.create.mockResolvedValueOnce(mockResponse);

    const result = await handleContactSubmission(testData);

    expect(result).toEqual({
      success: true,
      contactId: 'test-id'
    });

    // Verify client confirmation email
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: testData.email,
        template: 'contact-form-client',
        data: expect.objectContaining({
          category: 'LEGAL',
          referenceNumber: 'test-id'
        })
      })
    );
  });
});
