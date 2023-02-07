import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
const API_KEY = 'zPtHHzX1JJlcK59wmZYww3WKsHW4tfRx';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('Trends');
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 24;

  useEffect(() => {
    axios
      .get(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
      .then((result) => {
        setData(result.data.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (currentPage != 1) {
      search();
    }
  }, [currentPage]);

  const search = () => {
    if (query == '') {
      alert('Please enter somethings');
      return;
    }

    setLoading(true);
    console.log(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&offset=${
        currentPage * LIMIT
      }&limit=24`
    );
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&offset=${
          currentPage * LIMIT
        }&limit=24`
      )
      .then((result) => {
        setData([...result.data.data]);
        setTotalPage(Math.ceil(result.data.pagination.total_count / LIMIT));
        setTitle(query);
        setLoading(false);
      });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <div className="search-area">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={'Search somethings'}
        />
        <button onClick={search}>Search</button>
      </div>
      <div className="content">
        <div className="container">
          <h3>{title}</h3>
          <div className="row">
            {data.map((item) => (
              <div className="col-md-3 gif-item">
                <a href={item.images.original.url} target="_blank">
                  <img src={item.images.original.url} />
                </a>
                <a
                  href={item.user?.profile_url}
                  target="_blank"
                  className="user-area"
                >
                  <img
                    src={item.user?.avatar_url}
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                  />
                  <span>{item.user?.display_name}</span>
                </a>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-md-12">
              {currentPage - 1 > 0 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="pagination-buttons"
                >
                  Previous [{currentPage} - {totalPage}]
                </button>
              )}
              {currentPage < totalPage - 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="pagination-buttons"
                >
                  Next [{currentPage} - {totalPage}]
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
