import * as actions from '../actions/actionTypes';

const initialState = {
    subjects: [],
    currentClass: null,
    posts: [],
    classmates:[],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.LOAD_SUBJECTS:
            return {...state, subjects: action.payload.subjects};
        case actions.LOAD_CLASS_START:
            return {...state, loading: true};
        case actions.LOAD_CLASS:
            return {...state, currentClass: action.payload.classId, posts: action.payload.posts};
        case actions.RESET_CLASS:
            return {...state, currentClass: null};
        case actions.LOAD_CLASS_END:
            return {...state, loading: false};
        default:
            return state;
    }
}

export default reducer;
