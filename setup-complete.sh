#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║  🔒 SECURE FULL-STACK APPLICATION SETUP COMPLETE!        ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${GREEN}✅ Project structure created successfully!${NC}"
echo ""

echo -e "${YELLOW}📋 WHAT HAS BEEN CREATED:${NC}"
echo ""
echo "🏗️  Architecture:"
echo "   ├── Frontend: Next.js 14 + TypeScript + TailwindCSS"
echo "   ├── Backend: NestJS + TypeScript + Prisma ORM"
echo "   ├── Database: PostgreSQL with Redis cache"
echo "   └── Infrastructure: Docker + Docker Compose"
echo ""

echo "🛡️  Security Features:"
echo "   ├── OWASP Top 10 protection implemented"
echo "   ├── JWT authentication with refresh tokens"
echo "   ├── Password hashing with bcrypt (12 rounds)"
echo "   ├── Rate limiting and DDoS protection"
echo "   ├── Input validation and sanitization"
echo "   ├── Security headers (Helmet.js)"
echo "   ├── CORS configuration"
echo "   ├── Audit logging system"
echo "   ├── Account lockout mechanisms"
echo "   └── Container security (non-root users)"
echo ""

echo "📁 Directory Structure:"
echo "   ├── backend/          # NestJS API server"
echo "   ├── frontend/         # Next.js web application"
echo "   ├── docker-compose.yml"
echo "   ├── .env.example"
echo "   └── setup scripts"
echo ""

echo -e "${YELLOW}🚀 QUICK START GUIDE:${NC}"
echo ""
echo "1️⃣  Copy environment variables:"
echo "   cp .env.example .env"
echo ""
echo "2️⃣  Review and update .env file:"
echo -e "   ${RED}⚠️  IMPORTANT: Change all passwords and secrets!${NC}"
echo ""
echo "3️⃣  Start the application:"
echo "   On Windows: setup.bat"
echo "   On Linux/Mac: ./setup.sh"
echo "   Or manually: docker-compose up -d"
echo ""
echo "4️⃣  Access the application:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:3001"
echo "   API Docs:  http://localhost:3001/api/docs"
echo ""

echo -e "${YELLOW}🔧 USEFUL COMMANDS:${NC}"
echo ""
echo "Start services:       docker-compose up -d"
echo "View logs:           docker-compose logs -f"
echo "Stop services:       docker-compose down"
echo "Rebuild:             docker-compose build --no-cache"
echo "Database migration:  docker-compose exec backend npm run prisma:migrate"
echo ""

echo -e "${RED}⚠️  SECURITY REMINDERS:${NC}"
echo ""
echo "🔐 Before production deployment:"
echo "   ├── Change ALL default passwords and secrets"
echo "   ├── Enable HTTPS with valid SSL certificates"
echo "   ├── Configure firewall rules"
echo "   ├── Set up database backups"
echo "   ├── Enable monitoring and alerting"
echo "   ├── Review security headers configuration"
echo "   ├── Perform security audit and penetration testing"
echo "   └── Set up log aggregation and monitoring"
echo ""

echo -e "${GREEN}🎯 NEXT STEPS:${NC}"
echo ""
echo "1. Customize the application for your use case"
echo "2. Add your business logic and features"
echo "3. Implement additional security measures as needed"
echo "4. Set up CI/CD pipeline"
echo "5. Configure production environment"
echo ""

echo -e "${BLUE}📚 DOCUMENTATION:${NC}"
echo ""
echo "README.md           - Complete project documentation"
echo "API Documentation   - Available at /api/docs (development)"
echo "Database Schema     - backend/prisma/schema.prisma"
echo ""

echo -e "${GREEN}🎉 Happy coding! Your secure full-stack application is ready to go!${NC}"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}💡 TIP: Don't forget to create your .env file from .env.example${NC}"
fi