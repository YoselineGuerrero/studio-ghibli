import './homepage.css';
import { getFilms, getPeople, getLocation, getSpecies, getVehicles } from '../api';
import React, {useEffect, useState} from 'react';

export function Homepage() {
  const [films, setFilms] = useState([]);
  const [people, setPeople] = useState([]);
  const [location, setLocation] = useState([]);
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getFilms().then((events) => {
      setFilms(events);
    });
    getPeople().then((event) =>{
      setPeople(event);
    });
    getLocation().then((event) =>{
      setLocation(event);
    });
    getSpecies().then((event) =>{
      setSpecies(event);
    });
    getVehicles().then((event) =>{
      setVehicles(event);
    });
  }, []);

  return (
    <div>
      <h3>Get to know more about one of the films from below</h3>
      <div className='grid-container'>
        {films.map((film) =>(
          <div className='grid-item'>
            <a href={'/Film/'+ film.id} target='_target'>
              <button>{film.title}</button>
            </a>
          </div>
        ))}
      </div>

      <h3>Ghibli characters (humans and non humans)</h3>
      <div className='grid-container'>
        {people.map((person) =>(
          <div className='grid-item'>
            <a href={'/People/'+ person.id} target='_target'>
              <button>{person.name}</button>
            </a>
          </div>
        ))}
      </div>

      <h3>Locations ( lands, countries, and places)</h3>
      <div className='grid-container'>
        {location.map((location) =>(
          <div className='grid-item'>
            <a href={'/Location/'+ location.id} target='_target'>
              <button>{location.name}</button>
            </a>
          </div>
        ))}
      </div>

      <h3>Species (humans, animals, and spirits...)</h3>
      <div className='grid-container'>
        {species.map((species) =>(
          <div className='grid-item'>
            <a href={'/Species/'+ species.id} target='_target'>
              <button>{species.name}</button>
            </a>
          </div>
        ))}
      </div>

      <h3>Vehicle</h3>
      <div className='grid-container'>
        {vehicles.map((vehicles) =>(
          <div className='grid-item'>
            <a href={'/Vehicles/'+ vehicles.id} target='_target'>
              <button>{vehicles.name}</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
