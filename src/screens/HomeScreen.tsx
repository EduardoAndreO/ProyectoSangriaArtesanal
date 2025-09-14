import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
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
        <View style={styles.header}>
          <Text style={styles.logoText}>Sangría Pasión</Text>
          <View style={{ flexDirection: 'row' }}>
            <CustomButton title="Carrito" variant="ghost" onPress={() => navigation.navigate('Cart')} style={{ marginRight: 10 }} />
            <TouchableOpacity onPress={logout} style={{ padding: 6, marginLeft: 2 }}>
              <MaterialCommunityIcons name="close" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

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
});

export default HomeScreen;