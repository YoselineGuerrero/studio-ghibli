import './films.css';
import { getFilmsID, getExtra } from '../components/api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import EndButtonRedirect from '../components/endButtons';
import Navbar from '../components/navbar.js';

const tabs =[
  {
    id: '1',
    name: 'People',
  }, {
    id: '2',
    name: 'Locations',
  }, {
    id: '3',
    name: 'Species',
  }, {
    id: '4',
    name: 'Vehicle',
  }
]

export default function MoreInfoFilm() {
  const { id } = useParams();
  const [film, setFilm] = useState([]);
  const [people, setPeople] = useState([{'id':1, 'name': 'No characteres can be named currently'}]);
  const [location, setLocation] = useState([{'id':1, 'name': 'No locations can be named currently'}]);
  const [species, setSpecies] = useState([{'id':1, 'name': 'No species can be named currently'}]);
  const [vehicles, setVehicles] = useState([{'id':1, 'name': 'No vehicles can be named currently'}]);
  const [tabActive, setTabActive] = useState('People');

  function tabButton(event, name) {
    event.preventDefault();
    setTabActive(name);
  }

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
    <>
      <Navbar/>
      <div className='bodyPadding'>
        <div id='film-grid'>
          <div className='center-layout'>
            <img id='film-img' src={film.movie_banner} alt={film.title}></img>
          </div>
          <div>
            <div id='film-titles'>
            <span className='font-xlarge' id='main-film-title'>{film.title} </span>
              <span style={{margin:'0 10px'}} className='font-large'>· {film.original_title} ·</span>
              <span className='font-large'>{film.original_title_romanised}</span>
            </div>
            <div id='film-titles'>
              <span className='font-med'>Director: {film.director} ·</span>
              <span className='font-med' style={{margin:'0 5px'}}>Producer: {film.producer}</span>
            </div>
            <div id='film-titles'>
              <span className='font-small'>{film.release_date} ·</span>
              <span className='font-small' style={{margin:'0 5px'}}>{film.running_time} mins</span>
            </div>
            <div className='spacing'>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18" height='18' viewBox="0 0 375 374.999991" version="1.0"><path fill="#0fab4b" d="M214.648438 118.796875s50.816406-37.167969 39.089843-68.46875c-11.726562-31.300781-45.929687 57.707031-45.929687 57.707031s37.132812-67.488281 0-85.09375c-37.136719-17.605468-10.75 82.160156-10.75 82.160156s-6.84375-59.664062-30.292969-65.53125c-23.453125-5.871093 3.90625 49.882813 26.386719 70.425782 22.472656 20.535156 21.496094 8.800781 21.496094 8.800781"/><path fill="#df2c23" d="M174.894531 353.542969c-69.480469-8.273438-118.792969-39.964844-143.476562-83.453125-21.929688-38.613282-24.449219-86.621094-4.28125-135.859375C70 29.59375 162.171875 63.21875 171.964844 76.484375c26.089844 38.378906 72 23.53125 91.464844 14.90625 5.570312-2.46875 11.84375-2.816406 18.292968-1.878906 16.125 2.289062 33.128906 12.851562 41.457032 20.363281 92.113281 83.335938 13.542968 265.207031-148.285157 243.667969"/><path fill="#d35f5f" d="M330.359375 189.410156S322.71875 134 288.3125 129.941406c-34.398438-4.058594 24.558594 49.34375 2.449219 112.066406 0 0-4.308594 14.257813 10.777343 7.945313 15.085938-6.3125 34.097657-38.945313 28.820313-60.542969"/></svg>
              <span className='font-small'><b> {film.rt_score}%</b></span>
            </div>
            <p className='font-med'>{film.description}</p>
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

        <div style={tabActive === 'People' ? {} : {display: 'none'}}>
          <EndButtonRedirect people={people}/>
        </div>
        <div style={tabActive === 'Locations' ? {} : {display: 'none'}}>
          <EndButtonRedirect location={location}/>
        </div>
        <div style={tabActive === 'Species' ? {} : {display: 'none'}}>
          <EndButtonRedirect species={species} />
        </div>
        <div style={tabActive === 'Vehicle' ? {} : {display: 'none'}}>
          <EndButtonRedirect vehicles={vehicles}/>
        </div>
      </div>
    </>
  );
}
