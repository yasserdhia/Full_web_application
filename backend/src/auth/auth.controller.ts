import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Response,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Response as ExpressResponse, Request as ExpressRequest } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Public } from './decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateUserDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(
    @Body() createUserDto: CreateUserDto,
    @Response() res: ExpressResponse,
  ) {
    try {
      const result = await this.authService.register(createUserDto);
      
      // Set secure HTTP-only cookie for refresh token
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({
        message: 'User registered successfully',
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error.message : 'Registration failed');
    }
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: LoginDto })
  async login(
    @Request() req: ExpressRequest & { user: any },
    @Response() res: ExpressResponse,
  ) {
    const result = await this.authService.login(req.user);
    
    // Set secure HTTP-only cookie for refresh token
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      message: 'Login successful',
      user: result.user,
      accessToken: result.accessToken,
    });
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refreshTokens(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ) {
    const refreshToken = refreshTokenDto.refreshToken || req.cookies?.refreshToken;
    
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    try {
      const result = await this.authService.refreshTokens(refreshToken);
      
      // Set new refresh token cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({
        accessToken: result.accessToken,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout(
    @Request() req: ExpressRequest & { user: any },
    @Response() res: ExpressResponse,
  ) {
    const refreshToken = req.cookies?.refreshToken;
    
    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    // Clear refresh token cookie
    res.clearCookie('refreshToken');
    
    return res.json({ message: 'Logout successful' });
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  async getProfile(@Request() req: ExpressRequest & { user: any }) {
    return {
      user: req.user,
    };
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePassword(
    @Request() req: ExpressRequest & { user: any },
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    await this.authService.changePassword(
      req.user.sub,
      body.currentPassword,
      body.newPassword,
    );
    
    return { message: 'Password changed successfully' };
  }
}