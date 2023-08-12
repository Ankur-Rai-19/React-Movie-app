import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";

import "./index.css";
import App from "./Components/App";
import rootReducer from "./Reducers";

//Store Created
const store = createStore(rootReducer);
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
