import './films.css';
import { getPeopleID, getExtra } from '../components/api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import EndButtonRedirect from '../components/endButtons';
import Navbar from '../components/navbar.js';

export default function MoreInfoPeople() {
  const { id } = useParams();
  const [people, setPeople] = useState([]);
  const [films, setFilms] = useState([{'id':1, 'name': 'No films can be named currently'}]);
  const [species, setSpecies] = useState([{'id':1, 'name': 'No species can be named currently'}]);

  useEffect(() =>{
    getPeopleID(id).then((event) =>{
      setPeople(event);
      let changedData1 = [];
      if(event.films[0] !== 'https://ghibliapi.herokuapp.com/films/'){
        Promise.all(event.films.map((film) => {
          return getExtra(film).then((data) => {
            changedData1.push(data);
          });
        })).then(() => {
          setFilms(changedData1);
        });
      }
      getExtra(event.species).then((event) =>{
        setSpecies(event);})
    });
  },[id]);

  
  return (
    <>
      <Navbar/>
      <div className='bodyPadding'>
        <div className='center'>
          <p>Name:</p>
          <p>{people.name}</p>
        </div>
        <div className='centerLine'>
          <div className='spacing'>
            <p>Gender:</p>
            <p>{people.gender}</p>
          </div>
          <div className='spacing'>
            <p>Age:</p>
            <p>{people.age}</p>
          </div>
          <div className='spacing'>
            <p>Eye Color:</p>
            <p>{people.eye_color}</p>
          </div>
          <div className='spacing'>
            <p>Hair Color:</p>
            <p>{people.hair_color}</p>
          </div>
        </div>
        <div className='center'>
          <h4>They are:</h4>
          <a key={species.id} href={'/Species/'+ species.id} style={species.id !== 1? {} :{ display: 'none' }}>
            <button>{species.name}</button>
          </a>
        </div>

        <div className='center'>
          <EndButtonRedirect films={films}/>
        </div>
      </div>
    </>
  );
}
