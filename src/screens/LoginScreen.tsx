import React, { useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ImageBackground, Image, Alert, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { isEmailValid, isPhoneValid } from '../utils/Validators';
import { useAuth } from '../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/Styles';
import { registerWithEmail } from '../services/FirebaseAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation: _navigation }) => {
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

  async function onLogin() {
    // For login, you might not need the phone, but we keep validation for now
    if (!validate()) return;
    await login();
  }

  async function onRegister() {
    if (!validate()) return;
    try {
      await registerWithEmail(email, password, { phone });
      Alert.alert(t('login.register_success_title'), t('login.register_success_message'));
      // Optional: automatically log in the user after registration
      // await login(); 
    } catch (error: any) {
      console.error('Registration failed:', error);
      Alert.alert(t('login.errors.register_failed_title'), error.message);
    }
  }

  const bgImage = require('../assets/logo_sangria.png');
  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.bg}>
      {/* Decorative background elements */}
      <View style={styles.decorativeContainer}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
        <View style={[styles.circle, styles.circle4]} />
        <View style={[styles.circle, styles.circle5]} />
        <View style={[styles.triangle, styles.triangle1]} />
        <View style={[styles.triangle, styles.triangle2]} />
      </View>

      <ImageBackground source={bgImage} style={styles.bgImage} imageStyle={{ opacity: 0.08, resizeMode: 'contain' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
          <View style={styles.top}>
            <Image source={require('../assets/Logo.png')} style={styles.logoImg} resizeMode="contain" />
            <Text style={styles.logoText}>Sangría Pasión</Text>
          </View>
          <View style={styles.form}>
            <CustomInput label={t('login.email')} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" error={errors.email} />
            <CustomInput label={t('login.phone')} value={phone} onChangeText={setPhone} keyboardType="phone-pad" error={errors.phone} />
            <CustomInput label={t('login.password')} value={password} onChangeText={setPassword} isPassword error={errors.password} />
            <CustomButton title={t('login.submit')} onPress={onLogin} style={{ marginTop: 16 }} />
            <CustomButton title={t('login.register')} onPress={onRegister} style={{ marginTop: 8 }} />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
  decorativeContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  circle: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 87, 87, 0.1)',
  },
  circle1: {
    width: 100,
    height: 100,
    top: '10%',
    left: '10%',
  },
  circle2: {
    width: 80,
    height: 80,
    top: '20%',
    right: '15%',
    backgroundColor: 'rgba(255, 138, 76, 0.15)',
  },
  circle3: {
    width: 60,
    height: 60,
    top: '60%',
    left: '20%',
    backgroundColor: 'rgba(255, 193, 7, 0.12)',
  },
  circle4: {
    width: 90,
    height: 90,
    bottom: '15%',
    right: '10%',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  circle5: {
    width: 70,
    height: 70,
    bottom: '30%',
    left: '5%',
    backgroundColor: 'rgba(156, 39, 176, 0.08)',
  },
  triangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 43,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(255, 87, 87, 0.08)',
  },
  triangle1: {
    top: '40%',
    left: '70%',
    transform: [{ rotate: '45deg' }],
  },
  triangle2: {
    top: '70%',
    left: '60%',
    transform: [{ rotate: '-30deg' }],
    borderBottomColor: 'rgba(255, 138, 76, 0.1)',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  top: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoImg: {
    width: 140,
    height: 140,
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