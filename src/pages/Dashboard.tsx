import React, { useState, useEffect } from 'react';
import {
  initialKpiSummary,
  trend7DaysData,
  riskDistributionData,
  initialTransactions,
  Transaction,
} from '../data/mock';
import { KpiCard } from '../components/KpiCard';
import { ChartCard } from '../components/ChartCard';
import { RiskBadge } from '../components/RiskBadge';
import { SkeletonCard, SkeletonChart, SkeletonTable } from '../components/SkeletonLoader';
import { TransactionDetailModal } from '../components/TransactionDetailModal';
import { formatCurrency, formatProbability } from '../utils/risk';
import {
  CreditCard,
  ShieldAlert,
  Percent,
  PiggyBank,
  ArrowRight,
  ExternalLink,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [recentAlerts, setRecentAlerts] = useState<Transaction[]>([]);

  useEffect(() => {
    // Simulate first load skeleton delay (350ms)
    const timer = setTimeout(() => {
      setRecentAlerts(initialTransactions.filter((t) => t.status === 'Flagged').slice(0, 5));
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SkeletonChart />
          </div>
          <div>
            <SkeletonChart />
          </div>
        </div>
        <SkeletonTable />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Fraud Intelligence Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time credit card transaction surveillance & AI risk metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/live')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Open Live Stream</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Transactions"
          value={initialKpiSummary.totalTransactions.toLocaleString()}
          change={initialKpiSummary.totalTransactionsChange}
          icon={CreditCard}
          iconBgColor="bg-indigo-500/10 border-indigo-500/30"
          iconColor="text-indigo-400"
        />
        <KpiCard
          title="Fraud Detected"
          value={initialKpiSummary.fraudDetected.toLocaleString()}
          change={initialKpiSummary.fraudDetectedChange}
          isInverseTrend={true}
          icon={ShieldAlert}
          iconBgColor="bg-red-500/10 border-red-500/30"
          iconColor="text-red-400"
        />
        <KpiCard
          title="Fraud Rate"
          value={`${initialKpiSummary.fraudRate}%`}
          change={initialKpiSummary.fraudRateChange}
          isInverseTrend={true}
          icon={Percent}
          iconBgColor="bg-amber-500/10 border-amber-500/30"
          iconColor="text-amber-400"
        />
        <KpiCard
          title="Amount Saved"
          value={formatCurrency(initialKpiSummary.amountSaved)}
          change={initialKpiSummary.amountSavedChange}
          icon={PiggyBank}
          iconBgColor="bg-emerald-500/10 border-emerald-500/30"
          iconColor="text-emerald-400"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Transactions vs Flagged Line / Area Chart */}
        <ChartCard
          title="7-Day Volume vs Flagged Fraud"
          subtitle="Comparison of overall transaction flow and AI-flagged anomalies"
          className="lg:col-span-2"
        >
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend7DaysData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorFlagged" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#121A30',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#F8FAFC',
                  }}
                />
                <Area type="monotone" dataKey="total" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTotal)" name="Total Volume" />
                <Area type="monotone" dataKey="flagged" stroke="#EF4444" strokeWidth={2.5} fillOpacity={1} fill="url(#colorFlagged)" name="Flagged Fraud" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Donut Chart: Risk Level Distribution */}
        <ChartCard
          title="Risk Level Distribution"
          subtitle="Breakdown of processed transactions by AI risk rating"
        >
          <div className="w-full h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#121A30" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val.toLocaleString()} transactions`, 'Volume']}
                  contentStyle={{
                    backgroundColor: '#121A30',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#F8FAFC',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-xs text-slate-300">{value} Risk</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Recent High Risk Alerts List */}
      <div className="bg-navy-800 border border-navy-700 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h3 className="text-base font-semibold text-slate-100">Recent High Risk Alerts</h3>
          </div>
          <button
            onClick={() => navigate('/detection')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
          >
            <span>View All Flagged</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-navy-700 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <th className="pb-3 px-3">Transaction ID</th>
                <th className="pb-3 px-3">Time</th>
                <th className="pb-3 px-3">Merchant</th>
                <th className="pb-3 px-3">Amount</th>
                <th className="pb-3 px-3">AI Prob</th>
                <th className="pb-3 px-3">Risk Level</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700/60 text-xs">
              {recentAlerts.map((txn) => (
                <tr
                  key={txn.id}
                  onClick={() => setSelectedTxn(txn)}
                  className="hover:bg-navy-700/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-semibold text-slate-100 font-mono">{txn.id}</td>
                  <td className="py-3 px-3 text-slate-400">{txn.timestamp.split(' ')[1]}</td>
                  <td className="py-3 px-3 text-slate-200">
                    <span className="font-medium">{txn.merchant}</span>
                    <span className="text-[10px] text-slate-400 block">{txn.location}</span>
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-100">{formatCurrency(txn.amount)}</td>
                  <td className="py-3 px-3 font-bold text-red-400">{formatProbability(txn.probability)}</td>
                  <td className="py-3 px-3">
                    <RiskBadge level={txn.riskLevel} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTxn(txn);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-navy-700 transition-colors"
                      title="Inspect Details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <TransactionDetailModal
        transaction={selectedTxn}
        onClose={() => setSelectedTxn(null)}
        onStatusUpdate={(id, status) => {
          setRecentAlerts((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status } : t))
          );
        }}
      />
    </div>
  );
};
