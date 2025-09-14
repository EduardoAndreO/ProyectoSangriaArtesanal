import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#A4243B', // Rojo Sangría
  accent: '#F7B801', // Amarillo Frutal
  text: '#3B1F2B', // Uva madura
  background: '#FFF8F0', // Crema clara
  white: '#fff',
  error: '#d9534f',
  lightGrey: '#F2E9E4',
  grey: '#6C757D',
  green: '#7FB069', // Hoja de menta
  pink: '#F76E9A', // Fresa
  purple: '#7C3E66', // Uva
  orange: '#FFB347', // Mango
  border: '#E0C3A3', // Detalle artesanal
};

export const globalStyles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  padded: { padding: 16 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 10,
    marginHorizontal: 8,
    padding: 16,
  },
  fruitBadge: {
    backgroundColor: colors.pink,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  fruitBadgeText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  // más estilos globales...
});
