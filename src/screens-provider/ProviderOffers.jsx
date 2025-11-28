// src/provider-screens/ProviderOffers.jsx

import React, { useState } from 'react';

// Accept the mockOffers array as a prop from App.jsx
const ProviderOffers = ({ mockOffers }) => {
    const data = mockOffers || [];
    
    const [filterText, setFilterText] = useState("");
    const filtered = data.filter(item => item.title.toLowerCase().includes(filterText.toLowerCase()));

    return (
        <div className="max-w-6xl mx-auto h-full p-6 w-full flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sent Offers 📤</h2>
            <div className="flex gap-4 mb-6 items-center flex-wrap">
                <input 
                    className="p-3 border border-gray-300 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Search offers..." 
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <button className="px-4 py-3 bg-gray-600 text-white rounded-lg cursor-pointer whitespace-nowrap transition hover:bg-gray-700">Filter Status</button>
            </div>

            <div className="grid grid-cols-auto-fill-300 gap-6 pb-8">
                {filtered.map(offer => (
                    <div key={offer.id} className="bg-white p-6 rounded-xl shadow-md transition hover:shadow-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">{offer.title}</h3>
                            {/* Status Display based on Tailwind coloring */}
                            <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase
                                ${offer.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                                  offer.status === 'denied' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}
                            `}>
                                {offer.status}
                            </span>
                        </div>
                        <hr className="my-3 border-t border-gray-200"/>
                        <p className="text-gray-600">To: {offer.client}</p>
                        <p className="text-xl font-bold mt-2 text-blue-600">{offer.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProviderOffers;