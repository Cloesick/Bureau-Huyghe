import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import appointmentRoutes from './routes/appointments';
import contactRoutes from './routes/contact';
import uploadRoutes from './routes/upload';
import healthRoutes from './routes/health';
import leadRoutes from './routes/leads';
import profileRoutes from './routes/profile';
import chatRoutes from './routes/chat';
import paymentRequestRoutes from './routes/paymentRequests';
import { errorHandler } from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/health', healthRoutes);

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/leads', leadRoutes);

// Protected routes
app.use('/api/projects', authenticateToken, projectRoutes);
app.use('/api/appointments', authenticateToken, appointmentRoutes);
app.use('/api/profile', authenticateToken, profileRoutes);
app.use('/api/chat', authenticateToken, chatRoutes);
app.use('/api/payment-requests', authenticateToken, paymentRequestRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
