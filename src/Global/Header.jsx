// src/Global/Header.jsx
import React from 'react';

const Header = ({ userMode, toggleMode, setIsMenuOpen, currentView, setCurrentView }) => {
  // Dynamic color based on user mode
  const themeColor = userMode === 'client' ? 'var(--primary-client)' : 'var(--primary-provider)';

  return (
    <header
      className="header w-full flex items-center justify-between"
      style={{
        borderBottom: 'none',
        backgroundColor: 'var(--white)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="logo text-lg font-bold" style={{ color: themeColor }}>
          Alacritas{' '}
          <small className="text-gray-700">
            ({userMode === 'client' ? 'Client' : 'Provider'})
          </small>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex justify-center gap-4 overflow-x-auto">
        {['home', 'messages', 'offers', 'profile'].map((view) => (
          <button
            key={view}
            className="nav-btn px-3 py-1 font-medium border-b-2 transition-colors"
            onClick={() => setCurrentView(view)}
            style={{
              color: currentView === view ? themeColor : '#666',
              borderBottom: currentView === view ? `3px solid ${themeColor}` : '3px solid transparent',
              fontWeight: currentView === view ? 'bold' : 'normal',
            }}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </nav>

      {/* Right controls: Switch mode & Menu */}
      <div className="flex items-center gap-3">
        <button className="switch-btn" onClick={toggleMode}>
          Switch to {userMode === 'client' ? 'Provider' : 'Client'}
        </button>
        <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
