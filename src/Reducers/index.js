import { combineReducers } from "redux";

import {
    ADD_MOVIES,
    ADD_TO_FAVOURITE,
    REMOVE_FROM_FAVOURITE,
    SET_SHOW_FAVOURITES,
    ADD_MOVIE_TO_LIST,
    ADD_SEARCH_RESULT,
} from "../Actions";

//Changing the state to {} from []
const initialMoviesState = {
    list: [],
    favourites: [],
    showFavourites: false,
};
export function movies(state = initialMoviesState, action) {
    console.log("MOVIES REDUCERS");
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

        case REMOVE_FROM_FAVOURITE:
            const filteredArray = state.favourites.filter(
                (movie) => movie.Title !== action.movie.Title
            );
            return {
                ...state,
                favourites: filteredArray,
            };

        case SET_SHOW_FAVOURITES:
            return {
                ...state,
                showFavourites: action.val,
            };

        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                list: [action.movie, ...state.list],
            };
        default:
            return state;
    }
}

//Multiple Reducers
const initialSearchState = {
    result: {},
    showSearchResults: false,
};
export function search(state = initialSearchState, action) {
    // ADD_SEARCH_RESULT;
    switch (action.type) {
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                result: action.movie,
                showSearchResults: true,
            };
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                showSearchResults: false,
            };
        default:
            return state;
    }
}

// const initialRootState = {
//     movies: initialMoviesState,
//     search: initialSearchState,
// };

// export default function rootReducer(state = initialRootState, action) {
//     return {
//         movies: movies(state.movies, action),
//         search: search(state.search, action),
//     };
// }

//Combine Reducer method
export default combineReducers({
    movies,
    search,
});
