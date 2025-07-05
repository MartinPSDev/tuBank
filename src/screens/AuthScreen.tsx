import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/Layout';
import { useAuth } from '../hooks/useAuth';
import { router } from 'expo-router';

const AuthScreen: React.FC = () => {
  const [pin, setPin] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { authenticateWithPin, authenticateWithBiometric, hasHardware } = useAuth();

  const handleNumberPress = (number: string) => {
    if (pin.length < 6) {
      const newPin = pin + number;
      setPin(newPin);
      
      if (newPin.length === 6) {
        handlePinSubmit(newPin);
      }
    }
  };

  const handleDelete = () => {
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

  const renderPinDots = () => {
    return (
      <View style={styles.pinContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.pinDot,
              index < pin.length && styles.pinDotFilled,
            ]}
          />
        ))}
      </View>
    );
  };

  const renderNumberPad = () => {
    const numbers = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
    ];

    return (
      <View style={styles.numberPad}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.numberRow}>
            {row.map((number) => (
              <Pressable
                key={number}
                style={({ pressed }) => [
                  styles.numberButton,
                  pressed && styles.numberButtonPressed,
                ]}
                onPress={() => handleNumberPress(number)}
                disabled={isLoading}
              >
                <Text style={styles.numberText}>{number}</Text>
              </Pressable>
            ))}
          </View>
        ))}
        
        <View style={styles.numberRow}>
          {hasHardware ? (
            <Pressable
              style={({ pressed }) => [
                styles.numberButton,
                pressed && styles.numberButtonPressed,
              ]}
              onPress={handleBiometricAuth}
              disabled={isLoading}
            >
              <MaterialIcons name="fingerprint" size={24} color={Colors.text} />
            </Pressable>
          ) : (
            <View style={styles.numberButton} />
          )}
          
          <Pressable
            style={({ pressed }) => [
              styles.numberButton,
              pressed && styles.numberButtonPressed,
            ]}
            onPress={() => handleNumberPress('0')}
            disabled={isLoading}
          >
            <Text style={styles.numberText}>0</Text>
          </Pressable>
          
          <Pressable
            style={({ pressed }) => [
              styles.numberButton,
              pressed && styles.numberButtonPressed,
            ]}
            onPress={handleDelete}
            disabled={isLoading || pin.length === 0}
          >
            <Text style={styles.deleteText}>⌫</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[Colors.background, Colors.backgroundSecondary]}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.closeButton}>Cerrar sesión</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>MP</Text>
          </View>
        </View>

        <Text style={styles.title}>Ingresá tu clave</Text>

        {renderPinDots()}

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          renderNumberPad()
        )}

        <Pressable style={styles.forgotButton}>
          <Text style={styles.forgotText}>¿Olvidaste tu clave?</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    alignItems: 'flex-end',
  },
  closeButton: {
    color: Colors.text,
    fontSize: FontSizes.md,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  avatarContainer: {
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5E6D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: '#D97706',
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.medium,
    color: Colors.text,
    marginBottom: Spacing.xl,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.gray600,
  },
  pinDotFilled: {
    backgroundColor: Colors.text,
  },
  numberPad: {
    gap: Spacing.lg,
  },
  numberRow: {
    flexDirection: 'row',
    gap: Spacing.xl,
  },
  numberButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonPressed: {
    backgroundColor: Colors.cardOverlay,
  },
  numberText: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.medium,
    color: Colors.text,
  },
  deleteText: {
    fontSize: FontSizes.xl,
    color: Colors.text,
  },
  loadingContainer: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotButton: {
    marginTop: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  forgotText: {
    color: Colors.primary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
});

export default AuthScreen;