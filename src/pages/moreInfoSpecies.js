import './films.css';
import { getSpeciesID, getExtra } from '../components/api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import EndButtonRedirect from '../components/endButtons';
import Navbar from '../components/navbar.js';

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
    <>
      <Navbar/>
      <div className='bodyPadding'>
        <div className='center'>
          <p>Name:</p>
          <p>{species.name}</p>
        </div>
        <div className='centerLine'>
          <div className='spacing'>
            <p>Classification:</p>
            <p>{species.classification}</p>
          </div>
          <div className='spacing'>
            <p>Eye Color:</p>
            <p>{species.eye_colors}</p>
          </div>
          <div className='spacing'>
            <p>Hair Color:</p>
            <p>{species.hair_colors}</p>
          </div>
        </div>

        <div className='center'>
          <EndButtonRedirect films={films}/>
        </div>
        <div className='center'>
          <EndButtonRedirect people={people}/>
        </div>
      </div>
    </>
  );
}
