import { rest } from 'msw';
import { Document, DocumentUploadResponse } from '../types/documents';

const API_URL = 'http://localhost:3001/api';

export const handlers = [
  // Contact form submission
  rest.post(`${API_URL}/contact`, async (req, res, ctx) => {
    const body = await req.json();
    
    if (!body.email || !body.name) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Email and name are required' })
      );
    }

    return res(
      ctx.status(201),
      ctx.json({
        status: 'success',
        message: 'Contact form submitted successfully'
      })
    );
  }),

  // Document upload
  rest.post(`${API_URL}/documents/upload`, async (req, res, ctx) => {
    const formData = await req.json();
    
    const response: DocumentUploadResponse = {
      id: 'test-doc-123',
      fileUrl: 'https://storage.example.com/test-doc-123.pdf',
      status: 'success'
    };

    return res(ctx.status(201), ctx.json(response));
  }),

  // Get user documents
  rest.get(`${API_URL}/documents`, (req, res, ctx) => {
    const documents: Document[] = [
      {
        id: 'doc-1',
        title: 'Contract - Land Survey',
        type: 'CONTRACT',
        status: 'PENDING',
        visibility: 'BOTH',
        fileUrl: 'https://storage.example.com/doc-1.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 1024,
        uploadedBy: 'bureau-huyghe',
        uploadedAt: new Date('2025-12-28'),
        clientId: 'client-123',
        metadata: {
          pageCount: 5,
          signatureRequired: true
        }
      },
      {
        id: 'doc-2',
        title: 'Property Survey Report',
        type: 'REPORT',
        status: 'APPROVED',
        visibility: 'BOTH',
        fileUrl: 'https://storage.example.com/doc-2.pdf',
        fileType: 'application/pdf',
        fileSize: 2048 * 1024,
        uploadedBy: 'client-123',
        uploadedAt: new Date('2025-12-27'),
        clientId: 'client-123'
      }
    ];

    return res(ctx.status(200), ctx.json(documents));
  }),

  // Delete document
  rest.delete(`${API_URL}/documents/:documentId`, (req, res, ctx) => {
    const { documentId } = req.params;

    if (!documentId) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Document ID is required' })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ message: 'Document deleted successfully' })
    );
  }),

  // Lead registration
  rest.post(`${API_URL}/auth/register`, async (req, res, ctx) => {
    const body = await req.json();

    if (!body.email || !body.password) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Email and password are required' })
      );
    }

    return res(
      ctx.status(201),
      ctx.json({
        id: 'user-123',
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName
      })
    );
  }),

  // Authentication
  rest.post(`${API_URL}/auth/login`, async (req, res, ctx) => {
    const body = await req.json();

    if (!body.email || !body.password) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Email and password are required' })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        token: 'test-jwt-token',
        user: {
          id: 'user-123',
          email: body.email,
          firstName: 'John',
          lastName: 'Doe'
        }
      })
    );
  })
];
