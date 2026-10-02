# 🧼 Brisbane Carpet & Pest Experts — Enterprise Web Platform & ERP System

An end-to-end, production-ready enterprise web application and field service management system built specifically for Australian carpet cleaning, pest control, and bond cleaning operations in Queensland, Australia.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM** (SQLite default, 1-click upgradeable to PostgreSQL/MySQL).

---

## 📑 Table of Contents
1. [🌟 System Overview & Key Features](#-system-overview--key-features)
2. [🔄 End-to-End Business Workflows](#-end-to-end-business-workflows)
3. [📊 Database Entity Relationship (ER) Diagram](#-database-entity-relationship-er-diagram)
4. [📁 Project Directory & Architecture](#-project-directory--architecture)
5. [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
6. [💳 Payment Gateways & Australian Banking Setup](#-payment-gateways--australian-banking-setup)
7. [📧 Email & 📱 WhatsApp API Configuration](#-email---whatsapp-api-configuration)
8. [🚢 Deployment Guide (VPS, Vercel, Docker, cPanel)](#-deployment-guide-vps-vercel-docker-cpanel)
9. [🔐 Seed Accounts & Demo Credentials](#-seed-accounts--demo-credentials)
10. [📡 API Endpoint Reference](#-api-endpoint-reference)

---

## 🌟 System Overview & Key Features

### 1. 👤 Customer Experience (`/register`, `/login`, `/dashboard`)
- **Demand Quotation Engine**: Custom dynamic service requests (Bedrooms, Bathrooms, Sqm, Carpet Steam, Pest Control, Tile Scrub, Bond Clean).
- **Price Approval & Lock-in**: Admin reviews and prices the demand quote; sets standard **$50.00 AUD deposit** to lock the calendar date.
- **Australian Payment Gateways**: Direct online payments via **Stripe**, **PayPal**, **PayID / NPP Instant**, **POLi Internet Banking**, and **Direct Bank EFT**.
- **Customer Dashboard**: Real-time quotation statuses, upcoming bookings, GST tax invoices (PDF/Print view), field job photos, and notification center.

### 2. 🛡️ Super Admin Control Center (`/admin`)
- **Quotation Management** (`/admin/quotations`): Approve prices, set custom deposits, reject with reason, or convert directly to work orders.
- **Multi-Technician Assignment Engine** (`/admin/assignments`): Assign **1 to 5+ field specialists per job** (Lead Specialist, Steam Cleaner, Pest Controller, Bond Cleaner, Quality Inspector).
- **Two-Way Cross-Referenced Reports** (`/admin/reports`):
  - *Technician ➔ Customer*: Full job history, revenue generated, client list, and performance metrics per technician.
  - *Customer ➔ Technician Crew*: Detailed breakdown of which crew members serviced each residential or commercial property.
- **Australian Tax Invoicing & Billing** (`/admin/invoices`): Compliant with the Australian Taxation Office (ATO) with **10% GST breakdown**, ABN (`45 892 103 441`), and payment status tracking.
- **HRM & Field Staff Management** (`/admin/hrm`): Employee profiles, daily attendance tracking, certified skills, and live inspection photo review.
- **Gateway & API Key Manager** (`/admin/payment-settings`, `/admin/emails`, `/admin/whatsapp`): Change production/sandbox keys directly from the browser UI without touching code or restarting servers.

### 3. 📱 Mobile Field Technician Portal (`/employee`)
- **Assigned Job Schedule**: View today's and upcoming jobs with customer address, contact phone, and time slots.
- **Multi-Photo Evidence Upload**: Field technicians upload photos categorized as `BEFORE`, `DURING`, `AFTER`, and `FAULT_EVIDENCE`.
- **Pre-Existing Damage Notes**: Document pre-existing carpet burns, wall stains, or pest infestations with timestamps to eliminate customer disputes.
- **Job Status Transitions**: Update job state in real-time (`SCHEDULED` ➔ `ARRIVED` ➔ `IN_PROGRESS` ➔ `COMPLETED`).

### 4. ⏰ Automated 48-Hour Pre-Booking Reminders (`/api/cron/reminders`)
- Triggers 2 days (48 hours) prior to the scheduled booking date.
- Dispatches multi-channel alerts: **HTML Email**, **WhatsApp / SMS**, and **In-App Dashboard Notification**.

---

## 🔄 End-to-End Business Workflows

```mermaid
flowchart TD
    subgraph Customer Journey
        A["1. Customer Registration & Login (/register)"] --> B["2. Submit Demand Quotation (/dashboard)"]
        B --> C["3. Awaiting Super Admin Review"]
        G["4. Receives Price Approval & $50 Deposit Request"] --> H["5. Pays $50 AUD Deposit (Stripe / PayPal / PayID)"]
        H --> I["6. Booking Confirmed & Calendar Locked"]
    end

    subgraph Admin Operations
        C --> D["Super Admin Reviews Quote (/admin/quotations)"]
        D -->|Approve & Price| G
        I --> J["Super Admin Assigns Crew of 1-5+ Techs (/admin/assignments)"]
        J --> K["48h Auto Reminder Dispatched (Email + WhatsApp)"]
    end

    subgraph Field Execution & Invoicing
        J --> L["Technicians Receive Job in Mobile Portal (/employee)"]
        L --> M["Field Visit: Take Before/After & Fault Photos"]
        M --> N["Mark Completed & Add Inspection Notes"]
        N --> O["Super Admin Generates 10% GST Tax Invoice (/admin/invoices)"]
        O --> P["Customer Views Invoices & Photo Reports in Dashboard"]
    end
```

---

## 📊 Database Entity Relationship (ER) Diagram

```mermaid
erDiagram
    USER ||--o| ROLE : "has role"
    USER ||--o| CUSTOMER : "acts as"
    USER ||--o| EMPLOYEE : "acts as"
    USER ||--o{ NOTIFICATION : "receives"
    USER ||--o{ ACTIVITY_LOG : "triggers"

    ROLE ||--o{ ROLE_PERMISSION : "has permissions"
    PERMISSION ||--o{ ROLE_PERMISSION : "granted to"

    CUSTOMER ||--o{ BOOKING : "places"
    CUSTOMER ||--o{ ORDER : "owns"
    CUSTOMER ||--o{ INVOICE : "billed for"
    CUSTOMER ||--o{ PAYMENT_TRANSACTION : "makes"

    BOOKING ||--o{ BOOKING_CREW_MEMBER : "assigned crew (1 to 5+)"
    BOOKING ||--o| JOB_REPORT : "has field report"
    BOOKING ||--o{ INVOICE : "generates"
    BOOKING ||--o{ PAYMENT_TRANSACTION : "receives deposit/balance"
    BOOKING ||--o{ REMINDER_LOG : "tracks reminders"

    EMPLOYEE ||--o{ BOOKING_CREW_MEMBER : "works on"
    EMPLOYEE ||--o{ JOB_REPORT : "files report"
    EMPLOYEE ||--o{ ATTENDANCE : "logs attendance"

    JOB_REPORT ||--o{ JOB_PHOTO : "contains evidence photos"

    INVOICE ||--o{ INVOICE_ITEM : "contains line items"
    INVOICE ||--o{ PAYMENT_TRANSACTION : "records payments"

    SERVICE_CATEGORY ||--o{ SERVICE : "groups"
    BLOG_CATEGORY ||--o{ BLOG : "categorizes"
    FAQ_CATEGORY ||--o{ FAQ : "categorizes"

    USER {
        string id PK
        string name
        string email UK
        string passwordHash
        string phone
        string status
        string roleId FK
    }

    ROLE {
        string id PK
        string name UK
        string slug UK
        boolean isSystem
    }

    CUSTOMER {
        string id PK
        string userId FK
        string name
        string email UK
        string phone
        string address
        string suburb
        string postcode
    }

    BOOKING {
        string id PK
        string bookingNumber UK
        string customerId FK
        string serviceName
        string serviceAddress
        datetime scheduledDate
        string timeSlot
        float totalPrice
        float approvedPrice
        float depositRequired
        float depositPaid
        string quoteStatus
        string status
        string paymentStatus
        string paymentGateway
        boolean reminderSent2Days
    }

    BOOKING_CREW_MEMBER {
        string id PK
        string bookingId FK
        string employeeId FK
        string role
        boolean isLead
        datetime assignedAt
    }

    EMPLOYEE {
        string id PK
        string employeeCode UK
        string userId FK
        string name
        string email UK
        string phone
        string designation
        string department
        string status
        float hourlyRate
        string licenseNumber
    }

    JOB_REPORT {
        string id PK
        string bookingId FK
        string employeeId FK
        string status
        string workDescription
        string faultNotes
        string treatmentApplied
    }

    JOB_PHOTO {
        string id PK
        string jobReportId FK
        string photoUrl
        string type
        string caption
        string uploadedBy
    }

    INVOICE {
        string id PK
        string invoiceNumber UK
        string bookingId FK
        string customerId FK
        float subtotal
        float gstRate
        float gstAmount
        float totalAmount
        float depositPaid
        float balanceDue
        string status
    }

    PAYMENT_TRANSACTION {
        string id PK
        string transactionNumber UK
        string bookingId FK
        string invoiceId FK
        string customerId FK
        float amount
        string currency
        string paymentGateway
        string paymentType
        string status
    }

    SITE_SETTING {
        string id PK
        string key UK
        string value
        string group
    }
```

---

## 📁 Project Directory & Architecture

```text
├── prisma/
│   ├── schema.prisma           # Prisma database schema (Models, relations, indexes)
│   ├── dev.db                  # Local SQLite database
│   └── migrations/             # SQL migration history
├── public/
│   └── uploads/                # Field inspection photos & media files
├── scripts/
│   ├── seed.mjs                # Base database seeder (Services, CMS, Roles)
│   └── seed-extended.mjs       # Comprehensive demo seeder (Bookings, Invoices, Crew, HRM)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/          # Persona selector login (Customer, Admin, Tech)
│   │   │   └── register/       # Self-serve customer registration
│   │   ├── admin/              # Super Admin Control Center
│   │   │   ├── layout.tsx      # Responsive Sidebar & Top Navigation shell
│   │   │   ├── page.tsx        # Executive KPIs, revenue & live alerts
│   │   │   ├── quotations/     # Review, price approval, and deposit controls
│   │   │   ├── assignments/    # Crew assignment (1 to 5+ technicians per job)
│   │   │   ├── reports/        # Two-way technician ⇄ customer reporting engine
│   │   │   ├── invoices/       # Australian 10% GST Tax Invoicing & generation
│   │   │   ├── hrm/            # Employee profiles, attendance, inspection photos
│   │   │   ├── payment-settings/ # Stripe, PayPal, PayID, POLi gateway keys
│   │   │   ├── emails/         # SMTP, Gmail App Password, Resend config & test
│   │   │   ├── whatsapp/       # Meta WhatsApp Cloud API & Twilio setup & test
│   │   │   └── ...             # Services, CMS, Blogs, FAQs, Users, RBAC
│   │   ├── dashboard/          # Customer Self-Service Portal
│   │   │   └── page.tsx        # Quotations, $50 deposit payments, tax invoices
│   │   ├── employee/           # Field Technician Mobile Web App
│   │   │   └── page.tsx        # Daily jobs, before/after photo upload, fault notes
│   │   └── api/                # Next.js Server Route Handlers
│   │       ├── auth/           # /register, /login, /me, /logout
│   │       ├── customer/       # /quotations, /payments, /invoices, /notifications
│   │       ├── admin/          # /quotations, /assignments, /reports, /hrm, /invoices, /keys
│   │       ├── employee/       # /jobs, /jobs/[id]/upload
│   │       └── cron/           # /reminders (48-hour automated multi-channel alert)
│   ├── components/             # Reusable UI components & layouts
│   ├── lib/
│   │   ├── prisma.ts           # Global Prisma Client singleton
│   │   ├── auth.ts             # JWT token signing & verification
│   │   ├── mailer.ts           # Dynamic SMTP/Gmail/Resend email dispatcher
│   │   ├── whatsapp-sender.ts  # Meta Cloud API & Twilio WhatsApp/SMS client
│   │   └── notifications.ts    # Transactional templates & multi-channel sender
│   └── middleware.ts           # Role-based route guard for /admin, /dashboard, /employee
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js**: v18.17.0 or higher (v20+ recommended)
- **npm** or **pnpm** or **yarn**

### 1. Clone & Install Dependencies
```bash
cd c:\xampp\htdocs\carpet
npm install
```

### 2. Configure Environment Variables
Create or verify your `.env` file in the root directory:
```env
# Database Connection (SQLite by default)
DATABASE_URL="file:./dev.db"

# JWT Secret for Session Cookies
JWT_SECRET="brisbane-carpet-pest-super-secret-jwt-key-2026"

# Application Base URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: Default Email / SMTP fallbacks (can be configured in UI)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-16-char-google-app-password"
SMTP_FROM="Brisbane Carpet & Pest Experts <bookings@brisbanecarpetpest.com.au>"
```

### 3. Initialize & Seed Database
```bash
# Push schema to SQLite database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed sample data, demo accounts, crew bookings, and invoices
node scripts/seed-extended.mjs
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💳 Payment Gateways & Australian Banking Setup

Navigate to **Admin Panel ➔ Payment Gateways & Keys** ([`/admin/payment-settings`](http://localhost:3000/admin/payment-settings)).

| Gateway | Supported Modes | Configuration Fields |
| :--- | :--- | :--- |
| **Stripe** | Live / Test | Publishable Key (`pk_...`), Secret Key (`sk_...`), Webhook Secret (`whsec_...`) |
| **PayPal** | Live / Sandbox | Client ID, Client Secret, Environment Toggle |
| **PayID / NPP** | Real-time AU Transfer | PayID Identifier (Mobile/Email/ABN), Account Name, Reference Code Prefix |
| **POLi Payments** | Direct Internet Banking | POLi Merchant Code, Authentication Code |
| **Direct Bank EFT** | Australian Bank Transfer | Bank Name (e.g. Commonwealth/ANZ/NAB/Westpac), BSB (XXX-XXX), Account Number |

*All keys are encrypted and stored in the database `SiteSetting` table. The customer checkout dynamically activates the payment gateways enabled by the admin.*

---

## 📧 Email & 📱 WhatsApp API Configuration

### 1. Email Gateway Setup ([`/admin/emails`](http://localhost:3000/admin/emails))
- **Gmail / Google Workspace**: Set Host `smtp.gmail.com`, Port `465`, SSL `true`, your full Gmail address, and a 16-character [Google App Password](https://myaccount.google.com/apppasswords).
- **Custom SMTP (cPanel / Webmail / Mailgun / SendGrid)**: Enter Host, Port (`587`), Username, and Password.
- **Resend API**: Enter your `re_...` API key.
- **Interactive Verification**: Use the **"Send Live Test Email"** box on the page to verify your credentials instantly.

### 2. WhatsApp & SMS API Setup ([`/admin/whatsapp`](http://localhost:3000/admin/whatsapp))
- **Meta WhatsApp Cloud API (Recommended)**:
  - Phone Number ID (from Meta Developers Portal)
  - WhatsApp Business Account ID (WABA ID)
  - Permanent System User Access Token (`EAAB...`)
- **Twilio WhatsApp / SMS**:
  - Twilio Account SID (`AC...`)
  - Twilio Auth Token
  - Twilio WhatsApp Sender Number (`whatsapp:+14155238886`)
- **UltraMsg API**:
  - Instance ID & Token
- **Australian Mobile Auto-formatting**: The system automatically formats local numbers (`0412 345 678`) to international E.164 (`+61412345678`).

---

## 🚢 Deployment Guide (VPS, Vercel, Docker, cPanel)

### Option A: Deployment to Node.js VPS (Ubuntu / Debian + Nginx + PM2)

1. **Install Node.js & PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

2. **Upload & Build Application**:
   ```bash
   cd /var/www/carpet
   npm install --production=false
   npx prisma generate
   npx prisma db push
   npm run build
   ```

3. **Start with PM2**:
   ```bash
   pm2 start npm --name "brisbane-carpet" -- start
   pm2 save
   pm2 startup
   ```

4. **Nginx Reverse Proxy Configuration** (`/etc/nginx/sites-available/carpet.conf`):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com.au www.yourdomain.com.au;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   Install SSL with Certbot: `sudo certbot --nginx -d yourdomain.com.au`

5. **Schedule the 48-Hour Reminder Cron Job**:
   Open crontab (`crontab -e`) and add:
   ```cron
   # Runs every hour to check for bookings scheduled in 48 hours
   0 * * * * curl -X GET https://yourdomain.com.au/api/cron/reminders > /dev/null 2>&1
   ```

---

### Option B: 1-Click PostgreSQL Upgrade (for Supabase / Neon / AWS RDS)

To switch from SQLite to PostgreSQL:
1. In `prisma/schema.prisma`, change line 8:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Update `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@aws-pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```
3. Push schema:
   ```bash
   npx prisma db push
   node scripts/seed-extended.mjs
   ```

---

## 🔐 Seed Accounts & Demo Credentials

| Role | Portal URL | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin** | [`/admin`](http://localhost:3000/admin) | `admin@brisbane.com` | `Admin@123456` | Full system control, price approvals, crew dispatch, HRM, payment keys, invoicing |
| **Lead Technician** | [`/employee`](http://localhost:3000/employee) | `tech@brisbane.com` | `Staff@123456` | Mobile field portal, assigned jobs, before/after photo uploads, pre-existing fault notes |
| **Customer 1** | [`/dashboard`](http://localhost:3000/dashboard) | `john.doe@example.com` | `Customer@123` | Quotations, $50 deposit payments, tax invoices, job photo evidence |
| **Customer 2 (Large Crew)** | [`/dashboard`](http://localhost:3000/dashboard) | `sarah.jenkins@example.com` | `Customer@123` | Multi-technician service history, completed invoices |

---

## 📡 API Endpoint Reference

### Authentication & Sessions
- `POST /api/auth/register` — Customer & staff registration.
- `POST /api/auth/login` — Role-aware JWT cookie authentication.
- `GET /api/auth/me` — Current user profile & permission set.
- `POST /api/auth/logout` — Clear session cookies.

### Customer Dashboard
- `GET /api/customer/quotations` — List customer demand quotations.
- `POST /api/customer/quotations` — Submit new demand quote.
- `POST /api/customer/payments` — Process $50 AUD deposit (Stripe/PayPal/PayID/POLi).
- `GET /api/customer/invoices` — List GST tax invoices.
- `GET /api/customer/notifications` — Notification inbox & unread badge.

### Super Admin Operations
- `GET /api/admin/quotations` — List all quotations with filters.
- `PATCH /api/admin/quotations/[id]` — Approve price, set deposit, or reject quote.
- `POST /api/admin/assignments` — Assign 1 to 5+ technicians to a booking.
- `GET /api/admin/reports/technicians` — Two-way technician ⇄ customer cross-referenced reports.
- `GET /api/admin/hrm/employees` — Staff directory, hourly rates, and qualifications.
- `GET /api/admin/invoices` & `POST /api/admin/invoices` — Tax invoice generation with 10% Australian GST.
- `GET /api/admin/payment-settings` & `POST /api/admin/payment-settings` — Gateway keys configuration.
- `GET /api/admin/communication-settings` & `POST /api/admin/communication-settings` — Email & WhatsApp settings + live test dispatch.

### Field Mobile App
- `GET /api/employee/jobs` — Field jobs assigned to logged-in technician.
- `POST /api/employee/jobs/[id]/upload` — Multi-photo upload (Before, During, After, Faults) and inspection summary.

### Automation & Background Tasks
- `GET /api/cron/reminders` — Scans for bookings 48 hours out and triggers multi-channel reminders.

---

## 📜 Legal & Business Information
- **Business Name**: Brisbane Carpet & Pest Experts
- **ABN**: `45 892 103 441`
- **Location**: Brisbane, Queensland, Australia
- **Currency**: Australian Dollar (AUD, `$`)
- **Tax Rate**: 10% Australian Goods and Services Tax (GST)

---

## 📄 License
Private & Proprietary — Brisbane Carpet & Pest Experts. All rights reserved.
