import React from 'react';

export default function EndButtonRedirect(items) {
  var linkName ='';
  var givenArray;
  var filmBool = false;

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
  if(items.films !== undefined){
    linkName = '/Film/';
    givenArray = items.films;
    filmBool = true;
  }

  return (
    <div>
      {givenArray.map((item) =>(
        <span key={item.id}>
          <a href={linkName+ item.id} style={item.id !== 1? {} :{ display: 'none' }}>
            {filmBool
              ? <button>{item.title}</button>
              : <button>{item.name}</button>
            }
          </a>
          <span style={item.id !== 1? {display: 'none'} :{}}>{item.name}</span>
        </span>
      ))}
    </div>
  );
}
