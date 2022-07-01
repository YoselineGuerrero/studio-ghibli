import './homepage.css';
import { getFilms, getPeople, getLocation, getSpecies, getVehicles } from '../api';
import React, {useEffect, useState} from 'react';
import HomeCards from '../components/homeCards';

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
        <HomeCards films={films}/>
      </div>

      <h3>Ghibli characters (humans and non humans)</h3>
      <div className='grid-container'>
        <HomeCards people={people}/>
      </div>

      <h3>Locations ( lands, countries, and places)</h3>
      <div className='grid-container'>
        <HomeCards location={location}/>
      </div>

      <h3>Species (humans, animals, and spirits...)</h3>
      <div className='grid-container'>
        <HomeCards species={species}/>
      </div>

      <h3>Vehicle</h3>
      <div className='grid-container'>
        <HomeCards vehicles={vehicles}/>
      </div>
    </div>
  );
}
