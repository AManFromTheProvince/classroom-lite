import * as actions from '../actions/actionTypes';


export const loadStart = () => {
    return {type: actions.LOAD_START};
}

export const loadSuccess = (message) => {
    return {type: actions.LOAD_SUCCESS, payload: {message: message}};
}

export const loadFail = (message) => {
    return {type: actions.LOAD_FAIL, payload: {message: message}};
}

export const loadEnd = () => {
    return {type: actions.LOAD_END};
}

export const loadReset = () => {
    return {type: actions.LOAD_RESET};
}