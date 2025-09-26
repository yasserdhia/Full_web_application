import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async register(createUserDto: any): Promise<any> {
    const { email, password, username, firstName, lastName } = createUserDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Email or username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    };
  }

  async login(user: any): Promise<any> {
    const tokens = await this.generateTokens(user.id);
    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    };
  }

  async refreshTokens(refreshToken: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      // Find valid session
      const session = await this.prisma.session.findFirst({
        where: {
          refreshToken,
          userId: payload.sub,
          isValid: true,
          expiresAt: { gt: new Date() },
        },
      });

      if (!session) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      const tokens = await this.generateTokens(session.userId);
      
      // Invalidate old session
      await this.prisma.session.update({
        where: { id: session.id },
        data: { isValid: false },
      });

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(refreshToken: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: { refreshToken, isValid: true },
      data: { isValid: false },
    });
  }

  async validateRefreshToken(userId: string, refreshToken: string): Promise<any> {
    const session = await this.prisma.session.findFirst({
      where: {
        userId,
        refreshToken,
        isValid: true,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    return session?.user || null;
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Invalidate all sessions
    await this.prisma.session.updateMany({
      where: { userId, isValid: true },
      data: { isValid: false },
    });
  }

  private async generateTokens(userId: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = { sub: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    // Store refresh token in database
    await this.prisma.session.create({
      data: {
        userId,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return { accessToken, refreshToken };
  }
}