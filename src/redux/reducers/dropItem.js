import {
  READ_DROP_ITEM,
  READ_DROP_ITEM_ROLLBACK,
  READ_DROP_ITEM_COMMIT,
  CREATE_DROP_ITEM_COMMIT,
  UPDATE_DROP_ITEM_COMMIT,
  DELETE_DROP_ITEM_COMMIT,
} from "../actions/dropItem";

const initialState = {
  loading: false,
  entries: [],
};

const dropItem = (state = initialState, action) => {
  switch (action.type) {
    case READ_DROP_ITEM:
      return {
        ...state,
        loading: true,
      };
    case READ_DROP_ITEM_ROLLBACK: {
      return { ...state };
    }
    case READ_DROP_ITEM_COMMIT:
      return {
        ...state,
        loading: false,
        entries: [...action.payload.results],
      };
    case CREATE_DROP_ITEM_COMMIT:
      return {
        ...state,
        entries: [...state.entries, { ...action.payload, ...action.entry }],
      };
    case UPDATE_DROP_ITEM_COMMIT:
      return {
        ...state,
        entries: [
          ...state.entries.map((entry) =>
            entry.objectId === action.id ? { ...entry, ...action.entry } : entry
          ),
        ],
      };
    case DELETE_DROP_ITEM_COMMIT:
      return {
        ...state,
        entries: [...state.entries.filter((e) => e.objectId !== action.id)],
      };
    default:
      return state;
  }
};
export default dropItem;
