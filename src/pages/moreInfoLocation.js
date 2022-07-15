import './films.css';
import { getLocationID, getExtra } from '../components/api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import EndButtonRedirect from '../components/endButtons';
import Navbar from '../components/navbar.js';

const tabs =[
  {
    id: '1',
    name: 'Films',
  }, {
    id: '2',
    name: 'People',
  }
]

export default function MoreInfoLocation() {
  const { id } = useParams();
  const [location, setLocation] = useState([]);
  const [people, setPeople] = useState([{'id':1, 'name': 'No residents can be named currently'}]);
  const [films, setFilms] = useState([{'id':1, 'name': 'No films can be named currently'}]);
  const [tabActive, setTabActive] = useState('Films');

  function tabButton(event, name) {
    event.preventDefault();
    setTabActive(name);
  }

  useEffect(() =>{
    getLocationID(id).then((event) =>{
      setLocation(event);
      let changedData1 = [];
      let changedData2 = [];
      if(event.residents[0] !== 'https://ghibliapi.herokuapp.com/people/'){
        Promise.all(event.residents.map((person) => {
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
          <p>Location:</p>
          <p>{location.name}</p>
        </div>
        <div className='centerLine'>
          <div className='spacing'>
            <p>Climate:</p>
            <p>{location.climate}</p>
          </div>
          <div className='spacing'>
            <p>Terrain:</p>
            <p>{location.terrain}</p>
          </div>
          <div className='spacing'>
            <p>Surface water:</p>
            <p>{location.surface_water}</p>
          </div>
        </div>

        <div id='tab-div'>
          {tabs.map((tab) => (
            <span key={tab.id}>
              {tabActive === tab.name
              ? <button className='tab-buttons-active font-med' id='tab-buttons' onClick={(e) => tabButton(e, tab.name)}>{tab.name}</button>
              : <button id='tab-buttons' className='font-med' onClick={(e) => tabButton(e, tab.name)}>{tab.name}</button>
              }
            </span>
          ))}
        </div>

        <div className='center' style={tabActive === 'Films' ? {} : {display: 'none'}}>
          <EndButtonRedirect films={films}/>
        </div>
        <div className='center' style={tabActive === 'People' ? {} : {display: 'none'}}>
          <EndButtonRedirect people={people}/>
        </div>
      </div>
    </>
  );
}
