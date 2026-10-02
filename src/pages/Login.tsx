import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, ArrowRight, ShieldCheck, Cpu, Database } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('s.jenkins@fraudguardbank.com');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid bank staff email address.');
      return;
    }

    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    setLoading(true);

    // Simulate login delay
    setTimeout(() => {
      login(email);
      setLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col lg:flex-row font-sans">
      {/* Left Brand Panel */}
      <div className="lg:w-1/2 bg-gradient-to-br from-navy-900 via-navy-850 to-indigo-950 p-8 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-navy-700/60 relative overflow-hidden">
        {/* Background Ambient Elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center gap-3 z-10">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-600 to-teal-400 shadow-xl shadow-indigo-500/20">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">FraudGuard</h1>
            <p className="text-xs uppercase tracking-wider font-semibold text-teal-400">Enterprise AI Security</p>
          </div>
        </div>

        {/* Hero Tagline & Features */}
        <div className="my-12 lg:my-0 space-y-8 z-10 max-w-lg">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-100 leading-tight">
              Real-time AI Credit Card Fraud Prevention Platform
            </h2>
            <p className="mt-4 text-slate-300 text-sm leading-relaxed">
              Empowering bank staff and risk intelligence officers with high-velocity ML anomaly detection, streaming analytics, and automated decision workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-navy-800/60 border border-navy-700/80 backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5 text-teal-400 mb-2" />
              <h4 className="text-sm font-semibold text-slate-200">Sub-100ms Inference</h4>
              <p className="text-xs text-slate-400 mt-1">Instant anomaly evaluation for high-throughput payment rails.</p>
            </div>
            <div className="p-4 rounded-2xl bg-navy-800/60 border border-navy-700/80 backdrop-blur-sm">
              <Cpu className="w-5 h-5 text-indigo-400 mb-2" />
              <h4 className="text-sm font-semibold text-slate-200">Adaptive Risk Engine</h4>
              <p className="text-xs text-slate-400 mt-1">Multi-layered feature classification (V1-V28 PCA features).</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="z-10 flex items-center justify-between text-xs text-slate-400 pt-6 border-t border-navy-700/60">
          <span>College Project Prototype</span>
          <span className="flex items-center gap-1 text-indigo-300 font-medium">
            <Database className="w-3.5 h-3.5 text-indigo-400" /> Sample Data Mode
          </span>
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="lg:w-1/2 bg-navy-900 p-8 lg:p-16 flex flex-col justify-center items-center">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Bank Staff Portal</h2>
            <p className="text-xs text-slate-400 mt-1">Sign in with your institutional credentials to access FraudGuard.</p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium animate-fadeIn">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="s.jenkins@fraudguardbank.com"
                  className="w-full bg-navy-800 border border-navy-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-navy-800 border border-navy-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-navy-700 bg-navy-800 text-indigo-600 focus:ring-indigo-500" />
                <span>Remember me on this workstation</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign in to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 leading-relaxed">
            <span className="font-semibold block mb-0.5">Prototype Quick Access:</span>
            Any email and password input will log in to the demo dashboard interface.
          </div>
        </div>
      </div>
    </div>
  );
};
