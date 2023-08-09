import './films.css';
import { getVehiclesID, getExtra } from '../components/api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import EndButtonRedirect from '../components/endButtons';
import Navbar from '../components/navbar.js';

export default function MoreInfoVehicles() {
  const { id } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [people, setPeople] = useState([{'id':1, 'name': 'No residents can be named currently'}]);
  const [films, setFilms] = useState([{'id':1, 'name': 'No films can be named currently'}]);

  useEffect(() =>{
    getVehiclesID(id).then((event) =>{
      setVehicles(event);
      let changedData2 = [];
        getExtra(event.pilot).then((event) =>{
            setPeople(event);})
      if(event.films[0] !== 'https://ghibliapi.vercel.app/films/'){
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
          <p>{vehicles.name}</p>
        </div>
        <div className='centerLine'>
          <div className='spacing'>
            <p>Vehicle Class:</p>
            <p>{vehicles.vehicle_class}</p>
          </div>
          <div className='spacing'>
            <p>Length:</p>
            <p>{vehicles.length}</p>
          </div>
        </div>

        <div className='center'>
          <p>Description:</p>
          <p>{vehicles.description}</p>
        </div>
        <div className='center'>
          <h4>Driver of vehicle:</h4>
          <a key={people.id} href={'/People/'+ people.id} style={people.id !== 1? {} :{ display: 'none' }}>
            <button>{people.name}</button>
          </a>
        </div>
        <div className='center'>
        <h4>Films they are in:</h4>
          <EndButtonRedirect films={films}/>
        </div>
      </div>
    </>
  );
}
