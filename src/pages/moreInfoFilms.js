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
      <div style={{display: 'grid', gridTemplateColumns: '48vw 48vw'}}>
        <div className='center-layout'>
          <img id='film-img' src={film.movie_banner} alt={film.title}></img>
        </div>
        <div>
          <div id='film-titles'>
            <span className='font-xlarge'>{film.title} </span>
            <span style={{margin:'0 10px'}}>· {film.original_title} ·</span>
            <span>{film.original_title_romanised}</span>
          </div>
          <div id='film-titles'>
            <span>Director: {film.director} ·</span>
            <span style={{margin:'0 5px'}}>Producer: {film.producer}</span>
          </div>
          <span>{film.rt_score}/100</span>
          <div id='film-titles'>
            <span>{film.release_date} ·</span>
            <span style={{margin:'0 5px'}}>{film.running_time} mins</span>
          </div>
          <p>{film.description}</p>
        </div>
      </div>
      <div className='center'>
        <EndButtonRedirect people={people} />
      </div>
      <div className='center'>
        <EndButtonRedirect location={location} />
      </div>
      <div className='center'>
        <EndButtonRedirect species={species} />
      </div>
      <div className='center'>
        <EndButtonRedirect vehicles={vehicles}/>
      </div>
    </div>
  );
}
