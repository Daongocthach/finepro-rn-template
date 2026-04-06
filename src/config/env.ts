import Constants from 'expo-constants';

interface EnvConfig {
  apiBaseUrl: string;
  appEnv: 'development' | 'staging' | 'production';
  isDev: boolean;
  isProd: boolean;
}

function getEnvVar(key: string, fallback = ''): string {
  return process.env[key] ?? (Constants.expoConfig?.extra?.[key] as string | undefined) ?? fallback;
}

export const env: EnvConfig = {
  apiBaseUrl: getEnvVar('EXPO_PUBLIC_API_BASE_URL', 'https://api.example.com'),
  appEnv: getEnvVar('EXPO_PUBLIC_APP_ENV', 'development') as EnvConfig['appEnv'],
  get isDev() {
    return this.appEnv === 'development';
  },
  get isProd() {
    return this.appEnv === 'production';
  },
};

export function validateEnv(): string[] {
  return [];
}
