import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { WishlistProvider } from './src/context/WishlistContext';
import AppNavigator from './src/Navigation/AppNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/firebase/firebaseConfig';

export default function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth status:', user ? 'Logged in' : 'Logged out');
    });

    return unsubscribe;
  }, []);

  return (
    <WishlistProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <StatusBar style="dark" />
          <AppNavigator />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </WishlistProvider>
  );
}
