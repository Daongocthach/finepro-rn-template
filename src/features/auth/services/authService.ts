interface LoginParams {
  username: string;
  password: string;
}

interface RegisterParams {
  email: string;
  password: string;
  username?: string;
}

export interface MockAuthUser {
  id: string;
  email: string;
  username: string;
  role: 'admin';
}

export interface MockAuthSession {
  access_token: string;
  refresh_token: string;
}

export interface LoginResult {
  user: MockAuthUser;
  session: MockAuthSession;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login(params: LoginParams): Promise<LoginResult> {
  await wait(350);

  if (params.username !== 'admin' || params.password !== '1234') {
    throw new Error('auth.login.invalidCredentials');
  }

  return {
    user: {
      id: 'mock-admin',
      email: 'admin@finepro.local',
      username: 'admin',
      role: 'admin',
    },
    session: {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
    },
  };
}

export async function register(_params: RegisterParams) {
  throw new Error('auth.register.disabled');
}

export async function logout() {
  await wait(150);
}

export async function getSession() {
  return { session: null };
}
