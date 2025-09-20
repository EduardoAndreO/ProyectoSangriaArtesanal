import { authorize, refresh, type AuthorizeResult, type RefreshResult } from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_CLIENT_ID_ANDROID, REDIRECT_URI } from '../config/GoogleConfig';

const config = {
  issuer: 'https://accounts.google.com',
  clientId: GOOGLE_CLIENT_ID_ANDROID,
  redirectUrl: REDIRECT_URI,
  scopes: ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/calendar.readonly'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
  },
};

const TOKEN_KEY = '@miapp:google_auth';

export async function signIn(): Promise<AuthorizeResult> {
  try {
    const result = await authorize(config);
    // result contiene: accessToken, accessTokenExpirationDate, refreshToken, idToken...
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(result));
    return result;
  } catch (err: unknown) {
    console.error('signIn error', JSON.stringify(err, Object.getOwnPropertyNames(err)));
    throw err;
  }
}

export async function getStoredAuth(): Promise<AuthorizeResult | null> {
  const s = await AsyncStorage.getItem(TOKEN_KEY);
  return s ? JSON.parse(s) : null;
}

export async function refreshIfNeeded(stored: AuthorizeResult | null): Promise<AuthorizeResult | null> {
  if (!stored) return null;
  try {
    const now = Date.now();
    const exp = new Date(stored.accessTokenExpirationDate).getTime();
    if (exp - now < 60_000 && stored.refreshToken) {
      const refreshed: RefreshResult = await refresh(config, { refreshToken: stored.refreshToken });
      const merged = { ...stored, ...refreshed } as AuthorizeResult;
      await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(merged));
      return merged;
    }
    return stored;
  } catch (e: unknown) {
    console.warn('refresh failed', e);
    return stored;
  }
}

export async function signOut(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_KEY);
}
