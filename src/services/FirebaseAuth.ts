// src/services/firebaseAuth.ts
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function registerWithEmail(email: string, password: string, extra: Record<string, any> = {}) {
  const credential = await auth().createUserWithEmailAndPassword(email, password);
  const uid = credential.user.uid;
  await firestore().collection('users').doc(uid).set({
    email,
    createdAt: firestore.FieldValue.serverTimestamp(),
    ...extra
  });
  return credential.user;
}

export async function loginWithEmail(email: string, password: string) {
  const credential = await auth().signInWithEmailAndPassword(email, password);
  await firestore().collection('users').doc(credential.user.uid).update({
    lastLogin: firestore.FieldValue.serverTimestamp()
  });
  return credential.user;
}

export async function logout() {
  return auth().signOut();
}
