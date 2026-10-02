import React from 'react';
import { RiskLevel } from '../utils/risk';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, showIcon = true, size = 'md' }) => {
  let bgClass = '';
  let borderClass = '';
  let textClass = '';
  let Icon = ShieldCheck;

  if (level === 'Low') {
    bgClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    borderClass = 'border-emerald-500/30';
    textClass = 'text-emerald-400';
    Icon = ShieldCheck;
  } else if (level === 'Medium') {
    bgClass = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    borderClass = 'border-amber-500/30';
    textClass = 'text-amber-400';
    Icon = AlertTriangle;
  } else {
    bgClass = 'bg-red-500/10 text-red-400 border-red-500/30';
    borderClass = 'border-red-500/30';
    textClass = 'text-red-400';
    Icon = ShieldAlert;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs font-medium px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-semibold px-3 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${bgClass} ${sizeClasses[size]} transition-all duration-150`}
    >
      {showIcon && <Icon className={`${iconSizes[size]} ${textClass}`} />}
      <span>{level} Risk</span>
    </span>
  );
};
