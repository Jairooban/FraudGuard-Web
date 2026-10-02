import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialTransactions, Transaction } from '../data/mock';
import { RiskBadge } from '../components/RiskBadge';
import { formatCurrency, formatProbability } from '../utils/risk';
import { useToast } from '../context/ToastContext';
import {
  ArrowLeft,
  ShieldAlert,
  CreditCard,
  MapPin,
  Calendar,
  Clock,
  Cpu,
  CheckCircle2,
  UserCheck,
  ShieldX,
} from 'lucide-react';

export const TransactionDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const found = initialTransactions.find((t) => t.id === id) || initialTransactions[0];
    setTransaction(found);
  }, [id]);

  if (!transaction) return null;

  const handleAction = (status: 'Approved' | 'Verified' | 'Blocked') => {
    setTransaction((prev) => (prev ? { ...prev, status } : null));
    const toastTitle =
      status === 'Approved'
        ? `Transaction ${transaction.id} Approved`
        : status === 'Verified'
        ? `Customer Verification Requested`
        : `Transaction ${transaction.id} Blocked`;
    const toastType = status === 'Approved' ? 'success' : status === 'Verified' ? 'warning' : 'error';
    showToast(toastTitle, `Updated status to ${status}`, toastType);
  };

  const features = [
    { name: 'V14 (Anom. Score)', impact: Math.abs(transaction.v14) * 15, raw: transaction.v14, color: 'bg-red-500' },
    { name: 'V17 (Velocity)', impact: Math.abs(transaction.v17) * 12, raw: transaction.v17, color: 'bg-amber-500' },
    { name: 'V12 (Merchant Ratio)', impact: Math.abs(transaction.v12) * 10, raw: transaction.v12, color: 'bg-indigo-500' },
    { name: 'Amount Deviation', impact: Math.min((transaction.amount / 3000) * 100, 100), raw: `$${transaction.amount}`, color: 'bg-teal-500' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {/* Main Container Card */}
      <div className="bg-navy-800 border border-navy-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-700">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-100 font-mono">{transaction.id}</h1>
                <RiskBadge level={transaction.riskLevel} />
              </div>
              <p className="text-xs text-slate-400 mt-1">{transaction.merchant} • {transaction.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('Approved')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" /> Approve
            </button>
            <button
              onClick={() => handleAction('Verified')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" /> Verify
            </button>
            <button
              onClick={() => handleAction('Blocked')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors flex items-center gap-1.5"
            >
              <ShieldX className="w-4 h-4" /> Block
            </button>
          </div>
        </div>

        {/* Top Grid: Gauge & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">AI Fraud Probability</span>
            
            <div className="relative w-32 h-16 overflow-hidden mb-3">
              <div className="w-32 h-32 rounded-full border-[12px] border-slate-700 border-t-red-500 border-r-amber-500 border-b-transparent border-l-emerald-500" />
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-100 pt-6">
                {formatProbability(transaction.probability)}
              </div>
            </div>

            <span className="text-xs text-slate-300">
              Raw Score: <span className="font-bold text-slate-100">{transaction.probability}</span>
            </span>
          </div>

          <div className="md:col-span-2 bg-navy-900 border border-navy-700 rounded-2xl p-6 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Amount</span>
              <span className="text-2xl font-bold text-emerald-400 mt-1 block">{formatCurrency(transaction.amount)}</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Decision Status</span>
              <span className="inline-block mt-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                {transaction.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{transaction.cardNumber} ({transaction.cardType})</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{transaction.location}</span>
            </div>
            <div className="col-span-2 flex items-center gap-2 text-xs text-slate-400 border-t border-navy-800 pt-3">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Recorded: {transaction.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Top Contributing Features */}
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-slate-100">Top Contributing Features</h3>
            </div>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/30">
              illustrative
            </span>
          </div>

          <div className="space-y-3">
            {features.map((feat) => (
              <div key={feat.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-200">{feat.name}</span>
                  <span className="text-slate-400">value: {feat.raw}</span>
                </div>
                <div className="w-full h-2.5 bg-navy-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${feat.color}`}
                    style={{ width: `${Math.min(feat.impact, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            Decision Pipeline Timeline
          </h3>

          <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-navy-700">
            {transaction.timeline.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-3">
                <div
                  className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 ${
                    step.completed
                      ? 'bg-emerald-500 border-emerald-400 ring-2 ring-emerald-500/20'
                      : 'bg-navy-800 border-slate-600'
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-200">{step.title}</h4>
                    <span className="text-[10px] text-slate-400">({step.time})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
