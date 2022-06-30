import { getFilmsID, getExtra } from '../api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

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
    <div>
      <a href='/'>
        <button>Back</button>
      </a>
      <img src={film.movie_banner} width="25%" height="25%" alt={film.title}></img>
      <p>Title:</p>
      <p>{film.title}</p>
      <p>Original Title:</p>
      <p>{film.original_title}</p>
      <p>Original Title Romanised:</p>
      <p>{film.original_title_romanised}</p>
      <p>Description:</p>
      <p>{film.description}</p>
      <p>Director:</p>
      <p>{film.director}</p>
      <p>Producer:</p>
      <p>{film.producer}</p>
      <p>Release date:</p>
      <p>{film.release_date}</p>
      <p>Running Time:</p>
      <p>{film.running_time}</p>
      <p>Rotten Tomatoes Score:</p>
      <p>{film.rt_score}</p>

      <h4>People in the film:</h4>
      {people.map((person) =>(
        <>
          <a key={person.id} href={'/People/'+ person.id} style={person.id !== 1? {} :{ display: 'none' }}>
            <button>{person.name}</button>
          </a>
          <span style={person.id !== 1? {display: 'none'} :{}}>{person.name}</span>
        </>
      ))}
      <h4>Locations in the film:</h4>
      {location.map((location) =>(
        <>
          <a key={location.id} href={'/Location/'+ location.id} style={location.id !== 1? {} :{ display: 'none' }}>
            <button>{location.name}</button>
          </a>
          <span style={location.id !== 1? {display: 'none'} :{}}>{location.name}</span>
        </>
      ))}
      <h4>Species in the film:</h4>
      {species.map((specie) =>(
        <>
          <a key={specie.id} href={'/Species/'+ specie.id} style={specie.id !== 1? {} :{ display: 'none' }}>
            <button>{specie.name}</button>
          </a>
          <span style={specie.id !== 1? {display: 'none'} :{}}>{specie.name}</span>
        </>
      ))}
      <h4>Vehicles in the film:</h4>
      {vehicles.map((vehicle) =>(
        <>
          <a key={vehicle.id} href={'/Vehicles/'+ vehicle.id} style={vehicle.id !== 1? {} :{ display: 'none' }}>
            <button>{vehicle.name}</button>
          </a>
          <span style={vehicle.id !== 1? {display: 'none'} :{}}>{vehicle.name}</span>
        </>
      ))}
    </div>
  );
}
