# 🔒 Secure Full-Stack Web Application

A comprehensive full-stack web application built with modern technologies and enterprise-grade security measures to prevent OWASP Top 10 vulnerabilities.

## 🏗️ Architecture

### Frontend (Next.js + TypeScript + TailwindCSS)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: TailwindCSS for responsive design
- **Authentication**: NextAuth.js with JWT tokens
- **State Management**: React Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Security**: XSS protection, CSRF tokens, CSP headers

### Backend (NestJS + PostgreSQL + Redis)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Cache & Session Store**: Redis
- **Authentication**: JWT with refresh tokens
- **Validation**: Class-validator and Joi
- **Security**: Helmet, rate limiting, input sanitization
- **API Documentation**: Swagger/OpenAPI

### Infrastructure (Docker)
- **Containerization**: Multi-stage Docker builds
- **Orchestration**: Docker Compose
- **Database**: PostgreSQL with persistent volumes
- **Cache**: Redis for session management and caching
- **Networking**: Isolated Docker network

## 🛡️ Security Features

### OWASP Top 10 Protection

1. **Injection Prevention**
   - SQL injection protection with Prisma ORM
   - Input validation and sanitization
   - Parameterized queries

2. **Broken Authentication**
   - Strong password requirements
   - Account lockout after failed attempts
   - JWT tokens with short expiration
   - Secure session management

3. **Sensitive Data Exposure**
   - Bcrypt password hashing (12 rounds)
   - Environment variable encryption
   - Secure cookie settings
   - No sensitive data in logs

4. **XML External Entities (XXE)**
   - JSON-only API endpoints
   - Input validation for all data types

5. **Broken Access Control**
   - Role-based access control (RBAC)
   - JWT token validation
   - Resource-level permissions

6. **Security Misconfiguration**
   - Security headers (Helmet.js)
   - CORS configuration
   - Environment-specific configs

7. **Cross-Site Scripting (XSS)**
   - Input validation and output encoding
   - Content Security Policy (CSP)
   - DOM sanitization

8. **Insecure Deserialization**
   - JSON schema validation
   - Type checking with TypeScript

9. **Using Components with Known Vulnerabilities**
   - Automated dependency scanning
   - Regular security updates
   - Package audit checks

10. **Insufficient Logging & Monitoring**
    - Comprehensive audit logging
    - Security event monitoring
    - Error tracking and alerting

### Additional Security Measures

- **Rate Limiting**: Prevent brute force attacks
- **HTTPS Enforcement**: SSL/TLS encryption
- **Security Headers**: HSTS, X-Frame-Options, etc.
- **Input Sanitization**: Prevent malicious input
- **Session Security**: Secure cookie settings
- **Database Security**: Connection encryption
- **Container Security**: Non-root users, minimal images

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Git

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd Full_web_application

# Copy environment variables
cp .env.example .env

# Edit .env file with your secure values
# IMPORTANT: Change all passwords and secrets in production!
```

### 2. Start with Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 3. Manual Setup (Development)

```bash
# Backend setup
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
Full_web_application/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── posts/          # Example CRUD module
│   │   ├── common/         # Shared utilities
│   │   ├── config/         # Configuration
│   │   └── prisma/         # Database service
│   ├── prisma/             # Database schema & migrations
│   └── Dockerfile
├── frontend/               # Next.js web application
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities & configurations
│   │   ├── hooks/         # Custom React hooks
│   │   └── types/         # TypeScript types
│   └── Dockerfile
├── docker-compose.yml      # Multi-service configuration
└── .env.example           # Environment variables template
```

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/signin` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/signout` - User logout

### Users
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `GET /api/v1/users` - List users (Admin only)

### Posts (Example CRUD)
- `GET /api/v1/posts` - List posts
- `POST /api/v1/posts` - Create post
- `GET /api/v1/posts/:id` - Get post by ID
- `PUT /api/v1/posts/:id` - Update post
- `DELETE /api/v1/posts/:id` - Delete post

### Health & Monitoring
- `GET /api/v1/health` - Health check
- `GET /api/docs` - API documentation (Development only)

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=postgresql://admin:secure_password_123@localhost:5432/secure_app
POSTGRES_DB=secure_app
POSTGRES_USER=admin
POSTGRES_PASSWORD=secure_password_123

# Redis
REDIS_URL=redis://:redis_secure_pass_123@localhost:6379
REDIS_PASSWORD=redis_secure_pass_123

# JWT Secrets (Generate strong secrets for production!)
JWT_SECRET=your_super_secure_jwt_secret_key
JWT_REFRESH_SECRET=your_super_secure_refresh_secret_key

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# Security
BCRYPT_ROUNDS=12
CORS_ORIGIN=http://localhost:3000
```

### Database Migrations

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed
```

## 📊 Monitoring & Logging

The application includes comprehensive logging and monitoring:

- **Audit Logs**: All user actions are logged
- **Security Events**: Failed login attempts, suspicious activity
- **Error Tracking**: Application errors and exceptions
- **Performance Metrics**: Request/response times, database queries

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test
npm run test:e2e
npm run test:cov

# Frontend tests
cd frontend
npm run test
npm run test:watch
```

## 🚀 Production Deployment

### Security Checklist

- [ ] Change all default passwords and secrets
- [ ] Enable HTTPS with valid SSL certificates
- [ ] Configure firewall rules
- [ ] Set up database backups
- [ ] Enable monitoring and alerting
- [ ] Review and test all security headers
- [ ] Perform security audit and penetration testing
- [ ] Set up log aggregation and monitoring

### Docker Production Build

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start production services
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 Documentation

- [API Documentation](http://localhost:3001/api/docs) (Development)
- [Database Schema](./backend/prisma/schema.prisma)
- [Security Guidelines](./docs/SECURITY.md)
- [Development Guide](./docs/DEVELOPMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Security Notes

- This application includes comprehensive security measures, but always conduct your own security audit
- Keep all dependencies updated
- Monitor security advisories for used packages
- Use strong, unique passwords and secrets in production
- Enable HTTPS in production
- Regularly backup your database
- Monitor logs for suspicious activity

## 📞 Support

If you encounter any issues or have questions about security implementations, please:

1. Check the [Documentation](./docs/)
2. Search [Issues](../../issues)
3. Create a new [Issue](../../issues/new)

---

**⚡ Built with security in mind, designed for scale, ready for production.**

