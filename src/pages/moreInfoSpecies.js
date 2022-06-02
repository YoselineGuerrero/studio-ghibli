import { getSpeciesID } from '../api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

export default function MoreInfoSpecies() {
  const { id } = useParams();
  const [species, setSpecies] = useState([]);

  useEffect(() =>{
    let mounted = true;
    getSpeciesID(id).then((event) =>{
      if(mounted){
        setSpecies(event)
      }
    });
    return () => (mounted = false);
  });

  return (
    <div>
      <p>Title:</p>
      <p>{species.name}</p>
    </div>
  );
}
