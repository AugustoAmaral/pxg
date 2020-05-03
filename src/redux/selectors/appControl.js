import { createSelector } from "reselect";

export const readNavbarState = createSelector(
  (state) => state.appControl.isNavbarOpen,
  (isNavbarOpen) => isNavbarOpen
);
