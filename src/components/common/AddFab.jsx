import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  icon: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    "@media print": {
      display: "none",
    },
  },
}));

function ActionButton({ onClick }) {
  const classes = useStyles();
  return (
    <Fab
      id="addFab"
      color="secondary"
      aria-label="Add Fab"
      className={classes.icon}
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  );
}

export default ActionButton;
