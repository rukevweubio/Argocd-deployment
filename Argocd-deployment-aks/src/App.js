// src/App.js
import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Function to fetch cryptocurrency data from CoinGecko API
  const fetchCryptoData = async () => {
    setLoading(true);
    setError(null);
    try {
      // CoinGecko API endpoint for a list of cryptocurrencies with market data
      // We're fetching top 100 cryptocurrencies by market cap, in USD.
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCryptos(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Failed to fetch cryptocurrency data:", err);
      setError(`Failed to load data: ${err.message}. Please try again later.`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCryptoData();
    // Optional: Refresh data every 60 seconds
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4 font-sans text-gray-100">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-4xl mt-8 mb-4">
        <h1 className="text-4xl font-extrabold text-center text-red-500 mb-4">
          Crypto Price Tracker
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Real-time prices and market data for top cryptocurrencies.
        </p>

        <div className="flex justify-between items-center mb-6">
          {lastUpdated && (
            <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
          )}
          <button
            onClick={fetchCryptoData}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Refreshing...
              </>
            ) : (
              'Refresh Data'
            )}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-900 border border-red-700 text-red-300 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {loading && cryptos.length === 0 && !error ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-500"></div>
            <p className="ml-4 text-xl text-gray-300">Loading cryptocurrency data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price (USD)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    24h Change (%)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Market Cap (USD)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {cryptos.map((crypto, index) => (
                  <tr key={crypto.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 flex items-center">
                      <img src={crypto.image} alt={crypto.name} className="w-6 h-6 rounded-full mr-2" />
                      {crypto.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 uppercase">
                      {crypto.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      ${crypto.current_price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-semibold ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {crypto.price_change_percentage_24h ? crypto.price_change_percentage_24h.toFixed(2) : 'N/A'}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      ${crypto.market_cap.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
