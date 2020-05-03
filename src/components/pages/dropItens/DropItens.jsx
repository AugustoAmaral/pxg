import React, { useState, useEffect } from "react";
import AddItemForm from "./AddItemForm";
import AddFab from "../../common/AddFab";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../common/tableWithSearch/Table";
import isEqual from "lodash/isEqual";
import { readDropItemTable } from "../../../redux/selectors/dropItem";
import {
  createDropItem,
  hydrateDropItem,
  updateDropItem,
  deleteDropItem,
} from "../../../redux/actions/dropItem";
import user from "../../../config/User";

const DropItens = () => {
  const dispatch = useDispatch();
  const { entries, tableHeads } = useSelector(readDropItemTable, isEqual);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    dispatch(hydrateDropItem());
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
      dispatch(updateDropItem(values, selectedEntry));
    } else {
      dispatch(createDropItem(values));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteDropItem(id));
    handleCloseForm();
  };

  console.log(selectedEntry);

  return (
    <>
      {user.loggedIn && <AddFab onClick={handleOpenForm} />}
      <AddItemForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        title="Aidiconar item"
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

export default DropItens;
