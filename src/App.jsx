import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [failWord, setFailWord] = useState(null);

  const handlekeyChange = (e) => {
    setApiKey(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    // Replace with your free API key if needed
    const fetchStocks = async () => {
      const KEY = apiKey || "Ub6y9qakHpXv2nxtnC0VkWovAnx92GYo";

      try {
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/quote/AAPL,MSFT,GOOGL,AMZN,META?apikey=${KEY}`
        );
        if (!response.ok) {
          throw new Error("Incorrect API key");
        }
        const data = await response.json();
        setStocks(data);
        setLoading(false);
      } catch (err) {
        setFailWord(err.message);
        setLoading(false);
      }
    };

    fetchStocks();
  }, [apiKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl">Loading stocks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-2xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow">
          📈 Stock Price Dashboard
        </h1>

        <form className="bg-white rounded-2xl shadow-2xl overflow-hidden px-6 py-4 text-left bg-gray-100 text-gray-700 uppercase tracking-wider text-xs">
          API KEY:
          <input
            className="px-6 py-4 text-left"
            placeholder="Enter here"
            onChange={handlekeyChange}
          ></input>
          {failWord && <p className="text-red-500 text-xs mt-2">{failWord}</p>}
        </form>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Symbol</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Change %</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y divide-gray-200">
              {stocks.map((stock) => (
                <tr
                  key={stock.symbol}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 font-semibold">{stock.symbol}</td>
                  <td className="px-6 py-4">${stock.price.toFixed(2)}</td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      stock.changesPercentage >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stock.changesPercentage.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          Powered by FinancialModelingPrep API
        </p>
      </div>
    </div>
  );
}

export default App;
