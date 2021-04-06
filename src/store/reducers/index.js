import { combineReducers } from "redux";

import SystemReducer from "./system-reducers";
import AuthReducer from "./auth-reducers";

const rootReducer = combineReducers({
  systemR: SystemReducer,
  authR: AuthReducer,
});

export default rootReducer;
