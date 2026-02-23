
import { useState, useEffect } from 'react';
import { api } from '../api/api';

export const useVinDecoder = () => {
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('last_vin_results');
    return saved ? JSON.parse(saved) : null;
  });

  const [apiMessage, setApiMessage] = useState(() => {
    return localStorage.getItem('last_vin_message') || '';
  });

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('vin_history') || '[]');
    setHistory(saved);
  }, []);

  // 2. Очищаємо і стейт, і сховище
  const clearResults = () => {
    setResults(null);
    setApiMessage('');
    setError(null);
    localStorage.removeItem('last_vin_results');
    localStorage.removeItem('last_vin_message');
  };

  const decodeVin = async (vin) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.decodeVin(vin);
      
      const validResults = data.Results.filter(item => 
        item.Value && !['', 'not applicable', 'none'].includes(item.Value.toLowerCase().trim())
      );
      setResults(validResults);
      setApiMessage(data.Message);
      
      localStorage.setItem('last_vin_results', JSON.stringify(validResults));
      localStorage.setItem('last_vin_message', data.Message);
      setHistory(prevHistory => {
        const updated = [vin, ...prevHistory.filter(h => h !== vin)].slice(0, 3);
        localStorage.setItem('vin_history', JSON.stringify(updated));
        return updated;
      });

    } catch (err) {
      setError("Сталася помилка при запиті до API");
    } finally {
      setLoading(false);
    }
  };

  return { results, history, loading, error, apiMessage, decodeVin, clearResults };
};