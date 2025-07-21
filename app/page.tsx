import { Suspense } from 'react'
import SummaryCards from '@/components/server/SummaryCards'
import TransactionsList from '@/components/server/TransactionsList'
import InteractiveChart from '@/components/client/InteractiveChart'
import AddTransactionForm from '@/components/client/AddTransactionForm'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { getTransactions } from '@/lib/data'

export default async function Dashboard() {
  // ✅ BEST PRACTICE: Fetch data in Server Component and pass to Client Components
  const transactions = await getTransactions()

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Finance Dashboard
        </h1>
        <p className="text-gray-600">
          Next.js 14 Demo: Server & Client Components Best Practices
        </p>
      </header>

      {/* ✅ BEST PRACTICE: Use Suspense for loading states */}
      <Suspense fallback={<LoadingSpinner />}>
        <SummaryCards />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* ✅ BEST PRACTICE: Pass server data to client components as props */}
        <InteractiveChart transactions={transactions} />

        <div className="space-y-6">
          <AddTransactionForm />

          <Suspense fallback={<LoadingSpinner />}>
            <TransactionsList />
          </Suspense>
        </div>
      </div>

      {/* Best Practices Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          🎯 Best Practices Demonstrated
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Server Components:</h4>
            <ul className="space-y-1">
              <li>• Data fetching with cache()</li>
              <li>• Static content rendering</li>
              <li>• SEO-friendly by default</li>
              <li>• Zero JavaScript to client</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Client Components:</h4>
            <ul className="space-y-1">
              <li>• Interactive UI elements</li>
              <li>• Form handling & state</li>
              <li>• Event listeners</li>
              <li>• Minimal use client usage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
