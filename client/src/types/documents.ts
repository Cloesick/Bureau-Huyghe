export type DocumentType = 'CONTRACT' | 'SURVEY' | 'REPORT' | 'INVOICE' | 'OTHER';
export type DocumentStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type DocumentVisibility = 'CLIENT' | 'BUREAU' | 'BOTH';

export interface Document {
  id: string;
  title: string;
  description?: string;
  type: DocumentType;
  status: DocumentStatus;
  visibility: DocumentVisibility;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: Date;
  projectId?: string;
  clientId: string;
  metadata?: Record<string, any>;
}

export interface DocumentUploadResponse {
  id: string;
  fileUrl: string;
  status: 'success' | 'error';
  message?: string;
}

export interface DocumentShareRequest {
  documentId: string;
  recipientId: string;
  message?: string;
  expiresAt?: Date;
}

export interface DocumentFilter {
  type?: DocumentType[];
  status?: DocumentStatus[];
  visibility?: DocumentVisibility[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  projectId?: string;
}
