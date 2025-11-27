import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// --- MOCK DATA ---
const MOCK_CLIENT_REQUESTS = [
  { id: 1, title: "Fix Leaking Sink", type: "Plumbing", date: "2023-10-25" },
  { id: 2, title: "Lawn Mowing", type: "Gardening", date: "2023-10-26" },
  { id: 3, title: "Install Ceiling Fan", type: "Electrical", date: "2023-10-27" },
];

const MOCK_PROVIDER_REQUESTS = [
  { id: 1, title: "Fix Leaking Sink", type: "Plumbing", client: "Alice", loc: "Downtown" },
  { id: 4, title: "Paint Living Room", type: "Painting", client: "Bob", loc: "Uptown" },
  { id: 5, title: "Move Furniture", type: "Moving", client: "Charlie", loc: "Suburbs" },
];

const MOCK_OFFERS_RECEIVED = [ // For Client
  { id: 101, title: "Offer for Sink", provider: "Mario Plumber", amount: "$50", status: "pending" },
  { id: 102, title: "Offer for Lawn", provider: "Green Thumb", amount: "$30", status: "accepted" },
];

const MOCK_OFFERS_SENT = [ // For Provider
  { id: 201, title: "Sink Repair Bid", client: "Alice", amount: "$50", status: "pending" },
  { id: 202, title: "Roof Repair Bid", client: "Dave", amount: "$500", status: "denied" },
];

const CHATS = [
  { id: 1, name: "Mario Plumber", lastMsg: "I can be there at 5pm." },
  { id: 2, name: "Green Thumb", lastMsg: "Thanks for accepting!" },
];

// --- COMPONENTS ---

// 1. Sidebar Menu
const Menu = ({ isOpen, close, logout }) => {
  if (!isOpen) return null;
  return (
    <div className="menu-overlay" onClick={close}>
      <div className="side-menu" onClick={(e) => e.stopPropagation()}>
        <div className="close-menu" onClick={close}>&times;</div>
        <h2>Menu</h2>
        <div className="menu-item">Account Settings</div>
        <div className="menu-item">Preferences</div>
        <div className="menu-item">Get Help</div>
        <div className="menu-item" onClick={logout} style={{ color: 'red' }}>Log Out</div>
      </div>
    </div>
  );
};

