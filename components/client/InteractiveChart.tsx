'use client'

import { useState, useEffect } from 'react'
import { Transaction } from '@/lib/data'

interface Props {
  transactions: Transaction[]
}

export default function InteractiveChart({ transactions }: Props) {
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('month')
  const [chartData, setChartData] = useState<{
    income: number
    expenses: number
  }>({
    income: 0,
    expenses: 0,
  })

  useEffect(() => {
    // Simulate filtering data based on selected period
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const expenses = Math.abs(
      transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    )

    setChartData({ income, expenses })
  }, [selectedPeriod, transactions])

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

      {/* Simple bar chart visualization */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Income</span>
            <span className="text-sm font-semibold text-green-600">
              ${chartData.income.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{
                width: `${
                  (chartData.income / (chartData.income + chartData.expenses)) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Expenses</span>
            <span className="text-sm font-semibold text-red-600">
              ${chartData.expenses.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-red-500 h-4 rounded-full transition-all duration-500"
              style={{
                width: `${
                  (chartData.expenses /
                    (chartData.income + chartData.expenses)) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          📊 This chart updates based on the selected time period.
          <strong className="ml-1">Current view: {selectedPeriod}</strong>
        </p>
      </div>
    </div>
  )
}
