# Bureau Huyghe - Professional Land Surveying

A modern, responsive web application for Bureau Huyghe land surveying services, providing comprehensive information and client interaction capabilities.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT + bcrypt
- **Analytics**: Google Analytics 4
- **Maps Integration**: Leaflet/MapBox for interactive mapping

## Core Features

- Multi-language Support (NL/FR/EN)
- Interactive Service Catalog
- Advanced Contact Forms by Service Type
- Project Portfolio Showcase
- Appointment Booking System
- Document Upload/Download
- Interactive Map of Service Areas
- Client Dashboard

## Project Structure

```
bureau-huyghe/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── i18n/          # Translations (NL/FR/EN)
│   │   ├── services/      # API client services
│   │   ├── stores/        # State management
│   │   └── types/         # TypeScript types
│   └── public/            # Static assets
├── server/                # Express API backend
│   ├── src/
│   │   ├── routes/        # API route definitions
│   │   ├── middleware/    # Auth, validation
│   │   └── lib/          # Prisma client, utilities
│   └── prisma/           # Database schema + migrations
└── vercel.json           # Vercel deployment config
```

## Services

1. Property Surveying & Boundary Determination
2. Construction & Development
3. Technical Documentation
4. Legal & Administrative

## License

Proprietary - Bureau Huyghe © 2025
