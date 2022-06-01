import './homepage.css';
import { getSample, getFilms } from '../api';
import React, {useEffect, useState} from 'react';

export function Homepage() {
  const [items, setItem] = useState({});
  const [films, setFilms] = useState([]);

  function clickGet(e){
    e.preventDefault();
    getSample('58611129-2dbc-4a81-a72f-77ddfc1b1b49').then((events) => {
      setItem(events);
    });
  }

  useEffect(() => {
    let mounted = true;
    getFilms().then((events) => {
      if (mounted) {
        setFilms(events);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <p>Sample Item</p>
      <button onClick={clickGet}> Click me</button>
      <p>{items.title}</p>
      <p>{items.original_title}</p>
      <p>{items.original_title_romanised}</p>
      <p>{items.description}</p>
      <p>{items.director}</p>
      <p>{items.producer}</p>
      <p>{items.release_date}</p>
      <p>{items.running_time}</p>
      <p>{items.rt_score}</p>
      <img src={items.movie_banner} width="25%" height="25%" alt={items.title}></img>

      <h3>Get to know more about one of the films from below</h3>
      <div class='grid-container'>
          {films.map((film) =>(
            <div class='grid-item'>
            <p>{film.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
