import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./Components/App";
import rootReducer from "./Reducers";

// this is the curried form of function logger(obj,next,action) MIDDLEWARE
// const logger = function ({ dispatch, getState }) {
//     return function (next) {
//         return function (action) {
//             //middleware code
//             console.log("ACTION TYPE = ", action.type);
//             next(action);
//         };
//     };
// };

//Modifying Middleware (or method)
const logger =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        // logger code
        if (typeof action !== "function") {
            console.log("ACTION TYPE = ", action.type);
        }
        next(action);
    };

// const thunk =
//     ({ dispatch, getState }) =>
//     (next) =>
//     (action) => {
//         // logger code
//         if (typeof action === "function") {
//             action(dispatch);
//             return;
//         }
//         next(action);
//     };

//Store Created
const store = createStore(rootReducer, applyMiddleware(logger, thunk));
// console.log("Store", store);
console.log("State", store.getState());

export const StoreContext = createContext();
console.log("StoreContext", StoreContext);

/* It provides a store to its children components through the StoreContext. */
class Provider extends React.Component {
    render() {
        const { store } = this.props;
        return (
            <StoreContext.Provider value={store}>
                {this.props.children}
            </StoreContext.Provider>
        );
    }
}

//const connectedAppComponent = connect(callback)(App);
export function connect(callback) {
    //Returning another function and get the component as an argument
    return function (Component) {
        class ConnectedComponent extends React.Component {
            constructor(props) {
                super(props);
                this.unsubscribe = this.props.store.subscribe(() => {
                    this.forceUpdate();
                });
            }
            componentWillUnmount() {
                this.unsubscribe();
            }

            render() {
                const { store } = this.props;
                // to get the state form redux
                const state = store.getState();
                const dataToBePassedAsProps = callback(state);
                return (
                    <Component
                        {...dataToBePassedAsProps}
                        dispatch={store.dispatch}
                    />
                );
            }
        }

        class ConnectedComponentWrapper extends React.Component {
            render() {
                return (
                    <StoreContext.Consumer>
                        {(store) => <ConnectedComponent store={store} />}
                    </StoreContext.Consumer>
                );
            }
        }
        return ConnectedComponentWrapper;
    };
}

//Dispatched Action
// store.dispatch({
//     type: "ADD_MOVIES",
//     movies: [{ name: "Superman" }],
// });
// console.log("After State", store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/* //App take the movies from the Store */}
            <App />
        </Provider>
    </React.StrictMode>
);
