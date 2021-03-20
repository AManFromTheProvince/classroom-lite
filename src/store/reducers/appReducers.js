import * as actions from '../actions/actionTypes';

const initialState = {
    subjects: [],
    currentClass: null,
    posts: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.LOAD_SUBJECTS:
            return {...state, subjects: action.payload.subjects};
        case actions.LOAD_CLASS:
            return {...state, currentClass: action.payload.classId, posts: action.payload.posts}
        case actions.RESET_CLASS:
            return {...state, currentClass: null, posts: []}
        default:
            return state;
    }
}

export default reducer;
