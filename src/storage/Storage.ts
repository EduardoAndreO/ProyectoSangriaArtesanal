import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_LOGGED = '@app/logged';
const KEY_DUMMY = '@app/dummy';

export async function saveIsLoggedIn(val: boolean) {
  await AsyncStorage.setItem(KEY_LOGGED, JSON.stringify(val));
}

export async function loadIsLoggedIn(): Promise<boolean> {
  try {
    const raw = await AsyncStorage.getItem(KEY_LOGGED);
    return raw ? JSON.parse(raw) : false;
  } catch {
    return false;
  }
}

// ejemplo: guardar datos de demo (ideas)
export async function saveDummy(data: any) {
  await AsyncStorage.setItem(KEY_DUMMY, JSON.stringify(data));
}

export async function loadDummy() {
  try {
    const raw = await AsyncStorage.getItem(KEY_DUMMY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}