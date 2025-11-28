import React, { useState } from 'react';

// Local chat sample data
const CHATS = [
  { id: 1, name: "Mario Plumber", lastMsg: "I can be there at 5pm." },
  { id: 2, name: "Green Thumb", lastMsg: "Thanks for accepting!" },
  { id: 3, name: "Electric Co.", lastMsg: "Do you have the parts?" },
];

const ClientMessages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [search, setSearch] = useState("");

  // 1. FILTERING LOGIC: Filter chats based on name or last message
  const filteredChats = CHATS.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase()) ||
    chat.lastMsg.toLowerCase().includes(search.toLowerCase())
  );

  const layoutClass = activeChat ? "show-chat" : "show-list";
  const currentChat = CHATS.find(c => c.id === activeChat);

  return (
    <div className="max-w-6xl mx-auto h-full p-6 w-full flex flex-col">

      <div
        className={`
          messages-layout border border-gray-300 bg-white rounded-xl 
          overflow-hidden shadow-lg ${layoutClass}
        `}
      >

        {/* Chat List */}
        <div className="chat-list border-r border-gray-200 overflow-y-auto flex flex-col">

          {/* Search box */}
          <div className="p-4 border-b border-gray-200 flex-shrink-0">
            <input
              className="p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Search chats..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Chat items */}
          <div className="flex-grow overflow-y-auto">
            {filteredChats.length > 0 ? ( // Display filtered chats
              filteredChats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`
                    p-4 border-b border-gray-100 cursor-pointer transition hover:bg-gray-50
                    ${activeChat === chat.id ? "bg-blue-50 border-l-4 border-blue-500" : ""}
                  `}
                >
                  <strong className="text-gray-800">{chat.name}</strong>
                  <p className="text-sm text-gray-500 mt-1 truncate">{chat.lastMsg}</p>
                </div>
              ))
            ) : ( // Display message if no chats found
              <div className="p-4 text-center text-gray-500">
                <p>No conversations found.</p>
              </div>
            )}
          </div>

        </div>

        {/* Chat Window */}
        <div className="chat-window flex flex-col h-full bg-gray-50">

          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="chat-window-header p-4 bg-white border-b border-gray-200 font-bold flex items-center justify-between flex-shrink-0">
                <button
                  onClick={() => setActiveChat(null)}
                  className="mr-3 bg-transparent border-none text-xl cursor-pointer text-gray-600"
                >
                  &larr;
                </button>
                <span className="flex-grow">{currentChat?.name}</span>
                <span className="w-6"></span>
              </div>

              {/* Chat Body */}
              <div className="chat-content flex-grow p-6 overflow-y-auto flex flex-col space-y-3">
                <p className="self-center text-gray-400 text-sm">Start of conversation...</p>

                <div className="bg-gray-200 p-3 rounded-xl self-start max-w-sm">
                  {currentChat?.lastMsg}
                </div>
              </div>

              {/* Chat Input */}
              <div className="chat-input-area p-4 bg-white border-t border-gray-200 flex gap-3 flex-shrink-0">
                <input
                  className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type a message..."
                />

                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer whitespace-nowrap transition hover:bg-blue-600">
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center text-gray-400">
              <p>Select a Conversation</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ClientMessages;