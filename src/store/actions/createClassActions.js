import axios from 'axios';
import * as uiActions from './uiActions';


export const createClass = (name,  section, schedule, username, userId) => {
    //handle talking with firebase

    //class id is unix time when it was created
    //this won't probably work when we scale up, but for the purposes of this side project, it should suffice

    return dispatch => {
        dispatch(uiActions.loadReset());
        dispatch(uiActions.loadStart());

        const details = {
            subjectName: name,
            section: section,
            schedule: schedule,
            userId: userId,
            teacher: username
        }

        axios.post("/classes.json", details)
        .then(res => {
            dispatch(uiActions.loadSuccess("Successfully created a new class"));
        })
        .catch(err => {
            dispatch(uiActions.loadFail("Failed to create a new class"));
        })
        .finally(() => {
            dispatch(uiActions.loadReset());
            setTimeout(()=> {
                dispatch(uiActions.loadReset());
            }, 10000);
        })
    }
}
