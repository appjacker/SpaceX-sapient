import fetch from 'isomorphic-fetch';

const baseUrl = 'https://api.spaceXdata.com/v3/launches?limit=100&';
export function fetchMissions (params) {
 
  const encodedURI = encodeURI(`${baseUrl}${params}`);
  return fetch(encodedURI)
    .then((data) => data.json()).then((misson) => misson).catch((error) => {
      console.warn(error)
      return null
    });
}

//https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=2014