import { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  biometricType: LocalAuthentication.AuthenticationType | null;
  hasHardware: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    biometricType: null,
    hasHardware: false,
  });

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      
      setAuthState(prev => ({
        ...prev,
        hasHardware,
        biometricType: supportedTypes[0] || null,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error checking biometric support:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const authenticateWithPin = async (pin: string): Promise<boolean> => {
    // Simulación de autenticación con PIN
    // En una app real, esto se validaría contra un servidor seguro
    const correctPin = '123456'; // Solo para demo
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = pin === correctPin;
        if (isValid) {
          setAuthState(prev => ({ ...prev, isAuthenticated: true }));
        }
        resolve(isValid);
      }, 1000);
    });
  };

  const authenticateWithBiometric = async (): Promise<boolean> => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autentícate para acceder a TUBANK',
        cancelLabel: 'Cancelar',
        fallbackLabel: 'Usar PIN',
      });

      if (result.success) {
        setAuthState(prev => ({ ...prev, isAuthenticated: true }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during biometric authentication:', error);
      return false;
    }
  };

  const logout = () => {
    setAuthState(prev => ({ ...prev, isAuthenticated: false }));
  };

  return {
    ...authState,
    authenticateWithPin,
    authenticateWithBiometric,
    logout,
  };
};