import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle Prisma errors
    if (err.code === 'P2002') {
      return res.status(409).json({
        status: 'error',
        message: 'A record with this value already exists'
      });
    }
  }

  // Log error for debugging
  console.error('Error:', err);

  // Default error response
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
