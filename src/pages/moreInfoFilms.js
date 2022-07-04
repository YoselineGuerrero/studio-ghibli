import './films.css';
import { getFilmsID, getExtra } from '../components/api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import EndButtonRedirect from '../components/endButtons';

export default function MoreInfoFilm() {
  const { id } = useParams();
  const [film, setFilm] = useState([]);
  const [people, setPeople] = useState([{'id':1, 'name': 'No characteres can be named currently'}]);
  const [location, setLocation] = useState([{'id':1, 'name': 'No locations can be named currently'}]);
  const [species, setSpecies] = useState([{'id':1, 'name': 'No species can be named currently'}]);
  const [vehicles, setVehicles] = useState([{'id':1, 'name': 'No vehicles can be named currently'}]);

  useEffect(() =>{
    getFilmsID(id).then((event) =>{
      setFilm(event);
      let changedData = [];
      let changedData1 = [];
      let changedData2 = [];
      let changedData3 = [];
      if(event.people[0] !== 'https://ghibliapi.herokuapp.com/people/'){
        Promise.all(event.people.map((person) => {
          return getExtra(person).then((data) => {
            changedData.push(data);
          });
        })).then(() => {
          setPeople(changedData);
        });
      }
      if(event.locations[0] !== 'https://ghibliapi.herokuapp.com/locations/'){
        Promise.all(event.locations.map((location) => {
          return getExtra(location).then((data) => {
            changedData1.push(data);
          });
        })).then(() => {
          setLocation(changedData1);
        });
      }
      if(event.species[0] !== 'https://ghibliapi.herokuapp.com/species/'){
        Promise.all(event.species.map((specie) => {
          return getExtra(specie).then((data) => {
            changedData2.push(data);
          });
        })).then(() => {
          setSpecies(changedData2);
        });
      }
      if(event.vehicles[0] !== 'https://ghibliapi.herokuapp.com/vehicles/'){
        Promise.all(event.vehicles.map((vehicle) => {
          return getExtra(vehicle).then((data) => {
            changedData3.push(data);
          });
        })).then(() => {
          setVehicles(changedData3);
        });
      }
    })
  }, [id]);

  return (
    <div className='bodyPadding'>
      <a href='/'>
        <button>Back</button>
      </a>
      <div className='centerLine'>
        <div className='spacing'>
          <p>Running Time:</p>
          <p>{film.running_time}</p>
        </div>
        <img id='film-img' src={film.movie_banner} alt={film.title}></img>
        <div className='spacing'>
          <p>Rotten Tomatoes Score:</p>
          <p>{film.rt_score}</p>
        </div>
      </div>
      <div className='sameLine'>
        <div className='spacing'>
          <p >Title:</p>
          <p >{film.title}</p>
        </div>
        <div className='spacing'>
          <p >Original Title:</p>
          <p >{film.original_title}</p>
        </div>
        <div className='spacing'>
          <p >Original Title Romanised:</p>
          <p >{film.original_title_romanised}</p>
        </div>
      </div>
      <div className='sameLine'>
        <div className='spacing'>
          <p>Director:</p>
          <p>{film.director}</p>
        </div>
        <div className='spacing'>
          <p>Release date:</p>
          <p>{film.release_date}</p>
        </div>
        <div className='spacing'>
          <p>Producer:</p>
          <p>{film.producer}</p>
        </div>
      </div>
      <div className='center'>
        <p>Description:</p>
        <p>{film.description}</p>
      </div>
      
      <div className='center'>
        <h4>People in the film:</h4>
        <EndButtonRedirect people={people}/>
      </div>
      <div className='center'>
        <h4>Locations in the film:</h4>
        <EndButtonRedirect location={location}/>
      </div>
      <div className='center'>
        <h4>Species in the film:</h4>
        <EndButtonRedirect species={species}/>
      </div>
      <div className='center'>
        <h4>Vehicles in the film:</h4>
        <EndButtonRedirect vehicles={vehicles}/>
      </div>
    </div>
  );
}
