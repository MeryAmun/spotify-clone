import * as actions from '../constants/actionTypes'


export const initialState = {
    user: null,
    playlist:[],
    tracks:[],
    playing:false,
    spotify:null,
    top_artists:null,
    item:null,
    token:null,
    next:null,
    previous:null,
    currently_playing_track:null
}

const reducer = (state, action) => {
switch (action.type) {
    case actions.SET_USER:
        return {
            ...state, user:action.user
        }
    case actions.SET_TOKEN:
        return {
            ...state, token:action.token
        }
    case actions.SET_PLAYING:
        return {
           ...state, playing:action.playing
        }
    case actions.SET_PLAYLISTS:
        return {
           ...state, playlist:action.playlist
        }
    case actions.SET_ITEM:
        return {
           ...state, item:action.item
        }
    case actions.SET_SPOTIFY:
        return {
           ...state, spotify:action.spotify
        }
    case actions.SET_TOP_ARTISTS:
        return {
           ...state, top_artists:action.top_artists
        }
    case actions.SET_CURRENTLY_PLAYING_TRACK:
        return {
           ...state, currently_playing_track:action.currently_playing_track
        }
    case actions.SET_TRACKS:
        return {
           ...state, tracks:action.tracks
        }
    default:
}
}
export default reducer