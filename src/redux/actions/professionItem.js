import prepareEntryForAPI from "../../lib/prepareEntryForAPI";
import { defaultHeaders, generateClassURL } from "../../config/parseConfig";

export const CREATE_PROF_ITEM = "CREATE_PROF_ITEM";
export const CREATE_PROF_ITEM_COMMIT = "CREATE_PROF_ITEM_COMMIT";
export const CREATE_PROF_ITEM_ROLLBACK = "CREATE_PROF_ITEM_ROLLBACK";

export const READ_PROF_ITEM = "READ_PROF_ITEM";
export const READ_PROF_ITEM_COMMIT = "READ_PROF_ITEM_COMMIT";
export const READ_PROF_ITEM_ROLLBACK = "READ_PROF_ITEM_ROLLBACK";

export const UPDATE_PROF_ITEM = "UPDATE_PROF_ITEM";
export const UPDATE_PROF_ITEM_COMMIT = "UPDATE_PROF_ITEM_COMMIT";
export const UPDATE_PROF_ITEM_ROLLBACK = "UPDATE_PROF_ITEM_ROLLBACK";

export const DELETE_PROF_ITEM = "DELETE_PROF_ITEM";
export const DELETE_PROF_ITEM_COMMIT = "DELETE_PROF_ITEM_COMMIT";
export const DELETE_PROF_ITEM_ROLLBACK = "DELETE_PROF_ITEM_ROLLBACK";

export const createProfItem = (entry) => ({
  type: CREATE_PROF_ITEM,
  entry,
  meta: {
    offline: {
      effect: {
        url: generateClassURL("ProfessionItem"),
        method: "POST",
        body: prepareEntryForAPI(entry),
        headers: defaultHeaders(),
      },
      commit: { type: CREATE_PROF_ITEM_COMMIT, entry },
      rollback: {
        type: CREATE_PROF_ITEM_ROLLBACK,
      },
    },
  },
});

export const hydrateProfItem = () => ({
  type: READ_PROF_ITEM,
  meta: {
    offline: {
      effect: {
        url: generateClassURL("ProfessionItem", { limit: 1000 }),
        method: "GET",
        headers: defaultHeaders(),
      },
      commit: { type: READ_PROF_ITEM_COMMIT },
      rollback: { type: READ_PROF_ITEM_ROLLBACK },
    },
  },
});
export const updateProfItem = (entry, id) => ({
  type: UPDATE_PROF_ITEM,
  meta: {
    offline: {
      effect: {
        url: generateClassURL("ProfessionItem/" + id),
        method: "PUT",
        body: prepareEntryForAPI(entry),
        headers: defaultHeaders(),
      },
      commit: { type: UPDATE_PROF_ITEM_COMMIT, entry, id },
      rollback: {
        type: UPDATE_PROF_ITEM_ROLLBACK,
      },
    },
  },
});

export const deleteProfItem = (id) => ({
  type: DELETE_PROF_ITEM,
  id: id,
  meta: {
    offline: {
      effect: {
        url: generateClassURL("ProfessionItem/" + id),
        method: "DELETE",
        headers: defaultHeaders(),
      },
      commit: { type: DELETE_PROF_ITEM_COMMIT, id },
      rollback: {
        type: DELETE_PROF_ITEM_ROLLBACK,
      },
    },
  },
});
