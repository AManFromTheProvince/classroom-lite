import axios from 'axios';
import * as actions from './actionTypes';
import {loadClass} from './appActions';

export const createPostStart = () => {
    return {type: actions.CREATE_CLASS_POST_START};
}

export const createPostSuccess = () => {
    return {type: actions.CREATE_CLASS_POST_SUCCESS};
}

export const createPostFail = () => {
    return {type: actions.CREATE_CLASS_POST_FAIL}
}

export const createPostReset = () => {
    return {type: actions.CREATE_CLASS_POST_RESET};
}

export const createPostEnd = () => {
    return {type: actions.CREATE_CLASS_POST_END};
}



export const createPost = (name, body, subjectId) => {
    return dispatch => {

        dispatch(createPostStart());

        const date = new Date();
        const dateString =  date.toDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const details = {
            poster: name,
            body: body,
            date: dateString,
            classId: subjectId,
            comments: []
        }

        axios.post("/posts.json", details)
        .then(res => {
            dispatch(createPostSuccess());
        })
        .catch(err => {
            dispatch(createPostFail());
        })
        .finally(() => {
            dispatch(createPostReset());
            dispatch(loadClass(subjectId));

            setTimeout(() => {
                dispatch(createPostEnd());
            }, 10000);
        })
    }
}