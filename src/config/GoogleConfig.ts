// src/config/GoogleConfig.ts
export const APPLICATION_ID = 'com.sangriaartesanal'; // applicationId / package name exacto (ej. com.miapp)
export const GOOGLE_CLIENT_ID_ANDROID = '18638044325-lrqea95icgrpc5gvtjg729722oelln1a.apps.googleusercontent.com'; // Client ID (Android OAuth client)
export const REDIRECT_URI = `${APPLICATION_ID}:/oauth2redirect/google`; // debe coincidir con AndroidManifest intent-filter