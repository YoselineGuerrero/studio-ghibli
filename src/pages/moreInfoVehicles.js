import { getVehiclesID, getExtra } from '../api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import EndButtonRedirect from '../components/endButtons';

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
      <p>{vehicles.name}</p>
      <p>Description:</p>
      <p>{vehicles.description}</p>
      <p>Vehicle Class:</p>
      <p>{vehicles.vehicle_class}</p>
      <p>Length:</p>
      <p>{vehicles.length}</p>

      <h4>Driver of vehicle:</h4>
        <a key={people.id} href={'/People/'+ people.id} style={people.id !== 1? {} :{ display: 'none' }}>
            <button>{people.name}</button>
          </a>
      <h4>They appeared in these films:</h4>
      <EndButtonRedirect films={films}/>
    </div>
  );
}
