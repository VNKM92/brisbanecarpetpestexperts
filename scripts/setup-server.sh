#!/bin/bash
# =============================================================================
# Automated Hostinger VPS Initial Server Setup Script
# For Next.js + Prisma + PM2 + Nginx
# =============================================================================
set -e

if [ "$EUID" -ne 0 ]; then
  echo "Please run as root (or use sudo)"
  exit 1
fi

echo "=========================================================="
echo "  Starting Hostinger VPS Server Setup for Carpet App      "
echo "=========================================================="

# 1. Update and Upgrade System
echo "[1/7] Updating system packages..."
apt-get update -y && apt-get upgrade -y
apt-get install -y curl wget git unzip build-essential ufw ufw-doc

# 2. Install Node.js 20.x (LTS)
echo "[2/7] Installing Node.js 20.x LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 3. Install PM2 Globally
echo "[3/7] Installing PM2 process manager..."
npm install -g pm2
pm2 startup systemd -u root --hp /root

# 4. Install Nginx & Certbot (SSL)
echo "[4/7] Installing Nginx & Certbot..."
apt-get install -y nginx certbot python3-certbot-nginx

# 5. Configure Firewall (UFW)
echo "[5/7] Configuring UFW Firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# 6. Create Application Directory & Set Permissions
echo "[6/7] Creating application directory at /var/www/carpet..."
mkdir -p /var/www/carpet
mkdir -p /var/www/carpet/logs
chown -R $SUDO_USER:$SUDO_USER /var/www/carpet || true

# 7. Configure Nginx Reverse Proxy
echo "[7/7] Setting up Nginx configuration..."
cat << 'EOF' > /etc/nginx/sites-available/carpet
server {
    listen 80;
    listen [::]:80;
    server_name _;

    client_max_body_size 50M;

    # Gzip Compression
    gzip on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    location /_next/static/ {
        alias /var/www/carpet/.next/static/;
        expires 365d;
        access_log off;
    }

    location /public/ {
        alias /var/www/carpet/public/;
        expires 30d;
        access_log off;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF

# Enable Nginx Site
ln -sf /etc/nginx/sites-available/carpet /etc/nginx/sites-enabled/carpet
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

echo "=========================================================="
echo " Server Setup Completed Successfully!"
echo " Next Steps:"
echo " 1. Clone repository into /var/www/carpet:"
echo "    git clone <your-repo-url> /var/www/carpet"
echo " 2. Add your .env file inside /var/www/carpet/.env"
echo " 3. Run: bash /var/www/carpet/scripts/deploy.sh"
echo " 4. To bind domain & SSL, run:"
echo "    certbot --nginx -d yourdomain.com -d www.yourdomain.com"
echo "=========================================================="
