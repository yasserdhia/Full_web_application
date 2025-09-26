-- Create User table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    role TEXT DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN', 'MODERATOR')),
    "isEmailVerified" BOOLEAN DEFAULT FALSE,
    "emailVerificationToken" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetExpires" TIMESTAMP,
    "twoFactorSecret" TEXT,
    "twoFactorEnabled" BOOLEAN DEFAULT FALSE,
    "isActive" BOOLEAN DEFAULT TRUE,
    "lastLogin" TIMESTAMP,
    "loginAttempts" INTEGER DEFAULT 0,
    "lockUntil" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create Session table
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "refreshToken" TEXT UNIQUE NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "isValid" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    "expiresAt" TIMESTAMP NOT NULL,
    FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
);

-- Create Post table
CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ("authorId") REFERENCES users(id) ON DELETE CASCADE
);

-- Create Comment table  
CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    content TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ("postId") REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY ("authorId") REFERENCES users(id) ON DELETE CASCADE
);

-- Create AuditLog table
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT,
    action TEXT NOT NULL,
    resource TEXT NOT NULL,
    "resourceId" TEXT,
    "oldValues" JSONB,
    "newValues" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    timestamp TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE SET NULL
);

-- Create RateLimit table
CREATE TABLE IF NOT EXISTS rate_limits (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    identifier TEXT NOT NULL,
    action TEXT NOT NULL,
    count INTEGER DEFAULT 1,
    "resetTime" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    UNIQUE(identifier, action)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_sessions_userId ON sessions("userId");
CREATE INDEX IF NOT EXISTS idx_sessions_refreshToken ON sessions("refreshToken");
CREATE INDEX IF NOT EXISTS idx_posts_authorId ON posts("authorId");
CREATE INDEX IF NOT EXISTS idx_comments_postId ON comments("postId");
CREATE INDEX IF NOT EXISTS idx_comments_authorId ON comments("authorId");
CREATE INDEX IF NOT EXISTS idx_audit_logs_userId ON audit_logs("userId");
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_action ON rate_limits(identifier, action);