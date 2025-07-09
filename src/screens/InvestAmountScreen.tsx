import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const InvestAmountScreen: React.FC = () => {
  const router = useRouter();
  const [amount, setAmount] = useState<string>('');

  const handleGoBack = () => {
    router.back();
  };

  const handleNumberPress = (number: string) => {
    if (amount.length < 10) {
      setAmount(prev => prev + number);
    }
  };

  const handleDeletePress = () => {
    setAmount(prev => prev.slice(0, -1));
  };

  const handleClearPress = () => {
    setAmount('');
  };

  const handleConfirm = () => {
    if (amount && parseFloat(amount) > 0) {
      // Aquí se procesaría la inversión
      router.back();
    }
  };

  const formatAmount = (value: string) => {
    if (!value) return '$0';
    const numericValue = parseFloat(value);
    return `$${numericValue.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color={Colors.text} />
      </Pressable>
      <Text style={styles.headerTitle}>Monto a invertir</Text>
    </View>
  );

  const renderAmountDisplay = () => (
    <View style={styles.amountContainer}>
      <Text style={styles.amountLabel}>Monto a invertir</Text>
      <Text style={styles.amountValue}>{formatAmount(amount)}</Text>
      <Text style={styles.amountHint}>Monto mínimo: $1,000</Text>
    </View>
  );

  const renderNumberPad = () => {
    const numbers = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['C', '0', '⌫']
    ];

    return (
      <View style={styles.numberPad}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.numberRow}>
            {row.map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.numberButton,
                  item === 'C' && styles.clearButton,
                  item === '⌫' && styles.deleteButton
                ]}
                onPress={() => {
                  if (item === 'C') {
                    handleClearPress();
                  } else if (item === '⌫') {
                    handleDeletePress();
                  } else {
                    handleNumberPress(item);
                  }
                }}
              >
                <Text style={[
                  styles.numberButtonText,
                  item === 'C' && styles.clearButtonText,
                  item === '⌫' && styles.deleteButtonText
                ]}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    );
  };

  const renderConfirmButton = () => (
    <View style={styles.confirmContainer}>
      <Pressable 
        style={[
          styles.confirmButton,
          (!amount || parseFloat(amount) < 1000) && styles.confirmButtonDisabled
        ]}
        onPress={handleConfirm}
        disabled={!amount || parseFloat(amount) < 1000}
      >
        <Text style={[
          styles.confirmButtonText,
          (!amount || parseFloat(amount) < 1000) && styles.confirmButtonTextDisabled
        ]}>
          Confirmar inversión
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <View style={styles.content}>
        {renderAmountDisplay()}
        {renderNumberPad()}
        {renderConfirmButton()}
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: Colors.background,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  amountContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
  },
  amountHint: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  numberPad: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: 320,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  numberButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  numberButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
  },
  clearButton: {
    backgroundColor: Colors.error,
  },
  clearButtonText: {
    color: Colors.background,
  },
  deleteButton: {
    backgroundColor: Colors.textSecondary,
  },
  deleteButtonText: {
    color: Colors.background,
    fontSize: 20,
  },
  confirmContainer: {
    paddingVertical: 20,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: Colors.border,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
  },
  confirmButtonTextDisabled: {
    color: Colors.textSecondary,
  },
});

export default InvestAmountScreen;