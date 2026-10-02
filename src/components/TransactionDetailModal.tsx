import React from 'react';
import { Transaction } from '../data/mock';
import { RiskBadge } from './RiskBadge';
import { formatCurrency, formatProbability } from '../utils/risk';
import { X, Calendar, MapPin, CreditCard, ShieldAlert, CheckCircle2, Clock, Cpu, UserCheck, ShieldX } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  onStatusUpdate?: (id: string, newStatus: 'Approved' | 'Verified' | 'Blocked') => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose,
  onStatusUpdate,
}) => {
  const { showToast } = useToast();

  if (!transaction) return null;

  const handleAction = (status: 'Approved' | 'Verified' | 'Blocked') => {
    if (onStatusUpdate) {
      onStatusUpdate(transaction.id, status);
    }
    const toastTitle =
      status === 'Approved'
        ? `Transaction ${transaction.id} Approved`
        : status === 'Verified'
        ? `Customer Verification Initiated`
        : `Transaction ${transaction.id} Blocked`;
    const toastType = status === 'Approved' ? 'success' : status === 'Verified' ? 'warning' : 'error';
    showToast(toastTitle, `Updated status to ${status}`, toastType);
    onClose();
  };

  const probPercent = Math.round(transaction.probability * 100);

  // Contributing features mock
  const features = [
    { name: 'V14 (Anom. Score)', impact: Math.abs(transaction.v14) * 15, raw: transaction.v14, color: 'bg-red-500' },
    { name: 'V17 (Velocity)', impact: Math.abs(transaction.v17) * 12, raw: transaction.v17, color: 'bg-amber-500' },
    { name: 'V12 (Merchant Ratio)', impact: Math.abs(transaction.v12) * 10, raw: transaction.v12, color: 'bg-indigo-500' },
    { name: 'Amount Deviation', impact: Math.min((transaction.amount / 3000) * 100, 100), raw: `$${transaction.amount}`, color: 'bg-teal-500' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-navy-800 border border-navy-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-navy-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-100">{transaction.id}</h2>
                <RiskBadge level={transaction.riskLevel} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{transaction.merchant} • {transaction.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-navy-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* Top Row: Risk Gauge & Core Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Risk Gauge Box */}
            <div className="bg-navy-900 border border-navy-700 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">AI Fraud Score</span>
              
              {/* Semi Gauge */}
              <div className="relative w-28 h-14 overflow-hidden mb-2">
                <div className="w-28 h-28 rounded-full border-[10px] border-slate-700 border-t-red-500 border-r-amber-500 border-b-transparent border-l-emerald-500" />
                <div
                  className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-100 pt-4"
                >
                  {formatProbability(transaction.probability)}
                </div>
              </div>

              <span className="text-xs font-medium text-slate-300">
                Probability: <span className="font-bold text-slate-100">{transaction.probability}</span>
              </span>
            </div>

            {/* Summary details */}
            <div className="md:col-span-2 bg-navy-900 border border-navy-700 rounded-2xl p-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Amount</span>
                <span className="text-xl font-bold text-emerald-400 mt-0.5 block">{formatCurrency(transaction.amount)}</span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Current Status</span>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
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
              <div className="col-span-2 flex items-center gap-2 text-xs text-slate-400 border-t border-navy-800 pt-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Recorded: {transaction.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Top Contributing Features */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-semibold text-slate-100">Top Contributing Features</h3>
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/30">
                illustrative
              </span>
            </div>

            <div className="space-y-3">
              {features.map((feat) => (
                <div key={feat.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">{feat.name}</span>
                    <span className="text-slate-400">val: {feat.raw}</span>
                  </div>
                  <div className="w-full h-2 bg-navy-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${feat.color}`}
                      style={{ width: `${Math.min(feat.impact, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lifecycle Timeline */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              Event Timeline
            </h3>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-navy-700">
              {transaction.timeline.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-3">
                  <div
                    className={`absolute -left-6 top-1 w-3 h-3 rounded-full border-2 ${
                      step.completed
                        ? 'bg-emerald-500 border-emerald-400 ring-2 ring-emerald-500/20'
                        : 'bg-navy-800 border-slate-600'
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold text-slate-200">{step.title}</h4>
                      <span className="text-[10px] text-slate-400">({step.time})</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-navy-700 bg-navy-850 rounded-b-3xl flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">Analyst Action Override</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('Approved')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" /> Approve
            </button>
            <button
              onClick={() => handleAction('Verified')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
            >
              <UserCheck className="w-4 h-4" /> Verify
            </button>
            <button
              onClick={() => handleAction('Blocked')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors"
            >
              <ShieldX className="w-4 h-4" /> Block
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
