// {
//     type: "ADD_MOVIES"
// }

//action types
// we use action types as Variables
export const ADD_MOVIES = "ADD_MOVIES";

//Action Creators
//we use action creator for returning actions
export function addMovies(movies) {
    return {
        type: ADD_MOVIES,
        movies,
    };
}
