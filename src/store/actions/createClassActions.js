import * as actions from './actionTypes';
import axios from 'axios';


export const createClassStart = () => {
    return {type: actions.CREATE_CLASS_START}
}

export const createClassSuccessful = () => {
    return {type: actions.CREATE_CLASS_SUCCESS}
}

export const createClassFail = () => {
    return {type: actions.CREATE_CLASS_FAIL}
}

export const createClassEnd = () => {
    return {type: actions.CREATE_CLASS_END};
}

export const createClassReset = () => {
    return {type: actions.CREATE_CLASS_RESET};
}

export const createClass = (name,  section, schedule, username, userId) => {
    //handle talking with firebase

    //class id is unix time when it was created
    //this won't probably work when we scale up, but for the purposes of this side project, it should suffice

    return dispatch => {

        dispatch(createClassStart());

        const details = {
            subjectName: name,
            section: section,
            schedule: schedule,
            id: Date.now(),
            userId: userId,
            teacher: username
        }

        axios.post("/classes.json", details)
        .then(res => {
            dispatch(createClassSuccessful());
        })
        .catch(err => {
            dispatch(createClassFail());
        })
        .finally(() => {
            dispatch(createClassReset());
            setTimeout(()=> {
                dispatch(createClassEnd());
            }, 10000);
        })
    }
}
