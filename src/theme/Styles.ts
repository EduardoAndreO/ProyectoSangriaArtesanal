import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#A4243B', // Rojo Sangría
  accent: '#DDA448', // Arena Dorada
  text: '#333333', // Carbón
  background: '#F4F1E9', // Crema
  white: '#fff',
  error: '#d9534f',
  lightGrey: '#ddd',
  grey: '#6C757D',
};

export const globalStyles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  padded: { padding: 16 },
  // más estilos globales...
});
