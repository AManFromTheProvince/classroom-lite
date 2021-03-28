import axios from 'axios';
import * as actions from './actionTypes';
import * as uiActions from './uiActions';
import {resetClass, loadSubjects} from './appActions';

const storeAuthDetails = (idToken, expiresIn, localId, refreshToken) => {
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("expiresIn", (expiresIn * 1000) + new Date()); //convert to millisecond
    localStorage.setItem("localId", localId);
    localStorage.setItem("refreshToken", refreshToken); 
}

const removeAuthDetails = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("localId");
    localStorage.removeItem("refreshToken");
}

export const authenticate = (email, password, firstName, lastName) => {
    return dispatch => {
        dispatch(authReset());
        dispatch(resetClass());
        dispatch(uiActions.loadReset());
        dispatch(uiActions.loadStart());

        const credentials = {
            email: email,
            password: password,
            returnSecureToken: true
        }
    
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`, credentials)
        .then(res => {
            storeAuthDetails(res.data.idToken, res.data.expiresIn, res.data.localId, res.data.refreshToken);
            dispatch(authSuccess());
            dispatch(addUserDetails(firstName, lastName, email));
            
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
    removeAuthDetails();
    return {type: actions.AUTH_RESET};
}

export const addUserDetails = (firstName, lastName, email) => {
    return dispatch => {
        const id = localStorage.getItem("localId");

        const credentials = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            id: id
        }
        
        axios.post("/users.json", credentials)
        .then(res => {
            dispatch(uiActions.loadSuccess("Successfully created user details"));
            dispatch(addUsersSuccess(firstName, lastName, email));
            dispatch(loadSubjects(id));
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

export const addUsersSuccess = (firstName, lastName, email) => {
    return {type: actions.ADD_USER_DETAILS_SUCCESS, payload: {username: firstName + " " + lastName, email: email}};
}

export const addUsersFail = err => {
    return {type: actions.ADD_USER_DETAILS_FAIL, payload: {error: err}};
}

export const checkLoggedIn = () => {
    return dispatch => {
        const expirationTime = localStorage.getItem("expiresIn");
        const id = localStorage.getItem("localId");

        if (new Date() > expirationTime) {
            dispatch(authReset());
        } else {
            dispatch(authSuccess());
            dispatch(getUserDetails(id));
            dispatch(loadSubjects(id));
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
            storeAuthDetails(res.data.id_token, res.data.expires_in, res.data.user_id, res.data.refresh_token);
            dispatch(getUserDetails(res.data.user_id));
        })
        .catch( err => {
            dispatch(authReset());
        })
    }
}


export const logIn = (email, password) => {
    return dispatch => {
        dispatch(resetClass());
        dispatch(uiActions.loadReset());
        dispatch(uiActions.loadStart());

        const credentials = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`, credentials)
        .then(res => {
            storeAuthDetails(res.data.idToken, res.data.expiresIn, res.data.localId, res.data.refreshToken);
            dispatch(authSuccess());
            dispatch(getUserDetails(res.data.localId));
        })
        .catch(err => {
            dispatch(uiActions.loadFail("Wrong credentials. Check your email or password"));
            dispatch(authFail(err.message));
        })
        .finally(() => {
            dispatch(uiActions.loadReset());

            setTimeout(() => {
                dispatch(uiActions.loadEnd());
            }, 10000);
        });

    }
}

export const getUserDetails = (id) => {
    return dispatch => {
        axios.get(`/users.json?orderBy="id"&equalTo="${id}"`)
        .then( res => {
            dispatch(uiActions.loadSuccess());
            const userDataKey = Object.keys(res.data).filter( key => res.data[key].id === id);
            const userData = res.data[userDataKey[0]];
            dispatch(addUsersSuccess(userData.firstName, userData.lastName, userData.email));
            dispatch(loadSubjects(id));
        })
        .catch( err => {
            dispatch(authReset());
        })
       

    }
}
