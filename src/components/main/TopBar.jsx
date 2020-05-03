import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { toggleNavbar } from "../../redux/actions/appControl";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1.5),
    "@media (max-width: 400px)": {
      marginRight: theme.spacing(0.5),
    },
  },
  title: {
    flexGrow: 1,
    "@media (max-width: 400px)": {
      fontSize: 16,
    },
    "@media (max-width: 320px)": {
      fontSize: 14,
    },
  },
  buttons: {
    marginTop: theme.spacing(1),
  },
}));

const TopBar = ({ title, buttons: Buttons }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar id="app-bar" position="fixed">
        <Toolbar>
          <IconButton
            id="topMenuButton"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => dispatch(toggleNavbar())}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit">
            {title}
          </Typography>
          <div>{Buttons && <Buttons className={classes.buttons} />}</div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
