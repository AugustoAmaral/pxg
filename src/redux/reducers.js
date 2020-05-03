import { combineReducers } from "redux";
import appControl from "./reducers/appControl";
import dropItem from "./reducers/dropItem";

export default combineReducers({
  appControl,
  dropItem,
});
