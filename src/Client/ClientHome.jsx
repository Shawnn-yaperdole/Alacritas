// src/Client/ClientHome.jsx
import React, { useState } from 'react';

const MOCK_CLIENT_REQUESTS = [
  {
    id: 1,
    title: "Fix Leaking Sink",
    type: "Plumbing",
    date: "2023-10-25",
    location: "123 Main St, Springfield",
    acceptedPrice: "$120",
    status: "accepted",
    thumbnail: "https://via.placeholder.com/80x80?text=Sink"
  },
  {
    id: 2,
    title: "Lawn Mowing",
    type: "Gardening",
    date: "2023-10-26",
    location: "456 Elm St, Springfield",
    acceptedPrice: null,
    status: "pending",
    thumbnail: "https://via.placeholder.com/80x80?text=Lawn"
  },
  {
    id: 3,
    title: "Install Ceiling Fan",
    type: "Electrical",
    date: "2023-10-27",
    location: "789 Oak St, Springfield",
    acceptedPrice: "$80",
    status: "accepted",
    thumbnail: "https://via.placeholder.com/80x80?text=Fan"
  },
  {
    id: 4,
    title: "Paint Living Room With Extra Long Description That Might Overflow",
    type: "Painting",
    date: "2023-10-28",
    location: "321 Pine St, Springfield",
    acceptedPrice: null,
    status: "pending",
    thumbnail: "https://via.placeholder.com/80x80?text=Paint"
  },
];

const ClientHome = () => {
  const [filterText, setFilterText] = useState("");
  const filtered = MOCK_CLIENT_REQUESTS.filter(req =>
    req.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="page-container">
      <h2 className="text-2xl font-bold mb-6 text-client-header">My Current Requests</h2>

      <div className="controls mb-6">
        <input
          className="search-input"
          placeholder="Search my requests..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button className="action-btn client-filter-btn">Filter Services</button>
        <button className="action-btn client-post-btn">+ Post Request</button>
      </div>

      {/* Responsive Card Grid */}
      <div
        className="card-list grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
      >
        {filtered.length > 0 ? (
          filtered.map((req) => (
            <div
              key={req.id}
              className="card hover:shadow-lg transition-shadow duration-200 flex flex-col"
              style={{ minHeight: '380px' }} // same height for all cards
            >
              {/* Thumbnail */}
              <img
                src={req.thumbnail}
                alt={req.title}
                className="w-full h-36 object-cover rounded-lg mb-3"
              />

              {/* Request Details */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1" title={req.title}>
                  {req.title}
                </h3>
                <span className="tag mb-1 line-clamp-1">{req.type}</span>
                <p className="text-gray-700 line-clamp-1" title={req.location}>{req.location}</p>
                <p className="text-gray-500 text-sm mb-1">{`Posted: ${req.date}`}</p>

                {req.status === "accepted" && (
                  <p className="text-green-600 font-semibold mb-1">

                  </p>
                )}

                {/* Button at bottom */}
                <button className="action-btn client-view-btn mt-auto w-full py-2 text-sm">
                  View Full Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full">No requests found.</p>
        )}
      </div>
    </div>
  );
};

export default ClientHome;
