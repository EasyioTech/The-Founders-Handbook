# Docker Deployment Guide

This guide will help you deploy The Founders Handbook on your VPS using Docker.

## Files Created

- **Dockerfile** - Multi-stage build configuration
- **docker-compose.yml** - Service orchestration
- **.dockerignore** - Build optimization
- **.env.example** - Environment variable template
- **nginx.conf.example** - Optional reverse proxy configuration

## Quick Start

### 1. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

Required environment variables:
- `BETTER_AUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `BETTER_AUTH_URL` - Your application URL
- `NEXT_PUBLIC_APP_URL` - Your application URL
- Database and Stripe keys as needed

### 2. Build and Deploy

```bash
# Build the Docker image
docker-compose build

# Start services in detached mode
docker-compose up -d

# Check if services are running
docker-compose ps

# View logs
docker-compose logs -f app
```

### 3. Access Application

Your application will be available at:
- `http://your-vps-ip:3000`

## Production Setup with SSL

### Using Nginx Reverse Proxy

1. **Copy nginx configuration**:
   ```bash
   cp nginx.conf.example nginx.conf
   nano nginx.conf  # Update domain name
   ```

2. **Obtain SSL certificate** (using Let's Encrypt):
   ```bash
   # Install certbot
   sudo apt-get update
   sudo apt-get install certbot

   # Get certificate
   sudo certbot certonly --standalone -d your-domain.com
   
   # Copy certificates to project
   mkdir -p ssl
   sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ssl/cert.pem
   sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ssl/key.pem
   ```

3. **Enable nginx in docker-compose.yml**:
   - Uncomment the nginx service section
   - Update the nginx configuration with your domain

4. **Restart services**:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

## Maintenance

### Update Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose up -d --build
```

### Backup Database

```bash
# Backup volume data
docker run --rm -v founders-handbook_db-data:/data -v $(pwd):/backup alpine tar czf /backup/db-backup-$(date +%Y%m%d).tar.gz -C /data .
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app

# Last 100 lines
docker-compose logs --tail=100 app
```

### Troubleshooting

```bash
# Check service status
docker-compose ps

# Restart specific service
docker-compose restart app

# Remove and recreate containers
docker-compose down
docker-compose up -d

# Clean rebuild (remove cache)
docker-compose build --no-cache
docker-compose up -d
```

## Security Checklist

- [ ] Change default `BETTER_AUTH_SECRET`
- [ ] Set up firewall (ufw/iptables)
- [ ] Configure SSL/TLS certificates
- [ ] Enable automatic security updates
- [ ] Set up regular database backups
- [ ] Use Docker secrets for sensitive data
- [ ] Limit container resource usage
- [ ] Monitor logs for suspicious activity

## Resource Requirements

**Minimum VPS Specifications:**
- 2 GB RAM
- 1 CPU core
- 20 GB storage
- Ubuntu 20.04+ or similar Linux distribution

**Recommended:**
- 4 GB RAM
- 2 CPU cores
- 40 GB storage

## Monitoring

Consider setting up monitoring tools:
- Docker stats: `docker stats`
- Portainer for container management
- Uptime monitoring (UptimeRobot, Pingdom)
- Application Performance Monitoring (APM)

## Support

For issues or questions:
1. Check application logs: `docker-compose logs -f`
2. Verify environment variables are set correctly
3. Ensure all ports are open in firewall
4. Check Docker and Docker Compose versions
