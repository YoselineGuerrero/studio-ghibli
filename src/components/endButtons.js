import React from 'react';

export default function EndButtonRedirect(items) {
  var linkName ='';
  var givenArray;
  var filmBool = false;
  var titleName ='';

  if(items.people !== undefined){
    linkName = '/People/';
    givenArray = items.people;
    titleName = 'People in the Film:';
  }
  if(items.location !== undefined){
    linkName = '/Location/';
    givenArray = items.location;
    titleName='Locations in the Film:';
  }  
  if(items.species !== undefined){
    linkName = '/Species/';
    givenArray = items.species;
    titleName='Species in the Film';
  }
  if(items.vehicles !== undefined){
    linkName = '/Vehicles/';
    givenArray = items.vehicles;
    titleName = 'Vehicles in the Film';
  }
  if(items.films !== undefined){
    linkName = '/Film/';
    givenArray = items.films;
    filmBool = true;
    titleName = 'They appeared in these films:';
  }

  return (
    <div>
      {givenArray[0].id !==1 &&
        <>
          <h4>{titleName}</h4>
          {givenArray.map((item) =>(
            <span key={item.id}>
              <a href={linkName+ item.id}>
                {filmBool
                  ? <button>{item.title}</button>
                  : <button>{item.name}</button>
                }
              </a>
            </span>
          ))}
        </>
      }
    </div>
  );
}
