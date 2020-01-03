import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import anuncios from "./reducers/anuncios/reducer";

export default combineReducers({
  user: userReducer,
  anuncios
});
