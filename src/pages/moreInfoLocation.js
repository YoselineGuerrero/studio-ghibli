import { getLocationID, getExtra } from '../api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import EndButtonRedirect from '../components/endButtons';

export default function MoreInfoLocation() {
  const { id } = useParams();
  const [location, setLocation] = useState([]);
  const [people, setPeople] = useState([{'id':1, 'name': 'No residents can be named currently'}]);
  const [films, setFilms] = useState([{'id':1, 'name': 'No films can be named currently'}]);

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
    <div>
      <a href='/'>
        <button>Back</button>
      </a>
      <p>Location:</p>
      <p>{location.name}</p>
      <p>Climate:</p>
      <p>{location.climate}</p>
      <p>Terrain:</p>
      <p>{location.terrain}</p>
      <p>Surface water:</p>
      <p>{location.surface_water}</p>

      <h4>They appeared in these films:</h4>
      <EndButtonRedirect films={films}/>
      <h4>People in the film:</h4>
      <EndButtonRedirect people={people}/>
    </div>
  );
}
