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
      <p>Title:</p>
      <p>{location.name}</p>
    </div>
  );
}
