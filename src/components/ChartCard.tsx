import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  actionNode?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  actionNode,
  children,
  className = '',
}) => {
  return (
    <div className={`bg-navy-800 border border-navy-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between ${className}`}>
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-100">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {actionNode && <div>{actionNode}</div>}
      </div>
      <div className="w-full flex-1 min-h-[260px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
