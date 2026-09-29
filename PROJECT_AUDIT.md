# PROJECT AUDIT & ARCHITECTURAL PLAN
**Project:** Brisbane Carpet & Pest Experts (Next.js Application)
**Audit Date:** 2026-09-29
**Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, Prisma ORM, MySQL / SQL Database.

---

## 1. All Pages and Routes

### 1.1 Public Frontend Routes (`src/app/(frontend)`)
| Route | File Path | Type | Purpose |
|---|---|---|---|
| `/` | `src/app/(frontend)/page.tsx` | Client Component | Main Homepage (Hero, About, Estimator, Features, Testimonials, Recent Articles, CTA) |
| `/about-us` | `src/app/(frontend)/about-us/page.jsx` | Client Component | About Us page (Process, Stats, Message Form, FAQs) |
| `/about` | `src/app/(frontend)/about/page.jsx` | Client Component | About variation / alias |
| `/about/team` | `src/app/(frontend)/about/team/page.jsx` | Client Component | Team showcase |
| `/about/team/leadership` | `src/app/(frontend)/about/team/leadership/page.jsx` | Client Component | Leadership details |
| `/about/careers` | `src/app/(frontend)/about/careers/page.jsx` | Client Component | Careers listing |
| `/about-us/team` | `src/app/(frontend)/about-us/team/page.jsx` | Client Component | About Us team |
| `/about-us/team/leadership` | `src/app/(frontend)/about-us/team/leadership/page.jsx` | Client Component | Leadership team |
| `/about-us/careers` | `src/app/(frontend)/about-us/careers/page.jsx` | Client Component | About Us careers |
| `/about-us/cleaning` | `src/app/(frontend)/about-us/cleaning/page.tsx` | Server Component | Cleaning details |
| `/about-us-with-slider` | `src/app/(frontend)/about-us-with-slider/page.tsx` | Client Component | Slider variation |
| `/company` | `src/app/(frontend)/company/page.jsx` | Client Component | Company overview |
| `/company/faqs` | `src/app/(frontend)/company/faqs/page.jsx` | Server Component | Help & FAQs accordion list |
| `/company/gallery` | `src/app/(frontend)/company/gallery/page.jsx` | Client Component | Project image gallery |
| `/company/how-it-works` | `src/app/(frontend)/company/how-it-works/page.jsx` | Client Component | Step-by-step cleaning procedure |
| `/company/locations` | `src/app/(frontend)/company/locations/page.jsx` | Client Component | Brisbane service areas & locations |
| `/company/team` | `src/app/(frontend)/company/team/page.jsx` | Client Component | Company leadership & staff |
| `/contact` | `src/app/(frontend)/contact/page.tsx` | Client Component | Contact information & Book Your Clean form |
| `/blog` | `src/app/(frontend)/blog/page.tsx` | Client Component | Blog listing with category filters & search sidebar |
| `/blog/[slug]` | `src/app/(frontend)/blog/[slug]/page.tsx` | Server/Client | Dynamic blog post detail & reading view |
| `/blog/backup` | `src/app/(frontend)/blog/backup/page.tsx` | Server Component | Backup blog template |
| `/pricing` | `src/app/(frontend)/pricing/page.jsx` | Server Component | Pricing plans & cost calculator |
| `/request-estimate` | `src/app/(frontend)/request-estimate/page.jsx` | Server Component | Detailed cleaning estimate cost calculator |
| `/special-offers` | `src/app/(frontend)/special-offers/page.jsx` | Server Component | Discount packages & promotional rates |
| `/services` | `src/app/(frontend)/services/page.jsx` | Client Component | Services overview & directory |
| `/services/bond-cleaning-brisbane` | `src/app/(frontend)/services/bond-cleaning-brisbane/page.jsx` | Client Component | Bond cleaning with Residential/Commercial/Outdoor tabs |
| `/services/end-of-lease-cleaning-brisbane` | `src/app/(frontend)/services/end-of-lease-cleaning-brisbane/page.jsx` | Client Component | End of lease cleaning details |
| `/services/pre-sale-cleaning-brisbane` | `src/app/(frontend)/services/pre-sale-cleaning-brisbane/page.jsx` | Client Component | Pre-sale cleaning services |
| `/services/pest-control-brisbane` | `src/app/(frontend)/services/pest-control-brisbane/page.jsx` | Client Component | Pest control services in Brisbane |
| `/services/deep-cleaning` | `src/app/(frontend)/services/deep-cleaning/page.jsx` | Client Component | Deep cleaning options |
| `/services/deep-cleaning/bathroom` | `src/app/(frontend)/services/deep-cleaning/bathroom/page.jsx` | Client Component | Bathroom deep clean specialization |
| `/services/deep-cleaning/kitchen` | `src/app/(frontend)/services/deep-cleaning/kitchen/page.jsx` | Client Component | Kitchen deep clean specialization |
| `/services/testing` | `src/app/(frontend)/services/testing/page.tsx` | Client Component | Interactive testing sandbox |
| `/industry/age-care-cleaning` | `src/app/(frontend)/industry/age-care-cleaning/page.jsx` | Client Component | Aged care commercial cleaning |
| `/industry/carpet-cleaning` | `src/app/(frontend)/industry/carpet-cleaning/page.jsx` | Client Component | Carpet steam & dry cleaning |
| `/industry/hotel-cleaning-brisbane` | `src/app/(frontend)/industry/hotel-cleaning-brisbane/page.jsx` | Client Component | Hospitality & hotel cleaning |
| `/industry/industrial-cleaning` | `src/app/(frontend)/industry/industrial-cleaning/page.jsx` | Client Component | Warehouse & industrial cleaning |
| `/industry/lounge-cleaning` | `src/app/(frontend)/industry/lounge-cleaning/page.jsx` | Client Component | Lounge & sofa cleaning |
| `/industry/mattress-cleaning` | `src/app/(frontend)/industry/mattress-cleaning/page.jsx` | Client Component | Mattress sanitation |
| `/industry/office-cleaning` | `src/app/(frontend)/industry/office-cleaning/page.jsx` | Client Component | Commercial office janitorial |
| `/industry/tile-and-grout-cleaning` | `src/app/(frontend)/industry/tile-and-grout-cleaning/page.jsx` | Client Component | Tile & grout deep restoration |
| `/industry/upholstery-cleaning` | `src/app/(frontend)/industry/upholstery-cleaning/page.jsx` | Client Component | Fabric & leather upholstery care |
| `/pages` | `src/app/(frontend)/pages/page.jsx` | Client Component | Additional custom pages |
| `/pages/portfolio` | `src/app/(frontend)/pages/portfolio/page.jsx` | Client Component | Past cleaning project portfolio |
| `/slider-demo` | `src/app/(frontend)/slider-demo/page.tsx` | Client Component | Full-width slider demo |

