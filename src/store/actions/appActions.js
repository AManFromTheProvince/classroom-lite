import axios from 'axios';
import * as actions from './actionTypes';

export const loadSubjectsSuccess = (subjects) => {
    return {type: actions.LOAD_SUBJECTS, payload: {subjects: subjects}};
}


export const loadSubjects = (userId) => {
    //getting info from firebase goes here
 
    return dispatch => {
        axios.get(`/classes.json?userId=${userId}`)
        .then(res => {
            if (!!res.data) {
                const subjects = Object.keys(res.data).map(key => {
                    return res.data[key];
                });
    
                dispatch(loadSubjectsSuccess(subjects));
            }
        })
        .catch(err => {
            dispatch(loadSubjectsSuccess([]));
        })

    }
}

export const loadClassSuccess = (id, posts) => {
    return {type: actions.LOAD_CLASS, payload: {classId: id, posts: posts}};
}

export const loadClassStart = () => {
    return {type: actions.LOAD_CLASS_START};
}

export const loadClassEnd = () => {
    return {type: actions.LOAD_CLASS_END};
}

export const loadClass = (id) => {

    return dispatch => {
        dispatch(loadClassStart());


        axios.get(`/posts.json?&orderBy="classId"&equalTo=${id}`)
        .then(res => {
            if (!!res.data) {
                const data = Object.keys(res.data).map(key => {
                    return {...res.data[key], comments: []};
                    
                    // sort them
                });
                data.sort((a,b) => b-a);
                dispatch(loadClassSuccess(id, data));
            }

        })
        .catch(err => {
            dispatch(loadClassSuccess(id, []));
        })
        .finally(() => {
            dispatch(loadClassEnd());
        })
    }
}

export const resetClass = () => {
    return {type: actions.RESET_CLASS}
}

