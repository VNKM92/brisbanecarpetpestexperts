# About-Us Page - Visual Layout Guide

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    FULL WIDTH SLIDER                             │
│                (Carousel with Images)                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  SERVICES SLIDER                                 │
│              (Services Showcase Component)                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  BANNER SECTION                                  │
│  "Your Banner Title" with gray overlay & centered text           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│            HERO SECTION WITH TWO COLUMNS                         │
├─────────────────────────┬─────────────────────────────────────────┤
│                         │                                         │
│  CONTENT COLUMN:        │    IMAGE COLUMN:                        │
│  ┌─────────────────┐    │    ┌─────────────────────────────┐     │
│  │ "About us"      │    │    │                             │     │
│  │ Heading +       │    │    │    [Team Image]             │     │
│  │ Description     │    │    │    + Gradient Border        │     │
│  │                 │    │    │    + Hover Effects          │     │
│  │ 2x2 Features:   │    │    │                             │     │
│  │ ✓ Trust         │    │    └─────────────────────────────┘     │
│  │ ✓ Quality       │    │                                         │
│  │ ✓ Care          │    │                                         │
│  │ ✓ People        │    │                                         │
│  └─────────────────┘    │                                         │
└─────────────────────────┴─────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              STATS SECTION (3 COLUMNS)                           │
├──────────────────┬──────────────────┬──────────────────────────────┤
│                  │                  │                              │
│  ┌────────────┐  │  ┌────────────┐  │  ┌──────────────────────┐   │
│  │ 96%        │  │  │ 5K+        │  │  │ 10K+                 │   │
│  │ Satisf.    │  │  │ Customers  │  │  │ Projects Completed   │   │
│  │ [ICON]     │  │  │ [ICON]     │  │  │ [ICON]               │   │
│  └────────────┘  │  └────────────┘  │  └──────────────────────┘   │
│                  │                  │                              │
└──────────────────┴──────────────────┴──────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│          PROCESS SECTION (3 STEPS)                              │
├──────────────────┬──────────────────┬──────────────────────────────┤
│  ┌────────────┐  │  ┌────────────┐  │  ┌──────────────────────┐   │
│  │ 📅 Step 1  │  │  │ 🧹 Step 2  │  │  │ ⭐ Step 3            │   │
│  │ Booking    │  │  │ Service    │  │  │ Personalized         │   │
│  │ Made Easy  │  │  │ Expert     │  │  │ Service              │   │
│  │            │  │  │            │  │  │                      │   │
│  │ [Description]  │  │ [Description]  │  │ [Description]        │   │
│  └────────────┘  │  └────────────┘  │  └──────────────────────┘   │
│                  │                  │                              │
└──────────────────┴──────────────────┴──────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│             CTA SECTION (CENTERED)                              │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  "Ready to experience clean?"                              │ │
│  │  "Book Your Clean Today"                                   │ │
│  │  [Description text]                                        │ │
│  │                                                             │ │
│  │  [Book Now]  [Learn More]                                  │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              CONTACT FORM SECTION                               │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  "Get in touch"                                            │ │
│  │  "Send us a Message"                                       │ │
│  │                                                             │ │
│  │  [Your Name ........................]                      │ │
│  │  [Your Email ........................]                     │ │
│  │  [Your Message                    ]                        │ │
│  │  [...........................]                             │ │
│  │  [.............]                                           │ │
│  │                                                             │ │
│  │  [Send Message]                                            │ │
│  │                                                             │ │
│  │  *Footer text with booking instructions*                   │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                 FAQ SECTION                                     │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ ❓ Q: What services don't you offer?              [+]       │ │
│  │ A: We don't offer hazardous cleaning...                    │ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │ ❓ Q: How far in advance should I book?          [+]       │ │
│  │ A: You can book as early as you like...                    │ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │ ❓ Q: Are your products eco-friendly?            [+]       │ │
│  │ A: We offer both standard and eco-friendly...              │ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │ ❓ Q: What if I'm not satisfied?                 [+]       │ │
│  │ A: We stand behind our work with 100%...                   │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Responsive Breakpoints

### MOBILE VIEW (< 640px)
```
Full Width Single Column Layout:

┌─────────────────────┐
│   Slider            │
├─────────────────────┤
│ Hero Content        │
│ (Stacked)           │
├─────────────────────┤
│ [Hero Image]        │
├─────────────────────┤
│ Stat 1              │
├─────────────────────┤
│ Stat 2              │
├─────────────────────┤
│ Stat 3              │
├─────────────────────┤
│ Process Step 1      │
├─────────────────────┤
│ Process Step 2      │
├─────────────────────┤
│ Process Step 3      │
├─────────────────────┤
│ CTA Section         │
├─────────────────────┤
│ Contact Form        │
├─────────────────────┤
│ FAQ Items           │
└─────────────────────┘
```

### TABLET VIEW (640px - 1024px)
```
┌─────────────────────────────────────────┐
│          Slider (Full Width)            │
├────────────────┬────────────────────────┤
│ Hero Content   │   Hero Image           │
│ (2x2 features) │   (2 columns)          │
├────────────────┴────────────────────────┤
│  Stat 1    │  Stat 2    │  Stat 3      │
├────────────────┬────────────────────────┤
│ Step 1 & 2     │  Step 3                │
├────────────────┴────────────────────────┤
│           CTA Section                   │
├─────────────────────────────────────────┤
│         Contact Form (Centered)         │
├─────────────────────────────────────────┤
│           FAQ Items                     │
└─────────────────────────────────────────┘
```

