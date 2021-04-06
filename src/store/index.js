import { createStore, compose, applyMiddleware } from "redux";

import reduxThunk from "redux-thunk";

import rootReducer from "./reducers";

const appStore = createStore(rootReducer, compose(applyMiddleware(reduxThunk)));

export default appStore;
