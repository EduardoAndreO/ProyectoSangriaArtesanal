import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/Styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>Sangría Pasión</Text>
        <View style={{ flexDirection: 'row' }}>
          <CustomButton title="Carrito" variant="ghost" onPress={() => navigation.navigate('Cart')} style={{ marginRight: 10 }} />
          <CustomButton title={t('home.logout')} variant="ghost" onPress={logout} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>{t('home.product_title')}</Text>

      {/* Product Card */}
      <View style={styles.card}>
        <Image source={require('../assets/logo_sangria.png')} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{t('home.product.name')}</Text>
          <Text style={styles.cardDescription}>
            {t('home.product.description')}
          </Text>
          <Text style={styles.cardPrice}>{t('home.product.price')}</Text>
          <CustomButton title={t('home.product.add_to_cart')} onPress={() => {}} style={{ marginTop: 10 }} />
        </View>
      </View>

      {/* Language Switcher */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('home.select_language')}</Text>
        <View style={styles.languageSwitcher}>
          <CustomButton title="ES" variant="ghost" onPress={() => i18n.changeLanguage('es')} />
          <CustomButton title="EN" variant="ghost" onPress={() => i18n.changeLanguage('en')} />
          <CustomButton title="FR" variant="ghost" onPress={() => i18n.changeLanguage('fr')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logoText: {
    fontFamily: 'Georgia',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'Georgia',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Georgia',
    color: colors.text,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.grey,
    marginTop: 8,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 12,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: colors.grey,
    marginBottom: 10,
  },
  languageSwitcher: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;