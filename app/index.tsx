import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '../src/constants/Colors';

export default function Index() {
  useEffect(() => {
    // Simular un splash screen breve y luego redirigir a auth
    const timer = setTimeout(() => {
      router.replace('/auth');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
      }}
    >
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}
