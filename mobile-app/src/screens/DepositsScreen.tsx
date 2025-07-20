import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/Layout';
import { useRouter } from 'expo-router';

const DepositsScreen: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color={Colors.text} />
      </Pressable>
      <Text style={styles.headerTitle}>Depósitos y extracciones</Text>
    </View>
  );

  const renderInfoButtons = () => (
    <View style={styles.infoSection}>
      <Pressable style={styles.immediateButton}>
        <Ionicons name="flash" size={20} color={Colors.background} style={styles.buttonIcon} />
        <Text style={styles.immediateButtonText}>Todas las acreditaciones son inmediatas</Text>
      </Pressable>
      
      <Pressable style={styles.securityButton}>
        <Ionicons name="shield-checkmark" size={20} color={Colors.primary} style={styles.buttonIcon} />
        <Text style={styles.securityButtonText}>¿Sabías que podés asegurar tus extracciones?</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </Pressable>
    </View>
  );

  const renderServiceGrid = () => (
    <View style={styles.serviceGrid}>
      <View style={styles.serviceRow}>
        <Pressable style={styles.serviceCard}>
          <View style={styles.freeTag}>
            <Text style={styles.freeTagText}>Gratis</Text>
          </View>
          <View style={styles.serviceIcon}>
            <Ionicons name="swap-horizontal" size={32} color={Colors.textSecondary} />
          </View>
          <Text style={styles.serviceTitle}>Cuentas vinculadas</Text>
        </Pressable>
        
        <Pressable style={styles.serviceCard}>
          <View style={styles.freeTag}>
            <Text style={styles.freeTagText}>Gratis</Text>
          </View>
          <View style={styles.serviceIcon}>
            <Ionicons name="business" size={32} color={Colors.textSecondary} />
          </View>
          <Text style={styles.serviceTitle}>Transferencias</Text>
        </Pressable>
      </View>
      
      <View style={styles.serviceRow}>
        <Pressable style={styles.serviceCard}>
          <View style={styles.freeTag}>
            <Text style={styles.freeTagText}>Gratis</Text>
          </View>
          <View style={styles.extraCashContainer}>
            <View style={styles.extraCashCircle}>
              <Text style={styles.extraCashText}>EXTRA</Text>
              <Text style={styles.extraCashText}>CASH</Text>
            </View>
          </View>
          <Text style={styles.serviceTitle}>ExtraCash</Text>
        </Pressable>
        
        <Pressable style={styles.serviceCard}>
          <View style={styles.pagoFacilContainer}>
            <View style={styles.pagoFacilCircle}>
              <Text style={styles.pagoFacilText}>PAGO</Text>
              <Text style={styles.pagoFacilText}>Fácil</Text>
            </View>
          </View>
          <Text style={styles.serviceTitle}>Pago Fácil</Text>
        </Pressable>
      </View>
      
      <View style={styles.serviceRow}>
        <Pressable style={styles.serviceCard}>
          <View style={styles.serviceIcon}>
            <Ionicons name="handshake" size={32} color={Colors.textSecondary} />
          </View>
          <Text style={styles.serviceTitle}>Mercado Pago</Text>
        </Pressable>
        
        <Pressable style={styles.serviceCard}>
          <View style={styles.cajeroContainer}>
            <View style={styles.redLinkCircle}>
              <Text style={styles.redLinkText}>B</Text>
            </View>
            <View style={styles.linkCircle}>
              <Text style={styles.linkText}>LINK</Text>
            </View>
          </View>
          <Text style={styles.serviceTitle}>Cajeros</Text>
          <Text style={styles.serviceSubtitle}>Automáticos</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderInfoButtons()}
        {renderServiceGrid()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl + 20,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    color: Colors.text,
  },
  infoSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  immediateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  buttonIcon: {
    marginRight: Spacing.sm,
  },
  immediateButtonText: {
    color: Colors.background,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    flex: 1,
  },
  securityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  securityButtonText: {
    color: Colors.primary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    flex: 1,
    marginLeft: Spacing.sm,
  },
  serviceGrid: {
    paddingHorizontal: Spacing.lg,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  serviceCard: {
    flex: 1,
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.xs,
    alignItems: 'center',
    minHeight: 120,
    position: 'relative',
  },
  freeTag: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  freeTagText: {
    color: Colors.background,
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
  },
  serviceIcon: {
    marginBottom: Spacing.sm,
  },
  serviceTitle: {
    color: Colors.text,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    textAlign: 'center',
  },
  serviceSubtitle: {
    color: Colors.text,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    textAlign: 'center',
    marginTop: -2,
  },
  extraCashContainer: {
    marginBottom: Spacing.sm,
  },
  extraCashCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraCashText: {
    color: Colors.background,
    fontSize: 8,
    fontWeight: FontWeights.bold,
    lineHeight: 10,
  },
  pagoFacilContainer: {
    marginBottom: Spacing.sm,
  },
  pagoFacilCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFB800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagoFacilText: {
    color: Colors.background,
    fontSize: 8,
    fontWeight: FontWeights.bold,
    lineHeight: 10,
  },
  cajeroContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  redLinkCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -5,
    zIndex: 2,
  },
  redLinkText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: FontWeights.bold,
  },
  linkCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#FFB800',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  linkText: {
    color: Colors.background,
    fontSize: 8,
    fontWeight: FontWeights.bold,
  },
});

export default DepositsScreen;