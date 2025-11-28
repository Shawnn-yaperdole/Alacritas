// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import Header from './screens-components/Header.jsx'; 
import Menu from './screens-components/Menu.jsx'; 
import ClientHome from './screens-client/ClientHome.jsx'; 
import ClientOffers from './screens-client/ClientOffers.jsx'; 
import ClientMessages from './screens-components/Messages.jsx'; 

// Sample Datas (MOCK DATA - leaving these here for now)
const MOCK_PROVIDER_REQUESTS = [
// ... data
];
const MOCK_OFFERS_SENT = [
// ... data
];


// --- Provider Screens (MOVED OUT LATER, but keeping the component code here for now) ---
const ProviderHome = () => { /* ... component code ... */ };
const ProviderOffers = () => { /* ... component code ... */ };


// ----------------------------------------------------------------------
// --- MAIN APP COMPONENT ---
// ----------------------------------------------------------------------

function App() {
  const [userMode, setUserMode] = useState('client'); 
  const [currentView, setCurrentView] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMode = () => {
    // Navigate to the home page of the new mode after switching
    const newMode = userMode === 'client' ? 'provider' : 'client';
    setUserMode(newMode);
    setCurrentView('home'); 
  };

  const renderContent = () => {
    // ... same state-based logic ...
    if (userMode === 'client') {
      switch (currentView) {
        case 'home': return <ClientHome />;
        case 'messages': return <ClientMessages />;
        case 'offers': return <ClientOffers />;
        default: return <ClientHome />;
      }
    } else { // userMode === 'provider'
      switch (currentView) {
        case 'home': return <ProviderHome />;
        case 'messages': return <ClientMessages />; 
        case 'offers': return <ProviderOffers />;
        default: return <ProviderHome />;
      }
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* HEADER */}
      <Header 
      userMode={userMode} 
      toggleMode={toggleMode} 
      currentView={currentView} 
      setCurrentView={setCurrentView} 
      setIsMenuOpen={setIsMenuOpen} 
      />
      
      {/* MAIN CONTENT AREA */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* MENU SLIDE-OUT */}
      <Menu 
        isOpen={isMenuOpen} 
        close={() => setIsMenuOpen(false)} 
        toggleMode={toggleMode} 
        userMode={userMode}     
      />
    </div>
  );
}

export default App;