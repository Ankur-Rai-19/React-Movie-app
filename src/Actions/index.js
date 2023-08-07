// {
//     type: "ADD_MOVIES"
// }

//action types
// we use action types as Variables
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";

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
