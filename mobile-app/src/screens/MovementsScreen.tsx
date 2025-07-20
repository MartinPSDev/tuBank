import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/Layout';
import { useRouter } from 'expo-router';

interface Movement {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  description: string;
  date: string;
  amount: number;
  icon: string;
  iconColor: string;
  initials?: string;
}

const MovementsScreen: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  // Generar 30 movimientos de muestra
  const movements: Movement[] = [
    {
      id: '1',
      type: 'income',
      description: 'DLP CAPITAL PARTNERS SA',
      date: '05/06/2025 09:34',
      amount: 8726.15,
      icon: 'person',
      iconColor: '#FF69B4',
      initials: 'DS'
    },
    {
      id: '2',
      type: 'income',
      description: 'MANESSI, MAIA',
      date: '04/06/2025 22:21',
      amount: 4510.00,
      icon: 'folder',
      iconColor: '#6B7280'
    },
    {
      id: '3',
      type: 'expense',
      description: 'YPF',
      date: '04/06/2025 20:52',
      amount: 13000.50,
      icon: 'qr-code',
      iconColor: '#8B5CF6'
    },
    {
      id: '4',
      type: 'income',
      description: 'CANDELA ARIADNA AQUINO',
      date: '04/06/2025 20:40',
      amount: 4380.00,
      icon: 'person',
      iconColor: '#E879F9',
      initials: 'CA'
    },
    {
      id: '5',
      type: 'income',
      description: 'TATIANA BAILON',
      date: '04/06/2025 19:46',
      amount: 3410.00,
      icon: 'person',
      iconColor: '#F472B6',
      initials: 'TB'
    },
    {
      id: '6',
      type: 'expense',
      description: 'Martina Perez Sotelo',
      date: '02/06/2025 22:21',
      amount: 10000.00,
      icon: 'person',
      iconColor: '#FB7185',
      initials: 'MS'
    },
    {
      id: '7',
      type: 'income',
      description: 'VALERIA ISABEL GARCIA',
      date: '02/06/2025 21:30',
      amount: 3200.00,
      icon: 'person',
      iconColor: '#34D399',
      initials: 'VG'
    },
    {
      id: '8',
      type: 'income',
      description: 'Devengado Cuentas Vista',
      date: '30/05/2025 23:08',
      amount: 0.34,
      icon: 'folder',
      iconColor: '#6B7280'
    },
    {
      id: '9',
      type: 'expense',
      description: 'Cobro IVA Serv. Digitales por compra',
      date: '30/05/2025 17:22',
      amount: 414.09,
      icon: 'receipt',
      iconColor: '#8B5CF6'
    },
    {
      id: '10',
      type: 'income',
      description: 'BANCO GALICIA',
      date: '29/05/2025 14:15',
      amount: 15000.00,
      icon: 'business',
      iconColor: '#3B82F6'
    },
    {
      id: '11',
      type: 'expense',
      description: 'Compra en Mercado Libre',
      date: '28/05/2025 16:45',
      amount: 2500.75,
      icon: 'storefront',
      iconColor: '#F59E0B'
    },
    {
      id: '12',
      type: 'income',
      description: 'RODRIGUEZ, CARLOS ALBERTO',
      date: '27/05/2025 11:30',
      amount: 7200.00,
      icon: 'person',
      iconColor: '#10B981',
      initials: 'CR'
    },
    {
      id: '13',
      type: 'expense',
      description: 'Shell',
      date: '26/05/2025 08:20',
      amount: 8500.00,
      icon: 'qr-code',
      iconColor: '#EF4444'
    },
    {
      id: '14',
      type: 'income',
      description: 'LOPEZ, MARIA FERNANDA',
      date: '25/05/2025 19:15',
      amount: 5600.00,
      icon: 'person',
      iconColor: '#A855F7',
      initials: 'ML'
    },
    {
      id: '15',
      type: 'expense',
      description: 'Farmacity',
      date: '24/05/2025 12:40',
      amount: 1250.30,
      icon: 'medical',
      iconColor: '#06B6D4'
    },
    {
      id: '16',
      type: 'income',
      description: 'GONZALEZ, PEDRO LUIS',
      date: '23/05/2025 15:22',
      amount: 9800.00,
      icon: 'person',
      iconColor: '#F97316',
      initials: 'PG'
    },
    {
      id: '17',
      type: 'expense',
      description: 'Starbucks',
      date: '22/05/2025 09:10',
      amount: 3200.00,
      icon: 'cafe',
      iconColor: '#059669'
    },
    {
      id: '18',
      type: 'income',
      description: 'MARTINEZ, ANA SOFIA',
      date: '21/05/2025 17:45',
      amount: 6750.00,
      icon: 'person',
      iconColor: '#EC4899',
      initials: 'AM'
    },
    {
      id: '19',
      type: 'expense',
      description: 'Uber',
      date: '20/05/2025 22:30',
      amount: 1800.00,
      icon: 'car',
      iconColor: '#000000'
    },
    {
      id: '20',
      type: 'income',
      description: 'FERNANDEZ, LUCIA BEATRIZ',
      date: '19/05/2025 13:20',
      amount: 4200.00,
      icon: 'person',
      iconColor: '#84CC16',
      initials: 'LF'
    },
    {
      id: '21',
      type: 'expense',
      description: 'McDonald\'s',
      date: '18/05/2025 20:15',
      amount: 2100.50,
      icon: 'restaurant',
      iconColor: '#DC2626'
    },
    {
      id: '22',
      type: 'income',
      description: 'SILVA, ROBERTO DANIEL',
      date: '17/05/2025 10:45',
      amount: 12500.00,
      icon: 'person',
      iconColor: '#7C3AED',
      initials: 'RS'
    },
    {
      id: '23',
      type: 'expense',
      description: 'Rappi',
      date: '16/05/2025 21:00',
      amount: 3500.75,
      icon: 'bicycle',
      iconColor: '#FF6B35'
    },
    {
      id: '24',
      type: 'income',
      description: 'TORRES, VALENTINA',
      date: '15/05/2025 16:30',
      amount: 8900.00,
      icon: 'person',
      iconColor: '#06B6D4',
      initials: 'VT'
    },
    {
      id: '25',
      type: 'expense',
      description: 'Coto',
      date: '14/05/2025 18:45',
      amount: 15600.25,
      icon: 'storefront',
      iconColor: '#059669'
    },
    {
      id: '26',
      type: 'income',
      description: 'MORALES, DIEGO ALEJANDRO',
      date: '13/05/2025 14:20',
      amount: 7800.00,
      icon: 'person',
      iconColor: '#F59E0B',
      initials: 'DM'
    },
    {
      id: '27',
      type: 'expense',
      description: 'Netflix',
      date: '12/05/2025 00:01',
      amount: 2999.00,
      icon: 'tv',
      iconColor: '#DC2626'
    },
    {
      id: '28',
      type: 'income',
      description: 'RAMIREZ, SOFIA ELENA',
      date: '11/05/2025 12:15',
      amount: 5400.00,
      icon: 'person',
      iconColor: '#8B5CF6',
      initials: 'SR'
    },
    {
      id: '29',
      type: 'expense',
      description: 'Spotify',
      date: '10/05/2025 06:30',
      amount: 1199.00,
      icon: 'musical-notes',
      iconColor: '#10B981'
    },
    {
      id: '30',
      type: 'income',
      description: 'HERRERA, MATIAS NICOLAS',
      date: '09/05/2025 19:45',
      amount: 11200.00,
      icon: 'person',
      iconColor: '#F97316',
      initials: 'MH'
    }
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
      </Pressable>
      <Text style={styles.headerTitle}>Movimientos</Text>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color={Colors.textSecondary} style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        placeholderTextColor={Colors.textSecondary}
      />
    </View>
  );

  const getMovementIcon = (movement: Movement) => {
    if (movement.initials) {
      return (
        <View style={[styles.avatarIcon, { backgroundColor: movement.iconColor }]}>
          <Text style={styles.avatarText}>{movement.initials}</Text>
        </View>
      );
    }

    let iconName: any = 'folder-outline';
    switch (movement.icon) {
      case 'person':
        iconName = 'person-circle-outline';
        break;
      case 'folder':
        iconName = 'folder-outline';
        break;
      case 'qr-code':
        iconName = 'qr-code';
        break;
      case 'receipt':
        iconName = 'receipt-outline';
        break;
      case 'business':
        iconName = 'business-outline';
        break;
      case 'storefront':
        iconName = 'storefront-outline';
        break;
      case 'medical':
        iconName = 'medical-outline';
        break;
      case 'cafe':
        iconName = 'cafe-outline';
        break;
      case 'car':
        iconName = 'car-outline';
        break;
      case 'restaurant':
        iconName = 'restaurant-outline';
        break;
      case 'bicycle':
        iconName = 'bicycle-outline';
        break;
      case 'tv':
        iconName = 'tv-outline';
        break;
      case 'musical-notes':
        iconName = 'musical-notes-outline';
        break;
    }

    return (
      <View style={[styles.regularIcon, { backgroundColor: movement.iconColor }]}>
        <Ionicons name={iconName} size={24} color={Colors.background} />
      </View>
    );
  };

  const renderMovementItem = (movement: Movement) => (
    <Pressable key={movement.id} style={styles.movementItem}>
      {getMovementIcon(movement)}
      <View style={styles.movementDetails}>
        <Text style={styles.movementDescription}>{movement.description}</Text>
        <Text style={styles.movementDate}>{movement.date}</Text>
      </View>
      <Text style={[
        styles.movementAmount,
        { color: movement.type === 'income' ? Colors.success : Colors.text }
      ]}>
        {movement.type === 'income' ? '+' : '-'}{movement.amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderHeader()}
      {renderSearchBar()}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {movements.map(renderMovementItem)}
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl + 20,
    paddingBottom: Spacing.md,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
    color: Colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  movementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundCard,
  },
  avatarIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    color: Colors.background,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
  },
  regularIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  movementDetails: {
    flex: 1,
  },
  movementDescription: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: Colors.text,
    marginBottom: 2,
  },
  movementDate: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  movementAmount: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
});

export default MovementsScreen;