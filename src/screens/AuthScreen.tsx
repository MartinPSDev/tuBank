import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';


const Colors = {
  background: '#0D0D0D', 
  text: '#FFFFFF',
  textSecondary: '#a9a9a9',
  // Avatar con colores de la imagen
  avatarBackground: '#EFEBE0', // Un beige/hueso claro
  avatarText: '#FFA500', // Naranja/Dorado para el texto del avatar
  // Puntos del PIN
  pinDotInactive: '#333333', // Gris oscuro para los puntos inactivos
  // Botón "Olvidaste clave"
  forgotButtonBackground: 'rgba(88, 86, 214, 0.15)', // Morado muy sutil y transparente
  forgotButtonText: '#C3BFFD' // Texto del botón en un lila claro
};

const Spacing = {
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48, 
};

const FontSizes = {
  sm: 12,
  md: 14, 
  lg: 18, 
  xl: 20,
  keypad: 26, 
};

// --- Componente principal de la pantalla ---
const AuthScreen: React.FC = () => {
  const [pin, setPin] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { authenticateWithPin, authenticateWithBiometric, hasHardware } = useAuth();
  const insets = useSafeAreaInsets();

  const handleNumberPress = (number: string) => {
    if (isLoading || pin.length >= 6) return;
    const newPin = pin + number;
    setPin(newPin);
    if (newPin.length === 6) {
      handlePinSubmit(newPin);
    }
  };

  const handleDelete = () => {
    if (isLoading) return;
    setPin(pin.slice(0, -1));
  };

  const handlePinSubmit = async (pinToSubmit: string) => {
    setIsLoading(true);
    try {
      const isValid = await authenticateWithPin(pinToSubmit);
      if (isValid) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'PIN incorrecto. Inténtalo de nuevo.');
        setPin('');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error durante la autenticación.');
      setPin('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricAuth = async () => {
    const success = await authenticateWithBiometric();
    if (success) {
      router.replace('/(tabs)');
    }
  };
  
  // --- Componentes de UI ---

  const PinDots = () => (
    <View style={styles.pinContainer}>
      {Array.from({ length: 6 }).map((_, index) => (
        <View
          key={index}
          style={[styles.pinDot, index < pin.length && styles.pinDotFilled]}
        />
      ))}
    </View>
  );

  const NumberPad = () => (
    <View style={styles.numberPad}>
      {[...Array(3)].map((_, rowIndex) => (
        <View key={rowIndex} style={styles.numberRow}>
          {[...Array(3)].map((_, colIndex) => {
            const number = (rowIndex * 3 + colIndex + 1).toString();
            return (
              <Pressable key={number} style={styles.numberButton} onPress={() => handleNumberPress(number)} disabled={isLoading}>
                <Text style={styles.numberText}>{number}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
      <View style={styles.numberRow}>
        {hasHardware ? (
          <Pressable style={styles.numberButton} onPress={handleBiometricAuth} disabled={isLoading}>
            <MaterialIcons name="fingerprint" size={28} color={Colors.textSecondary} />
          </Pressable>
        ) : <View style={styles.numberButton} />}
        
        <Pressable style={styles.numberButton} onPress={() => handleNumberPress('0')} disabled={isLoading}>
          <Text style={styles.numberText}>0</Text>
        </Pressable>
        
        <Pressable style={styles.numberButton} onPress={handleDelete} disabled={isLoading || pin.length === 0}>
          <MaterialCommunityIcons name="backspace-outline" size={26} color={Colors.text} />
        </Pressable>
      </View>
    </View>
  );

  return (
    // Se usa el padding seguro para evitar el notch y la barra de gestos
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom || Spacing.sm }]}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.closeButton}>Cerrar sesión</Text>
      </View>

      {/* 4. Layout dividido para empujar el teclado hacia abajo */}
      <View style={styles.topContent}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MP</Text>
        </View>
        <Text style={styles.title}>Ingresá tu clave</Text>
        <PinDots />
      </View>
      
      <View style={styles.bottomContent}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.text} style={{ flex: 1 }} />
        ) : (
          <>
            <Pressable style={styles.forgotButton}>
              <Text style={styles.forgotText}>¿Olvidaste tu clave?</Text>
            </Pressable>
            <NumberPad />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    height: 50,
  },
  closeButton: {
    color: Colors.text,
    fontSize: FontSizes.md,
  },
  topContent: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContent: {
    paddingHorizontal: Spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.avatarBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.avatarText,
  },
  title: {
    fontSize: FontSizes.lg,
    color: Colors.text,
    marginBottom: Spacing.xxxl, 
  },
  pinContainer: {
    flexDirection: 'row',
    gap: Spacing.md, 
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.pinDotInactive,
  },
  pinDotFilled: {
    backgroundColor: Colors.text,
  },
  forgotButton: {
    backgroundColor: Colors.forgotButtonBackground,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: Spacing.xxxl, 
  },
  forgotText: {
    color: Colors.forgotButtonText,
    fontSize: FontSizes.md,
    fontWeight: '500',
  },
  
  numberPad: {
    gap: Spacing.lg, 
    marginBottom: Spacing.md,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  numberButton: {
    width: 75,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: FontSizes.keypad,
    color: Colors.text,
    fontWeight: '400', 
  },
});

export default AuthScreen;