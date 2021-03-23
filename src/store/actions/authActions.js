import axios from 'axios';
import * as actions from './actionTypes';
import * as uiActions from './uiActions';

export const authenticate = (email, password) => {
    return dispatch => {
        dispatch(uiActions.loadReset());
        dispatch(uiActions.loadStart());

        const credentials = {
            email: email,
            password: password,
            returnSecureToken: true
        }
    
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`, credentials)
        .then(res => {
            dispatch(uiActions.loadSuccess());
            console.log(res);
            localStorage.setItem("idToken", res.data.idToken);
            localStorage.setItem("expiresIn", res.data.expiresIn);
            localStorage.setItem("localId", res.data.localId);
            localStorage.setItem("refreshToken", res.data.refreshToken)
            
            dispatch(authSuccess(res.data.idToken, res.data.localId));
        })
        .catch( err => {
            dispatch(uiActions.loadFail());
            console.log(err);
        })
        .finally(() => {
            dispatch(uiActions.loadReset());
            dispatch(uiActions.loadEnd());
        })
        
    }
}

export const addUserDetails = (firstName, lastName, type) => {
    return dispatch => {
        dispatch(uiActions.loadReset());
        dispatch(uiActions.loadStart());

        const credentials = {
            firstName: firstName,
            lastName: lastName,
            type: type,
            id: localStorage.getItem("localId")
        }
        

        axios.post("/users.json", credentials)
        .then(res => {
            dispatch(uiActions.loadSuccess());
            dispatch(addUserSuccess(type));
        })
        .catch( err => {
            dispatch(uiActions.loadFail());
        })
        .finally(() => {
            dispatch(uiActions.loadReset());
            dispatch(uiActions.loadEnd());
        })
        
    }
}

export const authSuccess = (token, id) => {
    return {type: actions.AUTH_SUCCESS, payload:{token: token, userId: id}};
}

export const authReset = () => {
    return {type: actions.AUTH_RESET};
}

export const addUserSuccess = (type) => {
    return {type: actions.ADD_USER_DETAILS_SUCCESS, payload: {type: type}};
}
