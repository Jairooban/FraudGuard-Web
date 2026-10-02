import React, { useState } from 'react';
import { initialTransactions, Transaction } from '../data/mock';
import { RiskBadge } from '../components/RiskBadge';
import { TransactionDetailModal } from '../components/TransactionDetailModal';
import { formatCurrency, formatProbability } from '../utils/risk';
import { useToast } from '../context/ToastContext';
import { ShieldAlert, CheckCircle2, UserCheck, ShieldX, Filter, Search, Eye } from 'lucide-react';

export const FraudDetection: React.FC = () => {
  const { showToast } = useToast();

  const [flaggedTxns, setFlaggedTxns] = useState<Transaction[]>(() =>
    initialTransactions.filter((t) => t.status === 'Flagged' || t.probability > 0.4)
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  const handleAction = (id: string, status: 'Approved' | 'Verified' | 'Blocked', txnId: string) => {
    setFlaggedTxns((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );

    const toastTitle =
      status === 'Approved'
        ? `Transaction ${txnId} Approved`
        : status === 'Verified'
        ? `Customer 2FA Verification Triggered`
        : `Transaction ${txnId} Blocked & Card Frozen`;

    const toastType = status === 'Approved' ? 'success' : status === 'Verified' ? 'warning' : 'error';

    showToast(toastTitle, `Analyst updated status to ${status}`, toastType);
  };

  const filteredTxns = flaggedTxns.filter((txn) => {
    const matchesRisk = riskFilter === 'All' || txn.riskLevel === riskFilter;
    const matchesSearch =
      searchQuery === '' ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.cardNumber.includes(searchQuery);
    return matchesRisk && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Flagged Fraud Queue</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
              {flaggedTxns.filter((t) => t.status === 'Flagged').length} Pending Action
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Review AI-flagged transaction anomalies and authorize manual overrides or customer verification
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-navy-800 border border-navy-700 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Risk Level:
          </span>
          {['All', 'High', 'Medium'].map((level) => (
            <button
              key={level}
              onClick={() => setRiskFilter(level)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                riskFilter === level
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-navy-900/60 text-slate-400 hover:text-slate-200 border border-navy-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by ID, merchant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-900 border border-navy-700 rounded-xl pl-10 pr-4 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Flagged Cards / List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTxns.map((txn) => {
          const probPercent = Math.round(txn.probability * 100);
          return (
            <div
              key={txn.id}
              className="bg-navy-800 border border-navy-700 rounded-2xl p-5 shadow-lg hover:border-slate-700 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Left Details */}
              <div className="flex items-start gap-4 min-w-[240px]">
                <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-base text-slate-100">{txn.id}</span>
                    <RiskBadge level={txn.riskLevel} size="sm" />
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        txn.status === 'Flagged'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-navy-700 text-slate-300'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200 mt-1">{txn.merchant}</h3>
                  <p className="text-xs text-slate-400">{txn.location} • {txn.cardNumber} • {txn.timestamp}</p>
                </div>
              </div>

              {/* Amount & Fraud Probability Progress Bar */}
              <div className="flex-1 max-w-md space-y-2">
                <div className="flex justify-between items-baseline text-xs font-semibold">
                  <span className="text-slate-400">Transaction Amount: <span className="text-slate-100 font-bold">{formatCurrency(txn.amount)}</span></span>
                  <span className="text-red-400 font-bold">Fraud Prob: {formatProbability(txn.probability)}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-navy-900 rounded-full overflow-hidden border border-navy-700">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      txn.probability > 0.7
                        ? 'bg-gradient-to-r from-amber-500 to-red-500'
                        : txn.probability > 0.3
                        ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${probPercent}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Low Risk (0%)</span>
                  <span>Threshold (30%)</span>
                  <span>High Risk (70%+)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 border-t lg:border-t-0 border-navy-700 pt-4 lg:pt-0">
                <button
                  onClick={() => setSelectedTxn(txn)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-navy-700 transition-colors"
                  title="Inspect Transaction"
                >
                  <Eye className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleAction(txn.id, 'Approved', txn.id)}
                  disabled={txn.status === 'Approved'}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors flex items-center gap-1.5 disabled:opacity-40"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                </button>

                <button
                  onClick={() => handleAction(txn.id, 'Verified', txn.id)}
                  disabled={txn.status === 'Verified'}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-colors flex items-center gap-1.5 disabled:opacity-40"
                >
                  <UserCheck className="w-3.5 h-3.5" /> Verify
                </button>

                <button
                  onClick={() => handleAction(txn.id, 'Blocked', txn.id)}
                  disabled={txn.status === 'Blocked'}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors flex items-center gap-1.5 disabled:opacity-40"
                >
                  <ShieldX className="w-3.5 h-3.5" /> Block
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <TransactionDetailModal
        transaction={selectedTxn}
        onClose={() => setSelectedTxn(null)}
        onStatusUpdate={(id, status) => {
          setFlaggedTxns((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status } : t))
          );
        }}
      />
    </div>
  );
};
