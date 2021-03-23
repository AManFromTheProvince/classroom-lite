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
        case actions.LOAD_START:
            return {...state, loading: true};
        case actions.LOAD_SUCCESS:
            return {...state, successful: true, loading: false, showMessage: true, 
                messageColor: "green", message: action.payload.message};
        case actions.LOAD_FAIL:
            return {...state, error: true, loading: false, showMessage: true,
                messageColor: "red", message: action.payload.message};
        case actions.LOAD_RESET:
            return {...state, successful: false, error: false}
        case actions.LOAD_END:
            return {...state, loading: false, successful: false, error: false, showMessage: false};
        default:
            return state;
    }
}

export default reducer;