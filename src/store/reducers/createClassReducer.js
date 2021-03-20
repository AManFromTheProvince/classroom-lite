import * as actions from '../actions/actionTypes';

const initialState = {
    loading: false,
    successful: false,
    error: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.CREATE_CLASS_START:
            return {...state, loading: true};
        case actions.CREATE_CLASS_SUCCESS:
            return {...state, successful: true, loading: false};
        case actions.CREATE_CLASS_FAIL:
            return {...state, error: true, loading: false};
        case actions.CREATE_CLASS_END:
            return {...state, loading: false, successful: false, error: false};
        default:
            return state;
    }
}

export default reducer;