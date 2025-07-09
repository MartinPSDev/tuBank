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

const WithdrawAmountScreen: React.FC = () => {
  const router = useRouter();
  const [amount, setAmount] = useState<string>('');
  const availableAmount = 33570.00; // Monto disponible para retirar

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
    const numericAmount = parseFloat(amount);
    if (amount && numericAmount > 0 && numericAmount <= availableAmount) {
      // Aquí se procesaría el retiro
      router.back();
    }
  };

  const formatAmount = (value: string) => {
    if (!value) return '$0';
    const numericValue = parseFloat(value);
    return `$${numericValue.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
  };

  const isValidAmount = () => {
    const numericAmount = parseFloat(amount);
    return amount && numericAmount > 0 && numericAmount <= availableAmount;
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color={Colors.text} />
      </Pressable>
      <Text style={styles.headerTitle}>Monto a retirar</Text>
    </View>
  );

  const renderAmountDisplay = () => (
    <View style={styles.amountContainer}>
      <Text style={styles.amountLabel}>Monto a retirar</Text>
      <Text style={styles.amountValue}>{formatAmount(amount)}</Text>
      <Text style={styles.availableAmount}>
        Disponible: ${availableAmount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
      </Text>
      {amount && parseFloat(amount) > availableAmount && (
        <Text style={styles.errorText}>Monto superior al disponible</Text>
      )}
    </View>
  );

  const renderQuickAmounts = () => (
    <View style={styles.quickAmountsContainer}>
      <Text style={styles.quickAmountsLabel}>Montos rápidos</Text>
      <View style={styles.quickAmountsRow}>
        <Pressable 
          style={styles.quickAmountButton}
          onPress={() => setAmount('5000')}
        >
          <Text style={styles.quickAmountText}>$5,000</Text>
        </Pressable>
        <Pressable 
          style={styles.quickAmountButton}
          onPress={() => setAmount('10000')}
        >
          <Text style={styles.quickAmountText}>$10,000</Text>
        </Pressable>
        <Pressable 
          style={styles.quickAmountButton}
          onPress={() => setAmount(availableAmount.toString())}
        >
          <Text style={styles.quickAmountText}>Todo</Text>
        </Pressable>
      </View>
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
          !isValidAmount() && styles.confirmButtonDisabled
        ]}
        onPress={handleConfirm}
        disabled={!isValidAmount()}
      >
        <Text style={[
          styles.confirmButtonText,
          !isValidAmount() && styles.confirmButtonTextDisabled
        ]}>
          Confirmar retiro
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <View style={styles.content}>
        {renderAmountDisplay()}
        {renderQuickAmounts()}
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
    paddingVertical: 30,
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
  availableAmount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  errorText: {
    fontSize: 14,
    color: Colors.error,
    marginTop: 5,
  },
  quickAmountsContainer: {
    marginBottom: 20,
  },
  quickAmountsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },
  quickAmountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    flex: 1,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  numberPad: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: 280,
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

export default WithdrawAmountScreen;