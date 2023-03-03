import * as actions from '../constants/actionTypes'


export const initialState = {
    user: null,
    playlist:[],
    playing:false,
    spotify:null,
    top_artists:null,
    item:null,
    token:null,
    discover_weekly:null
}
// 'BQDK1zjpdi2fDB4-Z1ZTIV0mqME5eH_fIbhLr2omZv-4jORvvZhLGWYjoBgrW6VNX5F6prkS-0dsh-jB0cxlwjCIuLSaY6rslk6e_VyLKvhr6986jnvJ-_l8eylg5IDaLBxnhovbLZvaLjjbkEp056t0uJ--dky632rFp1HSWRigF_ARgq09fIqhsWzvQjNQlTXAhX_F54gy8LhBB6r05A'
const reducer = (state, action) => {
switch (action.type) {
    case actions.SET_USER:
        return {
            ...state, user:action.user
        }
        break;
    case actions.SET_TOKEN:
        return {
            ...state, token:action.token
        }
        break;
    case actions.SET_PLAYING:
        return {
           ...state, playing:action.playing
        }
        break;
    case actions.SET_PLAYLISTS:
        return {
           ...state, playlist:action.playlist
        }
        break;
    case actions.SET_DISCOVER_WEEKLY:
        return {
           ...state, discover_weekly:action.discover_weekly
        }
        break;
    case actions.SET_ITEM:
        return {
           ...state, item:action.item
        }
        break;
    case actions.SET_SPOTIFY:
        return {
           ...state, spotify:action.spotify
        }
        break;
    case actions.TOP_ARTISTS:
        return {
           ...state, top_artists:action.top_artists
        }
        break;
    default:
        break;
}
}
export default reducer