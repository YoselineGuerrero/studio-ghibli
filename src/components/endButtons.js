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
    <>
      {givenArray[0].id !==1 ?
        <div className='grid-end-container'>
          {givenArray.map((item) =>(
            <div className='grid-item' key={item.id}>
              <a href={linkName+ item.id}>
                {filmBool
                  ? <button className='buttons font-med'>{item.title}</button>
                  : <button className='buttons font-med'>{item.name}</button>
                }
              </a>
            </div>
          ))}
        </div> 
        : <>
        <span className='center-layout'>Currently there isn't any {titleName} to be shown.</span>
        </>
      }
    </>
  );
}
