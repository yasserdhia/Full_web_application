import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const startTime = Date.now();

    // Sanitize sensitive data from logs
    const sanitizedUrl = this.sanitizeUrl(url);
    
    this.logger.log(`${method} ${sanitizedUrl} - ${ip} - ${userAgent}`);

    return next.handle().pipe(
      tap({
        next: () => {
          const { statusCode } = response;
          const contentLength = response.get('content-length') || 0;
          const responseTime = Date.now() - startTime;
          
          this.logger.log(
            `${method} ${sanitizedUrl} ${statusCode} - ${contentLength}bytes - ${responseTime}ms`,
          );
        },
        error: (error) => {
          const { statusCode = 500 } = error;
          const responseTime = Date.now() - startTime;
          
          this.logger.error(
            `${method} ${sanitizedUrl} ${statusCode} - Error: ${error.message} - ${responseTime}ms`,
          );
        },
      }),
    );
  }

  private sanitizeUrl(url: string): string {
    // Remove sensitive parameters from URL for logging
    return url
      .replace(/([?&]password=)[^&]*/gi, '$1***')
      .replace(/([?&]token=)[^&]*/gi, '$1***')
      .replace(/([?&]secret=)[^&]*/gi, '$1***')
      .replace(/([?&]key=)[^&]*/gi, '$1***');
  }
}