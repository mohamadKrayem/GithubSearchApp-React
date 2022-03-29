import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactLoading from 'react-loading';
import { Media } from 'react-bootstrap';

function GitHub() {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [loading, setLoading] = useState(false);

  const getItems = async () => {
    const res = await axios
      .get(`https://api.github.com/search/users?q=${searchItem}`)
      .then((res) => {
        console.log(res.data.items);
        setData(res.data.items);
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    event.preventDefault();
    getItems();
    setLoading(true);
  };

  const items = data.map((user) => (
    <div
      key={user.id}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: '9px',
        border: '0.3px solid black',
        padding: '3px',
        margin: '3px',
        gap: '7px',
        paddingRight: '5px',
      }}
    >
      <a href={user.html_url}>
        <img
          src={user.avatar_url}
          width={64}
          height={64}
          className="mr-2"
          alt=""
        />
      </a>
      <div>
        <h5>Login: {user.login}</h5>
        <p>Id: {user.id}</p>
      </div>
    </div>
  ));

  return (
    <div>
      {loading && <ReactLoading type="spinningBubbles" color="#444" />}
      {!loading && <h1>GitHub Users Results</h1>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter a username"
          onChange={(value) => setSearchItem(value.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {items}
    </div>
  );
}

export default GitHub;
