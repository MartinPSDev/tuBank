import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const InvestmentScreen: React.FC = () => {
  const router = useRouter();
  const [showTNAModal, setShowTNAModal] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleInvestMore = () => {
    router.push('/invest-amount');
  };

  const handleWithdraw = () => {
    router.push('/withdraw-amount');
  };

  const handleHistory = () => {
    router.push('/investment-history');
  };

  const handleTNSPress = () => {
    setShowTNAModal(true);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color={Colors.text} />
      </Pressable>
      <Text style={styles.headerTitle}>Invertido</Text>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtonsContainer}>
      <Pressable style={styles.actionButton} onPress={handleInvestMore}>
        <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
        <Text style={styles.actionButtonText}>Invertir más</Text>
      </Pressable>
      
      <Pressable style={styles.actionButton} onPress={handleWithdraw}>
        <Ionicons name="remove-circle-outline" size={24} color={Colors.primary} />
        <Text style={styles.actionButtonText}>Retirar</Text>
      </Pressable>
      
      <Pressable style={styles.actionButton} onPress={handleHistory}>
        <Ionicons name="time-outline" size={24} color={Colors.primary} />
        <Text style={styles.actionButtonText}>Histórico</Text>
      </Pressable>
    </View>
  );

  const renderBalanceBars = () => (
    <View style={styles.balanceSection}>
      <Text style={styles.balanceTitle}>Balance de inversiones</Text>
      
      <View style={styles.balanceItem}>
        <View style={styles.balanceInfo}>
          <Text style={styles.balanceLabel}>Capital invertido</Text>
          <Text style={styles.balanceAmount}>$25,000.00</Text>
        </View>
        <View style={styles.balanceBar}>
          <View style={[styles.balanceProgress, { width: '70%', backgroundColor: Colors.primary }]} />
        </View>
      </View>
      
      <View style={styles.balanceItem}>
        <View style={styles.balanceInfo}>
          <Text style={styles.balanceLabel}>Rendimiento generado</Text>
          <Text style={styles.balanceAmount}>$8,570.00</Text>
        </View>
        <View style={styles.balanceBar}>
          <View style={[styles.balanceProgress, { width: '30%', backgroundColor: Colors.success }]} />
        </View>
      </View>
      
      <View style={styles.totalBalance}>
        <Text style={styles.totalLabel}>Total disponible</Text>
        <Text style={styles.totalAmount}>$33,570.00</Text>
      </View>
    </View>
  );

  const renderTNSItems = () => (
    <View style={styles.tnsSection}>
      <Text style={styles.tnsTitle}>Instrumentos TNS</Text>
      
      <Pressable style={styles.tnsItem} onPress={handleTNSPress}>
        <View style={styles.tnsIcon}>
          <Ionicons name="trending-up" size={24} color={Colors.primary} />
        </View>
        <View style={styles.tnsInfo}>
          <Text style={styles.tnsName}>Fondo Común de Inversión</Text>
          <Text style={styles.tnsDescription}>Rendimiento variable</Text>
        </View>
        <View style={styles.tnsPerformance}>
          <Text style={styles.tnsPercentage}>+12.5%</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </View>
      </Pressable>
      
      <View style={styles.tnsItem}>
        <View style={styles.tnsIcon}>
          <Ionicons name="bar-chart" size={24} color={Colors.primary} />
        </View>
        <View style={styles.tnsInfo}>
          <Text style={styles.tnsName}>Plazo Fijo UVA</Text>
          <Text style={styles.tnsDescription}>Rendimiento fijo</Text>
        </View>
        <View style={styles.tnsPerformance}>
          <Text style={styles.tnsPercentage}>+8.2%</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </View>
      </View>
      
      <View style={styles.tnsItem}>
        <View style={styles.tnsIcon}>
          <Ionicons name="analytics" size={24} color={Colors.primary} />
        </View>
        <View style={styles.tnsInfo}>
          <Text style={styles.tnsName}>Bonos del Tesoro</Text>
          <Text style={styles.tnsDescription}>Bajo riesgo</Text>
        </View>
        <View style={styles.tnsPerformance}>
          <Text style={styles.tnsPercentage}>+6.8%</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </View>
      </View>
    </View>
  );

  const renderTNAModal = () => (
    <Modal
      visible={showTNAModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowTNAModal(false)}
    >
      <View style={styles.modalOverlay}>
        <Pressable 
          style={styles.modalBackdrop} 
          onPress={() => setShowTNAModal(false)}
        />
        <View style={styles.tnaModal}>
          <View style={styles.tnaHeader}>
            <Text style={styles.tnaTitle}>TNA - Tasa Nominal Anual</Text>
            <Pressable onPress={() => setShowTNAModal(false)}>
              <Ionicons name="close" size={24} color={Colors.textSecondary} />
            </Pressable>
          </View>
          
          <View style={styles.tnaContent}>
            <View style={styles.tnaCard}>
              <Text style={styles.tnaLabel}>Fondo Común de Inversión</Text>
              <Text style={styles.tnaRate}>29.50% TNA</Text>
              <Text style={styles.tnaDescription}>
                Tasa nominal anual proyectada basada en el rendimiento de los últimos 12 meses.
              </Text>
            </View>
            
            <View style={styles.tnaDetails}>
              <View style={styles.tnaDetailRow}>
                <Text style={styles.tnaDetailLabel}>Rendimiento mensual promedio</Text>
                <Text style={styles.tnaDetailValue}>2.45%</Text>
              </View>
              <View style={styles.tnaDetailRow}>
                <Text style={styles.tnaDetailLabel}>Último rendimiento</Text>
                <Text style={styles.tnaDetailValue}>+$127.50</Text>
              </View>
              <View style={styles.tnaDetailRow}>
                <Text style={styles.tnaDetailLabel}>Próximo pago</Text>
                <Text style={styles.tnaDetailValue}>15/01/2025</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderActionButtons()}
        {renderBalanceBars()}
        {renderTNSItems()}
      </ScrollView>
      {renderTNAModal()}
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
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 5,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  balanceSection: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 20,
  },
  balanceItem: {
    marginBottom: 15,
  },
  balanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  balanceAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  balanceBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  balanceProgress: {
    height: '100%',
    borderRadius: 3,
  },
  totalBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.success,
  },
  tnsSection: {
    marginBottom: 20,
  },
  tnsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 15,
  },
  tnsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  tnsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  tnsInfo: {
    flex: 1,
  },
  tnsName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  tnsDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  tnsPerformance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tnsPercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.success,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
  },
  tnaModal: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '50%',
  },
  tnaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tnaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  tnaContent: {
    flex: 1,
  },
  tnaCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  tnaLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  tnaRate: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 12,
  },
  tnaDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  tnaDetails: {
    flex: 1,
  },
  tnaDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tnaDetailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  tnaDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default InvestmentScreen;