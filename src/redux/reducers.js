import { combineReducers } from "redux";
import appControl from "./reducers/appControl";
import dropItem from "./reducers/dropItem";
import professionItem from "./reducers/professionItem";

export default combineReducers({
  appControl,
  dropItem,
  professionItem,
});
