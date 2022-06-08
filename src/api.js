const baseURL = 'https://ghibliapi.herokuapp.com/';

export const getFilms = async () => {
  const res = await fetch(baseURL+'films');
  return res.json();
}

export const getFilmsID = async (id) => {
  const res = await fetch(baseURL+'films/'+id);
  return res.json();
}

export const getPeople = async () => {
  const res = await fetch(baseURL+'people');
  return res.json();
}

export const getPeopleID = async (id) => {
  const res = await fetch(baseURL+'people/'+id);
  return res.json();
}

export const getLocation = async () => {
  const res = await fetch(baseURL+'locations');
  return res.json();
}

export const getLocationID = async (id) => {
  const res = await fetch(baseURL+'locations/'+id);
  return res.json();
}

export const getSpecies = async () => {
  const res = await fetch(baseURL+'species');
  return res.json();
}

export const getSpeciesID = async (id) => {
  const res = await fetch(baseURL+'species/'+id);
  return res.json();
}

export const getVehicles = async () => {
  const res = await fetch(baseURL+'vehicles');
  return res.json();
}

export const getVehiclesID = async (id) => {
  const res = await fetch(baseURL+'vehicles/'+id);
  return res.json();
}

export const getExtra = async (url) => {
  const res = await fetch(url);
  return res.json();
}
