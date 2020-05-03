import {
    READ_PROF_ITEM,
    READ_PROF_ITEM_ROLLBACK,
    READ_PROF_ITEM_COMMIT,
    CREATE_PROF_ITEM_COMMIT,
    UPDATE_PROF_ITEM_COMMIT,
    DELETE_PROF_ITEM_COMMIT,
  } from "../actions/professionItem";
  
  const initialState = {
    loading: false,
    entries: [],
  };
  
  const professionItem = (state = initialState, action) => {
    switch (action.type) {
      case READ_PROF_ITEM:
        return {
          ...state,
          loading: true,
        };
      case READ_PROF_ITEM_ROLLBACK: {
        return { ...state };
      }
      case READ_PROF_ITEM_COMMIT:
        return {
          ...state,
          loading: false,
          entries: [...action.payload.results],
        };
      case CREATE_PROF_ITEM_COMMIT:
        return {
          ...state,
          entries: [...state.entries, { ...action.payload, ...action.entry }],
        };
      case UPDATE_PROF_ITEM_COMMIT:
        return {
          ...state,
          entries: [
            ...state.entries.map((entry) =>
              entry.objectId === action.id ? { ...entry, ...action.entry } : entry
            ),
          ],
        };
      case DELETE_PROF_ITEM_COMMIT:
        return {
          ...state,
          entries: [...state.entries.filter((e) => e.objectId !== action.id)],
        };
      default:
        return state;
    }
  };
  export default professionItem;
  