
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { colors } from '../theme/Styles';
import { useCart } from '../context/CartContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  return (
    <ImageBackground source={bgImage} style={styles.bg} imageStyle={{ opacity: 0.06, resizeMode: 'contain' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Carrito de Compras</Text>
        {cart.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
          </View>
        ) : (
          <View style={styles.cartList}>
            {cart.map((item, idx) => (
              <View key={item.name} style={styles.cartItem}>
                <Image source={productImages[item.imageIdx]} style={styles.cartImg} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cartName}>{item.name}</Text>
                  <Text style={styles.cartDesc}>{item.description}</Text>
                  <Text style={styles.cartPrice}>{item.price} x{item.quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(idx)} style={styles.removeBtn}>
                  <MaterialCommunityIcons name="close" size={22} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={clearCart} style={styles.clearBtn}>
              <MaterialCommunityIcons name="cart-off" size={20} color={colors.primary} />
              <Text style={styles.clearText}>Vaciar carrito</Text>
            </TouchableOpacity>
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
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
    padding: 6,
  },
  clearText: {
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 14,
  },
});

export default CartScreen;
