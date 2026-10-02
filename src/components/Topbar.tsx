import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, Database, Menu, X, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  onToggleSidebarMobile: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebarMobile }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'High Risk Alert: TXN-984210', time: '2 mins ago', read: false },
    { id: '2', title: 'Flagged transaction blocked automatically', time: '12 mins ago', read: false },
    { id: '3', title: 'Daily Risk Intelligence Report Ready', time: '1 hour ago', read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/live?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-navy-850/80 backdrop-blur-md border-b border-navy-700 px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Left side: Mobile menu toggle + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onToggleSidebarMobile}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-navy-700/60"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transaction ID, merchant, card..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-800 border border-navy-700 rounded-xl pl-10 pr-4 py-1.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </form>
      </div>

      {/* Right side: Badge, Theme toggle, Notification bell, User avatar */}
      <div className="flex items-center gap-3.5">
        {/* Sample Data Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
          <Database className="w-3.5 h-3.5 text-indigo-400" />
          <span>Sample Data</span>
        </div>

        {/* Theme Toggle (Dark & Light Mode Switcher) */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-navy-700 bg-navy-800 text-slate-300 hover:text-slate-100 hover:border-slate-600 transition-all text-xs font-semibold shadow-sm"
          title={`Currently ${theme === 'dark' ? 'Dark' : 'Light'} Mode. Click to switch.`}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Dark Mode</span>
            </>
          )}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-navy-800 transition-colors border border-transparent hover:border-navy-700"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-navy-900 animate-pulse" />
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-navy-800 border border-navy-700 rounded-2xl shadow-2xl z-50 p-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-navy-700 mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-100">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-red-500/20 text-red-400 text-xs font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllAsRead}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl text-xs transition-colors ${
                      n.read ? 'bg-navy-900/40 text-slate-400' : 'bg-indigo-500/10 text-slate-200 border border-indigo-500/20'
                    }`}
                  >
                    <p className="font-medium">{n.title}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Link */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 pl-2 border-l border-navy-700 hover:opacity-90 transition-opacity"
        >
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/40"
          />
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-100 leading-tight">{user?.name}</span>
            <span className="text-[10px] text-slate-400">{user?.role}</span>
          </div>
        </button>
      </div>
    </header>
  );
};
