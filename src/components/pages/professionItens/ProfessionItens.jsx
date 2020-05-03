import React, { useState, useEffect } from "react";
import AddProfItemForm from "./AddProfItemForm";
import AddFab from "../../common/AddFab";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../common/tableWithSearch/Table";
import isEqual from "lodash/isEqual";
import { readProfItemTable } from "../../../redux/selectors/professionItem";
import { readDropsForMenu } from "../../../redux/selectors/dropItem";
import {
  createProfItem,
  hydrateProfItem,
  updateProfItem,
  deleteProfItem,
} from "../../../redux/actions/professionItem";
import user from "../../../config/User";

const ProfessionItens = () => {
  const dispatch = useDispatch();
  const { entries, tableHeads } = useSelector(readProfItemTable, isEqual);
  const dropItems = useSelector(readDropsForMenu, isEqual);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    dispatch(hydrateProfItem());
  }, [dispatch]);

  const handleOpenForm = (id) => {
    if (user.loggedIn) {
      setIsFormOpen(true);
      setSelectedEntry(id || null);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedEntry(null);
  };

  const handleSubmit = (values) => {
    if (selectedEntry) {
      dispatch(updateProfItem(values, selectedEntry));
    } else {
      dispatch(createProfItem(values));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteProfItem(id));
    handleCloseForm();
  };

  console.log(dropItems);

  return (
    <>
      {user.loggedIn && <AddFab onClick={handleOpenForm} />}
      <AddProfItemForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        title="Aidiconar item"
        dropItems={dropItems}
        entry={entries.find((entry) => entry.objectId === selectedEntry)}
      />
      <CustomTable
        onClick={handleOpenForm}
        rows={entries}
        columns={tableHeads}
      />
    </>
  );
};

export default ProfessionItens;
