import { LinearGradient } from 'expo-linear-gradient';
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
// Novedad: Importamos iconos más adecuados y un hook para el safe area
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';

// Simulación de tus constantes para que el código sea completo
const Colors = {
  background: '#1a1a2e', // Un morado oscuro/negro
  text: '#FFFFFF',
  textSecondary: '#a9a9a9',
  avatarBackground: '#fdf0d5', // Color crema/beige para el avatar
  avatarText: '#e76f51', // Naranja para el texto del avatar
  pinDotInactive: '#4a4a6a',
  gradientStart: '#5a4fcf', // Inicio del gradiente para el botón
  gradientEnd: '#7b68ee', // Fin del gradiente para el botón
};

const Spacing = {
  md: 12,
  lg: 20,
  xl: 24,
  xxl: 32,
};

const FontSizes = {
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 32,
};

// --- Componente principal de la pantalla ---
const AuthScreen: React.FC = () => {
  const [pin, setPin] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { authenticateWithPin, authenticateWithBiometric, hasHardware } = useAuth();
  const insets = useSafeAreaInsets(); // Hook para obtener los paddings seguros

  // --- Lógica de la UI (sin cambios, ya era correcta) ---
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
        setPin(''); // Limpiar PIN en caso de error
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

  // --- Renderizado de Componentes de la UI ---

  const PinDots = () => (
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

  const NumberPad = () => (
    <View style={styles.numberPad}>
      {/* Fila 1-3 */}
      {[...Array(3)].map((_, rowIndex) => (
        <View key={rowIndex} style={styles.numberRow}>
          {[...Array(3)].map((_, colIndex) => {
            const number = (rowIndex * 3 + colIndex + 1).toString();
            return (
              <Pressable
                key={number}
                style={styles.numberButton}
                onPress={() => handleNumberPress(number)}
                disabled={isLoading}
              >
                <Text style={styles.numberText}>{number}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
      {/* Fila 0 y acciones */}
      <View style={styles.numberRow}>
        {hasHardware ? (
          <Pressable style={styles.numberButton} onPress={handleBiometricAuth} disabled={isLoading}>
            <MaterialIcons name="fingerprint" size={30} color={Colors.textSecondary} />
          </Pressable>
        ) : <View style={styles.numberButton} /> /* Espacio vacío */}
        
        <Pressable style={styles.numberButton} onPress={() => handleNumberPress('0')} disabled={isLoading}>
          <Text style={styles.numberText}>0</Text>
        </Pressable>
        
        <Pressable style={styles.numberButton} onPress={handleDelete} disabled={isLoading || pin.length === 0}>
          {/* Mejora: Icono de borrar más parecido al de la imagen */}
          <MaterialCommunityIcons name="backspace-outline" size={28} color={Colors.text} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar style="light" />

      {/* --- Header: Botón de Cerrar Sesión --- */}
      <View style={[styles.header, { paddingHorizontal: Spacing.lg }]}>
        <Text style={styles.closeButton}>Cerrar sesión</Text>
      </View>

      {/* --- Contenido Principal Superior --- */}
      <View style={styles.topContent}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MP</Text>
        </View>
        <Text style={styles.title}>Ingresá tu clave</Text>
        <PinDots />
      </View>
      
      {/* --- Contenido Inferior (botones y teclado) --- */}
      <View style={styles.bottomContent}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.text} style={{flex: 1}}/>
        ) : (
          <>
            <Pressable>
              {/* Novedad: Botón con gradiente y estilo de píldora */}
              <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.forgotButton}
              >
                <Text style={styles.forgotText}>¿Olvidaste tu clave?</Text>
              </LinearGradient>
            </Pressable>
            <NumberPad />
          </>
        )}
      </View>
    </View>
  );
};

// --- Estilos completamente re-diseñados para coincidir con la imagen ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  closeButton: {
    color: Colors.text,
    fontSize: FontSizes.md,
  },
  // Mejora: División del layout para posicionar el teclado abajo
  topContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40, // Espacio para que no se pegue al botón de "olvidé clave"
  },
  bottomContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.avatarBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: '600',
    color: Colors.avatarText,
  },
  title: {
    fontSize: FontSizes.lg,
    color: Colors.text,
    marginBottom: Spacing.xxl,
  },
  pinContainer: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  pinDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.pinDotInactive,
  },
  pinDotFilled: {
    backgroundColor: Colors.text,
  },
  // Novedad: Estilo para el botón con gradiente
  forgotButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 50, // Forma de píldora
    alignSelf: 'center',
    marginBottom: Spacing.xxl,
  },
  forgotText: {
    color: Colors.text,
    fontSize: FontSizes.md,
    fontWeight: '500',
  },
  // Mejora: Estilos del teclado para que los botones sean invisibles
  numberPad: {
    gap: Spacing.xl,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  numberButton: {
    width: 80, // Área de toque grande
    height: 60, // Área de toque grande
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: FontSizes.xxl,
    color: Colors.text,
  },
});

export default AuthScreen;