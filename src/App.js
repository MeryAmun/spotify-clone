import React, {useState, useEffect } from 'react';
import './App.css';
import { Login, Player } from './components';
import { getTokenFromResponse } from './spotifyConfig';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './context/DataLayer';
import * as actionTypes from './constants/actionTypes'


const spotify = new SpotifyWebApi()
function App() {
  const [{user, token},dispatch ]= useDataLayerValue()

  useEffect(() => {
   const hash = getTokenFromResponse();
   window.location.hash = "";
   const _token = hash.access_token;
   if(_token){
    dispatch({
      type:actionTypes.SET_TOKEN,
      token:_token
    })
    spotify.setAccessToken(_token);
    spotify.getMe().then(user => {
      dispatch({
        type:actionTypes.SET_USER,
        user:user
      })
    }) 
   }
  }, [user,token])

  
  return (
    <div className="app">
      {
        token ? (
         <Player spotify={spotify}/>
        ) : (
      <Login/>
        )
      }
      
    </div>
  );
}

export default App;
