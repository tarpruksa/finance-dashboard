import { cache } from 'react'

// Simulated database delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Types
export interface Transaction {
  id: string
  amount: number
  description: string
  category: string
  date: string
  type: 'income' | 'expense'
}

export interface Account {
  id: string
  name: string
  balance: number
  type: 'checking' | 'savings' | 'investment'
}

export interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  netIncome: number
  accountsBalance: number
}

// ✅ BEST PRACTICE: Use React's cache() for server-side data fetching
export const getTransactions = cache(async (): Promise<Transaction[]> => {
  console.log('🔍 Fetching transactions from server...')
  await delay(800) // Simulate API call

  return [
    // Income transactions
    {
      id: '1',
      amount: 5000,
      description: 'Monthly Salary',
      category: 'Salary',
      date: '2024-07-20',
      type: 'income',
    },
    {
      id: '2',
      amount: 2500,
      description: 'Freelance Web Development',
      category: 'Freelance',
      date: '2024-07-16',
      type: 'income',
    },
    {
      id: '3',
      amount: 800,
      description: 'Investment Dividends',
      category: 'Investment',
      date: '2024-07-15',
      type: 'income',
    },
    {
      id: '4',
      amount: 350,
      description: 'Side Business',
      category: 'Business',
      date: '2024-07-10',
      type: 'income',
    },

    // Housing expenses
    {
      id: '5',
      amount: -1200,
      description: 'Rent Payment',
      category: 'Housing',
      date: '2024-07-19',
      type: 'expense',
    },
    {
      id: '6',
      amount: -150,
      description: 'Electricity Bill',
      category: 'Housing',
      date: '2024-07-18',
      type: 'expense',
    },
    {
      id: '7',
      amount: -80,
      description: 'Internet Service',
      category: 'Housing',
      date: '2024-07-17',
      type: 'expense',
    },
    {
      id: '8',
      amount: -45,
      description: 'Water Bill',
      category: 'Housing',
      date: '2024-07-16',
      type: 'expense',
    },

    // Food expenses
    {
      id: '9',
      amount: -85,
      description: 'Grocery Shopping',
      category: 'Food',
      date: '2024-07-18',
      type: 'expense',
    },
    {
      id: '10',
      amount: -45,
      description: 'Restaurant Dinner',
      category: 'Food',
      date: '2024-07-17',
      type: 'expense',
    },
    {
      id: '11',
      amount: -25,
      description: 'Coffee Shop',
      category: 'Food',
      date: '2024-07-16',
      type: 'expense',
    },
    {
      id: '12',
      amount: -65,
      description: 'Lunch with Clients',
      category: 'Food',
      date: '2024-07-15',
      type: 'expense',
    },

    // Transportation expenses
    {
      id: '13',
      amount: -55,
      description: 'Gas Station',
      category: 'Transportation',
      date: '2024-07-17',
      type: 'expense',
    },
    {
      id: '14',
      amount: -35,
      description: 'Uber Ride',
      category: 'Transportation',
      date: '2024-07-14',
      type: 'expense',
    },
    {
      id: '15',
      amount: -120,
      description: 'Car Insurance',
      category: 'Transportation',
      date: '2024-07-12',
      type: 'expense',
    },
    {
      id: '16',
      amount: -25,
      description: 'Parking Fee',
      category: 'Transportation',
      date: '2024-07-11',
      type: 'expense',
    },

    // Entertainment expenses
    {
      id: '17',
      amount: -50,
      description: 'Movie Theater',
      category: 'Entertainment',
      date: '2024-07-13',
      type: 'expense',
    },
    {
      id: '18',
      amount: -15,
      description: 'Spotify Subscription',
      category: 'Entertainment',
      date: '2024-07-12',
      type: 'expense',
    },
    {
      id: '19',
      amount: -35,
      description: 'Video Games',
      category: 'Entertainment',
      date: '2024-07-10',
      type: 'expense',
    },
    {
      id: '20',
      amount: -75,
      description: 'Concert Tickets',
      category: 'Entertainment',
      date: '2024-07-08',
      type: 'expense',
    },

    // Health expenses
    {
      id: '21',
      amount: -200,
      description: 'Doctor Visit',
      category: 'Health',
      date: '2024-07-14',
      type: 'expense',
    },
    {
      id: '22',
      amount: -45,
      description: 'Pharmacy',
      category: 'Health',
      date: '2024-07-13',
      type: 'expense',
    },
    {
      id: '23',
      amount: -80,
      description: 'Gym Membership',
      category: 'Health',
      date: '2024-07-09',
      type: 'expense',
    },

    // Other expenses
    {
      id: '24',
      amount: -30,
      description: 'Haircut',
      category: 'Other',
      date: '2024-07-11',
      type: 'expense',
    },
    {
      id: '25',
      amount: -100,
      description: 'Birthday Gift',
      category: 'Other',
      date: '2024-07-09',
      type: 'expense',
    },
  ]
})

export const getAccounts = cache(async (): Promise<Account[]> => {
  console.log('🏦 Fetching accounts from server...')
  await delay(600)

  return [
    {
      id: '1',
      name: 'Main Checking',
      balance: 15750,
      type: 'checking',
    },
    {
      id: '2',
      name: 'Emergency Savings',
      balance: 25000,
      type: 'savings',
    },
    {
      id: '3',
      name: 'Investment Portfolio',
      balance: 45300,
      type: 'investment',
    },
  ]
})

export const getFinancialSummary = cache(
  async (): Promise<FinancialSummary> => {
    console.log('📊 Calculating financial summary...')
    const transactions = await getTransactions()
    const accounts = await getAccounts()

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = Math.abs(
      transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    )

    const accountsBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

    return {
      totalIncome,
      totalExpenses,
      netIncome: totalIncome - totalExpenses,
      accountsBalance,
    }
  }
)
