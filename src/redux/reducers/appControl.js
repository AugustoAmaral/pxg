import { TOGGLE_NAVBAR } from "../actions/appControl";

const initialState = {
  isNavbarOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NAVBAR:
      return { ...state, isNavbarOpen: !state.isNavbarOpen };

    default:
      return state;
  }
};
