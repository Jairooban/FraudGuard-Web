import React from 'react';

export const SkeletonCard: React.FC = () => (
  <div className="bg-navy-800 border border-navy-700 rounded-2xl p-5 shadow-lg animate-pulse">
    <div className="flex justify-between items-center mb-4">
      <div className="h-3 bg-slate-700/60 rounded w-1/3"></div>
      <div className="w-9 h-9 bg-slate-700/60 rounded-xl"></div>
    </div>
    <div className="h-7 bg-slate-700/60 rounded w-1/2 mb-3"></div>
    <div className="h-3 bg-slate-700/60 rounded w-2/3"></div>
  </div>
);

export const SkeletonChart: React.FC = () => (
  <div className="bg-navy-800 border border-navy-700 rounded-2xl p-5 shadow-lg animate-pulse min-h-[300px] flex flex-col justify-between">
    <div className="space-y-2">
      <div className="h-4 bg-slate-700/60 rounded w-1/4"></div>
      <div className="h-3 bg-slate-700/60 rounded w-1/3"></div>
    </div>
    <div className="h-48 bg-slate-700/30 rounded-xl my-4 flex items-end justify-between p-4 gap-2">
      <div className="h-1/3 w-full bg-slate-700/40 rounded"></div>
      <div className="h-2/3 w-full bg-slate-700/40 rounded"></div>
      <div className="h-1/2 w-full bg-slate-700/40 rounded"></div>
      <div className="h-4/5 w-full bg-slate-700/40 rounded"></div>
      <div className="h-3/5 w-full bg-slate-700/40 rounded"></div>
    </div>
  </div>
);

export const SkeletonTable: React.FC = () => (
  <div className="bg-navy-800 border border-navy-700 rounded-2xl p-5 shadow-lg animate-pulse space-y-4">
    <div className="h-5 bg-slate-700/60 rounded w-1/4"></div>
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-10 bg-slate-700/30 rounded-lg w-full"></div>
      ))}
    </div>
  </div>
);
