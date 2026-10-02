import React, { useState, useEffect, useRef } from 'react';
import { initialTransactions, generateRandomTransaction, Transaction } from '../data/mock';
import { RiskBadge } from '../components/RiskBadge';
import { TransactionDetailModal } from '../components/TransactionDetailModal';
import { formatCurrency, formatProbability, RiskLevel } from '../utils/risk';
import { Radio, Play, Pause, Search, Filter, RefreshCw, Eye, ShieldAlert, ArrowUpDown, Sparkles } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export const LiveTransactions: React.FC = () => {
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [riskFilter, setRiskFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [newRowIds, setNewRowIds] = useState<Set<string>>(new Set());
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  // Interval for 3-second streaming simulation
  useEffect(() => {
    let interval: any = null;
    if (isStreaming) {
      interval = setInterval(() => {
        const newTxn = generateRandomTransaction();
        setTransactions((prev) => [newTxn, ...prev.slice(0, 49)]); // keep last 50
        setNewRowIds((prev) => {
          const next = new Set(prev);
          next.add(newTxn.id);
          return next;
        });

        // Clear highlight animation after 2 seconds
        setTimeout(() => {
          setNewRowIds((prev) => {
            const next = new Set(prev);
            next.delete(newTxn.id);
            return next;
          });
        }, 2000);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStreaming]);

  // Sync search query from URL parameter if available
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Filtering logic
  const filteredTransactions = transactions.filter((txn) => {
    const matchesRisk = riskFilter === 'All' || txn.riskLevel === riskFilter;
    const matchesSearch =
      searchQuery === '' ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.cardNumber.includes(searchQuery) ||
      txn.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Live Transaction Stream</h1>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                isStreaming
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${isStreaming ? 'animate-pulse' : ''}`} />
              {isStreaming ? 'STREAMING ACTIVE (3s)' : 'STREAM PAUSED'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Continuous ingestion of credit card authorization requests & real-time risk scoring
          </p>
        </div>

        {/* Stream Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md ${
              isStreaming
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
            }`}
          >
            {isStreaming ? (
              <>
                <Pause className="w-4 h-4" /> Pause Stream
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Resume Stream
              </>
            )}
          </button>

          <button
            onClick={() => {
              const newTxn = generateRandomTransaction();
              setTransactions((prev) => [newTxn, ...prev.slice(0, 49)]);
              setNewRowIds((prev) => new Set(prev).add(newTxn.id));
              showToast('Transaction Injected', `Created ${newTxn.id} (${newTxn.merchant} - $${newTxn.amount}) with ${newTxn.riskLevel} Risk`, newTxn.riskLevel === 'High' ? 'error' : newTxn.riskLevel === 'Medium' ? 'warning' : 'success');
              setTimeout(() => {
                setNewRowIds((prev) => {
                  const next = new Set(prev);
                  next.delete(newTxn.id);
                  return next;
                });
              }, 2000);
            }}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:text-white hover:bg-indigo-600/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Inject Mock Record
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-navy-800 border border-navy-700 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        {/* Risk Filter Buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filter Risk:
          </span>
          {['All', 'Low', 'Medium', 'High'].map((level) => (
            <button
              key={level}
              onClick={() => setRiskFilter(level)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                riskFilter === level
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-navy-900/60 text-slate-400 hover:text-slate-200 border border-navy-700'
              }`}
            >
              {level} {level !== 'All' && 'Risk'}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search ID, merchant, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-900 border border-navy-700 rounded-xl pl-10 pr-4 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-navy-800 border border-navy-700 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy-850 border-b border-navy-700 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Time</th>
                <th className="py-3.5 px-4">Merchant & Location</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">AI Score</th>
                <th className="py-3.5 px-4">Risk Badge</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700/60 text-xs">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No transactions match the selected risk filter or search query.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => {
                  const isNew = newRowIds.has(txn.id);
                  return (
                    <tr
                      key={txn.id}
                      onClick={() => setSelectedTxn(txn)}
                      className={`hover:bg-navy-700/50 cursor-pointer transition-colors ${
                        isNew ? 'bg-indigo-500/15 font-medium border-l-4 border-l-indigo-400' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-100">
                        {txn.id}
                        {isNew && (
                          <span className="ml-2 px-1.5 py-0.2 text-[9px] font-bold rounded bg-teal-500/30 text-teal-300">
                            NEW
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{txn.timestamp.split(' ')[1]}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-200 block">{txn.merchant}</span>
                        <span className="text-[10px] text-slate-400">{txn.location} • {txn.cardNumber}</span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-100">{formatCurrency(txn.amount)}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-bold ${
                            txn.probability > 0.7
                              ? 'text-red-400'
                              : txn.probability > 0.3
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {formatProbability(txn.probability)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <RiskBadge level={txn.riskLevel} size="sm" />
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                            txn.status === 'Approved'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : txn.status === 'Flagged'
                              ? 'bg-red-500/10 text-red-400 border-red-500/30 animate-pulse'
                              : txn.status === 'Verified'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : 'bg-slate-700/40 text-slate-300 border-slate-600'
                          }`}
                        >
                          {txn.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTxn(txn);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-navy-700 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <TransactionDetailModal
        transaction={selectedTxn}
        onClose={() => setSelectedTxn(null)}
        onStatusUpdate={(id, status) => {
          setTransactions((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status } : t))
          );
        }}
      />
    </div>
  );
};
