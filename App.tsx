import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { CartProvider } from './src/context/CartContext';

const App = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <GestureHandlerRootView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
              <AppNavigator />
            </SafeAreaView>
          </GestureHandlerRootView>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;