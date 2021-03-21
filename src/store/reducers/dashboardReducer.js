import * as actions from '../actions/actionTypes';


const initialState = {
    loading: false,
    success: false,
    error: false,
    showMessage: false,
    messageColor: "green",
    message: ""
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.CREATE_CLASS_POST_START:
            return {...state, loading: true};
        case actions.CREATE_CLASS_POST_SUCCESS:
            return {...state, success: true, showMessage: true, messageColor: "green", message: "Successfully posted"};
        case actions.CREATE_CLASS_POST_FAIL:
            return {...state, error: true, showMessage: true, messageColor: "red", message: "Failed to post"};
        case actions.CREATE_CLASS_POST_RESET:
            return {...state, error: false, success: false};
        case actions.CREATE_CLASS_POST_END:
            return {...state, showMessage: false};
        default:
            return state;
    }
}

export default reducer;

