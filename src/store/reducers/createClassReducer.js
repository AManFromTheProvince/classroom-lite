import * as actions from '../actions/actionTypes';

const initialState = {
    successful: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.CREATE_CLASS_SUCCESS:
            return {...state, successful: true};
        default:
            return state;
    }
}

export default reducer;