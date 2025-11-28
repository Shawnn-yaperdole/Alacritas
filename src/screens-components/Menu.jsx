// src/components/Menu.jsx

import React from 'react';

const Menu = ({ isOpen, close, toggleMode, userMode }) => {
    if (!isOpen) return null;

    const switchModeText = userMode === 'client' ? 'Switch to Provider' : 'Switch to Client';
    const switchIcon = userMode === 'client' ? '🛠️' : '🏠';

    return (
        <div className="fixed inset-0 z-[200] bg-black/50 transition-opacity duration-300 md:hidden" onClick={close}>
            <div 
                className={`
                    fixed top-0 right-0 h-full w-64 bg-white p-6 flex flex-col gap-4 shadow-2xl transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    className="self-end text-3xl cursor-pointer p-1 text-gray-500 hover:text-gray-700 transition" 
                    onClick={close}
                >
                    &times;
                </button>
                
                <h2 className="text-xl font-semibold mb-2 text-gray-900 border-b pb-2">Navigation</h2>
                
                {/* Menu Links (Placeholder for now, but will use React Router <Link>) */}
                <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition">Account Settings</div>
                <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition">Preferences</div>
                <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition">Get Help</div>
                
                {/* Mode Toggle Button */}
                <button
                    onClick={toggleMode}
                    className="w-full flex items-center justify-center p-3 rounded-lg bg-gray-100 border text-gray-800 border-gray-300 hover:bg-gray-200 transition duration-150 text-sm font-semibold mt-4"
                >
                    <span className="mr-2">{switchIcon}</span> {switchModeText}
                </button>


                <div 
                    className="cursor-pointer p-2 rounded-lg hover:bg-red-50 text-red-600 font-medium transition mt-auto"
                    onClick={() => { alert("Logged out"); close(); }}
                >
                    Log Out
                </div>
            </div>
        </div>
    );
};

export default Menu;