import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/Colors';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '../../src/constants/Layout';

interface ProductItem {
  id: string;
  title: string;
  icon: string;
  iconType: 'ionicons' | 'material';
  color: string;
  description?: string;
}

export default function ProductosScreen() {
  const mainProducts: ProductItem[] = [
    {
      id: '1',
      title: 'Préstamos',
      icon: 'cash',
      iconType: 'ionicons',
      color: '#4CAF50',
      description: 'Personales e hipotecarios'
    },
    {
      id: '2',
      title: 'Tarjetas',
      icon: 'card',
      iconType: 'ionicons',
      color: '#2196F3',
      description: 'Débito y crédito'
    },
    {
      id: '3',
      title: 'Seguros',
      icon: 'shield-checkmark',
      iconType: 'ionicons',
      color: '#FF9800',
      description: 'Protección integral'
    },
    {
      id: '4',
      title: 'Inversiones',
      icon: 'trending-up',
      iconType: 'ionicons',
      color: '#9C27B0',
      description: 'Hace crecer tu dinero'
    },
    {
      id: '5',
      title: 'Cuentas',
      icon: 'wallet',
      iconType: 'ionicons',
      color: '#607D8B',
      description: 'Caja de ahorro y corriente'
    },
    {
      id: '6',
      title: 'Paquetes',
      icon: 'gift',
      iconType: 'ionicons',
      color: '#E91E63',
      description: 'Beneficios exclusivos'
    }
  ];

  const noveltyProducts: ProductItem[] = [
    {
      id: '7',
      title: 'Crypto',
      icon: 'logo-bitcoin',
      iconType: 'ionicons',
      color: '#FF6B35',
      description: 'Monedas digitales'
    },
    {
      id: '8',
      title: 'Plazo Fijo UVA',
      icon: 'time',
      iconType: 'ionicons',
      color: '#00BCD4',
      description: 'Ajustado por inflación'
    },
    {
      id: '9',
      title: 'Débito Automático',
      icon: 'refresh',
      iconType: 'ionicons',
      color: '#8BC34A',
      description: 'Pagos recurrentes'
    },
    {
      id: '10',
      title: 'Transferencias 3.0',
      icon: 'send',
      iconType: 'ionicons',
      color: '#3F51B5',
      description: 'Envíos instantáneos'
    },
    {
      id: '11',
      title: 'Cashback',
      icon: 'return-down-back',
      iconType: 'ionicons',
      color: '#FF5722',
      description: 'Dinero de vuelta'
    },
    {
      id: '12',
      title: 'Billetera Digital',
      icon: 'phone-portrait',
      iconType: 'ionicons',
      color: '#795548',
      description: 'Pagos con QR'
    }
  ];

  const additionalProducts: ProductItem[] = [
    {
      id: '13',
      title: 'Homebanking',
      icon: 'desktop',
      iconType: 'ionicons',
      color: '#607D8B',
      description: 'Banca online'
    },
    {
      id: '14',
      title: 'Cajeros',
      icon: 'business',
      iconType: 'ionicons',
      color: '#9E9E9E',
      description: 'Red de cajeros'
    },
    {
      id: '15',
      title: 'Sucursales',
      icon: 'location',
      iconType: 'ionicons',
      color: '#FF9800',
      description: 'Atención presencial'
    },
    {
      id: '16',
      title: 'Soporte 24/7',
      icon: 'headset',
      iconType: 'ionicons',
      color: '#4CAF50',
      description: 'Ayuda siempre disponible'
    },
    {
      id: '17',
      title: 'Notificaciones',
      icon: 'notifications',
      iconType: 'ionicons',
      color: '#2196F3',
      description: 'Alertas en tiempo real'
    },
    {
      id: '18',
      title: 'Configuración',
      icon: 'settings',
      iconType: 'ionicons',
      color: '#9C27B0',
      description: 'Personaliza tu experiencia'
    }
  ];

  const renderIcon = (item: ProductItem, size: number = 28) => {
    if (item.iconType === 'material') {
      return (
        <MaterialIcons 
          name={item.icon as any} 
          size={size} 
          color={item.color} 
        />
      );
    }
    return (
      <Ionicons 
        name={item.icon as any} 
        size={size} 
        color={item.color} 
      />
    );
  };

  const renderProductGrid = (products: ProductItem[], columns: number = 3) => {
    const rows = [];
    for (let i = 0; i < products.length; i += columns) {
      const rowItems = products.slice(i, i + columns);
      rows.push(
        <View key={i} style={styles.productRow}>
          {rowItems.map((item) => (
            <Pressable key={item.id} style={styles.productItem}>
              <View style={[styles.productIconContainer, { backgroundColor: item.color + '15' }]}>
                {renderIcon(item, 32)}
              </View>
              <Text style={styles.productTitle}>{item.title}</Text>
              {item.description && (
                <Text style={styles.productDescription}>{item.description}</Text>
              )}
            </Pressable>
          ))}
          {/* Fill empty spaces in the last row */}
          {rowItems.length < columns && 
            Array.from({ length: columns - rowItems.length }).map((_, index) => (
              <View key={`empty-${i}-${index}`} style={styles.productItem} />
            ))
          }
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Todos los productos</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Products Section */}
        <View style={styles.section}>
          {renderProductGrid(mainProducts)}
        </View>

        {/* Novelties Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Novedades</Text>
          {renderProductGrid(noveltyProducts)}
        </View>

        {/* Additional Products Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Servicios adicionales</Text>
          {renderProductGrid(additionalProducts)}
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl + 20,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.background,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  productItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.xs,
  },
  productIconContainer: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  productTitle: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  productDescription: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },
  bottomSpacing: {
    height: Spacing.xl,
  },
});