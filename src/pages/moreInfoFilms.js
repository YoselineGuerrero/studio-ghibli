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

  console.log(vehicles)
  return (
    <div>
      <a href='/'>
        <button>Back</button>
      </a>
       {people.map((person) =>(
        <p key={person.id}>{person.name}</p>
      ))}
      {location.map((location) =>(
        <p key={location.id}>{location.name}</p>
      ))} 
      {species.map((specie) =>(
        <p key={specie.id}>{specie.name}</p>
      ))} 
      {vehicles.map((vehicle) =>(
        <p key={vehicle.id}>{vehicle.name}</p>
      ))}  
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
      <p>Image:</p>
      <img src={film.movie_banner} width="25%" height="25%" alt={film.title}></img>
    </div>
  );
}
