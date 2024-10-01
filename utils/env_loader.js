import { existsSync, readFileSync } from 'fs';
import { config } from 'dotenv';
import path from 'path';

/**
 * Loads environment variables from .env files
 * @returns {void}
 */
const envLoader = () => {
  const env = process.env.NODE_ENV || 'development';
  const envFiles = [
    `.env.${env}.local`,
    `.env.${env}`,
    '.env.local',
    '.env'
  ];

  for (const file of envFiles) {
    const filePath = path.resolve(process.cwd(), file);
    if (existsSync(filePath)) {
      config({ path: filePath, override: true });
    }
  }

  // Load test environment if running tests
  if (process.env.npm_lifecycle_event && (process.env.npm_lifecycle_event.includes('test') || process.env.npm_lifecycle_event.includes('cover'))) {
    const testEnvPath = path.resolve(process.cwd(), '.env.test');
    if (existsSync(testEnvPath)) {
      config({ path: testEnvPath, override: true });
    }
  }

  // Validate required environment variables
  const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_DATABASE']; // Add your required variables here
  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }
};

export default envLoader;
