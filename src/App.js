import { useState } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const changeHandler = (e) => {
    setSearch(e.target.value);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`)
      .then(response => response.json())
      .then(value => setData(value.Search));
  }

  const download = url => {
    fetch(url).then(response => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", 'image.png');
        document.body.appendChild(link);
        link.click();
      })
    })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <center>
      <div>
        <h1>Search your favorite Movie </h1>
        <form onSubmit={submitHandler}>
          <input type='text' value={search} onChange={changeHandler} /><br /><br />
          <input type='submit' value='Search' />
        </form>
        <div className='row'>
          {data.map((movie) =>
            <div className='col-md-4'>
              <div className='card' style={{ "width": "18rem" }}>
                <img src={movie.Poster} className="card-img-top" alt={movie.Title}></img>
                <div className='card-body'>
                  <h4 className='card-title'>{movie.Title}</h4>
                  <a className='btn btn-primary' onClick={() => download(movie.Poster)}> Download Poster</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </center>
  );
}

export default App;
