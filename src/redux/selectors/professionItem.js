import orderBy from "lodash/orderBy";
import { createSelector } from "reselect";

export const readProfItemTable = createSelector(
  (state) => state.professionItem,
  (professionItem) => ({
    loading: professionItem.loading,
    entries: orderBy(
      professionItem.entries.map((entry) => ({
        ...entry,
      })),
      "name",
      "asc"
    ),
    tableHeads: [
      { name: "name", label: "Nome" },
      { name: "value", label: "Valor" },
      { name: "professionRank", label: "Rank da profissão" },
      { name: "professionName", label: "Nome da profissão" },
      { name: "materials", label: "Materiais" },
    ],
  })
);
