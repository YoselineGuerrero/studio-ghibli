import { getFilmsID, getExtra } from '../api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

export default function MoreInfoFilm() {
  const { id } = useParams();
  const [film, setFilm] = useState([]);
  const [people, setPeople] = useState([{'id':1, 'name': 'No characteres can be named currently'}]);
  const [location, setLocation] = useState([]);
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() =>{
    getFilmsID(id).then((event) =>{
      setFilm(event);
      let changedData = [];
      if(event.people[0] !== 'https://ghibliapi.herokuapp.com/people/'){
        Promise.all(event.people.map((person) => {
          return getExtra(person).then((data) => {
            changedData.push(data);
          });
        })).then(() => {
          setPeople(changedData);
        });
      }
    })
  }, [id]);

  return (
    <div>
       {people.map((person) =>(
        <p key={person.id}>{person.name}</p>
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
