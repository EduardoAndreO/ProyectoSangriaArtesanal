import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { colors } from '../theme/Styles';

type Props = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
};

const CustomButton: React.FC<Props> = ({ title, variant = 'primary', style, ...rest }) => {
  const backgroundColor =
    variant === 'primary'
      ? colors.primary
      : variant === 'secondary'
      ? colors.grey
      : 'transparent';
  const textColor =
    variant === 'primary'
      ? colors.white
      : variant === 'secondary'
      ? colors.white
      : colors.primary;

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }, style]} activeOpacity={0.8} {...rest}>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: 16, fontWeight: '600' },
});

export default CustomButton;