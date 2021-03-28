import * as actions from '../actions/actionTypes';

const initialState = {
    isAuth: false,
    idToken: null,
    userId: null,
    error: null,
    username: "",
    email: ""
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.AUTH_SUCCESS:
            return {...state, userId: action.payload.userId, idToken: action.payload.token};
        case actions.AUTH_FAIL:
            return {...state, error: action.payload.error};
        case actions.AUTH_RESET:
            return {...state, isAuth: false, userType: null, idToken: null, error: null, username: "", email: ""};
        case actions.ADD_USER_DETAILS_SUCCESS:
            return {...state, isAuth: true, username: action.payload.username, email: action.payload.email};
        case actions.ADD_USER_DETAILS_FAIL:
            return {...state, error: action.payload.error};
        case actions.GET_USER_DETAILS:
            return {...state, username: action.payload.username};
        default:
            return state;
    }
}

export default reducer;
