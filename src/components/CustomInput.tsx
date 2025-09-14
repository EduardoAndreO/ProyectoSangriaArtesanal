import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { colors } from '../theme/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = TextInputProps & {
  label?: string;
  error?: string | null;
  isPassword?: boolean;
};

const CustomInput: React.FC<Props> = ({ label, error, style, isPassword, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.grey}
          secureTextEntry={isPassword && !showPassword}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconContainer}>
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={26}
              color={colors.primary}
              style={{ padding: 2 }}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 6,
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Georgia',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Georgia',
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    color: colors.error,
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 13,
  },
  eyeIconContainer: {
    paddingHorizontal: 10,
  },
  eyeIcon: {
    fontSize: 20,
  },
});

export default CustomInput;