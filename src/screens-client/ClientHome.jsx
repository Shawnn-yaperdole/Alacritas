import React, { useState } from 'react';

// Mock Request Data
const MOCK_CLIENT_REQUESTS = [
  { id: 1, title: "Fix Leaking Sink", type: "Plumbing", date: "2023-10-25" },
  { id: 2, title: "Lawn Mowing", type: "Gardening", date: "2023-10-26" },
  { id: 3, title: "Install Ceiling Fan", type: "Electrical", date: "2023-10-27" },
  { id: 4, title: "Paint Fence", type: "Painting", date: "2023-10-28" },
  { id: 5, title: "Deep Clean House", type: "Cleaning", date: "2023-10-29" },
];

const ClientHome = () => {
  const [filterText, setFilterText] = useState("");

  // Improved filtering (searches title + type)
  const filtered = MOCK_CLIENT_REQUESTS.filter(req =>
    req.title.toLowerCase().includes(filterText.toLowerCase()) ||
    req.type.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto h-full p-6 w-full flex flex-col">
      
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        My Current Requests
      </h2>

      {/* Controls */}
      <div className="flex gap-4 mb-6 items-center flex-wrap">
        <input
          className="p-3 border border-gray-300 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search my requests..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <button className="px-4 py-3 bg-gray-600 text-white rounded-lg cursor-pointer whitespace-nowrap transition hover:bg-gray-700">
          Filter Services
        </button>

        <button className="px-4 py-3 bg-blue-500 text-white rounded-lg cursor-pointer whitespace-nowrap transition hover:bg-blue-600">
          + Post Request
        </button>
      </div>

      {/* Auto-fill Grid */}
      <div
        className="grid gap-6 pb-8"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {filtered.map(req => (
          <div
            key={req.id}
            className="bg-white p-6 rounded-xl shadow-md transition hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{req.title}</h3>

            <span className="inline-block px-2 py-1 bg-gray-200 rounded-md text-sm text-gray-600 mb-3 font-medium">
              {req.type}
            </span>

            <p className="text-gray-500">Posted: {req.date}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ClientHome;
