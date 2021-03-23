import axios from 'axios';
import {loadClass} from './appActions';
import * as uiActions from './uiActions';
import encrpyt from 'js-sha256';

export const createPost = (name, body, subjectId) => {
    return dispatch => {

        dispatch(uiActions.loadReset());
        dispatch(uiActions.loadStart());

        const date = new Date();
        const dateString =  date.toDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const details = {
            poster: name,
            body: body,
            date: dateString,
            classId: subjectId,
            id: encrpyt.sha256(body),
            comments: []
        }

        axios.post("/posts.json", details)
        .then(res => {
            dispatch(uiActions.loadSuccess("Successfully created a new post"));
        })
        .catch(err => {
            dispatch(uiActions.loadFail("Failed to post"));
        })
        .finally(() => {
            dispatch(uiActions.loadReset());
            dispatch(loadClass(subjectId));

            setTimeout(() => {
                dispatch(uiActions.loadEnd());
            }, 10000);
        })
    }
}