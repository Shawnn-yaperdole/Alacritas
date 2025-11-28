import React, { useState } from 'react';

// Mock Data
const MOCK_OFFERS_RECEIVED = [
  { id: 101, title: "Offer for Sink", provider: "Mario Plumber", amount: "$50", status: "pending" },
  { id: 102, title: "Offer for Lawn", provider: "Green Thumb", amount: "$30", status: "accepted" },
  { id: 103, title: "Offer for Fan", provider: "Sparky Elec", amount: "$150", status: "denied" },
];

// Status color helper
const getStatusClasses = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "accepted":
      return "bg-green-100 text-green-700";
    case "denied":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const ClientOffers = () => {
  const [filterText, setFilterText] = useState("");

  const filtered = MOCK_OFFERS_RECEIVED.filter((item) =>
    item.title.toLowerCase().includes(filterText.toLowerCase()) ||
    item.provider.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto h-full p-6 w-full flex flex-col">
      
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Offers Received 📬
      </h2>

      {/* Controls */}
      <div className="flex gap-4 mb-6 items-center flex-wrap">
        <input
          className="p-3 border border-gray-300 rounded-lg flex-grow 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search offers..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <button className="px-4 py-3 bg-gray-600 text-white rounded-lg cursor-pointer 
                           whitespace-nowrap transition hover:bg-gray-700">
          Filter Status
        </button>
      </div>

      {/* Auto-fill grid */}
      <div
        className="grid gap-6 pb-8"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {filtered.map((offer) => (
          <div
            key={offer.id}
            className="bg-white p-6 rounded-xl shadow-md transition hover:shadow-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{offer.title}</h3>

              <span
                className={`
                  px-3 py-1 text-xs font-bold rounded-full uppercase
                  ${getStatusClasses(offer.status)}
                `}
              >
                {offer.status}
              </span>
            </div>

            <hr className="my-3 border-t border-gray-200" />

            <p className="text-gray-600">From: {offer.provider}</p>

            <p className="text-xl font-bold mt-2 text-blue-600">{offer.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientOffers;
