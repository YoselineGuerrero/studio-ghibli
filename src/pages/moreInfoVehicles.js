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
      <p>Title:</p>
      <p>{vehicles.name}</p>
    </div>
  );
}
