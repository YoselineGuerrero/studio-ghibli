const baseURL = 'https://ghibliapi.herokuapp.com/';

export function getSample(id){
    return fetch(baseURL+'films/'+id).then((res) => res.json());
}

export function getFilms(){
    return fetch(baseURL+'films').then((res) => res.json());
}

export function getFilmsID(id){
    return fetch(baseURL+'films/'+id).then((res) => res.json());
}

export function getPeople(){
    return fetch(baseURL+'people').then((res) => res.json());
}

export function getPeopleID(id){
    return fetch(baseURL+'people/'+id).then((res) => res.json());
}

export function getLocation(){
    return fetch(baseURL+'locations').then((res) => res.json());
}

export function getLocationID(id){
    return fetch(baseURL+'locations/'+id).then((res) => res.json());
}

export function getSpecies(){
    return fetch(baseURL+'species').then((res) => res.json());
}

export function getSpeciesID(id){
    return fetch(baseURL+'species/'+id).then((res) => res.json());
}

export function getVehicles(){
    return fetch(baseURL+'vehicles').then((res) => res.json());
}

export function getVehiclesID(id){
    return fetch(baseURL+'vehicles/'+id).then((res) => res.json());
}