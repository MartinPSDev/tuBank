import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Colors } from '../src/constants/Colors';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular un splash screen breve y luego redirigir a auth
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.replace('/auth');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return null; // O redirigir directamente a la pantalla principal
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
      }}
    >
    </View>
  );
}
