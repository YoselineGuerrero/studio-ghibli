import './homepage.css';
import { getSample, getFilms, getPeople, getLocation, getSpecies, getVehicles } from '../api';
import React, {useEffect, useState} from 'react';

export function Homepage() {
  const [items, setItem] = useState({});
  const [films, setFilms] = useState([]);
  const [people, setPeople] = useState([]);
  const [location, setLocation] = useState([]);
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);

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
    getPeople().then((event) =>{
      if(mounted){
        setPeople(event);
      }
    });
    getLocation().then((event) =>{
      if(mounted){
        setLocation(event);
      }
    });
    getSpecies().then((event) =>{
      if(mounted){
        setSpecies(event);
      }
    });
    getVehicles().then((event) =>{
      if(mounted){
        setVehicles(event);
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
            <a href={'/Film/'+ film.id} target='_target'>
              <button>{film.title}</button>
            </a>
          </div>
        ))}
      </div>

      <h3>Ghibli characters (humans and non humans)</h3>
      <div class='grid-container'>
        {people.map((person) =>(
          <div class='grid-item'>
            <a href={'/People/'+ person.id} target='_target'>
              <button>{person.name}</button>
            </a>
          </div>
        ))}
      </div>

      <h3>Locations ( lands, countries, and places)</h3>
      <div class='grid-container'>
        {location.map((location) =>(
          <div class='grid-item'>
            <a href={'/Location/'+ location.id} target='_target'>
              <button>{location.name}</button>
            </a>
          </div>
        ))}
      </div>

      <h3>Species (humans, animals, and spirits...)</h3>
      <div class='grid-container'>
        {species.map((species) =>(
          <div class='grid-item'>
            <a href={'/Species/'+ species.id} target='_target'>
              <button>{species.name}</button>
            </a>
          </div>
        ))}
      </div>

      <h3>Vehicle</h3>
      <div class='grid-container'>
        {vehicles.map((vehicles) =>(
          <div class='grid-item'>
            <a href={'/Vehicles/'+ vehicles.id} target='_target'>
              <button>{vehicles.name}</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
