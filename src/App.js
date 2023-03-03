import React, { useEffect } from 'react';
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
    spotify.setAccessToken(_token);

    dispatch({
      type:actionTypes.SET_TOKEN,
      token:_token
    })

    spotify.getMe().then(user => {
      dispatch({
        type:actionTypes.SET_USER,
        user:user
      })
    }) ;
    spotify.getUserPlaylists().then(playlist => {
      dispatch({
        type:actionTypes.SET_PLAYLISTS,
        playlist:playlist
      })
    })
    spotify.getPlaylist(user?.id).then(response => {
      dispatch({
        type:actionTypes.SET_DISCOVER_WEEKLY,
        discover_weekly:response
      })
    })
   }
  }, [token,dispatch,user?.id])
console.log(user)
console.log(spotify)
  
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
