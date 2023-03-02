import React, {useState, useEffect } from 'react';
import './App.css';
import { Login, Player } from './components';
import { getTokenFromResponse } from './spotifyConfig';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './context/DataLayer';
import * as actionTypes from './constants/actionTypes'


const spotify = new SpotifyWebApi()
function App() {
  const [token, setToken] = useState(null);
  const [{user},dispatch ]= useDataLayerValue()

  useEffect(() => {
   const hash = getTokenFromResponse();
   window.location.hash = "";
   const _token = hash.access_token;
   if(_token){
    setToken(_token);
    spotify.setAccessToken(_token);
    spotify.getMe().then(user => {
      //console.log('person', user.display_name);
      dispatch({
        type:actionTypes.SET_USER,
        user:user
      })
    }) 
   }
  }, [])
  console.log('person', user);
  
  return (
    <div className="app">
      {
        token ? (
         <Player/>
        ) : (
      <Login/>
        )
      }
      
    </div>
  );
}

export default App;
