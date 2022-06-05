import { getLocationID } from '../api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

export default function MoreInfoLocation() {
  const { id } = useParams();
  const [location, setLocation] = useState([]);

  useEffect(() =>{
    getLocationID(id).then((event) =>{
        setLocation(event);
    });
  }, [id]);

  return (
    <div>
      <p>Location:</p>
      <p>{location.name}</p>
      <p>Climate:</p>
      <p>{location.climate}</p>
      <p>Terrain:</p>
      <p>{location.terrain}</p>
      <p>Surface water:</p>
      <p>{location.surface_water}</p>
    </div>
  );
}
