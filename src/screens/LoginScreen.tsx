import React, { useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
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

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.logoText}>Sangría Pasión</Text>
      </View>

      <View style={styles.form}>
        <CustomInput label={t('login.email')} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <CustomInput label={t('login.phone')} value={phone} onChangeText={setPhone} keyboardType="phone-pad" error={errors.phone} />
        <CustomInput label={t('login.password')} value={password} onChangeText={setPassword} isPassword error={errors.password} />
        <CustomButton title={t('login.submit')} onPress={onSubmit} style={{ marginTop: 12 }} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: colors.background },
  top: { alignItems: 'center', marginBottom: 24 },
  logoText: {
    fontFamily: 'Georgia',
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
  },
  form: { marginTop: 12 },
});

export default LoginScreen;