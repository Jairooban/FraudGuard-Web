import React from 'react';
import {
  hourlyFraudData,
  amountDistributionData,
  modelComparisonData,
  trend7DaysData,
} from '../data/mock';
import { ChartCard } from '../components/ChartCard';
import { BarChart3, Clock, DollarSign, Cpu, AlertCircle, Info, Sparkles } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from 'recharts';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Fraud Analytics & Model Intelligence</h1>
        <p className="text-xs text-slate-400 mt-1">
          In-depth pattern analysis across temporal distribution, transaction amounts, and candidate ML architectures
        </p>
      </div>

      {/* Grid Row 1: Fraud Rate Over Time & Fraud by Hour of Day */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Rate Trend over 7 days */}
        <ChartCard
          title="Fraud Rate Trend Over Time"
          subtitle="Percentage of daily transaction volume flagged as high or medium risk"
        >
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend7DaysData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="#64748B"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(val) => `${((val / 20000) * 100).toFixed(1)}%`}
                />
                <Tooltip
                  formatter={(val: number) => [`${val} flagged transactions`, 'Flagged Count']}
                  contentStyle={{
                    backgroundColor: '#121A30',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#F8FAFC',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="flagged"
                  stroke="#14B8A6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#14B8A6' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Fraud by Hour of Day (Bar Chart) */}
        <ChartCard
          title="Fraud Incidents by Hour of Day"
          subtitle="Histogram revealing peak fraud vulnerability windows (24-hour cycle)"
        >
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyFraudData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="hour" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                <Tooltip
                  formatter={(val: number) => [`${val} incidents`, 'Fraud Count']}
                  contentStyle={{
                    backgroundColor: '#121A30',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#F8FAFC',
                  }}
                />
                <Bar dataKey="fraudCount" fill="#EF4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Grid Row 2: Amount Distribution Chart */}
      <ChartCard
        title="Transaction Amount Distribution & Fraud Concentration"
        subtitle="Volume distribution across tier ranges vs fraud percentage concentration"
      >
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={amountDistributionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis dataKey="range" stroke="#64748B" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
              <Tooltip
                formatter={(val: number, name: string) => [
                  name === 'fraudCount' ? `${val} flagged` : `${val.toLocaleString()} total`,
                  name === 'fraudCount' ? 'Fraud Cases' : 'Total Transactions',
                ]}
                contentStyle={{
                  backgroundColor: '#121A30',
                  borderColor: '#1E293B',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#F8FAFC',
                }}
              />
              <Bar dataKey="count" fill="#334155" radius={[6, 6, 0, 0]} name="count" />
              <Bar dataKey="fraudCount" fill="#F59E0B" radius={[6, 6, 0, 0]} name="fraudCount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Model Comparison Panel (Planned - results pending, NO invented accuracy numbers) */}
      <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-700 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100">ML Model Benchmark Matrix</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Planned - results pending
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluation roadmap for candidate machine learning algorithms on current feature set
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-navy-900 px-3 py-1.5 rounded-xl border border-navy-700">
            <Info className="w-4 h-4 text-indigo-400" />
            <span>Training job queued on HPC cluster</span>
          </div>
        </div>

        {/* Model Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modelComparisonData.map((model) => (
            <div
              key={model.name}
              className="bg-navy-900 border border-navy-700 rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-slate-600 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-100">{model.name}</h4>
                </div>
                <p className="text-xs text-indigo-400 font-medium">{model.algorithm}</p>

                <div className="pt-2 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Target Metric:</span>
                    <span className="text-slate-200 font-medium">{model.targetMetric}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>PCA Features:</span>
                    <span className="text-slate-200 font-medium">{model.featuresCount} inputs</span>
                  </div>
                </div>
              </div>

              {/* Status Banner - Clearly Pending */}
              <div className="bg-navy-850 p-2.5 rounded-xl border border-navy-700 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{model.status}</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">{model.statusDetail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-indigo-400" />
          <span>
            Note: Accuracy metrics (Precision, Recall, ROC-AUC) will populate automatically once model hyperparameter tuning finishes.
          </span>
        </div>
      </div>
    </div>
  );
};
