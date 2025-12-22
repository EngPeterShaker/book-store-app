import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApiProvider } from './src/contexts/ApiContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LanguageProvider>
        <ApiProvider>
          <AppNavigator />
          <StatusBar style="light" />
        </ApiProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}
