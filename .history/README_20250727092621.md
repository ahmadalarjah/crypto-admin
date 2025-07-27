# Crypto Admin Frontend

A modern React/Next.js admin dashboard for the Crypto investment platform.

## Features

- 🔐 Admin authentication and authorization
- 📊 Comprehensive analytics dashboard
- 👥 User management and monitoring
- 💰 Deposit and withdrawal approval system
- 🎫 Promo code management
- 📈 Investment plans management
- 🔧 System settings and configuration
- 📱 Responsive admin interface
- 🎨 Modern UI with Tailwind CSS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=https://api.fischer-capital.com/api
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

- `/login` - Admin login
- `/dashboard` - Main admin dashboard
- `/analytics` - Analytics and statistics
- `/users` - User management
- `/deposits` - Deposit management
- `/withdrawals` - Withdrawal management
- `/plans` - Investment plans management
- `/promo-codes` - Promo code management
- `/wallet-requests` - Wallet change requests
- `/settings` - System settings
- `/profile` - Admin profile

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Context
- **HTTP Client**: Fetch API
- **Icons**: Lucide React

## API Integration

The admin frontend communicates with the Fischer Capital API through the `apiService` in `/lib/api.ts`. The API base URL is configured to use `https://api.fischer-capital.com`.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
front-admin/
├── app/                 # Next.js app directory
│   ├── login/          # Admin login page
│   ├── dashboard/      # Admin dashboard
│   │   ├── analytics/  # Analytics page
│   │   ├── users/      # User management
│   │   ├── deposits/   # Deposit management
│   │   ├── withdrawals/ # Withdrawal management
│   │   ├── plans/      # Plans management
│   │   ├── promo-codes/ # Promo codes
│   │   ├── wallet-requests/ # Wallet requests
│   │   ├── settings/   # Settings page
│   │   └── profile/    # Admin profile
│   └── layout.tsx      # Root layout
├── components/         # Reusable components
│   ├── ui/            # UI components (shadcn/ui)
│   ├── admin-sidebar.tsx # Admin sidebar
│   └── dashboard-header.tsx # Dashboard header
├── contexts/          # React contexts
│   └── auth-context.tsx # Authentication context
├── hooks/             # Custom hooks
│   └── use-toast.ts   # Toast notifications
├── lib/               # Utility libraries
│   ├── api.ts         # API client
│   └── utils.ts       # Utility functions
└── types/             # TypeScript types
    └── index.ts       # Type definitions
```

## Security

This admin interface includes:
- JWT-based authentication
- Role-based access control
- Secure API communication
- Protected routes and components 