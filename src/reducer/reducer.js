import * as actions from '../constants/actionTypes'


export const initialState = {
    user: null,
    playlist:[],
    playing:false,
    item:null
}

const reducer = (state, action) => {
switch (action.type) {
    case actions.SET_USER:
        return {
            ...state, user:action.user
        }
    default:
        break;
}
}
export default reducer