### 1.2 System & API Routes
| Route | File Path | Method | Purpose |
|---|---|---|---|
| `/sitemap.xml` | `src/app/sitemap.ts` | GET | XML Sitemap generation |
| `/robots.txt` | `public/robots.txt` | GET | Robots crawl rules |
| `/api/contact` | `src/app/api/contact/route.ts` | POST, OPTIONS | Contact form endpoint (Zod validated) |
| `/api/services` | `src/app/api/services/route.ts` | GET | Services list mock endpoint |

---

## 2. Existing Forms and Fields

### 2.1 Contact / Booking Form (`/contact`)
- **Fields:**
  - `firstName` (text, required)
  - `lastName` (text, required)
  - `email` (email string, required, regex validated)
  - `phone` (phone number, required)
  - `service` (dropdown: `Home Cleaning`, `Office Cleaning`, `Deep Cleaning`)
  - `bedrooms` (dropdown: `1 Bedroom`, `2 Bedrooms`, `3 Bedrooms`)
  - `bathrooms` (dropdown: `2 Bathrooms`, `1 Bathroom`, `3 Bathrooms`)
  - `message` (textarea, optional)
- **Current Behavior:** Managed by `react-hook-form`, triggers `alert("Form submitted!")` on submission with no database persistence.

### 2.2 Interactive Cost Estimators & Pricing Calculators (`/request-estimate`, `/pricing`, `/special-offers`, Homepage `EstimatePage`)
- **Fields & Controls:**
  - `square` / `footage` (Range slider: 300 – 5000 sq ft or 10 – 200)
  - `rooms` (Range slider: 1 – 10)
  - `bathrooms` (Range slider: 1 – 10)
  - `addons` (Checkboxes/Toggles: `fridge`, `oven`, `windows`, `carpet`, `balcony`, `laundry`, `linen`, `furniture`)
  - `time` (Dropdown: `During Business Hours`, `Morning`, `Afternoon`, `Evening`)
  - `pets` (Dropdown: `No`, `Yes`)
  - `homeType` (Dropdown: `Apartment / Condo`, `House`, `Townhouse`)
  - `cleaningType` (Dropdown: `Home Cleaning`, `Office Cleaning`, `Move-in / Move-out Cleaning`)
  - `complexity` (Dropdown: `Deep cleaning`, `Standard cleaning`, `Premium cleaning`)
  - `includesSupplies` (Toggle switch)
