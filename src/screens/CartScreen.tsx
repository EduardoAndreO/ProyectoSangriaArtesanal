
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { colors } from '../theme/Styles';
import { useCart } from '../context/CartContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTranslation } from 'react-i18next';

const productImages = [
  require('../assets/sangria_fresa.png'),
  require('../assets/sangria_citrica.png'),
  require('../assets/Sangria_mango.png'),
  require('../assets/sangria_clasica.png'),
  require('../assets/sangria_frutosrojos.png'),
];

const CartScreen = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const bgImage = require('../assets/logo_sangria.png');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  return (
    <ImageBackground source={bgImage} style={styles.bg} imageStyle={{ opacity: 0.06, resizeMode: 'contain' }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeButton}>
          <Text style={{ fontSize: 30, color: colors.primary }}>🏠</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t('Carro de Compras')}</Text>
        {cart.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>{t('Carro Vacio')}</Text>
          </View>
        ) : (
          <View style={styles.cartList}>
            {cart.map((item, idx) => (
              <View key={item.name} style={styles.cartItem}>
                <Image source={productImages[item.imageIdx]} style={styles.cartImg} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cartName}>{t(item.name)}</Text>
                  <Text style={styles.cartDesc}>{t(item.description)}</Text>
                  <Text style={styles.cartPrice}>{item.price} x{item.quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(idx)} style={styles.removeBtn}>
                  <Text style={{ fontSize: 22, color: colors.error }}>❌</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>
              {t('Carrito Total')}: €{cart.reduce((total, item) => {
                // Remove any non-numeric characters except dot and minus sign
                const numericPriceString = item.price.replace(/[^0-9.-]+/g, '');
                const price = parseFloat(numericPriceString) || 0;
                return total + price * item.quantity;
              }, 0).toFixed(2)}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={clearCart} style={styles.clearBtn}>
                <Text style={{ fontSize: 20, color: colors.primary }}>🗑️</Text>
                <Text style={styles.clearText}>{t('Limpiar Carrito')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Payment')}
                style={styles.paymentBtn}
              >
                <Text style={{ fontSize: 20, color: colors.white }}>💳</Text>
                <Text style={styles.paymentText}>{t('Proceder al Pago')}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Georgia',
    color: colors.primary,
    marginBottom: 30,
    marginTop: 30,
    textAlign: 'center',
    letterSpacing: 1,
  },
  emptyBox: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 30,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1.2,
    borderColor: colors.border,
  },
  emptyText: {
    color: colors.grey,
    fontSize: 18,
    fontFamily: 'Georgia',
    textAlign: 'center',
  },
  cartList: {
    width: '100%',
    marginTop: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 14,
    padding: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cartImg: {
    width: 54,
    height: 54,
    borderRadius: 10,
    marginRight: 12,
  },
  cartName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.primary,
    fontFamily: 'Georgia',
  },
  cartDesc: {
    fontSize: 12,
    color: colors.grey,
    marginBottom: 2,
  },
  cartPrice: {
    fontWeight: 'bold',
    color: colors.text,
    fontSize: 15,
  },
  removeBtn: {
    marginLeft: 8,
    padding: 4,
  },
  totalContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  clearText: {
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 14,
  },
  paymentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentText: {
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  homeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
});

export default CartScreen;
