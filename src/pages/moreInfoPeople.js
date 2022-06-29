import { getPeopleID, getExtra } from '../api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

export default function MoreInfoPeople() {
  const { id } = useParams();
  const [people, setPeople] = useState([]);
  const [films, setFilms] = useState([{'id':1, 'name': 'No films can be named currently'}]);
  const [species, setSpecies] = useState([{'id':1, 'name': 'No species can be named currently'}]);

  useEffect(() =>{
    getPeopleID(id).then((event) =>{
      setPeople(event);
      let changedData1 = [];
      let changedData2 = [];
      if(event.films[0] !== 'https://ghibliapi.herokuapp.com/films/'){
        Promise.all(event.films.map((film) => {
          return getExtra(film).then((data) => {
            changedData1.push(data);
          });
        })).then(() => {
          setFilms(changedData1);
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
    });
  },[id]);

  return (
    <div>
      <a href='/'>
        <button>Back</button>
      </a>
      <p>Name:</p>
      <p>{people.name}</p>
      <p>Gender:</p>
      <p>{people.gender}</p>
      <p>Age:</p>
      <p>{people.age}</p>
      <p>Eye Color:</p>
      <p>{people.eye_color}</p>
      <p>Hair Color:</p>
      <p>{people.hair_color}</p>


      <h4>They appeared in these films:</h4>
      {films.map((film) =>(
        <>
          <span key={film.id}>{film.title}</span>
          <span style={film.id !== 1? {} :{ display: 'none' }}>, </span>
        </>
      ))}
      <h4>They are:</h4>
      {species.map((specie) =>(
        <>
          <span key={specie.id}>{specie.name}</span>
          <span style={specie.id !== 1? {} :{ display: 'none' }}>, </span>
        </>
      ))}
    </div>
  );
}
