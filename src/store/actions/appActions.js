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
            const subjects = Object.keys(res.data).map(key => {
                return res.data[key];
            });

            dispatch(loadSubjectsSuccess(subjects));
        })
        .catch(err => {
            dispatch(loadSubjectsSuccess([]));
        })

    }
}

export const loadClassSuccess = (id, posts) => {
    return {type: actions.LOAD_CLASS, payload: {classId: id, posts: posts}};
}

export const loadClass = (id) => {
    // let posts = [
    //     {
    //         poster: "Teacher 1",
    //         body: "Hey I just assigned a new assignment to be submitted on March 31, 2021",
    //         date: "Mar. 11, 2021 09:10 PM",
    //         id: id,
    //         comments: [
    //             {
    //                 poster: "Student 1",
    //                 body: "Noted!",
    //                 date: "Mar. 11, 2021 09:31 PM"
    //             },
    //             {
    //                 poster: "Student 2",
    //                 body: "Will do!",
    //                 date: "Mar. 11, 2021 09:31 PM"
    //             }
    //         ]
    //     }
    // ];  

    return dispatch => {
        axios.get(`/posts.json?classId=${id}`)
        .then(res => {
            const data = Object.keys(res.data).map(key => {
                return {...res.data[key], comments: []};
            });
            
            // sort them
            data.sort((a,b) => b-a);

            dispatch(loadClassSuccess(id, data));
        })
        .catch(err => {
            dispatch(loadClassSuccess(id, []));
        })
    }
}

export const resetClass = () => {
    return {type: actions.RESET_CLASS}
}

