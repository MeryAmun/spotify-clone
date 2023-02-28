import React, {useState, useEffect } from 'react';
import './App.css';
import { Login } from './components';
import { getTokenFromResponse } from './spotifyConfig';
import SpotifyWebApi from 'spotify-web-api-js';


const spotify = new SpotifyWebApi()
function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null)

  useEffect(() => {
   const hash = getTokenFromResponse();
   window.location.hash = "";
   const _token = hash.access_token;
   if(_token){
    setToken(_token);
    spotify.setAccessToken(_token);
    spotify.getMe().then(user => {
      console.log('person', user)
    }) 
   }
  }, [])
  console.log(token)
  
  return (
    <div className="app">
      {
        token ? (
          <h2> Player logged in</h2>
        ) : (
      <Login/>
        )
      }
      
    </div>
  );
}

export default App;
