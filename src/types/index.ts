// Tipos principales de la aplicación TUBANK

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  description: string;
  date: string;
  category?: string;
  recipient?: string;
}

export interface Account {
  id: string;
  type: 'pesos' | 'dollars';
  balance: number;
  currency: string;
}

export interface Investment {
  id: string;
  name: string;
  amount: number;
  performance: number;
  performancePercentage: number;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  discount?: string;
}