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
      <p>Title:</p>
      <p>{people.name}</p>
    </div>
  );
}
