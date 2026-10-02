# ==============================================================================
# STANDALONE ADMIN PANEL EXPORTER SCRIPT
# This script extracts the entire Admin Panel, API routes, Database & Auth
# into a separate standalone Next.js project to use for any other website.
# ==============================================================================

param (
    [string]$TargetDir = "..\admin-panel"
)

$SourceDir = $PSScriptRoot
$Destination = [System.IO.Path]::GetFullPath((Join-Path $SourceDir $TargetDir))

Write-Host "`n🚀 Starting Standalone Admin Panel Extraction..." -ForegroundColor Cyan
Write-Host "📂 Source: $SourceDir" -ForegroundColor Gray
Write-Host "🎯 Destination: $Destination" -ForegroundColor Yellow

# 1. Create Target Directory Structure
$dirsToCreate = @(
    "$Destination",
    "$Destination\src\app\admin",
    "$Destination\src\app\api\admin",
    "$Destination\src\app\api\auth",
    "$Destination\src\app\api\blogs",
    "$Destination\src\app\api\bookings",
    "$Destination\src\app\api\contact",
    "$Destination\src\app\api\faqs",
    "$Destination\src\app\api\services",
    "$Destination\src\app\api\settings",
    "$Destination\src\app\api\testimonials",
    "$Destination\src\app\login",
    "$Destination\src\components",
    "$Destination\src\config",
    "$Destination\src\hooks",
    "$Destination\src\lib",
    "$Destination\src\types",
    "$Destination\prisma",
    "$Destination\public\images",
    "$Destination\public\icons"
)

foreach ($dir in $dirsToCreate) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

# 2. Copy Core Directories
Write-Host "`n📦 Copying Admin Panel source files..." -ForegroundColor Green

Copy-Item -Path "$SourceDir\src\app\admin\*" -Destination "$Destination\src\app\admin" -Recurse -Force
Copy-Item -Path "$SourceDir\src\app\api\*" -Destination "$Destination\src\app\api" -Recurse -Force
Copy-Item -Path "$SourceDir\src\app\login\*" -Destination "$Destination\src\app\login" -Recurse -Force
Copy-Item -Path "$SourceDir\src\lib\*" -Destination "$Destination\src\lib" -Recurse -Force
Copy-Item -Path "$SourceDir\src\hooks\*" -Destination "$Destination\src\hooks" -Recurse -Force
Copy-Item -Path "$SourceDir\src\types\*" -Destination "$Destination\src\types" -Recurse -Force
Copy-Item -Path "$SourceDir\src\config\*" -Destination "$Destination\src\config" -Recurse -Force
Copy-Item -Path "$SourceDir\prisma\*" -Destination "$Destination\prisma" -Recurse -Force
Copy-Item -Path "$SourceDir\src\middleware.ts" -Destination "$Destination\src\middleware.ts" -Force

# 3. Create Root App Layout & Index for Admin App
$AdminAppLayout = @"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel | Central Management Portal",
  description: "Enterprise multi-purpose admin control panel & headless API engine.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-slate-100 bg-slate-950 selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
"@
Set-Content -Path "$Destination\src\app\layout.tsx" -Value $AdminAppLayout -Encoding UTF8

$AdminAppPage = @"
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/admin");
}
"@
Set-Content -Path "$Destination\src\app\page.tsx" -Value $AdminAppPage -Encoding UTF8

$AdminGlobalsCss = @"
@import "tailwindcss";

@media (prefers-color-scheme: dark) {
  :root {
    --background: #090d16;
    --foreground: #f8fafc;
  }
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #020617;
  color: #f8fafc;
  font-family: Arial, Helvetica, sans-serif;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #0f172a;
}
::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #059669;
}
"@
Set-Content -Path "$Destination\src\app\globals.css" -Value $AdminGlobalsCss -Encoding UTF8

# 4. Create package.json
$AdminPackageJson = @"
{
  "name": "universal-admin-panel",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "prisma generate && next build",
    "start": "next start -p 3001",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:seed": "node prisma/seed.js",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "@hookform/resolvers": "^3.4.0",
    "@prisma/client": "^6.19.3",
    "axios": "^1.7.7",
    "bcryptjs": "^3.0.3",
    "clsx": "^2.1.1",
    "framer-motion": "^12.23.25",
    "jose": "^6.2.12",
    "jsonwebtoken": "^9.0.3",
    "lucide-react": "^0.546.0",
    "next": "^15.5.7",
    "nodemailer": "^10.0.13",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-hook-form": "^7.67.0",
    "react-icons": "^5.5.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@tailwindcss/typography": "^0.5.13",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.22",
    "postcss": "^8.5.6",
    "prisma": "^6.19.3",
    "tailwindcss": "^4.1.17",
    "typescript": "^5"
  }
}
"@
Set-Content -Path "$Destination\package.json" -Value $AdminPackageJson -Encoding UTF8

# 5. Create tsconfig.json
$TsConfig = @"
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
"@
Set-Content -Path "$Destination\tsconfig.json" -Value $TsConfig -Encoding UTF8

# 6. Create next.config.ts with CORS for Headless Usage
$NextConfig = @"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', '127.0.0.1'],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
"@
Set-Content -Path "$Destination\next.config.ts" -Value $NextConfig -Encoding UTF8

# 7. Create postcss.config.mjs
$PostcssConfig = @"
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
"@
Set-Content -Path "$Destination\postcss.config.mjs" -Value $PostcssConfig -Encoding UTF8

# 8. Create .env and .env.example
$EnvContent = @"
# Database Configuration (SQLite default, can be MySQL or PostgreSQL)
DATABASE_URL="file:./dev.db"

# JWT Authentication Secret
JWT_SECRET="universal-admin-portal-super-secret-key-change-in-production"

# Server & App URL
NEXT_PUBLIC_SITE_URL="http://localhost:3001"
PORT=3001

# CORS Allowed Origins (Comma separated or * for all)
CORS_ALLOWED_ORIGINS="*"

# Optional SMTP Email Configuration
SMTP_HOST="smtp.mailtrap.io"
SMTP_PORT=2525
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM="noreply@example.com"
"@
Set-Content -Path "$Destination\.env" -Value $EnvContent -Encoding UTF8
Set-Content -Path "$Destination\.env.example" -Value $EnvContent -Encoding UTF8

Write-Host "`n✅ Standalone Admin Panel successfully created at: $Destination" -ForegroundColor Green
Write-Host "---------------------------------------------------------" -ForegroundColor Gray
Write-Host "To run your standalone Admin Panel:" -ForegroundColor White
Write-Host "  1. cd `"$Destination`"" -ForegroundColor Cyan
Write-Host "  2. npm install" -ForegroundColor Cyan
Write-Host "  3. npx prisma db push" -ForegroundColor Cyan
Write-Host "  4. npm run dev" -ForegroundColor Cyan
Write-Host "  5. Open http://localhost:3001 in your browser" -ForegroundColor Yellow
Write-Host "---------------------------------------------------------`n" -ForegroundColor Gray
