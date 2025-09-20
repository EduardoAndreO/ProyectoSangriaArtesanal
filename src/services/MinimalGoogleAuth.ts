import { authorize, type AuthorizeResult } from 'react-native-app-auth';

const minimalConfig = {
  issuer: 'https://accounts.google.com',
  clientId: '18638044325-lrqea95icgrpc5gvtjg729722oelln1a.apps.googleusercontent.com',
  redirectUrl: 'com.sangriaartesanal:/oauth2redirect/google',
  scopes: ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/calendar.events'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
  },
};

export async function minimalSignIn(): Promise<AuthorizeResult> {
  try {
    const result = await authorize(minimalConfig);
    return result;
  } catch (err: unknown) {
    console.error('minimalSignIn error', JSON.stringify(err, Object.getOwnPropertyNames(err)));
    throw err;
  }
}
