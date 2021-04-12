import { combineReducers } from "redux";

import SystemReducer from "./system-reducer";
import AuthReducer from "./auth-reducer";
import userReducer from "./user-reducer";

const rootReducer = combineReducers({
  // i prefer this convention of ending reducer key name with "R", just to clear that its a reducer and contain its own state
  systemR: SystemReducer,
  authR: AuthReducer,
  userR: userReducer,
});

export default rootReducer;
