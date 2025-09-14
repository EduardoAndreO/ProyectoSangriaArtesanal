import React, { useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ImageBackground, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { isEmailValid, isPhoneValid } from '../utils/Validators';
import { useAuth } from '../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/Styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{ email?: string; phone?: string; password?: string }>({});

  function validate() {
    const e: typeof errors = {};
    if (!email) e.email = t('login.errors.email_required');
    else if (!isEmailValid(email)) e.email = t('login.errors.email_invalid');
    if (!phone) e.phone = t('login.errors.phone_required');
    else if (!isPhoneValid(phone)) e.phone = t('login.errors.phone_invalid');
    if (!password) e.password = t('login.errors.password_required');
    else if (password.length < 6) e.password = t('login.errors.password_min');
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit() {
    if (!validate()) return;
    await login();
  }

  const bgImage = require('../assets/logo_sangria.png');
  return (
    <ImageBackground source={bgImage} style={styles.bg} imageStyle={{ opacity: 0.06, resizeMode: 'contain' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <View style={styles.top}>
          <Image source={require('../assets/Logo.png')} style={styles.logoImg} resizeMode="contain" />
          <Text style={styles.logoText}>Sangría Pasión</Text>
        </View>
        <View style={styles.form}>
          <CustomInput label={t('login.email')} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" error={errors.email} />
          <CustomInput label={t('login.phone')} value={phone} onChangeText={setPhone} keyboardType="phone-pad" error={errors.phone} />
          <CustomInput label={t('login.password')} value={password} onChangeText={setPassword} isPassword error={errors.password} />
          <CustomButton title={t('login.submit')} onPress={onSubmit} style={{ marginTop: 16 }} />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  top: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoImg: {
    width: 90,
    height: 90,
    marginBottom: 8,
  },
  logoText: {
    fontFamily: 'Georgia',
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 1,
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  form: {
    marginTop: 12,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 22,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1.2,
    borderColor: colors.border,
  },
});

export default LoginScreen;