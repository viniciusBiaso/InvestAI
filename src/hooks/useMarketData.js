import { useState, useEffect } from 'react';
import axios from 'axios';

const useMarketData = (ticker, period = '1mo') => {
    const [quote, setQuote] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!ticker) return;

            setLoading(true);
            setError(null);

            try {
                // Execute requests in parallel for better performance
                const [quoteRes, historyRes] = await Promise.all([
                    axios.get(`http://localhost:8000/api/market/quote/${ticker}`),
                    axios.get(`http://localhost:8000/api/market/history/${ticker}?period=${period}`)
                ]);

                setQuote(quoteRes.data);
                setHistory(historyRes.data);
            } catch (err) {
                console.error("Error fetching market data:", err);
                setError(err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ticker, period]);

    return { quote, history, loading, error };
};

export default useMarketData;
