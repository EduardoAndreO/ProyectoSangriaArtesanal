import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
// Importar imágenes de productos como variables
const imgFresa = require('../assets/sangria_fresa.png');
const imgCitrica = require('../assets/sangria_citrica.png');
const imgMango = require('../assets/Sangria_mango.png');
const imgClasica = require('../assets/sangria_clasica.png');
const imgFrutosRojos = require('../assets/sangria_frutosrojos.png');

// El orden debe coincidir con el orden de los productos en las traducciones
const productImages = [
  imgFresa,         // sangria_fresa.png
  imgCitrica,       // sangria_citrica.png
  imgMango,         // Sangria_mango.png
  imgClasica,       // sangria_clasica.png
  imgFrutosRojos,   // sangria_frutosrojos.png
];
import { useTranslation } from 'react-i18next';
import CustomButton from '../components/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/Styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();
  const { addToCart } = useCart();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  // Obtener productos multilenguaje
  const products = t('home.products', { returnObjects: true }) as Array<any>;
  // Badges de sabor para cada producto (puedes personalizar más)
  const badges = [
    t('Fresa & Menta'),
    t('Cítrica'),
    t('Mango & Maracuyá'),
    t('Clásica'),
    t('Frutos Rojos'),
  ];
  // Fondo decorativo (puedes cambiar la imagen si tienes una artesanal)
  const bgImage = require('../assets/logo_sangria.png');

  return (
    <ImageBackground source={bgImage} style={styles.bg} imageStyle={{ opacity: 0.04, resizeMode: 'contain' }}>
      <View style={styles.container}>
        {/* Header con título grande centrado */}
        <View style={styles.header}>
          <Text style={styles.logoText}>Sangría Pasión</Text>
        </View>

        {/* Contenido principal */}
        <Text style={styles.sectionTitle}>{t('home.product_title')}</Text>

        <ScrollView contentContainerStyle={styles.productsList} showsVerticalScrollIndicator={false}>
          {products.map((product, idx) => (
            <View key={product.name} style={styles.card}>
              <Image source={productImages[idx]} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.cardContent}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badges[idx]}</Text>
                </View>
                <Text style={styles.cardTitle}>{product.name}</Text>
                <Text style={styles.cardDescription}>{product.description}</Text>
                <Text style={styles.cardPrice}>{product.price}</Text>
                <CustomButton
                  title={t('home.add_to_cart')}
                  onPress={() => {
                    addToCart({
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      imageIdx: idx,
                    });
                  }}
                  style={{ marginTop: 10 }}
                />
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Barra de navegación inferior */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Cart')}
          >
            <Text style={styles.navIcon}>🛒</Text>
            <Text style={styles.navText}>{t('home.cart.title')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Calendar')}
          >
            <Text style={styles.navIcon}>📅</Text>
            <Text style={styles.navText}>{t('home.calendar.title')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Text style={styles.navIcon}>🌐</Text>
            <Text style={styles.navText}>{i18n.language.toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={logout}
          >
            <Text style={styles.navIcon}>❌</Text>
            <Text style={styles.navText}>{t('home.logout')}</Text>
          </TouchableOpacity>
        </View>

        {/* Language Switcher Modal */}
        {showMenu && (
          <View style={styles.languageModal}>
            <View style={styles.languageModalContent}>
              <Text style={styles.languageModalTitle}>{t('home.select_language')}</Text>
              <TouchableOpacity
                style={styles.languageOption}
                onPress={() => { i18n.changeLanguage('es'); setShowMenu(false); }}
              >
                <Text style={styles.languageOptionText}>🇪🇸 Español</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.languageOption}
                onPress={() => { i18n.changeLanguage('en'); setShowMenu(false); }}
              >
                <Text style={styles.languageOptionText}>🇺🇸 English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.languageOption}
                onPress={() => { i18n.changeLanguage('fr'); setShowMenu(false); }}
              >
                <Text style={styles.languageOptionText}>🇫🇷 Français</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowMenu(false)}
              >
                <Text style={styles.closeButtonText}>{t('Cerrar')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
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
    backgroundColor: 'transparent',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  spacer: {
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallButton: {
    marginRight: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 70,
  },
  logoutButton: {
    padding: 6,
    marginLeft: 2,
  },
  logoText: {
    fontFamily: 'Georgia',
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
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
  productsList: {
    paddingBottom: 30,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    marginHorizontal: 12,
    marginVertical: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 7,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  cardImage: {
    width: '100%',
    height: 170,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  cardContent: {
    padding: 16,
  },
  badge: {
    backgroundColor: colors.pink,
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 6,
  },
  badgeText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Georgia',
    color: colors.text,
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.grey,
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 10,
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
  dropdownMenu: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 80,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  navText: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
    fontWeight: '600',
  },
  languageModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageModalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 32,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    minWidth: 280,
  },
  languageModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  languageOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  languageOptionText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  closeButtonText: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;