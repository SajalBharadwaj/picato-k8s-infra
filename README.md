# PICATO - Food Ordering Web Application

A full-stack Next.js food ordering application featuring burgers and pizzas menu, Firebase authentication, Firestore database, and comprehensive admin dashboard with analytics.

## Features

### Customer Features
- Browse menu with category filtering (Burgers & Pizzas)
- User authentication (signup/login)
- Shopping cart with quantity management
- Multiple payment options (Stripe & PayPal)
- Order confirmation and email notifications

### Admin Features
- Separate admin authentication system
- Dashboard with real-time statistics
- Order management with search and filters
- Full CRUD operations for menu items
- Analytics with data visualization:
  - Bar charts (weekly revenue, product sales)
  - Pie chart (category distribution)
  - Histogram (orders by time of day)
- Top user of the month tracking
- Weekly best sellers reports

### Super Admin Features
- Create and manage admin accounts
- Send automated welcome emails with credentials
- Role-based access control

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Authentication:** Firebase Authentication
- **Database:** Firebase Firestore
- **Payment Processing:** Stripe & PayPal
- **Email Service:** Nodemailer
- **Charts:** Chart.js with react-chartjs-2
- **Language:** JavaScript (Vanilla JS)

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- Firebase account
- Stripe account (test mode)
- PayPal developer account
- Email service credentials (Gmail recommended)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**

   Copy `.env.local.example` to `.env.local` and fill in your credentials

## Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "PICATO"
3. Enable Firebase Authentication (Email/Password provider)

### 2. Create Firestore Database
1. Go to Firestore Database and create database
2. Set up security rules from planning.md

### 3. Create Initial Super Admin
1. Add user in Firebase Authentication
2. Create corresponding document in `users` collection with role: "super_admin"

## Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Key Routes

### Customer Routes
- `/` - Home page
- `/menu` - Browse menu
- `/cart` - Shopping cart
- `/checkout` - Payment & checkout

### Admin Routes
- `/admin-login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/orders` - Order management
- `/admin/menu` - Menu management
- `/admin/analytics` - Analytics & charts
- `/admin/admins` - Admin management (super admin only)

## Test Payments

**Stripe Test Card:** `4242 4242 4242 4242` (any future expiry, any CVC)

**PayPal:** Use sandbox accounts from PayPal Developer Portal

## Support

For setup instructions and troubleshooting, refer to planning.md documentation.