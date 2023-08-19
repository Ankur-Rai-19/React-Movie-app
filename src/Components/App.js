import React from "react";
import { data as moviesList } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourite } from "../Actions";
import { connect } from "../index";

class App extends React.Component {
    componentDidMount() {
        // const { store } = this.props;

        /* is dispatching an action to add movies to the store. */
        this.props.dispatch(addMovies(moviesList));

        // console.log("State", this.props.store.getState());
    }

    // it will check in state if this movie is in the movies favourites array or not
    isMovieFavourite = (movie) => {
        const { movies } = this.props; // {movies:{}, search: {}}

        const index = movies.favourites.indexOf(movie);

        if (index !== -1) {
            // movie is favourite
            return true;
        }
        return false;
    };

    onChangeTab = (val) => {
        this.props.dispatch(setShowFavourite(val));
    };

    render() {
        const { movies, search } = this.props; // {movies:{}, search: {}}
        const { list, favourites = [], showFavourites = [] } = movies; // using this we can get our state in  our store
        // console.log("RENDER", this.props.store.getState());

        const displayMovies = showFavourites ? favourites : list;

        return (
            <div className="App">
                <Navbar search={search} />
                <div className="main">
                    <div className="tabs">
                        <div
                            className={`tab ${
                                showFavourites ? "" : "active-tabs"
                            }`}
                            onClick={() => this.onChangeTab(false)}
                        >
                            Movies
                        </div>
                        <div
                            className={`tab ${
                                showFavourites ? "active-tabs" : ""
                            }`}
                            onClick={() => this.onChangeTab(true)}
                        >
                            Favourites
                        </div>
                    </div>

                    <div className="list">
                        {displayMovies.map((movie, index) => (
                            <MovieCard
                                movie={movie}
                                key={`movies-${index}`}
                                dispatch={this.props.dispatch}
                                isFavourite={this.isMovieFavourite(movie)}
                            />
                        ))}
                    </div>
                    {displayMovies.length === 0 ? (
                        <div className="no-movies">
                            No Movies to Display! Go Add Some!!
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

/* The AppWrapper class is a React component that renders the App component and passes the store as a prop. */
// class AppWrapper extends React.Component {
//     render() {
//         return (
//             <StoreContext.Consumer>
//                 {(store) => <App store={store} />}
//             </StoreContext.Consumer>
//         );
//     }
// }

/**
 * The `state` parameter is the current state of the Redux store. It contains all the data that has been stored in the store.
 * The connect function is returning a new component called connectedAppComponent.
 */
function mapStateToProps(state) {
    // I want these properties
    return {
        movies: state.movies,
        search: state.movies,
    };
}
//Created a connect and told connect function that i want the above properties from the store as props inside my App component
const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
