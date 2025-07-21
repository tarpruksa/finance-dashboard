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

export const getTransactions = cache(async (): Promise<Transaction[]> => {
  console.log('🔍 Fetching transactions from server...')
  await delay(800) // Simulate API call

  return [
    {
      id: '1',
      amount: 5000,
      description: 'Salary',
      category: 'Income',
      date: '2024-07-20',
      type: 'income',
    },
    {
      id: '2',
      amount: -1200,
      description: 'Rent Payment',
      category: 'Housing',
      date: '2024-07-19',
      type: 'expense',
    },
    {
      id: '3',
      amount: -85,
      description: 'Grocery Shopping',
      category: 'Food',
      date: '2024-07-18',
      type: 'expense',
    },
    {
      id: '4',
      amount: -45,
      description: 'Gas Station',
      category: 'Transportation',
      date: '2024-07-17',
      type: 'expense',
    },
    {
      id: '5',
      amount: 2500,
      description: 'Freelance Project',
      category: 'Income',
      date: '2024-07-16',
      type: 'income',
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
