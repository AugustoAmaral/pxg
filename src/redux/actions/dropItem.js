import prepareEntryForAPI from "../../lib/prepareEntryForAPI";
import { defaultHeaders, generateClassURL } from "../../config/parseConfig";

export const CREATE_DROP_ITEM = "CREATE_DROP_ITEM";
export const CREATE_DROP_ITEM_COMMIT = "CREATE_DROP_ITEM_COMMIT";
export const CREATE_DROP_ITEM_ROLLBACK = "CREATE_DROP_ITEM_ROLLBACK";

export const READ_DROP_ITEM = "READ_DROP_ITEM";
export const READ_DROP_ITEM_COMMIT = "READ_DROP_ITEM_COMMIT";
export const READ_DROP_ITEM_ROLLBACK = "READ_DROP_ITEM_ROLLBACK";

export const UPDATE_DROP_ITEM = "UPDATE_DROP_ITEM";
export const UPDATE_DROP_ITEM_COMMIT = "UPDATE_DROP_ITEM_COMMIT";
export const UPDATE_DROP_ITEM_ROLLBACK = "UPDATE_DROP_ITEM_ROLLBACK";

export const DELETE_DROP_ITEM = "DELETE_DROP_ITEM";
export const DELETE_DROP_ITEM_COMMIT = "DELETE_DROP_ITEM_COMMIT";
export const DELETE_DROP_ITEM_ROLLBACK = "DELETE_DROP_ITEM_ROLLBACK";

export const createDropItem = (entry) => ({
  type: CREATE_DROP_ITEM,
  entry,
  meta: {
    offline: {
      effect: {
        url: generateClassURL("Item"),
        method: "POST",
        body: prepareEntryForAPI(entry),
        headers: defaultHeaders(),
      },
      commit: { type: CREATE_DROP_ITEM_COMMIT, entry },
      rollback: {
        type: CREATE_DROP_ITEM_ROLLBACK,
      },
    },
  },
});

export const hydrateDropItem = () => ({
  type: READ_DROP_ITEM,
  meta: {
    offline: {
      effect: {
        url: generateClassURL("Item", { limit: 1000 }),
        method: "GET",
        headers: defaultHeaders(),
      },
      commit: { type: READ_DROP_ITEM_COMMIT },
      rollback: { type: READ_DROP_ITEM_ROLLBACK },
    },
  },
});
export const updateDropItem = (entry, id) => ({
  type: UPDATE_DROP_ITEM,
  meta: {
    offline: {
      effect: {
        url: generateClassURL("Item/" + id),
        method: "PUT",
        body: prepareEntryForAPI(entry),
        headers: defaultHeaders(),
      },
      commit: { type: UPDATE_DROP_ITEM_COMMIT, entry, id },
      rollback: {
        type: UPDATE_DROP_ITEM_ROLLBACK,
      },
    },
  },
});

export const deleteDropItem = (id) => ({
  type: DELETE_DROP_ITEM,
  id: id,
  meta: {
    offline: {
      effect: {
        url: generateClassURL("Item/" + id),
        method: "DELETE",
        headers: defaultHeaders(),
      },
      commit: { type: DELETE_DROP_ITEM_COMMIT, id },
      rollback: {
        type: DELETE_DROP_ITEM_ROLLBACK,
      },
    },
  },
});
