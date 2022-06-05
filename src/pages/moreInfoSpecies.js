import { getSpeciesID } from '../api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

export default function MoreInfoSpecies() {
  const { id } = useParams();
  const [species, setSpecies] = useState([]);

  useEffect(() =>{
    getSpeciesID(id).then((event) =>{
        setSpecies(event);
    });
  }, [id]);

  return (
    <div>
      <p>Name:</p>
      <p>{species.name}</p>
      <p>Classification:</p>
      <p>{species.classification}</p>
      <p>Eye Color:</p>
      <p>{species.eye_colors}</p>
      <p>Hair Color:</p>
      <p>{species.hair_colors}</p>
    </div>
  );
}
