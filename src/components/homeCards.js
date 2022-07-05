import React from 'react';
import '../pages/homepage.css';

export default function HomeCards(items) {
  var linkName ='';
  var givenArray;

  if(items.people !== undefined){
    linkName = '/People/';
    givenArray = items.people;
  }
  if(items.location !== undefined){
    linkName = '/Location/';
    givenArray = items.location;
  }  
  if(items.species !== undefined){
    linkName = '/Species/';
    givenArray = items.species;
  }
  if(items.vehicles !== undefined){
    linkName = '/Vehicles/';
    givenArray = items.vehicles;
  }

  return (
    <>
      {givenArray.map((item) =>(
        <div className='grid-item' key={item.id}>
          <a href={linkName+ item.id} style={item.id !== 1? {} :{ display: 'none' }}>
            <button className='buttons font-med'>{item.name}</button>
          </a>
          <span style={item.id !== 1? {display: 'none'} :{}}>{item.name}</span>
        </div>
      ))}
    </>
  );
}
