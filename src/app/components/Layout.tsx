import { Outlet, Link, useLocation } from 'react-router';
import { Building, BarChart3, FolderOpen, Menu, X, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { CoatOfArms } from './CoatOfArms';

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Building },
    { path: '/projects', label: 'Projects', icon: FolderOpen },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg hidden sm:inline">Nigeria NPS</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-3 space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <Outlet />

      <footer className="bg-gray-900 text-gray-300 mt-12">
        {/* Top band — green stripe */}
        <div className="h-1.5 bg-gradient-to-r from-green-700 via-white to-green-700" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main footer grid */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1 — Branding */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-tight">Nigeria NPS</div>
                  <div className="text-xs text-gray-400">National Performance Scorecard</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                An initiative of the Federal Government of Nigeria to promote transparency, accountability, and citizen engagement in tracking national development across all 36 states and the FCT.
              </p>
              {/* Coat of arms placeholder */}
              <div className="flex items-center gap-3">
                <CoatOfArms className="w-12 h-12" />
                <div className="text-xs text-gray-500 leading-snug">
                  Federal Republic<br />of Nigeria
                </div>
              </div>
            </div>

            {/* Column 2 — Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-2.5">
                {[
                  { to: '/dashboard', label: 'National Dashboard' },
                  { to: '/projects', label: 'All Projects' },
                  { to: '/analytics', label: 'Performance Analytics' },
                ].map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Government Resources */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Government Resources</h3>
              <ul className="space-y-2.5">
                {[
                  { href: 'https://statehouse.gov.ng', label: 'Office of the President' },
                  { href: 'https://www.budgetoffice.gov.ng', label: 'Budget Office of the Federation' },
                  { href: 'https://nbs.gov.ng', label: 'National Bureau of Statistics' },
                  { href: 'https://opentreasury.gov.ng', label: 'Open Treasury Portal' },
                  { href: 'https://www.icpc.gov.ng', label: 'ICPC' },
                ].map(link => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center gap-1.5">
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Contact */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-400">Federal Secretariat, Shehu Shagari Way, Three Arms Zone, Abuja, FCT, Nigeria</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm text-gray-400">+234 (0) 9 234 5678</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm text-gray-400">info@nps.gov.ng</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800" />

          {/* Bottom bar */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Federal Government of Nigeria. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 text-center sm:text-right">
              Powered by the Renewed Hope Agenda — Transparency &middot; Accountability &middot; Good Governance
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
