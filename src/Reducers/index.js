import { ADD_MOVIES, ADD_TO_FAVOURITE } from "../Actions";

//Changing the state to {} from []
const initialMoviesState = {
    list: [],
    favourites: [],
};
export default function movies(state = initialMoviesState, action) {
    // if (action.type === ADD_MOVIES) {
    //     return {
    //         ...state,
    //         list: action.movies,
    //     };
    // }
    // return state;

    switch (action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies,
            };

        case ADD_TO_FAVOURITE:
            return {
                ...state,
                favourites: [action.movie, ...state.favourites],
            };

        default:
            return state;
    }
}
