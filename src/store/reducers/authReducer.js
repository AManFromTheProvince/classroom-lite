import * as actions from '../actions/actionTypes';

const initialState = {
    isAuth: false,
    idToken: null,
    userId: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.AUTH_SUCCESS:
            return {...state, userId: action.payload.id, idToken: action.payload.token};
        case actions.AUTH_FAIL:
            return {...state, error: action.payload.error};
        case actions.AUTH_RESET:
            return {...state, isAuth: false, userType: null, idToken: null, error: null};
        case actions.ADD_USER_DETAILS_SUCCESS:
            return {...state, isAuth: true};
        case actions.ADD_USER_DETAILS_FAIL:
            return {...state, error: action.payload.error};
        default:
            return state;
    }
}

export default reducer;
