import React from 'react';
import '../pages/homepage.css';

export default function HomeFilm(items) {
  return (
    <>
      {items.films.map((film) =>(
        <div className='grid-item-film' key={film.id}>
          <a className='a-none' href={'/Film/'+ film.id}>
            <img id='home-img' src={film.movie_banner} alt={film.title}></img>
            <div className='left-title'>
              <span className='film-card'>{film.title}</span> <br/>
              <span className='subtitle'>{film.release_date}</span>
            </div>
          </a>
        </div>
      ))}
    </>
  );
}
