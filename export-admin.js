const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname);
const destDir = path.resolve(__dirname, '..', 'admin-panel');

console.log(`Starting export from ${srcDir} to ${destDir}...`);

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue;
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Ensure target dirs
const dirs = [
  destDir,
  path.join(destDir, 'src', 'app', 'admin'),
  path.join(destDir, 'src', 'app', 'api'),
  path.join(destDir, 'src', 'app', 'login'),
  path.join(destDir, 'src', 'components'),
  path.join(destDir, 'src', 'config'),
  path.join(destDir, 'src', 'hooks'),
  path.join(destDir, 'src', 'lib'),
  path.join(destDir, 'src', 'types'),
  path.join(destDir, 'prisma'),
  path.join(destDir, 'public', 'images'),
  path.join(destDir, 'public', 'icons'),
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// 2. Copy source trees
console.log('Copying admin app...');
copyDirRecursive(path.join(srcDir, 'src', 'app', 'admin'), path.join(destDir, 'src', 'app', 'admin'));
console.log('Copying api routes...');
copyDirRecursive(path.join(srcDir, 'src', 'app', 'api'), path.join(destDir, 'src', 'app', 'api'));
console.log('Copying login page...');
copyDirRecursive(path.join(srcDir, 'src', 'app', 'login'), path.join(destDir, 'src', 'app', 'login'));
console.log('Copying lib...');
copyDirRecursive(path.join(srcDir, 'src', 'lib'), path.join(destDir, 'src', 'lib'));
console.log('Copying hooks...');
copyDirRecursive(path.join(srcDir, 'src', 'hooks'), path.join(destDir, 'src', 'hooks'));
console.log('Copying types...');
copyDirRecursive(path.join(srcDir, 'src', 'types'), path.join(destDir, 'src', 'types'));
console.log('Copying config...');
copyDirRecursive(path.join(srcDir, 'src', 'config'), path.join(destDir, 'src', 'config'));
console.log('Copying components...');
copyDirRecursive(path.join(srcDir, 'src', 'components'), path.join(destDir, 'src', 'components'));
console.log('Copying prisma...');
copyDirRecursive(path.join(srcDir, 'prisma'), path.join(destDir, 'prisma'));

if (fs.existsSync(path.join(srcDir, 'src', 'middleware.ts'))) {
  fs.copyFileSync(path.join(srcDir, 'src', 'middleware.ts'), path.join(destDir, 'src', 'middleware.ts'));
}

// Copy public assets if any
if (fs.existsSync(path.join(srcDir, 'public', 'images'))) {
  copyDirRecursive(path.join(srcDir, 'public', 'images'), path.join(destDir, 'public', 'images'));
}

// 3. Write Root Layout & Index for standalone Admin
fs.writeFileSync(path.join(destDir, 'src', 'app', 'layout.tsx'), `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel | Central Operations & Headless API",
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
`);

fs.writeFileSync(path.join(destDir, 'src', 'app', 'page.tsx'), `import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/admin");
}
`);

fs.writeFileSync(path.join(destDir, 'src', 'app', 'globals.css'), `@import "tailwindcss";

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
`);

// 4. package.json
const pkg = {
  name: "standalone-admin-panel",
  version: "1.0.0",
  private: true,
  scripts: {
    dev: "next dev -p 3001",
    build: "prisma generate && next build",
    start: "next start -p 3001",
    lint: "next lint",
    "db:push": "prisma db push",
    "db:studio": "prisma studio"
  },
  dependencies: {
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
  devDependencies: {
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
};
fs.writeFileSync(path.join(destDir, 'package.json'), JSON.stringify(pkg, null, 2));

// 5. tsconfig.json
const tsconfig = {
  compilerOptions: {
    target: "ES2017",
    lib: ["dom", "dom.iterable", "esnext"],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    noEmit: true,
    esModuleInterop: true,
    module: "esnext",
    moduleResolution: "bundler",
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: "preserve",
    incremental: true,
    plugins: [{ name: "next" }],
    paths: {
      "@/*": ["./src/*"]
    }
  },
  include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  exclude: ["node_modules"]
};
fs.writeFileSync(path.join(destDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));

// 6. next.config.ts
fs.writeFileSync(path.join(destDir, 'next.config.ts'), `import type { NextConfig } from "next";

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
`);

// 7. postcss.config.mjs
fs.writeFileSync(path.join(destDir, 'postcss.config.mjs'), `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
`);

// 8. .env & .env.example
const envFile = `DATABASE_URL="file:./dev.db"
JWT_SECRET="universal-admin-portal-super-secret-key-change-in-production"
NEXT_PUBLIC_SITE_URL="http://localhost:3001"
PORT=3001
CORS_ALLOWED_ORIGINS="*"
`;
fs.writeFileSync(path.join(destDir, '.env'), envFile);
fs.writeFileSync(path.join(destDir, '.env.example'), envFile);

// Copy API documentation
if (fs.existsSync(path.join(srcDir, 'API_DOCUMENTATION.md'))) {
  fs.copyFileSync(path.join(srcDir, 'API_DOCUMENTATION.md'), path.join(destDir, 'README.md'));
}

console.log('✅ Standalone Admin Panel successfully exported to:', destDir);
