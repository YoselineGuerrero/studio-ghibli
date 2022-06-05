import { getPeopleID } from '../api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

export default function MoreInfoPeople() {
  const { id } = useParams();
  const [people, setPeople] = useState([]);

  useEffect(() =>{
    getPeopleID(id).then((event) =>{
        setPeople(event);
    });
  },[id]);

  return (
    <div>
      <p>Name:</p>
      <p>{people.name}</p>
      <p>Gender:</p>
      <p>{people.gender}</p>
      <p>Age:</p>
      <p>{people.age}</p>
      <p>Eye Color:</p>
      <p>{people.eye_color}</p>
      <p>Hair Color:</p>
      <p>{people.hair_color}</p>
    </div>
  );
}
