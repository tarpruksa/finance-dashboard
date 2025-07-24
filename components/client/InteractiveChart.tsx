'use client'

import { useState, useEffect } from 'react'
import { Transaction } from '@/lib/data'

interface Props {
  transactions: Transaction[]
}

// ✅ BEST PRACTICE: Client Component for interactivity, receives data as props
export default function InteractiveChart({ transactions }: Props) {
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('month')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [chartData, setChartData] = useState<{
    income: number
    expenses: number
  }>({
    income: 0,
    expenses: 0,
  })

  // Get unique categories from transactions
  const categories = [
    'all',
    ...Array.from(new Set(transactions.map((t) => t.category))),
  ]

  useEffect(() => {
    // Filter transactions based on selected category
    let filteredTransactions = transactions

    if (selectedCategory !== 'all') {
      filteredTransactions = transactions.filter(
        (t) => t.category === selectedCategory
      )
    }

    // Calculate income and expenses for filtered data
    const income = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const expenses = Math.abs(
      filteredTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    )

    setChartData({ income, expenses })
  }, [selectedPeriod, selectedCategory, transactions])

  // Get transaction count for current filter
  const getTransactionCount = () => {
    const filteredTransactions =
      selectedCategory === 'all'
        ? transactions
        : transactions.filter((t) => t.category === selectedCategory)

    return {
      income: filteredTransactions.filter((t) => t.type === 'income').length,
      expense: filteredTransactions.filter((t) => t.type === 'expense').length,
    }
  }

  const transactionCount = getTransactionCount()

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Income vs Expenses
        </h2>

        {/* ✅ BEST PRACTICE: Interactive controls in Client Component */}
        <div className="flex space-x-2">
          {(['week', 'month', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Data */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Income</span>
              <span className="text-xs text-gray-500">
                ({transactionCount.income} transactions)
              </span>
            </div>
            <span className="text-sm font-semibold text-green-600">
              ${chartData.income.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{
                width:
                  chartData.income + chartData.expenses > 0
                    ? `${
                        (chartData.income /
                          (chartData.income + chartData.expenses)) *
                        100
                      }%`
                    : '0%',
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                Expenses
              </span>
              <span className="text-xs text-gray-500">
                ({transactionCount.expense} transactions)
              </span>
            </div>
            <span className="text-sm font-semibold text-red-600">
              ${chartData.expenses.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-red-500 h-4 rounded-full transition-all duration-500"
              style={{
                width:
                  chartData.income + chartData.expenses > 0
                    ? `${
                        (chartData.expenses /
                          (chartData.income + chartData.expenses)) *
                        100
                      }%`
                    : '0%',
              }}
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-blue-800">
            📊 Showing{' '}
            {selectedCategory === 'all' ? 'all categories' : selectedCategory}{' '}
            for {selectedPeriod}
          </p>
          <span
            className={`text-sm font-semibold ${
              chartData.income - chartData.expenses >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            Net: ${(chartData.income - chartData.expenses).toLocaleString()}
          </span>
        </div>

        {selectedCategory !== 'all' && (
          <p className="text-xs text-blue-600 mt-1">
            💡 Switch to "All Categories" to see complete financial overview
          </p>
        )}
      </div>
    </div>
  )
}
