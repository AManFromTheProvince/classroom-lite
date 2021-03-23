import * as actions from '../actions/actionTypes';

const initialState = {
    isAuth: false,
    userType: null,
    idToken: null,
    userId: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.AUTH_SUCCESS:
            return {...state, userId: action.payload.id, idToken: action.payload.token};
        case actions.AUTH_RESET:
            return {...state, isAuth: false, userType: null, idToken: null};
        case actions.ADD_USER_DETAILS_SUCCESS:
            return {...state,  userType: action.payload.type, isAuth: true};
        default:
            return state;
    }
}

export default reducer;
