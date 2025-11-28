// src/Header.jsx
import React from 'react';

const Header = ({ userMode, toggleMode, currentView, setCurrentView, setIsMenuOpen }) => {
    // Determine the theme color based on the user mode (Tailwind colors)
    const themeColor = userMode === 'client' ? 'border-b-blue-500' : 'border-b-green-500';
    const logoColor = userMode === 'client' ? 'text-blue-600' : 'text-green-600';
    const accentColor = userMode === 'client' ? 'hover:bg-blue-50' : 'hover:bg-green-50';
    const activeColor = userMode === 'client' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';

    return (
        // HEADER: bg, shadow, padding, theme border
        <header className={`sticky top-0 z-10 bg-white shadow-md p-4 flex items-center justify-between ${themeColor} border-b-4`}>
            
            {/* Logo */}
            <div className={`text-2xl font-bold ${logoColor} flex-shrink-0`}>
                Alacritas <small className="text-gray-500 text-sm font-normal ml-1">({userMode === 'client' ? 'Client' : 'Provider'})</small>
            </div>

            {/* Navigation (nav-middle) */}
            <nav className="flex space-x-2 mx-4 flex-grow justify-center">
                {['home', 'messages', 'offers'].map((view) => (
                    <button 
                        key={view}
                        className={`px-4 py-2 rounded-full font-medium transition duration-150 ease-in-out
                            ${currentView === view ? activeColor : `text-gray-600 ${accentColor}`}
                        `}
                        onClick={() => setCurrentView(view)}
                    >
                        {view.charAt(0).toUpperCase() + view.slice(1)}
                    </button>
                ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-3 flex-shrink-0">
                <button 
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-semibold text-sm transition duration-150 hover:bg-gray-300" 
                    onClick={toggleMode}
                >
                    Switch to **{userMode === 'client' ? 'Provider' : 'Client'}**
                </button>
                <button 
                    className="p-2 text-xl font-bold rounded-full hover:bg-gray-100 transition duration-150" 
                    onClick={() => setIsMenuOpen(true)}
                >
                    ☰
                </button>
            </div>
        </header>
    );
};

export default Header;