import React, { useState } from 'react';
import { initialTransactions, generateRandomTransaction, Transaction } from '../data/mock';
import { RiskBadge } from '../components/RiskBadge';
import { formatCurrency, formatProbability } from '../utils/risk';
import {
  FileSpreadsheet,
  Download,
  Calendar,
  Filter,
  FileText,
  CheckCircle,
  FileCode,
  Sparkles,
  PlusCircle,
  RefreshCw,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Reports: React.FC = () => {
  const { showToast } = useToast();

  const [reportType, setReportType] = useState('All Transactions');
  const [dateRange, setDateRange] = useState('7d');
  const [riskFilter, setRiskFilter] = useState('All');
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');

  // Master transaction pool (can generate more records on demand)
  const [transactionPool, setTransactionPool] = useState<Transaction[]>(() => {
    // Start with pre-populated transactions + realistic batch
    const pool = [...initialTransactions];
    for (let i = 0; i < 20; i++) {
      pool.push(generateRandomTransaction());
    }
    return pool;
  });

  const [previewRows, setPreviewRows] = useState<Transaction[]>(() => transactionPool);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate / Update Filtered Preview
  const handleGeneratePreview = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let rows = [...transactionPool];

      // Filter by Report Category
      if (reportType === 'High Risk Only') {
        rows = rows.filter((r) => r.riskLevel === 'High');
      } else if (reportType === 'Flagged & Blocked') {
        rows = rows.filter((r) => r.status === 'Flagged' || r.status === 'Blocked');
      } else if (reportType === 'Cleared & Approved') {
        rows = rows.filter((r) => r.status === 'Approved' || r.status === 'Verified');
      }

      // Filter by Risk Level
      if (riskFilter !== 'All') {
        rows = rows.filter((r) => r.riskLevel === riskFilter);
      }

      // Filter by Date Range (simulated based on timestamp)
      const now = Date.now();
      if (dateRange === '24h') {
        rows = rows.filter((r) => now - r.rawTimestamp <= 24 * 3600 * 1000);
      } else if (dateRange === '7d') {
        rows = rows.filter((r) => now - r.rawTimestamp <= 7 * 24 * 3600 * 1000);
      } else if (dateRange === '30d') {
        rows = rows.filter((r) => now - r.rawTimestamp <= 30 * 24 * 3600 * 1000);
      }

      // Fallback: if filtered rows is 0 due to date filter, keep filtered by type & risk
      if (rows.length === 0) {
        let fallback = [...transactionPool];
        if (reportType === 'High Risk Only') fallback = fallback.filter((r) => r.riskLevel === 'High');
        if (riskFilter !== 'All') fallback = fallback.filter((r) => r.riskLevel === riskFilter);
        rows = fallback.length > 0 ? fallback : transactionPool.slice(0, 10);
      }

      setPreviewRows(rows);
      setIsGenerating(false);
      showToast('Report Generated', `Generated report with ${rows.length} transactions ready to export.`, 'success');
    }, 300);
  };

  // Generate 15 New Synthetic Transactions into the Pool
  const handleGenerateMoreData = () => {
    const newItems: Transaction[] = [];
    for (let i = 0; i < 15; i++) {
      newItems.push(generateRandomTransaction());
    }
    const updatedPool = [...newItems, ...transactionPool];
    setTransactionPool(updatedPool);
    setPreviewRows(updatedPool);
    showToast('Mock Data Ingested', `Generated 15 new synthetic transactions into dataset (${updatedPool.length} total).`, 'info');
  };

  // Robust File Download Helper (Blob + ObjectURL works on all browsers and deployed sites)
  const downloadFile = (content: string, filename: string, mimeType: string) => {
    try {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      // Clean up after slight delay
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 200);

      showToast('File Exported Successfully', `Downloaded ${filename} (${previewRows.length} records)`, 'success');
    } catch (err) {
      console.error('Export download failed:', err);
      showToast('Export Failed', 'Browser blocked file generation. Please check permissions.', 'error');
    }
  };

  // Export as CSV
  const handleExportCSV = () => {
    if (previewRows.length === 0) {
      showToast('Export Notice', 'No matching transactions to export. Click "Generate Report" first.', 'warning');
      return;
    }

    const headers = [
      'Transaction ID',
      'Timestamp',
      'Merchant',
      'Category',
      'Amount (USD)',
      'Card Number',
      'Location',
      'Fraud Probability (%)',
      'Risk Level',
      'Status',
      'Feature V14',
      'Feature V17',
      'Feature V12'
    ];

    const csvLines = [headers.join(',')];

    previewRows.forEach((t) => {
      const row = [
        `"${t.id}"`,
        `"${t.timestamp}"`,
        `"${t.merchant.replace(/"/g, '""')}"`,
        `"${t.category.replace(/"/g, '""')}"`,
        t.amount.toFixed(2),
        `"${t.cardNumber}"`,
        `"${t.location.replace(/"/g, '""')}"`,
        (t.probability * 100).toFixed(1),
        `"${t.riskLevel}"`,
        `"${t.status}"`,
        t.v14,
        t.v17,
        t.v12
      ];
      csvLines.push(row.join(','));
    });

    const csvString = csvLines.join('\r\n');
    const safeReportName = reportType.replace(/\s+/g, '_');
    const filename = `FraudGuard_${safeReportName}_${dateRange}_${Date.now()}.csv`;

    downloadFile(csvString, filename, 'text/csv;charset=utf-8;');
  };

  // Export as JSON
  const handleExportJSON = () => {
    if (previewRows.length === 0) {
      showToast('Export Notice', 'No records to export.', 'warning');
      return;
    }

    const jsonString = JSON.stringify(
      {
        reportTitle: `FraudGuard Audit Report - ${reportType}`,
        generatedAt: new Date().toISOString(),
        filterScope: { reportType, dateRange, riskFilter },
        totalRecords: previewRows.length,
        records: previewRows
      },
      null,
      2
    );

    const safeReportName = reportType.replace(/\s+/g, '_');
    const filename = `FraudGuard_${safeReportName}_${dateRange}_${Date.now()}.json`;

    downloadFile(jsonString, filename, 'application/json;charset=utf-8;');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Audit & Compliance Reports</h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate custom audit datasets, test AI risk classifications, and export CSV/JSON compliance packages
          </p>
        </div>

        <button
          onClick={handleGenerateMoreData}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-navy-800 border border-navy-700 hover:border-slate-500 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
          title="Simulate incoming transactions for larger reports"
        >
          <PlusCircle className="w-4 h-4 text-teal-400" />
          <span>Generate 15 More Records</span>
        </button>
      </div>

      {/* Report Generator Controls Card */}
      <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 shadow-lg space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-navy-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Report Parameters</h3>
              <p className="text-xs text-slate-400">Configure query filters to generate structured report data</p>
            </div>
          </div>

          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
            {previewRows.length} Rows In Query
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Report Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Report Category
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-navy-900 border border-navy-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="All Transactions">All Transactions Summary</option>
              <option value="High Risk Only">High Risk Anomalies (&gt; 70%)</option>
              <option value="Flagged & Blocked">Flagged & Blocked Incidents</option>
              <option value="Cleared & Approved">Cleared & Approved Log</option>
            </select>
          </div>

          {/* Date Range Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-navy-900 border border-navy-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days (Default)</option>
              <option value="30d">Last 30 Days</option>
              <option value="quarter">Current Quarter (Q3 2026)</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Risk Level Scope
            </label>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full bg-navy-900 border border-navy-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="All">All Risk Ratings</option>
              <option value="High">High Risk Only (&gt; 70%)</option>
              <option value="Medium">Medium Risk (30% - 70%)</option>
              <option value="Low">Low Risk (&lt; 30%)</option>
            </select>
          </div>

          {/* Format Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setExportFormat('csv')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                  exportFormat === 'csv'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                    : 'bg-navy-900 text-slate-400 border-navy-700 hover:text-slate-200'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
              <button
                type="button"
                onClick={() => setExportFormat('json')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                  exportFormat === 'json'
                    ? 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-600/30'
                    : 'bg-navy-900 text-slate-400 border-navy-700 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>JSON</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-navy-700">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Showing <strong className="text-slate-200 font-semibold">{previewRows.length}</strong> matching transaction records
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Generate / Apply filters button */}
            <button
              onClick={handleGeneratePreview}
              disabled={isGenerating}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-navy-900 border border-navy-700 hover:border-slate-500 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Generating...' : 'Apply Filters'}</span>
            </button>

            {/* Export Action */}
            <button
              onClick={exportFormat === 'csv' ? handleExportCSV : handleExportJSON}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export {exportFormat.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview Table */}
      <div className="bg-navy-800 border border-navy-700 rounded-2xl shadow-lg overflow-hidden space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <h3 className="text-base font-bold text-slate-100">Live Report Preview</h3>
          </div>
          <span className="text-xs text-slate-400">
            Previewing top {Math.min(previewRows.length, 12)} of {previewRows.length} transactions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-navy-700 text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-navy-850">
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Merchant</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">AI Prob</th>
                <th className="py-3 px-3">Risk</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700/60 text-xs">
              {previewRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No transactions match the selected filters. Click "Generate 15 More Records" above.
                  </td>
                </tr>
              ) : (
                previewRows.slice(0, 15).map((t) => (
                  <tr key={t.id} className="hover:bg-navy-700/40 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-100">{t.id}</td>
                    <td className="py-3 px-3 text-slate-400">{t.timestamp}</td>
                    <td className="py-3 px-3 text-slate-200">
                      <span className="font-semibold">{t.merchant}</span>
                      <span className="text-[10px] text-slate-400 block">{t.category}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">{t.location}</td>
                    <td className="py-3 px-3 font-bold text-slate-100">{formatCurrency(t.amount)}</td>
                    <td className="py-3 px-3 font-bold text-slate-200">{formatProbability(t.probability)}</td>
                    <td className="py-3 px-3">
                      <RiskBadge level={t.riskLevel} size="sm" />
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          t.status === 'Approved'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : t.status === 'Blocked'
                            ? 'bg-red-500/10 text-red-400 border-red-500/30'
                            : t.status === 'Verified'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-navy-900 text-slate-300 border-navy-700'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
