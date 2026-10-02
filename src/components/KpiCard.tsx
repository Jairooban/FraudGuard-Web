import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  changePeriod?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  isInverseTrend?: boolean; // e.g. for fraud rate, lower change is good (green)
  subtext?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  changePeriod = 'vs last week',
  icon: Icon,
  iconBgColor = 'bg-indigo-500/10 border-indigo-500/20',
  iconColor = 'text-indigo-400',
  isInverseTrend = false,
  subtext,
}) => {
  const isPositive = change !== undefined && change >= 0;
  
  // Is green good? Normally positive change is green. But for fraud rate, negative change is green.
  const isGood = isInverseTrend ? !isPositive : isPositive;

  return (
    <div className="bg-navy-800 border border-navy-700 rounded-2xl p-5 hover:border-slate-700/80 transition-all duration-200 shadow-lg group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        <div className={`p-2.5 rounded-xl border ${iconBgColor} group-hover:scale-105 transition-transform duration-200`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <h3 className="text-2xl font-bold text-slate-100 tracking-tight">{value}</h3>
      </div>

      {change !== undefined ? (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span
            className={`inline-flex items-center gap-0.5 font-semibold px-1.5 py-0.5 rounded-md ${
              isGood
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {isPositive ? `+${change}%` : `${change}%`}
          </span>
          <span className="text-slate-400">{changePeriod}</span>
        </div>
      ) : subtext ? (
        <div className="mt-3 text-xs text-slate-400">{subtext}</div>
      ) : null}
    </div>
  );
};
