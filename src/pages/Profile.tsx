import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import { User, Bell, Lock, ShieldCheck, Mail, Phone, Building, Save, KeyRound, Sun, Moon } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const { theme, setTheme } = useTheme();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [department, setDepartment] = useState(user?.department || '');

  const [notifications, setNotifications] = useState(
    user?.notifications || {
      highRiskAlerts: true,
      dailySummary: true,
      emailDigest: false,
      smsUrgent: true,
      soundEffects: true,
    }
  );

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone, department, notifications });
    showToast('Profile Updated', 'Account details and notification preferences saved.', 'success');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      showToast('Error', 'Please enter your current password.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('Error', 'New password must be at least 6 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Error', 'New passwords do not match.', 'error');
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password Changed', 'Your security password has been successfully updated.', 'success');
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Analyst Profile & Security</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your operator account details, notification channels, and credential settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Account Overview Avatar Box */}
        <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-500/30"
            />
            <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-navy-800 flex items-center justify-center text-white text-[10px]">
              ✓
            </span>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-100">{user?.name}</h2>
            <p className="text-xs text-indigo-400 font-semibold mt-0.5">{user?.role}</p>
            <p className="text-xs text-slate-400 mt-1">{user?.department}</p>
          </div>

          <div className="w-full pt-4 border-t border-navy-700 space-y-2 text-xs text-left">
            <div className="flex justify-between py-1 border-b border-navy-900">
              <span className="text-slate-400">Employee ID:</span>
              <span className="font-mono text-slate-200 font-semibold">{user?.employeeId}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-navy-900">
              <span className="text-slate-400">Security Clearance:</span>
              <span className="text-emerald-400 font-semibold">Level 3 (Senior Risk)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Active Workstation:</span>
              <span className="text-slate-200">Terminal #89-NYC</span>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Details Form */}
          <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 shadow-lg space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-navy-700">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Account Details</h3>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-navy-900 border border-navy-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-navy-900 border border-navy-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-navy-900 border border-navy-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-navy-900 border border-navy-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-colors"
                >
                  <Save className="w-4 h-4" /> Save Account Changes
                </button>
              </div>
            </form>
          </div>

          {/* Appearance & Theme Settings */}
          <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 shadow-lg space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-navy-700">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">Interface Theme & Mode</h3>
                <p className="text-xs text-slate-400">Toggle between Dark Security Operations theme and Clean Light mode</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                  theme === 'dark'
                    ? 'border-indigo-500 bg-navy-900/90 ring-2 ring-indigo-500/30'
                    : 'border-navy-700 bg-navy-900/40 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-slate-800 text-slate-100">
                    <Moon className="w-4 h-4" />
                  </div>
                  {theme === 'dark' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500 text-white">Active</span>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Dark Navy Mode</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">High-contrast SOC near-black palette (#0B1020)</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                  theme === 'light'
                    ? 'border-indigo-500 bg-slate-100 text-slate-900 ring-2 ring-indigo-500/30'
                    : 'border-navy-700 bg-navy-900/40 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500">
                    <Sun className="w-4 h-4" />
                  </div>
                  {theme === 'light' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">Active</span>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Clean Light Mode</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Crisp daytime palette with high readability</p>
                </div>
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 shadow-lg space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-navy-700">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Notification Preferences</h3>
            </div>

            <div className="space-y-3">
              {[
                { key: 'highRiskAlerts', title: 'High-Risk Incident Popups', desc: 'Instant desktop alert when fraud probability exceeds 70%' },
                { key: 'dailySummary', title: 'Daily Risk Summary', desc: 'Receive daily aggregated metrics report at 08:00 AM' },
                { key: 'smsUrgent', title: 'Urgent SMS Dispatch', desc: 'Dispatch SMS for critical anomaly spikes' },
                { key: 'soundEffects', title: 'Audio Alert Sound Effects', desc: 'Play subtle audio ping when new high-risk transaction arrives' },
              ].map((item) => {
                const isChecked = notifications[item.key as keyof typeof notifications];
                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-3 rounded-xl bg-navy-900 border border-navy-700/60"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-slate-200">{item.title}</h4>
                      <p className="text-[11px] text-slate-400">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isChecked ? 'bg-teal-500' : 'bg-slate-700'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isChecked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Change Password Form */}
          <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 shadow-lg space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-navy-700">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Change Password</h3>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-navy-900 border border-navy-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-navy-900 border border-navy-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-navy-900 border border-navy-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-colors"
                >
                  <KeyRound className="w-4 h-4" /> Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
