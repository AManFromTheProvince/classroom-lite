import axios from 'axios';
import * as uiActions from './uiActions';

export const editProfile = (firstName, lastName, id) => {
    return dispatch => {
        dispatch(uiActions.loadReset());
        dispatch(uiActions.loadStart());

        axios.put("")


    }
}