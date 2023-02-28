// 'https://developer.spotify.com/documentation/web-playback-sdk/quickstart/#'

const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = "http://localhost:3000/";
const clientID = "b9a54851ff1f4a478b0e34488d5f8583";
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
]

export const loginUrl = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialogue=true`;