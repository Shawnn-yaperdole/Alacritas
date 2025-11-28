// src/provider-screens/ProviderHome.jsx

import React, { useState } from 'react';

// Accept the mockRequests array as a prop from App.jsx
const ProviderHome = ({ mockRequests }) => {
    // Note: The ProviderHome component now receives data via props.
    // If mockRequests is not provided or is undefined, use an empty array for safety.
    const data = mockRequests || []; 
    
    const [filterText, setFilterText] = useState("");
    const filtered = data.filter(req => 
        req.title.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto h-full p-6 w-full flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Requests in your Community</h2>
            <div className="flex gap-4 mb-6 items-center flex-wrap">
                <input 
                    className="p-3 border border-gray-300 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-green-500" 
                    placeholder="Search jobs in community..." 
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <button className="px-4 py-3 bg-gray-600 text-white rounded-lg cursor-pointer whitespace-nowrap transition hover:bg-gray-700">Filter Skills</button>
            </div>

            <div className="grid grid-cols-auto-fill-300 gap-6 pb-8">
                {filtered.map(req => (
                    <div key={req.id} className="bg-white p-6 rounded-xl shadow-md transition hover:shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">{req.title}</h3>
                        <span className="inline-block px-2 py-1 bg-gray-200 rounded-md text-sm text-gray-600 mb-3 font-medium">{req.type}</span>
                        <p className="text-gray-500 mt-1">Client: {req.client}</p>
                        <p className="text-gray-500">Location: {req.loc}</p>
                        <button className="mt-4 p-3 w-full cursor-pointer bg-green-500 text-white font-semibold border-none rounded-lg transition hover:bg-green-600">
                            Send Offer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProviderHome;