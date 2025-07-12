import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
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
  avatarBackground: '#F5E6D3',
  avatarText: '#FFA500',
  pinDotInactive: '#333333',
  forgotButtonBackground: 'rgba(88, 86, 214, 0.15)',
};

const Spacing = {
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48, 
  xs: 4,
};

const FontSizes = {
  sm: 12,
  md: 14, 
  lg: 18, 
  xl: 20,
  keypad: 26, 
};

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
    <View style={styles.keypadContainer}>
      <View style={styles.numberPad}>
        {[...Array(3)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.numberRow}>
            {[...Array(3)].map((_, colIndex) => {
              const number = (rowIndex * 3 + colIndex + 1).toString();
              return (
                <Pressable key={number} style={({ pressed }) => [styles.numberButton, pressed && styles.numberButtonPressed]} onPress={() => handleNumberPress(number)} disabled={isLoading}>
                  <Text style={styles.numberText}>{number}</Text>
                </Pressable>
              );
            })}
          </View>
        ))}
        <View style={styles.numberRow}>
          {hasHardware ? (
            <Pressable style={({ pressed }) => [styles.numberButton, pressed && styles.numberButtonPressed]} onPress={handleBiometricAuth} disabled={isLoading}>
              <MaterialIcons name="fingerprint" size={28} color={Colors.textSecondary} />
            </Pressable>
          ) : <View style={styles.numberButton} />}
          
          <Pressable style={({ pressed }) => [styles.numberButton, pressed && styles.numberButtonPressed]} onPress={() => handleNumberPress('0')} disabled={isLoading}>
            <Text style={styles.numberText}>0</Text>
          </Pressable>
          
          <Pressable style={({ pressed }) => [styles.numberButton, pressed && styles.numberButtonPressed]} onPress={handleDelete} disabled={isLoading || pin.length === 0}>
            <MaterialCommunityIcons name="backspace-outline" size={26} color={Colors.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom || Spacing.sm }]}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.closeButton}>Cerrar sesión</Text>
      </View>

      <View style={styles.topContent}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MP</Text>
        </View>
        <Text style={styles.title}>Ingresá tu clave</Text>
        <PinDots />
      </View>
      
      <View style={styles.bottomContent}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.text} style={{ flex: 1, paddingBottom: 200 }} />
        ) : (
          <>
            <Pressable style={[styles.forgotButton, { minWidth: 200 }]}>
              <MaskedView
                style={[styles.maskedView, { width: '100%' }]}
                maskElement={
                  <Text style={styles.forgotText}>
                    ¿Olvidaste tu clave?
                  </Text>
                }
              >
                <LinearGradient
                  colors={['#8A2BE2', '#FF00FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ borderRadius: 50, paddingVertical: 0, paddingHorizontal: 0, width: '100%' }}
                >
                  <Text style={[styles.forgotText, { opacity: 0 }]}>¿Olvidaste tu clave?</Text>
                </LinearGradient>
              </MaskedView>
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
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xs,
    height: 30,
    flex: 0.2,
  },
  closeButton: {
    color: Colors.text,
    fontSize: FontSizes.md,
  },
  topContent: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
  },
  bottomContent: {
    flex: 3,
    paddingHorizontal: Spacing.md,
    justifyContent: 'flex-end',
    paddingBottom: Spacing.xxl,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.avatarBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.avatarText,
  },
  title: {
    fontSize: FontSizes.lg,
    color: Colors.text,
    marginBottom: Spacing.xxl,
    fontWeight: '500',
  },
  pinContainer: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.xxl,
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
    borderRadius: 50,
    marginBottom: Spacing.xxl,
    alignSelf: 'center',
    paddingHorizontal: 28,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    height: 48,
  },
  maskedView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotText: {
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 4,
  },
  keypadContainer: {
    alignSelf: 'center',
    width: '80%', 
    marginBottom: Spacing.md,
  },
  numberPad: {
    gap: Spacing.sm, 
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs, 
  },
  numberButton: {
    width: 60, 
    height: 50, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, 
    transform: [{ scale: 1 }],
  },
  numberButtonPressed: {
    transform: [{ scale: 1.1 }],
    opacity: 0.9,
  },
  numberText: {
    fontSize: 22, 
    color: Colors.text,
    fontWeight: '400',
  },
});

export default AuthScreen;