// 2. Landing Pages (Home)
const ClientHome = () => {
  const [filterText, setFilterText] = useState("");
  
  const filteredRequests = MOCK_CLIENT_REQUESTS.filter(req => 
    req.title.toLowerCase().includes(filterText.toLowerCase()) || 
    req.type.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1>My Requests</h1>
      <br />
      <div className="controls">
        <input 
          className="search-input" 
          placeholder="Search requests by keyword..." 
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button className="action-btn filter">Filter Type</button>
        <button className="action-btn post">+ Post Request</button>
      </div>

      <div className="card-list">
        {filteredRequests.map(req => (
          <div key={req.id} className="card">
            <h3>{req.title}</h3>
            <span className="tag">{req.type}</span>
            <p>Posted: {req.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProviderHome = () => {
  const [filterText, setFilterText] = useState("");

  const filteredRequests = MOCK_PROVIDER_REQUESTS.filter(req => 
    req.title.toLowerCase().includes(filterText.toLowerCase()) ||
    req.type.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1>Requests in your Community</h1>
      <br />
      <div className="controls">
        <input 
          className="search-input" 
          placeholder="Search jobs..." 
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button className="action-btn filter">Filter Skills</button>
      </div>

      <div className="card-list">
        {filteredRequests.map(req => (
          <div key={req.id} className="card">
            <h3>{req.title}</h3>
            <span className="tag">{req.type}</span>
            <p>Client: {req.client}</p>
            <p>Location: {req.loc}</p>
            <button style={{marginTop:'1rem', padding:'5px 10px', cursor:'pointer'}}>Send Offer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Messages Page (Shared Layout)
const MessagesPage = ({ mode }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [search, setSearch] = useState("");

  return (
    <div className="page-container">
      <div className="messages-layout">
        {/* Left Side */}
        <div className="chat-list">
          <div className="chat-header">
            <input 
              className="search-input" 
              placeholder="Search chats..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{width: '100%'}}
            />
          </div>
          {CHATS.map(chat => (
            <div 
              key={chat.id} 
              className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
              onClick={() => setActiveChat(chat.id)}
            >
              <strong>{chat.name}</strong>
              <p style={{fontSize:'0.8rem', color:'#666'}}>{chat.lastMsg}</p>
            </div>
          ))}
        </div>

        {/* Right Side */}
        <div className="chat-window">
          {activeChat ? (
            <div className="chat-content">
              <h3>Conversation with {CHATS.find(c => c.id === activeChat).name}</h3>
              {/* Chat bubbles would go here */}
            </div>
          ) : (
            <div className="chat-content">Select a chat to view messages</div>
          )}
        </div>
      </div>
    </div>
  );
};

// 4. Offers Page
const OffersPage = ({ mode }) => {
  const data = mode === 'client' ? MOCK_OFFERS_RECEIVED : MOCK_OFFERS_SENT;
  const [filterText, setFilterText] = useState("");

  const filtered = data.filter(item => item.title.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div className="page-container">
      <h1>{mode === 'client' ? "Offers Received" : "My Sent Offers"}</h1>
      <br />
      <div className="controls">
        <input 
          className="search-input" 
          placeholder="Search offers..." 
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button className="action-btn filter">Filter Service</button>
      </div>

      <div className="card-list">
        {filtered.map(offer => (
          <div key={offer.id} className="card">
            <h3>{offer.title}</h3>
            <p>{mode === 'client' ? `From: ${offer.provider}` : `To: ${offer.client}`}</p>
            <p>Amount: {offer.amount}</p>
            <span className={`status ${offer.status}`}>Status: {offer.status.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

function App() {
  // States
  const [userMode, setUserMode] = useState('client'); // 'client' or 'provider'
  const [currentView, setCurrentView] = useState('home'); // 'home', 'messages', 'offers'
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handlers
  const toggleMode = () => {
    const newMode = userMode === 'client' ? 'provider' : 'client';
    setUserMode(newMode);
    setCurrentView('home'); // Reset to landing page on switch
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return userMode === 'client' ? <ClientHome /> : <ProviderHome />;
      case 'messages':
        return <MessagesPage mode={userMode} />;
      case 'offers':
        return <OffersPage mode={userMode} />;
      default:
        return <ClientHome />;
    }
  };

  return (
    <div className="App">
      {/* HEADER */}
      <header className="header" style={{ borderBottom: `4px solid ${userMode === 'client' ? 'var(--primary-client)' : 'var(--primary-provider)'}`}}>
        <div className="logo" style={{ color: userMode === 'client' ? 'var(--primary-client)' : 'var(--primary-provider)' }}>
          JobBidder <span style={{fontSize:'0.8rem', color:'#333'}}>({userMode.toUpperCase()})</span>
        </div>

        <nav className="nav-middle">
          <button 
            className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentView('home')}
          >
            Home
          </button>
          <button 
            className={`nav-btn ${currentView === 'messages' ? 'active' : ''}`}
            onClick={() => setCurrentView('messages')}
          >
            Messages
          </button>
          <button 
            className={`nav-btn ${currentView === 'offers' ? 'active' : ''}`}
            onClick={() => setCurrentView('offers')}
          >
            Offers
          </button>
        </nav>

        <div className="nav-right">
          <button className="switch-btn" onClick={toggleMode}>
            Switch to {userMode === 'client' ? 'Provider' : 'Client'} Mode
          </button>
          <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>☰</button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main>
        {renderContent()}
      </main>

      {/* SIDEBAR MENU */}
      <Menu 
        isOpen={isMenuOpen} 
        close={() => setIsMenuOpen(false)} 
        logout={() => alert("Logged out")} 
      />
    </div>
  );
}

export default App;