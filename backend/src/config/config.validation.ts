// Simple configuration validation without external dependencies
export const validateConfig = (config: Record<string, unknown>) => {
  const requiredVars = [
    'DATABASE_URL',
    'REDIS_URL', 
    'JWT_SECRET',
    'JWT_REFRESH_SECRET'
  ];

  const missing = requiredVars.filter(key => !config[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate JWT secret length
  if (typeof config.JWT_SECRET === 'string' && config.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }

  if (typeof config.JWT_REFRESH_SECRET === 'string' && config.JWT_REFRESH_SECRET.length < 32) {
    throw new Error('JWT_REFRESH_SECRET must be at least 32 characters long');
  }

  return config;
};