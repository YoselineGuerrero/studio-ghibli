import './homepage.css';
import { getFilms, getPeople, getLocation, getSpecies, getVehicles } from '../components/api';
import React, {useEffect, useState} from 'react';
import HomeCards from '../components/homeCards';
import HomeFilm from '../components/homeFilm';

const tabs =[
  {
    id: '1',
    name: 'Films',
  }, {
    id: '2',
    name: 'Characters',
  }, {
    id: '3',
    name: 'Locations',
  }, {
    id: '4',
    name: 'Species',
  }, {
    id: '5',
    name: 'Vehicle',
  }
]

export function Homepage() {
  const [films, setFilms] = useState([]);
  const [people, setPeople] = useState([]);
  const [location, setLocation] = useState([]);
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [tabActive, setTabActive] = useState('Films');

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

  function tabButton(event, name) {
    event.preventDefault();
    setTabActive(name);
  }

  return (
    <div>
      <div className='centerLine'>
        {tabs.map((tab) => (
          <span key={tab.id}>
            {tabActive === tab.name
              ? <button className='tab-buttons-active' id='tab-buttons' onClick={(e) => tabButton(e, tab.name)}>{tab.name}</button>
              : <button id='tab-buttons' onClick={(e) => tabButton(e, tab.name)}>{tab.name}</button>
            }
          </span>
        ))}
      </div>

      <div className='grid-container-film' style={tabActive === 'Films' ? {} : {display: 'none'}}>
        <HomeFilm films={films}/>
      </div>

      
      <div className='grid-container' style={tabActive === 'Characters' ? {} : {display: 'none'}}>
        <HomeCards people={people}/>
      </div>

      <div className='grid-container' style={tabActive === 'Locations' ? {} : {display: 'none'}}>
        <HomeCards location={location}/>
      </div>

      <div className='grid-container' style={tabActive === 'Species' ? {} : {display: 'none'}}>
        <HomeCards species={species}/>
      </div>

      <div className='grid-container' style={tabActive === 'Vehicle' ? {} : {display: 'none'}}>
        <HomeCards vehicles={vehicles}/>
      </div>
    </div>
  );
}
