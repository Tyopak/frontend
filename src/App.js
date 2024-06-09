import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [prices, setPrices] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/prices');
        setPrices(response.data);
      } catch (error) {
        setError('Error fetching prices');
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // обновление каждую минуту

    return () => clearInterval(interval); // очищение интервала при размонтировании компонента
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Cryptocurrency Prices</h1>
      {error ? <p>{error}</p> : null}
      <div>
        <h2>Bitcoin</h2>
        <p>{prices.bitcoin ? `$${prices.bitcoin.usd}` : 'Loading...'}</p>
      </div>
      <div>
        <h2>Ethereum</h2>
        <p>{prices.ethereum ? `$${prices.ethereum.usd}` : 'Loading...'}</p>
      </div>
    </div>
  );
};

export default App;