- **Current Behavior:** Real-time client-side calculation; "Book Online" / "NEXT" / "Get Started" buttons currently lack backend booking submission flows.

### 2.3 Send Message Form (`/about-us`)
- **Fields:** Name (text), Email (email), Message (textarea).
- **Current Behavior:** Static HTML form with no action handler.

---

## 3. Hardcoded Data Inventory

1. **Company & Contact Information:**
   - Phone: `0434 061 188`, `(844) 242-9464`
   - Email: `info@brisbane.com`, `office@qleentheme.com`
   - Address: `192 turton st sunnybank 4109 Brisbane Queensland Australia` / `1234 Myrtle Avenue, Suite 2B, Brooklyn, NY`
   - Business Hours: `Monday to Saturday: 8:00 AM – 6:00 PM`
   - Social links: Twitter (`@brisbanecarpet`), Facebook, Instagram, LinkedIn.
2. **Header & Navigation:**
   - Hardcoded menu arrays with domestic & commercial mega-menus in `Navigation.jsx`.
3. **Services & Pricing:**
   - Pricing plans and features in `src/config/constants.ts` and `pricingplan.tsx`.
   - Tab data in `/services/bond-cleaning-brisbane` (`TAB_DATA` for residential, commercial, outdoor).
   - Calculator base formulas and coefficients in `pricing.ts`.
4. **Blog Posts & Categories:**
   - 3 hardcoded articles in `src/app/(frontend)/blog/data.ts` and 3 articles in `src/app/(frontend)/page.tsx`.
5. **FAQs:**
   - Hardcoded JSON files in `src/app/(frontend)/company/faqs/data/faq.json` and industry folders.
6. **Testimonials:**
   - Static client quotes and ratings in `Testimonials.tsx`.
7. **SEO Metadata:**
   - Fixed strings across individual page files and `src/config/seo.ts`.

---

## 4. Dynamic Data Needed from Database

1. **Site Settings & Navigation:** Site name, logo, phones, emails, physical address, business hours, social URLs, header menu items, footer links, script tags (Google Tag Manager/Analytics).
2. **Pages Content & SEO:** Page title, meta description, canonical URL, OpenGraph tags, Twitter card, robots rules, custom schema markup, banner title, banner subtitle, banner image.
3. **Services & Service Categories:** Name, slug, category, summary, description, starting price, duration, features list, tabs data, icons, hero image, gallery images, display order, active status.
4. **Enquiries & Contact Messages:** First name, last name, email, phone, service, bedrooms, bathrooms, message, status (`PENDING`, `CONTACTED`, `RESOLVED`, `SPAM`), created date, notes.
5. **Bookings & Orders:** Customer ID/details, service ID, scheduled date & time, square footage, rooms, bathrooms, selected addons, calculated price, final amount, status (`NEW`, `CONFIRMED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`), payment status (`UNPAID`, `PAID`, `REFUNDED`).
6. **Customers:** Name, email, phone, address, total bookings, lifetime value, notes.
7. **FAQs & FAQ Categories:** Question, answer, category, display order, isPublished.
8. **Testimonials:** Customer name, role, review content, rating (1-5), avatar image URL, isApproved.
9. **Blogs & Blog Categories:** Title, slug, excerpt, markdown/HTML content, category IDs, tags, author name, featured image URL, read time, publication date, status (`DRAFT`, `PUBLISHED`, `ARCHIVED`).
10. **Media Library:** Filename, original name, URL, file size, mime type, alt text.
11. **Logs & Audit Trails:** Activity logs (who did what and when), Email logs, WhatsApp logs, Notifications.
12. **RBAC:** Users, Roles (`SUPER_ADMIN`, `ADMIN`, `MANAGER`, `STAFF`), Permissions matrix.

---

## 5. SEO Currently Implemented vs Required Improvements

### Current Implementation:
- Global `metadata` in `src/app/layout.tsx` and `src/app/(frontend)/layout.tsx`.
- Basic static metadata helpers in `src/lib/metadata.ts`.
- Basic static sitemap in `src/app/sitemap.ts` (covers only 6 static routes).
- Basic static `public/robots.txt`.

