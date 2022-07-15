import React from 'react';

export default function EndButtonRedirect(items) {
  var linkName ='';
  var givenArray;
  var filmBool = false;
  var titleName ='';

  if(items.people !== undefined){
    linkName = '/People/';
    givenArray = items.people;
    titleName = 'people';
  }
  if(items.location !== undefined){
    linkName = '/Location/';
    givenArray = items.location;
    titleName='locations';
  }  
  if(items.species !== undefined){
    linkName = '/Species/';
    givenArray = items.species;
    titleName='species';
  }
  if(items.vehicles !== undefined){
    linkName = '/Vehicles/';
    givenArray = items.vehicles;
    titleName = 'vehicles';
  }
  if(items.films !== undefined){
    linkName = '/Film/';
    givenArray = items.films;
    filmBool = true;
    titleName = 'films';
  }

  return (
    <div>
      {givenArray[0].id !==1 ?
        <>
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
        : <>
        <span>Currently there isn't any {titleName} to be shown.</span>
        </>
      }
    </div>
  );
}
