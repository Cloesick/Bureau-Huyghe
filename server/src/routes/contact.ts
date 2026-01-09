import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import { AppError } from '../middleware/errorHandler';

const router = Router();
const prisma = new PrismaClient();

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Validation middleware
const validateContactForm = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('category').isIn(['PROPERTY', 'CONSTRUCTION', 'TECHNICAL', 'LEGAL', 'GENERAL'])
    .withMessage('Invalid service category'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

// Submit contact form
router.post('/', validateContactForm, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      company,
      address,
      category,
      message,
      propertyFields,
      constructionFields,
      technicalFields,
      legalFields
    } = req.body;

    // Create contact form entry
    const contactForm = await prisma.contactForm.create({
      data: {
        name,
        email,
        phone,
        company,
        address,
        category,
        message,
        propertyFields: propertyFields ? JSON.stringify(propertyFields) : null,
        constructionFields: constructionFields ? JSON.stringify(constructionFields) : null,
        technicalFields: technicalFields ? JSON.stringify(technicalFields) : null,
        legalFields: legalFields ? JSON.stringify(legalFields) : null,
      },
    });

    // Send notification email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `Nieuwe contactaanvraag - ${category}`,
      html: `
        <h2>Nieuwe Contactaanvraag</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefoon:</strong> ${phone || 'Niet opgegeven'}</p>
        <p><strong>Bedrijf:</strong> ${company || 'Niet opgegeven'}</p>
        <p><strong>Adres:</strong> ${address || 'Niet opgegeven'}</p>
        <p><strong>Categorie:</strong> ${category}</p>
        <p><strong>Bericht:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send confirmation email to client
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Bevestiging contactaanvraag - Bureau Huyghe',
      html: `
        <h2>Bedankt voor uw aanvraag</h2>
        <p>Beste ${name},</p>
        <p>Wij hebben uw contactaanvraag goed ontvangen. Een van onze medewerkers zal zo spoedig mogelijk contact met u opnemen.</p>
        <p>Met vriendelijke groeten,<br>Bureau Huyghe</p>
      `,
    });

    res.status(201).json({
      status: 'success',
      data: {
        id: contactForm.id,
        message: 'Contact form submitted successfully'
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
