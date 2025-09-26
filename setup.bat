@echo off
echo 🚀 Setting up Secure Full-Stack Application...

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Desktop with Compose.
    pause
    exit /b 1
)

REM Copy environment file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ✅ .env file created. Please review and update the values before proceeding.
    echo ⚠️  IMPORTANT: Change all passwords and secrets for production use!
) else (
    echo ✅ .env file already exists.
)

REM Create necessary directories
echo 📁 Creating necessary directories...
if not exist backend\logs mkdir backend\logs
if not exist frontend\.next mkdir frontend\.next
if not exist database\backups mkdir database\backups

REM Build and start services
echo 🐳 Building and starting Docker services...
docker-compose build --no-cache
docker-compose up -d

REM Wait for services to be ready
echo ⏳ Waiting for services to be ready...
timeout /t 30 >nul

REM Check if services are running
echo 🔍 Checking service health...
docker-compose ps

REM Run database migrations
echo 🗄️  Running database migrations...
docker-compose exec backend npm run prisma:generate
docker-compose exec backend npm run prisma:migrate

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Service URLs:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:3001
echo    API Docs: http://localhost:3001/api/docs
echo    PostgreSQL: localhost:5432
echo    Redis: localhost:6379
echo.
echo 📖 Next Steps:
echo    1. Review and update .env file with secure values
echo    2. Visit http://localhost:3000 to see the application
echo    3. Check API documentation at http://localhost:3001/api/docs
echo    4. Monitor logs with: docker-compose logs -f
echo.
echo 🛑 To stop services: docker-compose down
echo 🔄 To restart services: docker-compose restart
echo.
echo ⚠️  Remember to change all default passwords before production use!
pause