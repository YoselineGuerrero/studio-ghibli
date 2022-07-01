import { getSpeciesID, getExtra } from '../api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import EndButtonRedirect from '../components/endButtons';

export default function MoreInfoSpecies() {
  const { id } = useParams();
  const [species, setSpecies] = useState([]);
  const [people, setPeople] = useState([{'id':1, 'name': 'No residents can be named currently'}]);
  const [films, setFilms] = useState([{'id':1, 'name': 'No films can be named currently'}]);

  useEffect(() =>{
    getSpeciesID(id).then((event) =>{
      setSpecies(event);
      let changedData1 = [];
      let changedData2 = [];
      if(event.people[0] !== 'https://ghibliapi.herokuapp.com/people/'){
        Promise.all(event.people.map((person) => {
          return getExtra(person).then((data) => {
            changedData1.push(data);
          });
        })).then(() => {
          setPeople(changedData1);
        });
      }
      if(event.films[0] !== 'https://ghibliapi.herokuapp.com/films/'){
        Promise.all(event.films.map((film) => {
          return getExtra(film).then((data) => {
            changedData2.push(data);
          });
        })).then(() => {
          setFilms(changedData2);
        });
      }
    });
  }, [id]);

  return (
    <div>
      <a href='/'>
        <button>Back</button>
      </a>
      <p>Name:</p>
      <p>{species.name}</p>
      <p>Classification:</p>
      <p>{species.classification}</p>
      <p>Eye Color:</p>
      <p>{species.eye_colors}</p>
      <p>Hair Color:</p>
      <p>{species.hair_colors}</p>

      <h4>They appeared in these films:</h4>
      <EndButtonRedirect films={films}/>
      <h4>People in the film:</h4>
      <EndButtonRedirect people={people}/>
    </div>
  );
}
