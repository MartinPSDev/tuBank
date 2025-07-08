import { useState, useEffect } from 'react';
import { Transaction, Account, Investment, Service, Promotion } from '../types';

export const useBankData = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = async () => {
    // Simulación de carga de datos
    setTimeout(() => {
      setAccounts([
        {
          id: '1',
          type: 'pesos',
          balance: 0.05,
          currency: 'ARS',
        },
        {
          id: '2',
          type: 'dollars',
          balance: 1220.00,
          currency: 'USD',
        },
      ]);

      setTransactions([
        {
          id: '1',
          type: 'income',
          amount: 0.05,
          description: 'Devengado Cuentas Vista',
          date: '01/07/2025 00:52',
          category: 'Rendimiento',
        },
        {
          id: '2',
          type: 'expense',
          amount: 33.01,
          description: 'Fondeo de tu cuenta Max',
          date: '27/06/2025 19:17',
          category: 'Transferencia',
        },
        {
          id: '3',
          type: 'expense',
          amount: 17800.00,
          description: 'Martina Perez Sotelo',
          date: '09/06/2025 16:43',
          category: 'Transferencia',
        },
      ]);

      setInvestments([
        {
          id: '1',
          name: 'Rendimiento',
          amount: 33.57,
          performance: 29.00,
          performancePercentage: 29.00,
        },
      ]);

      setServices([
        { id: '1', name: 'VISA', icon: 'credit-card', category: 'Tarjetas' },
        { id: '2', name: 'SUBE', icon: 'train', category: 'Transporte' },
        { id: '3', name: 'Movistar', icon: 'phone', category: 'Telefonía' },
        { id: '4', name: 'Claro', icon: 'phone', category: 'Telefonía' },
        { id: '5', name: 'Personal', icon: 'phone', category: 'Telefonía' },
        { id: '6', name: 'Edenor', icon: 'zap', category: 'Servicios' },
      ]);

      setPromotions([
        {
          id: '1',
          title: 'Suomac',
          description: '20% OFF en shoppings',
          image: 'suomac',
          discount: '20%',
        },
        {
          id: '2',
          title: 'Open Pay',
          description: 'Descuentos especiales',
          image: 'openpay',
        },
        {
          id: '3',
          title: 'SmartLife',
          description: 'Beneficios exclusivos',
          image: 'smartlife',
        },
        {
          id: '4',
          title: 'Los Silos',
          description: 'Ofertas gastronómicas',
          image: 'lossilos',
        },
        {
          id: '5',
          title: 'Eyel',
          description: 'Descuentos en óptica',
          image: 'eyel',
        },
      ]);

      setIsLoading(false);
    }, 1000);
  };

  const getAccountBalance = (type: 'pesos' | 'dolares'): number => {
    const accountType = type === 'dolares' ? 'dollars' : type;
    const account = accounts.find(acc => acc.type === accountType);
    return account?.balance || 0;
  };

  const getTotalBalance = (): number => {
    return accounts.reduce((total, account) => {
      if (account.type === 'pesos') {
        return total + account.balance;
      }
      // Convertir dólares a pesos (tasa simulada)
      return total + (account.balance * 1000); // Tasa simulada
    }, 0);
  };

  return {
    accounts,
    transactions,
    investments,
    services,
    promotions,
    isLoading,
    getAccountBalance,
    getTotalBalance,
  };
};