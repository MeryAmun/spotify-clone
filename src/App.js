import React, { useEffect,useState } from 'react';
import './App.css';
import { Login, Player,Loader } from './components';
import { getTokenFromResponse } from './spotifyConfig';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './context/DataLayer';
import * as actionTypes from './constants/actionTypes'


const spotify = new SpotifyWebApi()
function App() {
  const [loading, setLoading] = useState(true);
  const [{user, token,playlist,tracks},dispatch ]= useDataLayerValue();


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
    });

    // playlist?.items?.map((item) => {
    //   if(item.name === name ){
    //     spotify.get(item.id).then(response => {
    //       dispatch({
    //         type:actionTypes.SET_TRACKS,
    //         tracks:response
    //       })
    //    })
    //   }
    // })
  
    spotify.getMyCurrentPlayingTrack().then(currently_playing => {
      dispatch({
        type:actionTypes.SET_CURRENTLY_PLAYING_TRACK,
        currently_playing_track:currently_playing
      })
    })
    spotify.getMyTopArtists().then((response) =>
    dispatch({
      type: actionTypes.SET_TOP_ARTISTS,
      top_artists: response,
    })
  );

  dispatch({
    type: actionTypes.SET_SPOTIFY,
    spotify: spotify,
  });
   }
  }, [token,dispatch,user?.id])

   useEffect(() => {
   if(playlist !==null){
    setLoading(false)
   }
   }, [])
   
  if(loading){
    return ( <Loader/>)
   }
  return (
    <div className="app">
      {
        token ? (
         <Player spotify={spotify} playlist={playlist}/>
        ) : (
      <Login/>
        )
      }
      
    </div>
  );
}

export default App;
