import axios from 'axios';
import * as actions from './actionTypes';
import * as uiActions from './uiActions';

export const authenticate = (email, password, firstName, lastName) => {
    return dispatch => {
        dispatch(authReset());
        dispatch(uiActions.loadReset());
        dispatch(uiActions.loadStart());

        const credentials = {
            email: email,
            password: password,
            returnSecureToken: true
        }
    
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`, credentials)
        .then(res => {
            localStorage.setItem("idToken", res.data.idToken);
            localStorage.setItem("expiresIn", (res.data.expiresIn * 1000) + new Date()); //convert to millisecond
            localStorage.setItem("localId", res.data.localId);
            localStorage.setItem("refreshToken", res.data.refreshToken); 
            dispatch(authSuccess());
            dispatch(addUserDetails(firstName, lastName));
            
        })
        .catch( err => {
            dispatch(uiActions.loadFail("Email is invalid or password is too short"));
            dispatch(authFail(err));
        })
        
    }
}

export const authFail = (err) => {
    return {type: actions.AUTH_FAIL, payload: {error: err}};
}

export const authSuccess = () => {
    const token = localStorage.getItem("idToken");
    const id = localStorage.getItem("localId");

    return {type: actions.AUTH_SUCCESS, payload:{token: token, userId: id}};
}

export const authReset = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("localId");
    localStorage.removeItem("refreshToken");
    return {type: actions.AUTH_RESET};
}

export const addUserDetails = (firstName, lastName) => {
    return dispatch => {

        const credentials = {
            firstName: firstName,
            lastName: lastName,
            id: localStorage.getItem("localId")
        }
        

        axios.post("/users.json", credentials)
        .then(res => {
            dispatch(uiActions.loadSuccess("Successfully created user details"));
            dispatch(addUsersSuccess());
        })
        .catch( err => {
            dispatch(uiActions.loadFail("Error in adding user details"));
            dispatch(addUsersFail(err));
        })
        .finally(() => {
            dispatch(uiActions.loadReset());
            setTimeout(() => {
                dispatch(uiActions.loadEnd());
            }, 10000);
        })
        
    }
}

export const addUsersSuccess = () => {
    return {type: actions.ADD_USER_DETAILS_SUCCESS};
}

export const addUsersFail = err => {
    return {type: actions.ADD_USER_DETAILS_FAIL, payload: {error: err}};
}

export const checkLoggedIn = () => {
    return dispatch => {
        const expirationTime = localStorage.getItem("expiresIn");

        if (new Date() > expirationTime) {
            dispatch(authReset());
        } else {
            dispatch(authSuccess());
            dispatch(addUsersSuccess());
            dispatch(checkTimeLeft( expirationTime - new Date()  ));
        }
        
    }
}

export const checkTimeLeft = time => {
    return dispatch => {
        setTimeout(() => {
            dispatch(keepLoggedIn());
        }, time * 1000);
    }
}

export const keepLoggedIn = () => {
    return dispatch => {
        const refreshToken = localStorage.getItem("refreshToken");
        const credentials = {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        }

        axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_API_KEY}`, credentials)
        .then( res => {
            localStorage.setItem("idToken", res.data.id_token);
            localStorage.setItem("expiresIn", (res.data.expires_in * 1000) + new Date());
            localStorage.setItem("localId", res.data.user_id);
            localStorage.setItem("refreshToken", res.data.refresh_token);  
        })
        .catch( err => {
            dispatch(authReset());
        })
    }
}