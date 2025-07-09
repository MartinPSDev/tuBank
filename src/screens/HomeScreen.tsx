import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Modal,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/Layout';
import { useBankData } from '../hooks/useBankData';
import { Transaction, Service, Promotion } from '../types';
import { useRouter } from 'expo-router';

const HomeScreen: React.FC = () => {
  const {
    accounts,
    transactions,
    investments,
    services,
    promotions,
    isLoading,
    getAccountBalance,
  } = useBankData();

  const router = useRouter();
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showCBUModal, setShowCBUModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<'pesos' | 'dolares'>('pesos');
  const [cbuCurrency, setCbuCurrency] = useState<'pesos' | 'dolares'>('pesos');

  const handleDepositPress = () => {
    router.push('/deposits');
  };

  const handleMovementsPress = () => {
    router.push('/movements');
  };

  const handleCBUPress = () => {
    setShowAccountModal(false);
    setShowCBUModal(true);
  };

  const handleInvestmentPress = () => {
    router.push('/investment');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>MP</Text>
            </View>
            <Pressable 
              style={styles.dropdownButton}
              onPress={() => setShowAccountModal(true)}
            >
              <Ionicons name="chevron-down" size={16} color={Colors.text} />
            </Pressable>
          </View>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.textSecondary} />
            <Text style={styles.searchText}>Buscar</Text>
          </View>
        </View>
      </View>

      <View style={styles.centerContent}>
        <View style={styles.currencyTabs}>
          <Pressable 
            style={[styles.currencyTab, selectedCurrency === 'pesos' && styles.currencyTabActive]}
            onPress={() => setSelectedCurrency('pesos')}
          >
            <Text style={selectedCurrency === 'pesos' ? styles.currencyTabTextActive : styles.currencyTabText}>PESOS</Text>
          </Pressable>
          <Pressable 
            style={[styles.currencyTab, selectedCurrency === 'dolares' && styles.currencyTabActiveDollar]}
            onPress={() => setSelectedCurrency('dolares')}
          >
            <Text style={selectedCurrency === 'dolares' ? styles.currencyTabTextActiveDollar : styles.currencyTabText}>DÓLARES</Text>
          </Pressable>
        </View>

        <View style={styles.balanceSection}>
          <Text style={[styles.balanceLabel, selectedCurrency === 'dolares' && styles.balanceLabelDollar]}>Saldo</Text>
          <Text style={[styles.balanceAmount, selectedCurrency === 'dolares' && styles.balanceAmountDollar]}>
            {selectedCurrency === 'dolares' ? 'USD ' : '$'}{getAccountBalance(selectedCurrency).toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <Pressable style={[styles.actionButton, styles.qrButton]}>
          <View style={[styles.qrIconContainer, selectedCurrency === 'dolares' && styles.greenIconContainer]}>
            <MaterialIcons name="qr-code" size={24} color={Colors.background} />
          </View>
          <Text style={styles.actionButtonText}>{selectedCurrency === 'dolares' ? 'Comprar' : 'Pago QR'}</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.purpleButton]} onPress={handleDepositPress}>
          <View style={[styles.purpleIconContainer, selectedCurrency === 'dolares' && styles.greenIconContainer]}>
            <Ionicons name="arrow-up" size={24} color={Colors.text} />
          </View>
          <Text style={styles.actionButtonText}>{selectedCurrency === 'dolares' ? 'Vender' : 'Depositar'}</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.purpleButton]}>
          <View style={[styles.purpleIconContainer, selectedCurrency === 'dolares' && styles.greenIconContainer]}>
            <Ionicons name="swap-horizontal" size={24} color={Colors.text} />
          </View>
          <Text style={styles.actionButtonText}>{selectedCurrency === 'dolares' ? 'Transferir' : 'Préstamos'}</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.purpleButton]} onPress={handleMovementsPress}>
          <View style={[styles.purpleIconContainer, selectedCurrency === 'dolares' && styles.greenIconContainer]}>
            <Ionicons name="list" size={24} color={Colors.text} />
          </View>
          <Text style={styles.actionButtonText}>Movimientos</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderDollarCard = () => (
    <Pressable style={[styles.dollarCard, selectedCurrency === 'dolares' && styles.dollarCardActive]}>
      <View style={styles.dollarCardContent}>
        <Text style={[styles.dollarCardTitle, selectedCurrency === 'dolares' && styles.dollarCardTitleActive]}>COMPRÁ DÓLARES</Text>
        <Text style={[styles.dollarCardAmount, selectedCurrency === 'dolares' && styles.dollarCardAmountActive]}>$ 1.265,00</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={selectedCurrency === 'dolares' ? '#22C55E' : Colors.primary} style={styles.dollarCardIcon} />
    </Pressable>
  );

  const renderModoPromo = () => (
    <LinearGradient
      colors={['#10B981', '#059669']}
      style={styles.modoPromo}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.modoPromoContent}>
        <View style={styles.modoPromoIcon}>
          <Text style={styles.modoPromoIconText}>%</Text>
        </View>
        <View style={styles.modoPromoText}>
          <Text style={styles.modoPromoTitle}>
            20% OFF en shoppings escaneando el QR de MODO ¡Sin tope!
          </Text>
          <Text style={styles.modoPromoSubtitle}>Conocer más →</Text>
        </View>
        <View style={styles.modoPromoLogo}>
          <Text style={styles.modoPromoLogoText}>MODO</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderServicesSection = () => {
    const getServiceIcon = (iconName: string) => {
      switch (iconName) {
        case 'credit-card':
          return <Ionicons name="card" size={24} color={Colors.text} />;
        case 'train':
          return <Ionicons name="train" size={24} color={Colors.text} />;
        case 'phone':
          return <Ionicons name="call" size={24} color={Colors.text} />;
        case 'zap':
          return <Ionicons name="flash" size={24} color={Colors.text} />;
        default:
          return <Ionicons name="card" size={24} color={Colors.text} />;
      }
    };

    return (
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Paga tus servicios y recargas</Text>
        <Pressable style={styles.searchServicesButton}>
          <Text style={styles.searchServicesText}>Buscar empresas</Text>
        </Pressable>
        <View style={styles.servicesGrid}>
          {services.slice(0, 6).map((service) => (
            <Pressable key={service.id} style={styles.serviceItem}>
              <View style={[styles.serviceIcon, { backgroundColor: getServiceColor(service.name) }]}>
                {getServiceIcon(service.icon)}
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    );
  };

  const getServiceColor = (serviceName: string): string => {
    switch (serviceName.toLowerCase()) {
      case 'visa':
        return Colors.visa;
      case 'sube':
        return Colors.sube;
      case 'movistar':
        return Colors.movistar;
      case 'claro':
        return Colors.claro;
      default:
        return Colors.primary;
    }
  };

  const renderInvestmentSection = () => (
    <View style={styles.investmentSection}>
      <Pressable style={styles.investmentCard} onPress={handleInvestmentPress}>
        <View style={styles.investmentContent}>
          <Text style={styles.investmentTitle}>En rendimiento</Text>
          <Text style={styles.investmentAmount}>$ 33.57</Text>
        </View>
        <View style={styles.investmentPerformanceContainer}>
          <Text style={styles.investmentPerformance}>29,00%</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
      </Pressable>
    </View>
  );

  const renderTransactionsSection = () => (
    <View style={styles.transactionsSection}>
      <View style={styles.transactionHeader}>
        <Text style={styles.sectionTitle}>Últimos movimientos</Text>
        <Pressable>
          <Text style={styles.seeAllText}>Ver análisis</Text>
        </Pressable>
      </View>
      {transactions.slice(0, 3).map((transaction) => (
        <View key={transaction.id} style={styles.transactionItem}>
          <View style={styles.transactionIcon}>
            <View style={[
              styles.transactionIconCircle,
              { backgroundColor: transaction.type === 'income' ? Colors.success : Colors.backgroundCard }
            ]}>
              <Text style={styles.transactionIconText}>
                {transaction.type === 'income' ? '↗' : transaction.description.includes('Martina') ? 'MS' : '↗'}
              </Text>
            </View>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionDescription}>{transaction.description}</Text>
            <Text style={styles.transactionDate}>{transaction.date}</Text>
          </View>
          <Text style={[
            styles.transactionAmount,
            { color: transaction.type === 'income' ? Colors.success : Colors.text }
          ]}>
            {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </Text>
        </View>
      ))}
      <Pressable style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>Ver todos</Text>
      </Pressable>
    </View>
  );

  const renderPromotionsSection = () => (
    <View style={styles.promotionsSection}>
      <View style={styles.promotionHeader}>
        <Text style={styles.sectionTitle}>Promociones</Text>
        <Pressable>
          <Text style={styles.seeAllText}>Ver todos</Text>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promotionsScroll}>
        {promotions.map((promotion) => (
          <Pressable key={promotion.id} style={styles.promotionItem}>
            <View style={styles.promotionIcon}>
              <Text style={styles.promotionIconText}>{promotion.title.charAt(0)}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

  const renderCBUModal = () => (
    <Modal
      visible={showCBUModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowCBUModal(false)}
    >
      <View style={styles.modalOverlay}>
        <Pressable 
          style={styles.modalBackdrop} 
          onPress={() => setShowCBUModal(false)}
        />
        <View style={styles.cbuModal}>
          <View style={styles.cbuHeader}>
            <Text style={styles.cbuTitle}>¡Traé tu sueldo a Brubank!</Text>
            <Text style={styles.cbuSubtitle}>Mirá todos los beneficios que podés obtener.</Text>
            <View style={styles.percentageIcon}>
              <Text style={styles.percentageText}>%</Text>
            </View>
          </View>
          
          <View style={styles.qrSection}>
            <View style={styles.qrCode}>
              <View style={styles.qrPattern}>
                <View style={[styles.qrSquare, styles.qrTopLeft]} />
                <View style={[styles.qrSquare, styles.qrTopRight]} />
                <View style={[styles.qrSquare, styles.qrBottomLeft]} />
                <View style={styles.qrCenter}>
                  <Text style={styles.qrCenterText}>b</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.userName}>Martin Raul Perez Sotelo</Text>
            <Text style={styles.shareText}>Compartí tu QR para que te envíen dinero a tu cuenta</Text>
            
            <View style={styles.currencySelector}>
              <Pressable 
                style={[styles.currencyOption, cbuCurrency === 'pesos' && styles.currencyOptionActive]}
                onPress={() => setCbuCurrency('pesos')}
              >
                <Text style={[styles.currencyOptionText, cbuCurrency === 'pesos' && styles.currencyOptionTextActive]}>PESOS</Text>
              </Pressable>
              <Pressable 
                style={[styles.currencyOption, cbuCurrency === 'dolares' && styles.currencyOptionActiveDollar]}
                onPress={() => setCbuCurrency('dolares')}
              >
                <Text style={[styles.currencyOptionText, cbuCurrency === 'dolares' && styles.currencyOptionTextActiveDollar]}>DÓLARES</Text>
              </Pressable>
            </View>
          </View>
          
          <View style={styles.accountDetails}>
            <View style={styles.accountDetailRow}>
              <Text style={styles.accountDetailLabel}>Mi CBU</Text>
              <View style={styles.accountDetailActions}>
                <Ionicons name="copy-outline" size={20} color={Colors.primary} />
              </View>
            </View>
            <Text style={styles.accountDetailValue}>
              {cbuCurrency === 'pesos' ? '1430001713001153280019' : '1430001714001153280027'}
            </Text>
            
            <View style={styles.accountDetailRow}>
              <Text style={styles.accountDetailLabel}>Alias</Text>
              <View style={styles.accountDetailActions}>
                <Ionicons name="pencil-outline" size={20} color={Colors.primary} />
                <Ionicons name="copy-outline" size={20} color={Colors.primary} />
              </View>
            </View>
            <Text style={styles.accountDetailValue}>
              {cbuCurrency === 'pesos' ? 'martinpe.bru' : 'AMIGO.PAMPA.BARCO'}
            </Text>
            
            <View style={styles.accountDetailRow}>
              <Text style={styles.accountDetailLabel}>Número de cuenta</Text>
              <View style={styles.accountDetailActions}>
                <Ionicons name="copy-outline" size={20} color={Colors.primary} />
              </View>
            </View>
            <Text style={styles.accountDetailValue}>
              {cbuCurrency === 'pesos' ? '1300115328001' : '1400115328002'}
            </Text>
            
            <Pressable style={styles.cbuDetailRow}>
              <Text style={styles.cbuDetailLabel}>Todos los datos de mi cuenta</Text>
              <Text style={styles.cbuDetailSubtitle}>Datos bancarios</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderAccountModal = () => (
    <Modal
      visible={showAccountModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowAccountModal(false)}
    >
      <View style={styles.modalOverlay}>
        <Pressable 
          style={styles.modalBackdrop} 
          onPress={() => setShowAccountModal(false)}
        />
        <View style={styles.accountModal}>
          <View style={styles.modalHeader}>
            <Pressable 
              style={styles.closeButton}
              onPress={() => setShowAccountModal(false)}
            >
              <Ionicons name="close" size={24} color={Colors.textSecondary} />
            </Pressable>
            <Text style={styles.modalTitle}>Mi cuenta</Text>
          </View>
          
          <View style={styles.userProfile}>
            <View style={styles.profileInfo}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>MP</Text>
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>Martin Raul Perez Sotelo</Text>
                <Text style={styles.profileCBU}>CBU 1430001713001153280019</Text>
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                </View>
              </View>
            </View>
            
            <View style={styles.profileActions}>
              <Pressable style={styles.aliasButton} onPress={handleCBUPress}>
                <Text style={styles.aliasButtonText}>Mi alias y CBU</Text>
              </Pressable>
              <Pressable style={styles.benefitsButton}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.benefitsButtonText}>Beneficios Bruplus</Text>
              </Pressable>
            </View>
          </View>
          
          <View style={styles.menuOptions}>
            <Pressable style={styles.menuOption}>
              <Ionicons name="help-circle-outline" size={24} color={Colors.primary} />
              <Text style={styles.menuOptionText}>Soporte</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </Pressable>
            
            <Pressable style={styles.menuOption}>
              <Ionicons name="person-outline" size={24} color={Colors.primary} />
              <Text style={styles.menuOptionText}>Ver mis datos</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </Pressable>
            
            <Pressable style={styles.menuOption}>
              <Ionicons name="people-outline" size={24} color={Colors.primary} />
              <Text style={styles.menuOptionText}>Control familiar</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </Pressable>
            
            <Pressable style={styles.menuOption}>
              <Ionicons name="shield-outline" size={24} color={Colors.primary} />
              <Text style={styles.menuOptionText}>Seguridad</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </Pressable>
            
            <Pressable style={styles.menuOption}>
              <Ionicons name="gift-outline" size={24} color={Colors.primary} />
              <Text style={styles.menuOptionText}>Invitá amigos</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </Pressable>
            
            <Pressable style={styles.menuOption}>
              <Ionicons name="notifications-outline" size={24} color={Colors.primary} />
              <Text style={styles.menuOptionText}>Notificaciones</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </Pressable>
          </View>
          
          <View style={styles.screenModeSection}>
            <Text style={styles.screenModeTitle}>Modo de pantalla</Text>
            <View style={styles.screenModeOptions}>
              <Text style={styles.screenModeSelected}>Predeterminado</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
            </View>
          </View>
          
          <Text style={styles.versionText}>v.2.52.0</Text>
        </View>
      </View>
    </Modal>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderDollarCard()}
        {renderModoPromo()}
        {renderServicesSection()}
        {renderInvestmentSection()}
        {renderTransactionsSection()}
        {renderPromotionsSection()}
        <View style={styles.bottomSpacing} />
      </ScrollView>
      {renderAccountModal()}
      {renderCBUModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  headerTop: {
    marginBottom: Spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5E6D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    color: '#D97706',
  },
  dropdownButton: {
    padding: Spacing.xs,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  searchText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
  },
  centerContent: {
    alignItems: 'center',
  },
  currencyTabs: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    justifyContent: 'center',
  },
  currencyTab: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.sm,
  },
  currencyTabActive: {
    backgroundColor: Colors.primary,
  },
  currencyTabText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
  currencyTabTextActive: {
    color: Colors.text,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
  balanceSection: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  balanceLabel: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    marginBottom: Spacing.xs,
  },
  balanceAmount: {
    color: Colors.text,
    fontSize: FontSizes.display,
    fontWeight: FontWeights.bold,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  qrButton: {
    alignItems: 'center',
  },
  qrIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  purpleButton: {
    alignItems: 'center',
  },
  purpleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: Colors.text,
    fontSize: FontSizes.xs,
    textAlign: 'center',
  },
  dollarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 20,
    height: 60,
  },
  dollarCardContent: {
    flex: 1,
  },
  dollarCardTitle: {
    color: '#B794F6',
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    marginBottom: 2,
  },
  dollarCardAmount: {
    color: '#B794F6',
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  dollarCardIcon: {
    opacity: 0.7,
  },
  modoPromo: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  modoPromoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modoPromoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  modoPromoIconText: {
    color: Colors.text,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  modoPromoText: {
    flex: 1,
  },
  modoPromoTitle: {
    color: Colors.text,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    marginBottom: Spacing.xs,
  },
  modoPromoSubtitle: {
    color: Colors.text,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
  },
  modoPromoLogo: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  modoPromoLogoText: {
    color: Colors.text,
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
  },
  servicesSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.md,
  },
  searchServicesButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
  },
  searchServicesText: {
    color: Colors.text,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  serviceItem: {
    width: '15%',
    aspectRatio: 1,
  },
  serviceIcon: {
    flex: 1,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  investmentSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  investmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
  },
  investmentContent: {
    flex: 1,
  },
  investmentTitle: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
  },
  investmentAmount: {
    color: Colors.text,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  investmentPerformanceContainer: {
    backgroundColor: '#22C55E',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.sm,
  },
  investmentPerformance: {
    color: Colors.text,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
  },
  transactionsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  transactionIcon: {
    marginRight: Spacing.md,
  },
  transactionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
  },
  transactionIconText: {
    color: Colors.text,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    color: Colors.text,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    marginBottom: Spacing.xs,
  },
  transactionDate: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
  },
  transactionAmount: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
  },
  seeAllButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  seeAllText: {
    color: Colors.primary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  promotionsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  promotionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  promotionsScroll: {
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  promotionItem: {
    width: 60,
    height: 60,
    marginRight: Spacing.md,
  },
  promotionIcon: {
    flex: 1,
    borderRadius: BorderRadius.md,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promotionIconText: {
    color: Colors.text,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  bottomSpacing: {
    height: 100,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
  },
  accountModal: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    left: 0,
    padding: Spacing.sm,
  },
  modalTitle: {
    color: Colors.text,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  userProfile: {
    marginBottom: Spacing.xl,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    backgroundColor: '#2A2A2A',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5E6D3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  profileAvatarText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: '#D97706',
  },
  profileDetails: {
    flex: 1,
    position: 'relative',
  },
  profileName: {
    color: Colors.text,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  profileCBU: {
    color: Colors.primary,
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  profileActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  aliasButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  aliasButtonText: {
    color: Colors.text,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  benefitsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  benefitsButtonText: {
    color: '#FFD700',
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  menuOptions: {
    marginBottom: Spacing.xl,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  menuOptionText: {
    flex: 1,
    color: Colors.text,
    fontSize: FontSizes.md,
    marginLeft: Spacing.md,
  },
  screenModeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    marginBottom: Spacing.lg,
  },
  screenModeTitle: {
    color: Colors.text,
    fontSize: FontSizes.md,
  },
  screenModeOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  screenModeSelected: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
  },
  versionText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
  // Dollar mode styles
  currencyTabActiveDollar: {
    backgroundColor: '#22C55E',
  },
  currencyTabTextActiveDollar: {
    color: Colors.text,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
  balanceLabelDollar: {
    color: '#22C55E',
  },
  balanceAmountDollar: {
    color: '#22C55E',
  },
  greenIconContainer: {
    backgroundColor: '#22C55E',
  },
  dollarCardActive: {
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#16A34A',
  },
  dollarCardTitleActive: {
    color: Colors.text,
  },
  dollarCardAmountActive: {
    color: Colors.text,
  },
  // CBU Modal styles
  cbuModal: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
    maxHeight: '95%',
  },
  cbuHeader: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    position: 'relative',
  },
  cbuTitle: {
    color: Colors.text,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  cbuSubtitle: {
    color: Colors.text,
    fontSize: FontSizes.md,
  },
  percentageIcon: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    color: Colors.text,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: Colors.text,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  qrPattern: {
    width: 180,
    height: 180,
    position: 'relative',
  },
  qrSquare: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: Colors.background,
  },
  qrTopLeft: {
    top: 10,
    left: 10,
  },
  qrTopRight: {
    top: 10,
    right: 10,
  },
  qrBottomLeft: {
    bottom: 10,
    left: 10,
  },
  qrCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
    width: 30,
    height: 30,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCenterText: {
    color: Colors.text,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  userName: {
    color: Colors.text,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  shareText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  currencySelector: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: BorderRadius.lg,
    padding: 4,
  },
  currencyOption: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    minWidth: 100,
    alignItems: 'center',
  },
  currencyOptionActive: {
    backgroundColor: Colors.primary,
  },
  currencyOptionActiveDollar: {
    backgroundColor: '#22C55E',
  },
  currencyOptionText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
  currencyOptionTextActive: {
    color: Colors.text,
  },
  currencyOptionTextActiveDollar: {
    color: Colors.text,
  },
  accountDetails: {
    gap: Spacing.lg,
  },
  accountDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  accountDetailLabel: {
    color: Colors.text,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  accountDetailActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  accountDetailValue: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    marginBottom: Spacing.md,
  },
  cbuDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  cbuDetailLabel: {
    flex: 1,
    color: Colors.text,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  cbuDetailSubtitle: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    marginRight: Spacing.md,
  },
});

export default HomeScreen;