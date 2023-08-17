// {
//     type: "ADD_MOVIES"
// }

//action types
// we use action types as Variables
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const REMOVE_FROM_FAVOURITE = "REMOVE_FROM_FAVOURITE";
export const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";

//Action Creators
//we use action creator for returning actions
export function addMovies(movies) {
    return {
        type: ADD_MOVIES,
        movies,
    };
}

export function addFavourite(movie) {
    return {
        type: ADD_TO_FAVOURITE,
        movie,
    };
}

export function removeFromFavourite(movie) {
    return {
        type: REMOVE_FROM_FAVOURITE,
        movie,
    };
}

export function setShowFavourite(val) {
    return {
        type: SET_SHOW_FAVOURITES,
        val,
    };
}

export function addMovieToList(movie) {
    return {
        type: ADD_MOVIE_TO_LIST,
        movie,
    };
}

export function handleMovieSearch(movie) {
    const url = `http://www.omdbapi.com/?apikey=61c84197&t=${movie}`;

    //Async action Thunk Middleware
    return function (dispatch) {
        fetch(url)
            .then((response) => response.json())
            .then((movie) => {
                console.log("movie", movie);
            });

        //dispatch an action
        // dispatch({ type: "ADD_SEARCH_RESULT", movie})
    };
}
