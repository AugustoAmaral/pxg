import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TopBar from "./TopBar";
import NavigationDrawer from "./NavigationDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const Main = ({ component, title, buttons, ...props }) => {
  const Component = component;
  const classes = useStyles();

  return (
    <>
      <NavigationDrawer />
      <TopBar title={title} buttons={buttons} />
      <div className={classes.root}>
        <Component {...props} />
      </div>
    </>
  );
};

export default Main;
