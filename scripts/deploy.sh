#!/bin/bash
set -e

APP_DIR="/var/www/carpet"
echo "========================================="
echo " Starting Automated Deployment for Carpet App"
echo " Date: $(date)"
echo "========================================="

# 1. Navigate to App Directory
cd "$APP_DIR" || { echo "Directory $APP_DIR not found"; exit 1; }

# 2. Pull Latest Changes from GitHub
echo "[1/6] Pulling latest code from Git..."
git pull origin main

# 3. Install Dependencies
echo "[2/6] Installing dependencies..."
npm install --production=false

# 4. Prisma Client Generation & Schema Sync
echo "[3/6] Syncing Prisma Database Schema..."
npx prisma generate
npx prisma db push

# 5. Build Next.js Production Bundle
echo "[4/6] Building Next.js application..."
npm run build

# 6. Ensure logs directory exists
mkdir -p logs

# 7. Restart or Reload Application with PM2
echo "[5/6] Reloading PM2 process..."
if pm2 describe carpet-app > /dev/null 2>&1; then
    pm2 reload ecosystem.config.js --update-env
else
    pm2 start ecosystem.config.js
fi

# 8. Save PM2 State
pm2 save

echo "========================================="
echo "  Deployment Completed Successfully!"
echo "========================================="
