#!/bin/bash

echo "🚀 Setting up Secure Full-Stack Application..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker and Docker Compose first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please review and update the values before proceeding."
    echo "⚠️  IMPORTANT: Change all passwords and secrets for production use!"
else
    echo "✅ .env file already exists."
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p backend/logs
mkdir -p frontend/.next
mkdir -p database/backups

# Set permissions
echo "🔐 Setting proper permissions..."
chmod 755 setup.sh
chmod 600 .env 2>/dev/null || echo "⚠️  Could not set .env permissions (file may not exist yet)"

# Build and start services
echo "🐳 Building and starting Docker services..."
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are running
echo "🔍 Checking service health..."
docker-compose ps

# Run database migrations
echo "🗄️  Running database migrations..."
docker-compose exec backend npm run prisma:generate
docker-compose exec backend npm run prisma:migrate

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Service URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3001"
echo "   API Docs: http://localhost:3001/api/docs"
echo "   PostgreSQL: localhost:5432"
echo "   Redis: localhost:6379"
echo ""
echo "📖 Next Steps:"
echo "   1. Review and update .env file with secure values"
echo "   2. Visit http://localhost:3000 to see the application"
echo "   3. Check API documentation at http://localhost:3001/api/docs"
echo "   4. Monitor logs with: docker-compose logs -f"
echo ""
echo "🛑 To stop services: docker-compose down"
echo "🔄 To restart services: docker-compose restart"
echo ""
echo "⚠️  Remember to change all default passwords before production use!"