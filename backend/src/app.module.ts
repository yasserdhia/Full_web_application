import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { HealthModule } from './health/health.module';
import { AuditModule } from './audit/audit.module';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';
import { validateConfig } from './config/config.validation';

@Module({
  imports: [
    // Environment configuration with validation
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig,
    }),

    // Rate limiting with throttlers array
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        throttlers: [{
          ttl: 60000, // 60 seconds in milliseconds
          limit: 10,
        }],
        skipIf: (context) => {
          // Skip rate limiting for health checks
          const request = context.switchToHttp().getRequest();
          return request.url === '/api/v1/health';
        },
      }),
    }),

    // Core modules
    PrismaModule,
    AuthModule,
    UsersModule,
    PostsModule,
    HealthModule,
    AuditModule,
  ],
  providers: [
    // Global guards
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule {}