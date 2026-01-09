# Bureau Huyghe - Professional Land Surveying

A modern, responsive web application for Bureau Huyghe land surveying services, providing comprehensive information and client interaction capabilities.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + TypeScript + Vite + TailwindCSS |
| **Backend** | Node.js + Express + TypeScript |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | JWT + bcrypt |
| **Deployment** | Vercel (client) + AWS App Runner (server) |
| **PWA** | Vite PWA Plugin + Workbox |

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL (for backend)

### Client Setup

```bash
cd client
npm install
npm run dev
```

The client runs at `http://localhost:5173`

### Server Setup

```bash
cd server
npm install
cp .env.example .env  # Configure your environment variables
npx prisma generate
npx prisma migrate dev
npm run dev
```

The server runs at `http://localhost:3001`

### Environment Variables

**Client** (`client/.env.local`):
```env
VITE_API_URL=http://localhost:3001/api  # Local development
# VITE_API_URL=https://your-api.com/api  # Production
```

**Server** (`server/.env`):
```env
DATABASE_URL="postgresql://user:password@localhost:5432/bureau_huyghe"
JWT_SECRET="your-secret-key"
SMTP_HOST="smtp.example.com"
SMTP_USER="your-email"
SMTP_PASS="your-password"
```

## Project Structure

```
bureau-huyghe/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Header.tsx          # Navigation with mobile hamburger
│   │   │   ├── Footer.tsx          # Site footer
│   │   │   ├── ContactForm.tsx     # Contact form with validation
│   │   │   └── ...
│   │   ├── pages/          # Route pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── services/           # Service detail pages
│   │   │   └── admin/              # Admin dashboard pages
│   │   ├── i18n/           # Translations (NL/FR/EN)
│   │   ├── services/       # API client services
│   │   ├── stores/         # Zustand state management
│   │   ├── hooks/          # Custom React hooks
│   │   └── types/          # TypeScript types
│   ├── public/             # Static assets
│   └── vercel.json         # Vercel config for SPA routing
├── server/                 # Express API backend
│   ├── src/
│   │   ├── routes/         # API route definitions
│   │   │   ├── auth.ts             # Authentication endpoints
│   │   │   ├── contact.ts          # Contact form handling
│   │   │   └── upload.ts           # File upload handling
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── services/       # Business logic
│   │   └── templates/      # Email templates (Handlebars)
│   └── prisma/             # Database schema + migrations
├── vercel.json             # Root Vercel deployment config
├── docker-compose.yml      # Local development with Docker
└── cypress.config.ts       # E2E testing configuration
```

## Core Features

### Public Features
- **Multi-language Support** - Dutch, French, English
- **Service Catalog** - Detailed service pages with pricing info
- **Contact Forms** - Service-specific forms with validation
- **Portfolio** - Project showcase with images
- **Calendly Integration** - Online appointment booking
- **PWA Support** - Installable, works offline

### Client Portal
- **Dashboard** - Overview of projects and appointments
- **Document Management** - Upload/download project files
- **Appointment History** - View and manage bookings
- **Profile Management** - Update contact information

### Admin Features
- **Lead Management** - Track and manage contact submissions
- **Portfolio Editor** - Add/edit project showcases
- **Content Management** - Update site content

## Available Scripts

### Client

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run cypress:open` | Open Cypress test runner |

### Server

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm run start` | Start production server |
| `npm run test` | Run Jest tests |
| `npm run prisma:migrate` | Run database migrations |

## Deployment

### Client (Vercel)

1. Connect GitHub repository to Vercel
2. Set environment variable: `VITE_API_URL`
3. Deploy automatically on push to `main`

### Server (AWS App Runner / Railway / Render)

1. Build Docker image or deploy directly
2. Set environment variables (DATABASE_URL, JWT_SECRET, SMTP_*)
3. Run Prisma migrations: `npx prisma migrate deploy`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/leads` | Submit contact form |
| GET | `/api/appointments` | Get user appointments |
| POST | `/api/appointments` | Create appointment |
| POST | `/api/upload` | Upload file |

## Services Offered

1. **Landmeting** - Property surveying & boundary determination
2. **Bouwmeting** - Construction surveying & as-built documentation
3. **Technische Documentatie** - Technical documentation & 3D scanning
4. **Juridisch** - Legal expertise & property descriptions

## Contributing

This is a private project. Contact Bureau Huyghe for collaboration inquiries.

## License

Proprietary - Bureau Huyghe © 2025. All rights reserved.
