import orderBy from "lodash/orderBy";
import { createSelector } from "reselect";

export const readDropItemTable = createSelector(
  (state) => state.dropItem,
  (dropItem) => ({
    loading: dropItem.loading,
    entries: orderBy(
      dropItem.entries.map((entry) => ({
        ...entry,
      })),
      "name",
      "asc"
    ),
    tableHeads: [
      { name: "name", label: "Nome" },
      { name: "value", label: "Valor" },
    ],
  })
);

export const readDropsForMenu = createSelector(
  (state) => state.dropItem.entries,
  (entries) =>
    orderBy(
      entries.map((entry) => ({ value: entry.name, label: entry.name })),
      "label",
      "asc"
    )
);
