import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '../providers/AuthProvider';
import KeycloakService from '../feature/keycloak/keycloak';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const { profile, logout } = useAuth();
  console.log(profile)
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' }
  ];

  // dung memo de tranh tinh toan lai khong can thiet
  const displayName = React.useMemo(() => {
    if (!profile) return 'Guest';
    const fn = profile.firstName?.trim();
    const ln = profile.lastName?.trim();
    if (fn || ln) return `${fn ?? ''}${fn && ln ? ' ' : ''}${ln ?? ''}`.trim();
    if (profile.name) return profile.name;
    if (profile.username) return profile.username;
    return profile.email ?? 'Guest';
  }, [profile]);

  const secondaryInfo = React.useMemo(() => {
    if (!profile) return '';
    // prefer username, otherwise show email
    return profile.username ?? profile.email ?? '';
  }, [profile]);

  const initials = React.useMemo(() => {
    console.log("Hien thi")
    if (!profile) return 'U';
    // prefer first/last name for initials
    const fn = profile.firstName?.trim() ?? '';
    const ln = profile.lastName?.trim() ?? '';
    if (fn || ln) {
      const firstChar = fn ? fn[0] : ln[0];
      const lastChar = ln ? ln[0] : fn[1] ?? '';
      return (firstChar + (lastChar || '')).slice(0, 2).toUpperCase();
    }
    const name = profile.name || profile.username || profile.email || '';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'U';
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).slice(0, 2).toUpperCase();
  }, [profile]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">BookNet</h1>

          {/* Right side: nav + profile */}
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-4">
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  className={classNames(
                    'px-3 py-2 rounded-md text-sm font-medium',
                    location.pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Profile widget (corner) */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {initials}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-medium text-gray-700">
                  {displayName}
                </span>
                <span className="text-xs text-gray-500">
                  {secondaryInfo}
                </span>
              </div>
              <button
                onClick={() => {
                  KeycloakService.keycloak.accountManagement();
                }}
                className="ml-2 px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Account
              </button>
              <button
                onClick={() => {
                  console.log('👋 Logging out user:', profile);
                  logout();
                }}
                className="ml-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner">
        <div className="container mx-auto px-4 py-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} BookNet. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
