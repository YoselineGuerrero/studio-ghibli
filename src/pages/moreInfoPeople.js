import { getPeopleID } from '../api';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

export default function MoreInfoPeople() {
  const { id } = useParams();
  const [people, setPeople] = useState([]);

  useEffect(() =>{
    let mounted = true;
    getPeopleID(id).then((event) =>{
      if(mounted){
        setPeople(event)
      }
    });
    return () => (mounted = false);
  });

  return (
    <div>
      <p>Title:</p>
      <p>{people.name}</p>
    </div>
  );
}
