import { Prisma } from '@prisma/client';

export type ServiceCategory = 'PROPERTY' | 'CONSTRUCTION' | 'TECHNICAL' | 'LEGAL' | 'GENERAL';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  category: ServiceCategory;
  message: string;
  serviceFields?: Record<string, any>;
  files?: Array<{
    fileId: string;
    fileName: string;
    url: string;
  }>;
}

export type ServiceFields = Prisma.InputJsonValue;

export type ContactStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type ContactFormCreateData = Prisma.ContactFormCreateInput & {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  category: ServiceCategory;
  message: string;
  status: ContactStatus;
  propertyFields?: ServiceFields;
  constructionFields?: ServiceFields;
  technicalFields?: ServiceFields;
  legalFields?: ServiceFields;
  files?: {
    create: Array<{
      fileId: string;
      fileName: string;
      url: string;
    }>;
  };
}
