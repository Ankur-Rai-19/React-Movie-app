import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourite } from "../Actions";

class App extends React.Component {
    componentDidMount() {
        const { store } = this.props;
        store.subscribe(() => {
            console.log("UPDATED");
            // we should not do the force update always
            this.forceUpdate();
        });
        // make api Call to get the movies after that

        /* is dispatching an action to add movies to the store. */
        store.dispatch(addMovies(data));

        console.log("State", this.props.store.getState());
    }

    // it will check in state if this movie is in the favourites array or not
    isMovieFavourite = (movie) => {
        const { favourites } = this.props.store.getState(); // {list:[], favourite: []}

        const index = favourites.indexOf(movie);

        if (index !== -1) {
            // movie is favourite
            return true;
        }
        return false;
    };

    onChangeTab = (val) => {
        this.props.store.dispatch(setShowFavourite(val));
    };

    render() {
        // earlier our state is [] but now {list:[], favourite: []}
        const { list, favourites, showFavourites } =
            this.props.store.getState(); // using this we can get our state in  our store
        console.log("RENDER", this.props.store.getState());

        const displayMovies = showFavourites ? favourites : list;

        return (
            <div className="App">
                <Navbar />
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
                                dispatch={this.props.store.dispatch}
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

export default App;
