import React from 'react';
import '../pages/homepage.css';

export default function HomeFilm(items) {
  return (
    <>
      {items.films.map((film) =>(
        <div className='grid-item' key={film.id}>
          <a className='a-none' href={'/Film/'+ film.id}>
            <img src={film.movie_banner} width="100%" height="75%" alt={film.title}></img>
            <p>{film.title}</p>
            <p>{film.release_date}</p>
          </a>
        </div>
      ))}
    </>
  );
}
