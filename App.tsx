import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';

const App = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <GestureHandlerRootView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.container}>
            <AppNavigator />
          </SafeAreaView>
        </GestureHandlerRootView>
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