### DESKTOP VIEW (> 1024px)
```
┌──────────────────────────────────────────────────────────┐
│            Slider (Full Width)                           │
├──────────────────────────────────────────────────────────┤
│  Hero Content      │    │    Hero Image with Border     │
│  - Title           │    │    + Gradient Glow            │
│  - Description     │    │    + Hover Effects            │
│  - 2x2 Features    │    │                               │
│    ├ Trust         │    │                               │
│    ├ Quality       │    │                               │
│    ├ Care          │    │                               │
│    └ People        │    │                               │
├──────────────────────────────────────────────────────────┤
│    Stat 1    │    Stat 2    │    Stat 3                 │
│   (96%)      │   (5K+)      │   (10K+)                  │
│   [ICON]     │   [ICON]     │   [ICON]                  │
├──────────────────────────────────────────────────────────┤
│  Step 1 (Booking)  │  Step 2 (Expert)  │  Step 3 (Personal)│
├──────────────────────────────────────────────────────────┤
│              CTA Gradient Section                        │
│          [Book Now]  [Learn More]                        │
├──────────────────────────────────────────────────────────┤
│                Contact Form (Centered, Max Width)        │
├──────────────────────────────────────────────────────────┤
│                       FAQ Items                          │
└──────────────────────────────────────────────────────────┘
```

---

## Animation Timeline

### Section Entry Animation
```
Time    Event
0ms     Section enters viewport
200ms   Container starts
        ├─ Item 1 begins fade-in
220ms   
        ├─ Item 2 begins fade-in
240ms   
        ├─ Item 3 begins fade-in
260ms   
        └─ Item 4 begins fade-in
280ms   ...
```

### Stats Card Animation
```
Card 1  ├─ Delay: 0ms   → Visible at 600ms
Card 2  ├─ Delay: 150ms → Visible at 750ms
Card 3  └─ Delay: 300ms → Visible at 900ms
```

---

## Color Palette

### Primary Colors
- **Green**: `#16a34a` (green-600) - Trust, go, action
- **Orange**: `#f97316` (orange-500) - Energy, warmth
- **Blue**: `#2563eb` (blue-600) - Professional, calm

### Gradients
- **Hero to CTA**: Green-600 to Blue-600
- **Icon Background**: Orange-400 to Green-400
- **Card Hover**: Gray-50 to Green-50

### Text Colors
- **Primary**: `#111` (dark gray)
- **Secondary**: `#4b5563` (medium gray)
- **Accent**: `#f97316` (orange)

---

## Feature Component Layout

### Hero Section Layout
```
Left Column (50%)          Right Column (50%)
├─ Label                  ├─ Image Container
├─ Large Heading          │  ├─ Gradient Border
├─ Paragraph              │  ├─ Image
├─ Feature Grid           │  └─ Hover Effects
│  ├─ Row 1              │
│  │  ├─ Trust           │
│  │  └─ Quality         │
│  └─ Row 2              │
│     ├─ Care            │
│     └─ People          │
```

### Stats Card Layout
```
┌──────────────────────────┐
│   Gradient Icon Box      │
│       [ICON]             │
├──────────────────────────┤
│   Large Stat Value       │
│        96%               │
├──────────────────────────┤
│   Stat Label             │
│  Satisfaction Rate       │
├──────────────────────────┤
│   Stat Details           │
│ Based on 356 reviews     │
└──────────────────────────┘
```

### Step Card Layout
```
┌──────────────────────────┐
│ ┌────┐                   │
│ │ 📅 │  Step Title       │
│ └─┬──┘                   │
│   │  Numbered Badge      │
│   │     (1, 2, 3)        │
├──────────────────────────┤
│  Step Description Text   │
│  (Multi-line support)    │
└──────────────────────────┘
```

---

## Spacing & Dimensions

### Section Padding
- **Vertical**: `py-20` (80px)
- **Horizontal**: `px-6` mobile, `md:px-16` tablet/desktop
- **Gap Between Elements**: `gap-12` (48px)

### Typography Sizes
| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| H1 (Heading) | text-4xl | text-5xl | text-6xl |
| H2 (Section) | text-3xl | text-3xl | text-4xl |
| H4 (Card Title) | text-xl | text-xl | text-xl |
| Body | text-base | text-lg | text-lg |

### Grid Columns
- Mobile: `grid-cols-1` (1 column)
- Tablet: `md:grid-cols-2` (2 columns)
- Desktop: `lg:grid-cols-3` (3 columns)

---

## Interaction States

### Button Hover
```
Default              Hover
├─ bg-orange-500     ├─ bg-orange-600
├─ scale: 1          ├─ scale: 1.05
└─ shadow: md        └─ shadow: lg
```

### Input Focus
```
Default              Focus
├─ border-gray-300   ├─ border-green-600
├─ ring: none        ├─ ring-2 green-600/20
└─ scale: 1          └─ scale: 1
```

### Card Hover
```
Default              Hover
├─ shadow: md        ├─ shadow-xl
├─ scale: 1          ├─ scale: 1.05
└─ colors: gray      └─ colors: green
```

---

## Performance Metrics

- **Animations**: GPU-accelerated (transform, opacity)
- **Load Time**: < 2 seconds
- **Lighthouse Score**: 90+ (estimated)
- **Mobile Performance**: Optimized
- **Animation FPS**: 60fps target

---

## Customization Points

### Colors (Edit these Tailwind classes)
- Green: `green-600` → change to `blue-600` or `emerald-600`
- Orange: `orange-500` → change to `amber-500` or `red-500`
- Text: `gray-600` → adjust contrast

### Spacing
- Section padding: `py-20` → `py-16` or `py-24`
- Column gap: `gap-12` → `gap-8` or `gap-16`

### Content
- All text is inline JSX - edit directly
- Images: Replace `/assets/about/` paths
- Links: Add href attributes to buttons

---

## Browser Compatibility

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Mobile (Android 5+)

All animations use standard CSS transforms for maximum compatibility.
