import * as actions from './actionTypes';
import axios from 'axios';

export const createClassSuccessful = () => {
    return {type: actions.CREATE_CLASS_SUCCESS}
}

export const createClass = (name,  section, schedule) => {
    //handle talking with firebase

    //class id is unix time when it was created
    //this won't probably work when we scale up, but for the purposes of this side project, it should suffice

    return dispatch => {
        const details = {
            courseName: name,
            section: section,
            schedule: schedule,
            id: Date.now()
        }

        axios.post("/classes.json", details)
        .then(res => res.json())
        .then(data => console.log(data));
        
        dispatch(createClassSuccessful());
    }
}