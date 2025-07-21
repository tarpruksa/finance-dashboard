import { getFinancialSummary } from '@/lib/data'

export default async function SummaryCards() {
  const summary = await getFinancialSummary()

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Balance</p>
            <p className="text-3xl font-bold text-gray-900">
              ${summary.accountsBalance.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">💰</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md income-gradient text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">Monthly Income</p>
            <p className="text-3xl font-bold">
              ${summary.totalIncome.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">📈</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md expense-gradient text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">
              Monthly Expenses
            </p>
            <p className="text-3xl font-bold">
              ${summary.totalExpenses.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">📉</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md card-gradient text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">Net Income</p>
            <p className="text-3xl font-bold">
              ${summary.netIncome.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">💎</span>
          </div>
        </div>
      </div>
    </div>
  )
}
