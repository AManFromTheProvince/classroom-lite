import * as actions from '../actions/actionTypes';

const initialState = {
    loading: false,
    successful: false,
    error: false,
    showMessage: false,
    messageColor: "",
    message: ""
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.CREATE_CLASS_START:
            return {...state, loading: true};
        case actions.CREATE_CLASS_SUCCESS:
            return {...state, successful: true, loading: false, showMessage: true, 
                messageColor: "green", message: "Successfully created a new class"};
        case actions.CREATE_CLASS_FAIL:
            return {...state, error: true, loading: false, showMessage: true,
                messageColor: "red", message: "Failed creating a new class"};
        case actions.CREATE_CLASS_RESET:
            return {...state, successful: false, error: false}
        case actions.CREATE_CLASS_END:
            return {...state, loading: false, successful: false, error: false, showMessage: false};
        default:
            return state;
    }
}

export default reducer;