import { PrismaClient } from '@prisma/client';
import { sendEmail } from './emailService';

const prisma = new PrismaClient();

import { ContactFormData, ContactFormCreateData, ServiceFields } from '../types/contact';

function validateServiceFields(data: ContactFormData) {
  if (data.category === 'PROPERTY' && data.serviceFields) {
    const fields = data.serviceFields as Record<string, any>;
    if (!fields.perceelgrootte || !fields.typeAfbakening) {
      throw new Error('Missing required fields');
    }
  }
}

export async function handleContactSubmission(data: ContactFormData) {
  try {
    validateServiceFields(data);
    // 1. Store in Database
    const createData: ContactFormCreateData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      address: data.address,
      category: data.category,
      message: data.message,
      status: 'NEW',
      propertyFields: data.category === 'PROPERTY' ? data.serviceFields as ServiceFields : undefined,
      constructionFields: data.category === 'CONSTRUCTION' ? data.serviceFields as ServiceFields : undefined,
      technicalFields: data.category === 'TECHNICAL' ? data.serviceFields as ServiceFields : undefined,
      legalFields: data.category === 'LEGAL' ? data.serviceFields as ServiceFields : undefined,
      files: data.files ? {
        create: data.files.map(file => ({
          fileId: file.fileId,
          fileName: file.fileName,
          url: file.url
        }))
      } : undefined
    };

    // 1. Store in Database
    const result = await prisma.contactForm.create({
      data: createData
    });

    const contactId = result.id;

    // A. To the office
    await sendEmail({
      to: 'nicolas.cloet@gmail.com',
      cc: [], // Owner always in CC
      subject: `Nieuwe ${data.category} aanvraag van ${data.name}`,
      template: 'contact-form-admin',
      data: {
        ...data,
        adminUrl: `${process.env.ADMIN_URL}/contacts/${contactId}`,
        submissionDate: new Date().toLocaleString('nl-BE')
      }
    });

    // B. To the client
    await sendEmail({
      to: data.email,
      subject: 'Ontvangstbevestiging - Bureau Huyghe',
      template: 'contact-form-client',
      data: {
        name: data.name,
        category: data.category,
        referenceNumber: contactId
      }
    });

    // 3. Optional: Add to CRM system
    if (process.env.CRM_ENABLED === 'true') {
      await addToCRM(data);
    }

    return {
      success: true,
      contactId: contactId
    };
  } catch (error) {
    console.error('Contact form submission failed:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to process contact form');
  }
}

// Example CRM integration (simplified)
async function addToCRM(data: ContactFormData) {
  // Integration with preferred CRM system
  // e.g., HubSpot, Salesforce, etc.
  console.log('Adding to CRM:', data);
}
