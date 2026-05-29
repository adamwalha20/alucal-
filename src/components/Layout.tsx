import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Box,
  Factory,
  Calculator,
  LineChart,
  Settings,
  Bell,
  UserCircle,
  Search,
} from 'lucide-react';
import { cn } from '../lib/utils';

export function Layout() {
  const navItems = [
    { name: 'Tableau de Bord', path: '/', icon: LayoutDashboard },
    { name: 'Produits', path: '/products', icon: Box },
    { name: 'Matières Premières', path: '/materials', icon: Factory },
    { name: 'Calculateur', path: '/calculator', icon: Calculator },
    { name: 'Analyses', path: '/analytics', icon: LineChart },
    { name: 'Paramètres', path: '/settings', icon: Settings, bottom: true },
  ];

  return (
    <div className="flex bg-background min-h-screen text-on-background overflow-hidden relative font-body-md w-full">
      {/* Sidebar */}
      <nav className="fixed left-0 top-0 h-full w-[260px] bg-secondary-fixed border-r border-outline-variant flex flex-col py-6 z-20">
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xl">
            A
          </div>
          <div>
            <h1 className="font-headline-md font-bold text-on-background leading-tight">AluCalc Pro</h1>
            <p className="text-[11px] font-semibold text-secondary">Prix de Revient</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          {navItems.filter(item => !item.bottom).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 text-[14px] transition-colors border-l-4',
                  isActive
                    ? 'border-primary text-primary font-bold bg-surface-container-high'
                    : 'border-transparent text-secondary hover:bg-surface-container-low'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="flex flex-col gap-1 mt-auto">
          {navItems.filter(item => item.bottom).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 text-[14px] transition-colors border-l-4',
                  isActive
                    ? 'border-primary text-primary font-bold bg-surface-container-high'
                    : 'border-transparent text-secondary hover:bg-surface-container-low'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main Wrapper */}
      <div className="ml-[260px] w-[calc(100%-260px)] flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-surface border-b border-outline-variant flex justify-between items-center h-16 px-6 z-10 shrink-0">
          <div className="flex items-center gap-8">
            <div className="font-headline-md font-bold text-primary">Prix de Revient Aluminium</div>
            <nav className="hidden md:flex gap-6">
              <span className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-sm">Projets</span>
              <span className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-sm">Archives</span>
              <span className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-sm">Export</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher une référence..."
                className="pl-9 pr-4 py-1.5 bg-surface-container-lowest border border-outline-variant rounded text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 placeholder:text-outline"
              />
            </div>
            <button className="text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-variant transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-variant transition-colors">
              <UserCircle className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dynamic Page Canvas */}
        <main className="flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
