import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface InvestmentMovement {
  id: string;
  type: 'investment' | 'withdrawal' | 'earnings';
  description: string;
  date: string;
  amount: number;
  percentage?: number;
  icon: string;
  iconColor: string;
}

const InvestmentHistoryScreen: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  // Generar movimientos de inversión de muestra
  const movements: InvestmentMovement[] = [
    {
      id: '1',
      type: 'earnings',
      description: 'Rendimiento FCI Renta Variable',
      date: '15/12/2024 10:30',
      amount: 127.50,
      percentage: 2.45,
      icon: 'trending-up',
      iconColor: '#4CAF50'
    },
    {
      id: '2',
      type: 'investment',
      description: 'Inversión en Plazo Fijo UVA',
      date: '10/12/2024 14:22',
      amount: -5000.00,
      percentage: 0,
      icon: 'add-circle',
      iconColor: '#2196F3'
    },
    {
      id: '3',
      type: 'earnings',
      description: 'Rendimiento Bonos del Tesoro',
      date: '08/12/2024 09:15',
      amount: 89.30,
      percentage: 1.78,
      icon: 'trending-up',
      iconColor: '#4CAF50'
    },
    {
      id: '4',
      type: 'withdrawal',
      description: 'Retiro de inversión',
      date: '05/12/2024 16:45',
      amount: -2500.00,
      percentage: 0,
      icon: 'remove-circle',
      iconColor: '#FF9800'
    },
    {
      id: '5',
      type: 'earnings',
      description: 'Rendimiento FCI Renta Fija',
      date: '01/12/2024 11:20',
      amount: 156.75,
      percentage: 3.12,
      icon: 'trending-up',
      iconColor: '#4CAF50'
    },
    {
      id: '6',
      type: 'investment',
      description: 'Inversión en FCI Balanceado',
      date: '28/11/2024 13:30',
      amount: -10000.00,
      percentage: 0,
      icon: 'add-circle',
      iconColor: '#2196F3'
    },
    {
      id: '7',
      type: 'earnings',
      description: 'Rendimiento Plazo Fijo UVA',
      date: '25/11/2024 08:45',
      amount: 203.40,
      percentage: 4.07,
      icon: 'trending-up',
      iconColor: '#4CAF50'
    },
    {
      id: '8',
      type: 'earnings',
      description: 'Rendimiento FCI Renta Variable',
      date: '20/11/2024 15:10',
      amount: 98.60,
      percentage: 1.97,
      icon: 'trending-up',
      iconColor: '#4CAF50'
    },
    {
      id: '9',
      type: 'investment',
      description: 'Inversión inicial',
      date: '15/11/2024 10:00',
      amount: -15000.00,
      percentage: 0,
      icon: 'add-circle',
      iconColor: '#2196F3'
    },
    {
      id: '10',
      type: 'earnings',
      description: 'Rendimiento Bonos del Tesoro',
      date: '10/11/2024 12:30',
      amount: 145.20,
      percentage: 2.90,
      icon: 'trending-up',
      iconColor: '#4CAF50'
    }
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color={Colors.text} />
      </Pressable>
      <Text style={styles.headerTitle}>Histórico de inversiones</Text>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <Text style={styles.searchPlaceholder}>Buscar movimientos...</Text>
      </View>
    </View>
  );

  const renderSummary = () => (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total ganado</Text>
        <Text style={styles.summaryAmount}>+$820.75</Text>
        <Text style={styles.summaryPercentage}>+24.62% total</Text>
      </View>
    </View>
  );

  const getMovementIcon = (iconName: string) => {
    switch (iconName) {
      case 'trending-up':
        return 'trending-up';
      case 'add-circle':
        return 'add-circle';
      case 'remove-circle':
        return 'remove-circle';
      default:
        return 'trending-up';
    }
  };

  const renderMovementItem = (movement: InvestmentMovement) => (
    <View key={movement.id} style={styles.movementItem}>
      <View style={styles.movementIcon}>
        <View style={[styles.movementIconCircle, { backgroundColor: movement.iconColor + '20' }]}>
          <Ionicons 
            name={getMovementIcon(movement.icon) as any} 
            size={20} 
            color={movement.iconColor} 
          />
        </View>
      </View>
      
      <View style={styles.movementDetails}>
        <Text style={styles.movementDescription}>{movement.description}</Text>
        <Text style={styles.movementDate}>{movement.date}</Text>
        {movement.percentage > 0 && (
          <Text style={styles.movementPercentage}>+{movement.percentage}% rendimiento</Text>
        )}
      </View>
      
      <View style={styles.movementAmountContainer}>
        <Text style={[
          styles.movementAmount,
          { color: movement.amount > 0 ? Colors.success : Colors.text }
        ]}>
          {movement.amount > 0 ? '+' : ''}${Math.abs(movement.amount).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </Text>
        {movement.type === 'earnings' && (
          <View style={styles.earningsBadge}>
            <Text style={styles.earningsBadgeText}>Ganancia</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderSearchBar()}
        {renderSummary()}
        
        <View style={styles.movementsSection}>
          <Text style={styles.movementsTitle}>Movimientos</Text>
          {movements.map(renderMovementItem)}
        </View>
      </ScrollView>
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
  searchContainer: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchPlaceholder: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  summaryContainer: {
    marginBottom: 25,
  },
  summaryCard: {
    backgroundColor: Colors.success + '10',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.success + '30',
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.success,
    marginBottom: 5,
  },
  summaryPercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.success,
  },
  movementsSection: {
    marginBottom: 20,
  },
  movementsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 15,
  },
  movementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  movementIcon: {
    marginRight: 15,
  },
  movementIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movementDetails: {
    flex: 1,
  },
  movementDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  movementDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  movementPercentage: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '600',
  },
  movementAmountContainer: {
    alignItems: 'flex-end',
  },
  movementAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  earningsBadge: {
    backgroundColor: Colors.success,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  earningsBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.background,
  },
});

export default InvestmentHistoryScreen;