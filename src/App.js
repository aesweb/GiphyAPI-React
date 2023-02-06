import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
const API_KEY = 'zPtHHzX1JJlcK59wmZYww3WKsHW4tfRx';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
      .then((result) => {
        setData(result.data.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <div className="search-area">
        <input />
        <button>Search</button>
      </div>
    </div>
  );
}

export default App;
