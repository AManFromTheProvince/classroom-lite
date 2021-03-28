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


export const addStudents = (id, email, userEmail) => {
   

    return dispatch => {
        dispatch(uiActions.loadReset());
        dispatch(uiActions.loadStart());
        if (userEmail === email) {
            dispatch(uiActions.loadFail("Cannot add yourself as a student"));
            dispatch(uiActions.loadReset());
            setTimeout(() => {
                dispatch(uiActions.loadEnd());
            }, 10000);

        } else {
            axios.get(`/users.json?orderBy="email"&equalTo="${email}"`)
            .then(res => {
                const keys = Object.keys(res.data);
                if (keys.length > 0) {
                    let studentDetails = keys.map(key => {
                        return {...res.data[key], key: key};
                    })[0];
                    // index 0 because this should ALWAYS ONLY RETURN ONE ITEM.
                    const username = studentDetails.firstName + " " + studentDetails.lastName;
                    const credentials = {id: studentDetails.id};
                    const classDetails = {id: id};
                    
                    axios.post(`/users/${studentDetails.key}/classes.json`, classDetails)
                    .then( res => {})
                    .catch(err => dispatch(uiActions.loadFail("Encountered an error")))


                    axios.post(`/classes/${id}/classmates.json`, credentials)
                    .then(res => {
                        dispatch(uiActions.loadSuccess(`Added ${username} to your class!`));
                    })
                    .catch(err => {
                        dispatch(uiActions.loadFail(`Encountered an error`));
                    })
                    .finally(() => {
                        dispatch(uiActions.loadReset());
                        setTimeout(() => {
                            dispatch(uiActions.loadEnd());
                        },10000);
                    });                
                } else {
                    dispatch(uiActions.loadFail("Email doesn't exists"));
                }
            })
            .catch( err => {
                dispatch(uiActions.loadFail("Encountered an error"));
            })
        }
    }
  
}

