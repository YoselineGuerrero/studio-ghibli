import { getVehiclesID } from '../api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

export default function MoreInfoVehicles() {
  const { id } = useParams();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() =>{
    getVehiclesID(id).then((event) =>{
        setVehicles(event);
    });
  }, [id]);

  return (
    <div>
      <p>Name:</p>
      <p>{vehicles.name}</p>
      <p>Description:</p>
      <p>{vehicles.description}</p>
      <p>Vehicle Class:</p>
      <p>{vehicles.vehicle_class}</p>
      <p>Length:</p>
      <p>{vehicles.length}</p>
    </div>
  );
}
