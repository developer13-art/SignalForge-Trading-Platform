import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ThemeToggle } from '../components/common/ThemeToggle';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Auth Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                SignalForge<span className="text-primary-600"> AI</span>
              </span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Auth Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Auth Footer */}
      <footer className="py-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} SignalForge AI
        </p>
      </footer>
    </div>
  );
}