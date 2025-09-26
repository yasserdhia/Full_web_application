export interface JwtPayload {
  sub: string; // User ID
  iat: number; // Issued at
  exp?: number; // Expiration
}

export interface JwtRefreshPayload extends JwtPayload {
  tokenType: 'refresh';
}