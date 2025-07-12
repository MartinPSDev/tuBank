import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Colors } from '../constants/Colors';
import { BorderRadius, FontSizes, Spacing } from '../constants/Layout';
import { useBankData } from '../hooks/useBankData';
import { Promotion, Service, Transaction } from '../types';

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

  // Animación del Header
  const headerAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Animación de la Tarjeta de Dólares 
  const dollarCardAnim = useRef(new Animated.Value(0)).current;
  // Estado para controlar qué ícono mostrar (sin animar el ícono directamente)
  const [iconColorState, setIconColorState] = useState<'purple' | 'green'>('purple');

  useEffect(() => {
    // Listener para cambiar el color del ícono en el punto medio de la animación
    const listenerId = dollarCardAnim.addListener(({ value }) => {
      if (value > 0.5 && iconColorState !== 'green') {
        setIconColorState('green');
      } else if (value <= 0.5 && iconColorState !== 'purple') {
        setIconColorState('purple');
      }
    });

    const interval = setInterval(() => {
      // Inicia la animación de 0 a 1 o de 1 a 0
      Animated.timing(dollarCardAnim, {
        toValue: dollarCardAnim._value === 0 ? 1 : 0,
        duration: 1500,
        useNativeDriver: false, // Necesario para animar `borderColor`
      }).start();
    }, 4000);

    return () => {
      dollarCardAnim.removeListener(listenerId);
      clearInterval(interval);
    };
  }, [dollarCardAnim, iconColorState]);

  const handleDepositPress = () => router.push('/deposits');
  const handleMovementsPress = () => router.push('/movements');
  const handleInvestmentPress = () => router.push('/investment');
  const handleCBUPress = () => {
    setShowAccountModal(false);
    setShowCBUModal(true);
  };

  const userNameStyle = {
    opacity: headerAnim.interpolate({ inputRange: [0, 0.5], outputRange: [1, 0], extrapolate: 'clamp' }),
    transform: [{
      translateX: headerAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -20], extrapolate: 'clamp' }),
    }],
  };

  const searchContainerStyle = {
    opacity: headerAnim.interpolate({ inputRange: [0.5, 1], outputRange: [0, 1], extrapolate: 'clamp' }),
    transform: [{
      translateX: headerAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0], extrapolate: 'clamp' }),
    }],
  };
  
  const comprarDolaresStyle = {
    opacity: dollarCardAnim.interpolate({ inputRange: [0, 0.5], outputRange: [1, 0] }),
    transform: [{
      translateY: dollarCardAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -20] }),
    }],
  };
  
  const venderDolaresStyle = {
    opacity: dollarCardAnim.interpolate({ inputRange: [0.5, 1], outputRange: [0, 1] }),
    transform: [{
      translateY: dollarCardAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }),
    }],
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>MP</Text>
            </View>
            <Pressable style={styles.dropdownButton} onPress={() => setShowAccountModal(true)}>
              <Ionicons name="chevron-down" size={16} color={Colors.primary} />
            </Pressable>
          </View>
          <View style={styles.animatedHeaderContent}>
            <View style={styles.userNameWrapper}>
              <Animated.View style={[styles.animatedElement, userNameStyle]}>
                <Text style={styles.userNameText}>Martin</Text>
              </Animated.View>
            </View>
            <View style={styles.searchWrapper}>
              <Animated.View style={[styles.animatedElement, styles.searchInner, searchContainerStyle]}>
                <Ionicons name="search" size={18} color={Colors.textSecondary} />
                <Text style={styles.searchText}>Buscar</Text>
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.centerContent}>
        <View style={styles.currencyTabs}>
          <Pressable style={[styles.currencyTab, selectedCurrency === 'pesos' && styles.currencyTabActive]} onPress={() => setSelectedCurrency('pesos')}>
            <Text style={selectedCurrency === 'pesos' ? styles.currencyTabTextActive : styles.currencyTabText}>PESOS</Text>
          </Pressable>
          <Pressable style={[styles.currencyTab, selectedCurrency === 'dolares' && styles.currencyTabActiveDollar]} onPress={() => setSelectedCurrency('dolares')}>
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
        <Pressable style={styles.actionButton}>
          <View style={[styles.actionIconContainer, {backgroundColor: Colors.text}]}>
            <MaterialIcons name="qr-code" size={28} color={Colors.background} />
          </View>
          <Text style={styles.actionButtonText}>{selectedCurrency === 'dolares' ? 'Comprar' : 'Pago QR'}</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={handleDepositPress}>
          <View style={[styles.actionIconContainer, selectedCurrency === 'dolares' && styles.greenIconContainer]}>
            <Ionicons name="arrow-up" size={28} color={Colors.text} />
          </View>
          <Text style={styles.actionButtonText}>{selectedCurrency === 'dolares' ? 'Vender' : 'Depositar'}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <View style={[styles.actionIconContainer, selectedCurrency === 'dolares' && styles.greenIconContainer]}>
            <Ionicons name="swap-horizontal" size={28} color={Colors.text} />
          </View>
          <Text style={styles.actionButtonText}>{selectedCurrency === 'dolares' ? 'Transferir' : 'Préstamos'}</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={handleMovementsPress}>
          <View style={[styles.actionIconContainer, selectedCurrency === 'dolares' && styles.greenIconContainer]}>
            <Ionicons name="list" size={28} color={Colors.text} />
          </View>
          <Text style={styles.actionButtonText}>Movimientos</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderDollarCard = () => {
    const animatedBorderStyle = {
      borderColor: dollarCardAnim.interpolate({
        inputRange: [0, 0.49, 0.5, 1],
        outputRange: ['#3A3A3A', '#3A3A3A', '#22C55E', '#22C55E'],
      }),
    };
    return (
      <Animated.View style={[styles.dollarCard, animatedBorderStyle, { overflow: 'hidden' }]}>
        <Pressable style={styles.dollarCardPressable}>
          <Animated.View style={[styles.animatedDollarCardItem, comprarDolaresStyle]}>
            <View style={styles.dollarCardRow}>
              <Text style={styles.dollarCardTitlePurple}>COMPRÁ DÓLARES</Text>
              <Text style={styles.dollarCardAmountPurple}>$ 1.265,00</Text>
            </View>
          </Animated.View>
          <Animated.View style={[styles.animatedDollarCardItem, venderDolaresStyle]}>
            <View style={styles.dollarCardRow}>
              <Text style={styles.dollarCardTitleGreen}>VENDÉ DÓLARES</Text>
              <Text style={styles.dollarCardAmountGreen}>$ 1.220,00</Text>
            </View>
          </Animated.View>
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={iconColorState === 'purple' ? Colors.primary : '#22C55E'} 
            style={styles.dollarCardArrow}
          />
        </Pressable>
      </Animated.View>
    );
  };

  const renderModoPromo = () => (
    <LinearGradient colors={['#10B981', '#059669']} style={styles.modoPromo} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
      <View style={styles.modoPromoContent}>
        <View style={styles.modoPromoIcon}><Text style={styles.modoPromoIconText}>%</Text></View>
        <View style={styles.modoPromoText}>
          <Text style={styles.modoPromoTitle}>20% OFF en shoppings escaneando el QR de MODO ¡Sin tope!</Text>
          <Text style={styles.modoPromoSubtitle}>Conocer más →</Text>
        </View>
        <View style={styles.modoPromoLogo}><Text style={styles.modoPromoLogoText}>MODO</Text></View>
      </View>
    </LinearGradient>
  );
  
  const renderServicesSection = () => {
    const getServiceIcon = (iconName: string) => {
      const icons: { [key: string]: React.ReactNode } = {
        'credit-card': <Ionicons name="card" size={24} color={Colors.text} />,
        'train': <Ionicons name="train" size={24} color={Colors.text} />,
        'phone': <Ionicons name="call" size={24} color={Colors.text} />,
        'zap': <Ionicons name="flash" size={24} color={Colors.text} />,
      };
      return icons[iconName] || icons['credit-card'];
    };
    return (
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Paga tus servicios y recargas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.servicesScrollContainer}>
          <Pressable style={styles.serviceItemContainer}>
             <View style={styles.searchServicesCircleButton}>
              <Text style={styles.searchServicesCircleButtonText}>Buscar empresas</Text>
            </View>
          </Pressable>
          {services.slice(0, 6).map((service: Service) => (
            <Pressable key={service.id} style={styles.serviceItemContainer}>
              <View style={[styles.serviceIcon, { backgroundColor: getServiceColor(service.name) }]}>
                {getServiceIcon(service.icon)}
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  };

  const getServiceColor = (serviceName: string): string => {
    const colors: { [key: string]: string } = {
      visa: Colors.visa,
      sube: Colors.sube,
      movistar: Colors.movistar,
      claro: Colors.claro,
    };
    return colors[serviceName.toLowerCase()] || Colors.primary;
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
        <Pressable><Text style={styles.seeAllText}>Ver análisis</Text></Pressable>
      </View>
      {transactions.slice(0, 3).map((transaction: Transaction) => (
        <View key={transaction.id} style={styles.transactionItem}>
          <View style={styles.transactionIconContainer}>
            <View style={[styles.transactionIconCircle, { backgroundColor: transaction.type === 'income' ? Colors.success : '#2A2A2A' }]}>
              <Text style={styles.transactionIconText}>
                {transaction.type === 'income' ? '↗' : transaction.description.includes('Martina') ? 'MS' : '↗'}
              </Text>
            </View>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionDescription}>{transaction.description}</Text>
            <Text style={styles.transactionDate}>{transaction.date}</Text>
          </View>
          <Text style={[styles.transactionAmount, { color: transaction.type === 'income' ? Colors.success : Colors.text }]}>
            {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </Text>
        </View>
      ))}
      <Pressable style={styles.seeAllButton}><Text style={styles.seeAllText}>Ver todos</Text></Pressable>
    </View>
  );

  const renderPromotionsSection = () => (
    <View style={styles.promotionsSection}>
      <View style={styles.promotionHeader}>
        <Text style={styles.sectionTitle}>Promociones</Text>
        <Pressable><Text style={styles.seeAllText}>Ver todos</Text></Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promotionsScroll}>
        {promotions.map((promotion: Promotion) => (
          <Pressable key={promotion.id} style={styles.promotionItem}>
            <View style={styles.promotionIcon}>
              <Text style={styles.promotionIconText}>{promotion.title.substring(0,4).toUpperCase()}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

  const renderCBUModal = () => (
    <Modal visible={showCBUModal} transparent animationType="slide" onRequestClose={() => setShowCBUModal(false)}>
      {/* CBU Modal Content Goes Here */}
    </Modal>
  );

  const renderAccountModal = () => (
    <Modal visible={showAccountModal} transparent animationType="slide" onRequestClose={() => setShowAccountModal(false)}>
      {/* Account Modal Content Goes Here */}
    </Modal>
  );

  if (isLoading) {
    return null; // O redirigir directamente al contenido principal
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} showsHorizontalScrollIndicator={false}>
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
  container: { flex: 1, backgroundColor: Colors.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  scrollView: { flex: 1 },
  header: { 
    paddingTop: 60, 
    paddingHorizontal: 12,  
    paddingBottom: Spacing.lg 
  },
  headerTop: { marginBottom: Spacing.lg },
  userInfo: { flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  width: '100%'
  },
  avatarContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    paddingHorizontal: 7,
    height: 38,
    gap: 4 
  },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#F5E6D3', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: FontSizes.md, fontWeight: 'bold', color: '#D97706' },
  dropdownButton: {
    padding: 4, 
    marginLeft: -4  
  },
  animatedHeaderContent: { flex: 1, height: 38, position: 'relative', justifyContent: 'center' },
  userNameWrapper: { position: 'absolute', left: 0, top: 0, bottom: 0, justifyContent: 'center' },
  searchWrapper: { position: 'absolute',
    left: 0,
    right: 0,
    top: 0, 
    bottom: 0,
    width: '100%' },
  animatedElement: { backgroundColor: '#2A2A2A',
    borderRadius: 20, 
    paddingHorizontal: 8,
    height: '90%',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '100%',
    },
  userNameText: { color: Colors.text, fontSize: FontSizes.md, fontWeight: '500' },
  searchInner: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  searchText: { color: Colors.textSecondary, fontSize: FontSizes.md },
  centerContent: { alignItems: 'center' },
  currencyTabs: { flexDirection: 'row', marginBottom: Spacing.lg, justifyContent: 'center' },
  currencyTab: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: BorderRadius.lg, marginRight: Spacing.sm },
  currencyTabActive: { backgroundColor: Colors.primary },
  currencyTabText: { color: '#22C55E', fontSize: FontSizes.sm, fontWeight: '500' },
  currencyTabTextActive: { color: Colors.text, fontSize: FontSizes.sm, fontWeight: '500' },
  balanceSection: { marginBottom: Spacing.md, alignItems: 'center' },
  balanceLabel: { color: Colors.textSecondary, fontSize: FontSizes.md, marginBottom: Spacing.xs },
  balanceAmount: {
    fontSize: 38,
    fontWeight: '300',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  balanceAmountDollar: {
    color: '#22C55E',
  },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-around' },
  actionButton: { alignItems: 'center', gap: Spacing.sm, width: '24%' },
  actionIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  actionButtonText: { color: Colors.text, fontSize: FontSizes.xs, textAlign: 'center' },
  dollarCard: { backgroundColor: '#2A2A2A', marginHorizontal: Spacing.lg, marginBottom: Spacing.lg, borderRadius: 28, height: 56, borderWidth: 1.5 },
  dollarCardPressable: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg },
  animatedDollarCardItem: { 
    position: 'absolute', 
    left: Spacing.lg, 
    right: 40, 
    top: 0, 
    bottom: 0, 
    justifyContent: 'center',
  },
  dollarCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dollarCardTitlePurple: { fontSize: FontSizes.sm, fontWeight: '500', color: Colors.primary, marginRight: Spacing.sm },
  dollarCardAmountPurple: { fontSize: FontSizes.md, fontWeight: 'bold', color: Colors.primary },
  dollarCardTitleGreen: { fontSize: FontSizes.sm, fontWeight: '500', color: '#22C55E', marginRight: Spacing.sm },
  dollarCardAmountGreen: { fontSize: FontSizes.md, fontWeight: 'bold', color: '#22C55E' },
  dollarCardArrow: { marginLeft: 'auto' },
  modoPromo: { 
    marginHorizontal: Spacing.lg, 
    marginBottom: Spacing.lg, 
    borderRadius: BorderRadius.lg, 
    overflow: 'hidden',
    height: 90
  },
  modoPromoContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: Spacing.md,
    height: '100%' 
  },
  modoPromoIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.2)', alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  modoPromoIconText: { color: Colors.text, fontSize: FontSizes.lg, fontWeight: 'bold' },
  modoPromoText: { flex: 1 },
  modoPromoTitle: { color: Colors.text, fontSize: FontSizes.sm, fontWeight: '500', marginBottom: Spacing.xs },
  modoPromoSubtitle: { color: Colors.text, fontSize: FontSizes.sm, fontWeight: 'bold' },
  modoPromoLogo: { backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs, borderRadius: BorderRadius.sm },
  modoPromoLogoText: { color: Colors.text, fontSize: FontSizes.xs, fontWeight: 'bold' },
  servicesSection: { paddingLeft: Spacing.lg, marginBottom: Spacing.lg },
  sectionTitle: { color: Colors.text, fontSize: FontSizes.lg, fontWeight: '600', marginBottom: Spacing.md },
  servicesScrollContainer: { paddingRight: Spacing.lg, gap: Spacing.md },
  serviceItemContainer: { alignItems: 'center' },
  searchServicesCircleButton: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', padding: Spacing.xs },
  searchServicesCircleButtonText: { color: Colors.text, fontSize: 10, fontWeight: '600', textAlign: 'center' },
  serviceIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  investmentSection: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg },
  investmentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2A2A2A', padding: Spacing.lg, borderRadius: BorderRadius.lg, gap: Spacing.md },
  investmentContent: { flex: 1 },
  investmentTitle: { color: Colors.textSecondary, fontSize: FontSizes.sm, marginBottom: Spacing.xs },
  investmentAmount: { color: Colors.text, fontSize: FontSizes.xl, fontWeight: 'bold' },
  investmentPerformanceContainer: { backgroundColor: '#22C55E', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.md, marginRight: Spacing.sm },
  investmentPerformance: { color: Colors.text, fontSize: FontSizes.md, fontWeight: 'bold' },
  transactionsSection: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg },
  transactionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  transactionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md },
  transactionIconContainer: { marginRight: Spacing.md },
  transactionIconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  transactionIconText: { color: Colors.text, fontSize: FontSizes.sm, fontWeight: 'bold' },
  transactionDetails: { flex: 1 },
  transactionDescription: { color: Colors.text, fontSize: FontSizes.md, fontWeight: '500', marginBottom: Spacing.xs },
  transactionDate: { color: Colors.textSecondary, fontSize: FontSizes.sm },
  transactionAmount: { fontSize: FontSizes.md, fontWeight: 'bold' },
  seeAllButton: { alignItems: 'center', paddingVertical: Spacing.md },
  seeAllText: { color: Colors.primary, fontSize: FontSizes.md, fontWeight: '500' },
  promotionsSection: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg },
  promotionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  promotionsScroll: { marginHorizontal: -Spacing.lg, paddingHorizontal: Spacing.lg },
  promotionItem: { width: 112, height: 64, marginRight: Spacing.md },
  promotionIcon: { flex: 1, borderRadius: BorderRadius.md, backgroundColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center' },
  promotionIconText: { color: Colors.text, fontSize: FontSizes.sm, fontWeight: 'bold' },
  bottomSpacing: { height: 100 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalBackdrop: { flex: 1 },
  accountModal: { backgroundColor: Colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: Spacing.lg, paddingHorizontal: Spacing.lg, paddingBottom: 40, maxHeight: '90%' },
  cbuModal: { backgroundColor: Colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: Spacing.lg, paddingHorizontal: Spacing.lg, paddingBottom: 40, maxHeight: '95%' },
  greenIconContainer: { backgroundColor: '#22C55E' },
  balanceLabelDollar: { color: '#22C55E' },
  currencyTabActiveDollar: { backgroundColor: '#22C55E' },
  currencyTabTextActiveDollar: { color: Colors.text, fontSize: FontSizes.sm, fontWeight: '500' },
});

export default HomeScreen;