### Required Improvements:
1. **Admin-Editable SEO Metadata:** Every page and service must read its title, description, keywords, canonical URL, robots, OG image, and Twitter cards dynamically from the database.
2. **Automated Structured Data (Schema.org JSON-LD):**
   - `WebSite` schema on homepage
   - `LocalBusiness` / `CleaningService` schema with geographical coordinates, address, opening hours, contact point
   - `Service` schema on individual service pages
   - `BreadcrumbList` schema on all deep pages
   - `Article` / `BlogPosting` schema on dynamic blog post pages
3. **Comprehensive Dynamic Sitemap:** `sitemap.xml` automatically fetching all published services, categories, blog posts, and dynamic pages from SQL.
4. **Dynamic `robots.txt`** respecting admin indexing preferences.

---

## 6. Components to Reuse

- **Layout & Navigation:** `Navigation.jsx` (converted to dynamic navigation state), `Footer.jsx` (dynamic business info & links).
- **Home & Landing Widgets:** `Hero.jsx`, `HomeAbout.jsx`, `Testimonials.tsx`, `EstimatePage.jsx`, `FeatureSection.jsx`, `SuperCard.jsx`, `Carousel.jsx`, `MainCard.jsx`, `Floatingbubbles.tsx`.
- **Estimate & Cost Calculator:** `CalculatorCard.tsx`, `PriceBox.tsx`, `Slider.tsx`, `Select.tsx`, `Toggle.tsx`, `pricingplan.tsx`.
- **Service & Industry Templates:** `ServicesSidebar.tsx`, `WhyUs.tsx`, `FeatureCard.jsx`, `ProcessSteps.jsx`, `FAQSection.tsx`.

---

## 7. Database Models (Prisma ORM)

The backend will include the following 20 models:
1. `User` - Admin & staff authentication, password hashes, status.
2. `Role` - RBAC role definitions (`Super Admin`, `Admin`, `Editor`, `Staff`).
3. `Permission` - Granular actions (`services:read`, `services:write`, `enquiries:manage`, etc.).
4. `Customer` - Customer CRM records.
5. `Enquiry` - Contact form inquiries and quick quote requests.
6. `Booking` - Cleaning service bookings with schedule & property details.
7. `Order` - Financial orders, pricing breakdown, and invoice records.
8. `Service` - Public cleaning service offerings.
9. `ServiceCategory` - Domestic, Commercial, Specialized categories.
10. `Page` - Admin-editable dynamic CMS pages with SEO fields.
11. `Blog` - Articles, posts, news, and tips.
12. `BlogCategory` - Blog post taxonomy.
13. `FAQ` - Frequently asked questions.
14. `FAQCategory` - FAQ categorization.
15. `Testimonial` - Client feedback, ratings, and avatars.
16. `Media` - Uploaded assets and media library.
17. `EmailLog` - Outbound/inbound email history.
18. `WhatsappLog` - WhatsApp interaction logs.
19. `Notification` - In-app notification alerts for admin users.
20. `ActivityLog` - Audit trails of all admin actions.
21. `SiteSetting` - Key-value store for global settings.

---

## 8. Admin Panel Requirements (`/admin`)

- **Design:** Modern, clean, responsive UI with sidebar navigation, topbar with profile & notifications, stat cards, data tables, modals, toast alerts, dark/light compatibility.
- **Admin Pages:**
  1. `/admin` - Dashboard (Metrics overview, recent enquiries, bookings graph, revenue summary)
  2. `/admin/enquiries` - Inquiries list, search, filter by status, view modal, status update, note adding
  3. `/admin/bookings` - Booking management, calendar/list view, status dispatch, customer contact
  4. `/admin/orders` - Order records, amount calculations, payment status updates
  5. `/admin/customers` - Customer CRM directory with booking history
  6. `/admin/services` - Service catalog CRUD, tab data editor, pricing, features
  7. `/admin/pages` - CMS pages editor, banner manager, custom SEO tags
  8. `/admin/blogs` - Blog manager, rich text editor, category tags, author selection
  9. `/admin/faqs` - FAQ questions & answers CRUD, ordering
  10. `/admin/testimonials` - Testimonials review, approve/reject, rating editor
  11. `/admin/media` - Media library upload, preview, copy URL, delete
  12. `/admin/emails` - Email template triggers and dispatch logs
  13. `/admin/whatsapp` - WhatsApp notifications and quick chat logs
  14. `/admin/users` - Admin user management, role assignments
  15. `/admin/roles` - RBAC permission matrices
  16. `/admin/activity-logs` - System audit log records
  17. `/admin/settings` - Global site info, phone, email, addresses, social links, SEO defaults
