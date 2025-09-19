import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { colors } from '../theme/Styles';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

const PaymentScreen: React.FC<Props> = ({ navigation }) => {
  const { cart, clearCart } = useCart();
  const { t } = useTranslation();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  const totalAmount = cart.reduce((total, item) => {
    // Remove any non-numeric characters except dot and minus sign
    const numericPriceString = item.price.replace(/[^0-9.-]+/g, '');
    const price = parseFloat(numericPriceString) || 0;
    return total + price * item.quantity;
  }, 0);

  const handlePayment = async () => {
    // Basic validation
    if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
      Alert.alert(t('payment.error_title'), t('Por favor, complete todos los campos'));
      return;
    }

    if (cardNumber.length < 16) {
      Alert.alert(t('payment.error_title'), t('Número de tarjeta inválido'));
      return;
    }

    if (cvv.length < 3) {
      Alert.alert(t('payment.error_title'), t('CVV inválido'));
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        t('Pago Exitoso'),
        t('El Pago se ha realizado con éxito', { total: totalAmount.toFixed(2) }),
        [
          {
            text: 'OK',
            onPress: () => {
              clearCart();
              navigation.navigate('Home');
            },
          },
        ]
      );
    }, 2000);
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const match = cleaned.match(/\d{1,4}/g);
    const formatted = match ? match.join(' ').substr(0, 19) : '';
    setCardNumber(formatted);
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D+/g, '');
    if (cleaned.length >= 2) {
      const formatted = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
      setExpiryDate(formatted);
    } else {
      setExpiryDate(cleaned);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>💳 {t('Proceso de Pago')}</Text>
        <Text style={styles.subtitle}>{t('Facturación')}</Text>
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.summaryTitle}>{t('Sumario Orden de Pago')}</Text>
        {cart.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>€{item.price}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>{t('Pago Total')}:</Text>
          <Text style={styles.totalAmount}>€{totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.form}>
        <CustomInput
          placeholder={t('Nombre Titular Tarjeta')}
          value={cardHolderName}
          onChangeText={setCardHolderName}
          style={styles.input}
        />

        <CustomInput
          placeholder={t('Número de Tarjeta')}
          value={cardNumber}
          onChangeText={formatCardNumber}
          keyboardType="numeric"
          maxLength={19}
          style={styles.input}
        />

        <View style={styles.row}>
          <CustomInput
            label={t('Fecha de Vencimiento')}
            placeholder="MM/YY"
            value={expiryDate}
            onChangeText={formatExpiryDate}
            keyboardType="numeric"
            maxLength={5}
            style={[styles.input, styles.expiryInput]}
          />

          <View style={styles.cvvContainer}>
            <CustomInput
              label={t('Código CVV')}
              placeholder="3-4 dígitos"
              value={cvv}
              onChangeText={(text) => setCvv(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry={!showCvv}
              style={[styles.input, styles.cvvInput]}
            />
            <TouchableOpacity
              onPress={() => setShowCvv(!showCvv)}
              style={styles.eyeIcon}
            >
              <MaterialCommunityIcons
                name={showCvv ? 'eye-off' : 'eye'}
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.securityNote}>
          <Text style={styles.securityText}>
            🔒 {t('Nota de Seguridad')}
          </Text>
        </View>

        <CustomButton
          title={loading ? t('Procesar Pago') : t('Pagar Ahora')}
          onPress={handlePayment}
          disabled={loading}
          style={styles.payButton}
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← {t('Volver al Carrito')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.white,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
  },
  orderSummary: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  form: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
    minHeight: 50,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 0.48,
  },
  expiryInput: {
    flex: 0.5,
    marginRight: 8,
  },
  cvvInput: {
    flex: 1.5,
  },
  cvvContainer: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    padding: 5,
  },
  cvvRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityNote: {
    alignItems: 'center',
    marginBottom: 20,
  },
  securityText: {
    fontSize: 14,
    color: colors.grey,
    textAlign: 'center',
  },
  payButton: {
    marginBottom: 16,
  },
  backButton: {
    alignItems: 'center',
    padding: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default PaymentScreen;
