import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, View } from 'react-native';
import { colors } from '../theme/Styles';

type Props = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
};

const CustomButton: React.FC<Props> = ({ title, variant = 'primary', style, ...rest }) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';
  const textColor = isPrimary || isSecondary ? colors.white : colors.primary;
  let backgroundColor = 'transparent';
  if (isPrimary) backgroundColor = colors.primary;
  else if (isSecondary) backgroundColor = colors.green;

  return (
    <TouchableOpacity
      style={[
        styles.shadow,
        styles.button,
        { backgroundColor, borderWidth: isGhost ? 1.5 : 0, borderColor: isGhost ? colors.primary : 'transparent' },
        style,
      ]}
      activeOpacity={0.85}
      {...rest}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    borderRadius: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  text: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: 'Georgia',
  },
});

export default CustomButton;