import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware } from "redux";

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
        console.log("ACTION TYPE = ", action.type);
        next(action);
    };

//Store Created
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Store", store);
// console.log("Before State", store.getState());

//Dispatched Action
// store.dispatch({
//     type: "ADD_MOVIES",
//     movies: [{ name: "Superman" }],
// });
// console.log("After State", store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/* //App take the movies from the Store */}
        <App store={store} />
    </React.StrictMode>
);
