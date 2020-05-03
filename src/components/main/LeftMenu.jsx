import React from "react";
import DrawerListItem from "../common/DrawerListItem";
import navigationMenu from "../config/navigationMenu";
import {
  Divider,
  ListSubheader,
  makeStyles,
  List,
  SwipeableDrawer,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { readNavbarState } from "../../redux/selectors/appControl";
import { toggleNavbar } from "../../redux/actions/appControl";

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  list: {
    width: drawerWidth,
    overflowY: "auto",
    height: "100%",
  },
  divider: {
    marginTop: "1em",
  },
}));

const NavigationDrawer = () => {
  const dispatch = useDispatch();
  const isNavbarOpen = useSelector(readNavbarState);
  const handleToggle = () => dispatch(toggleNavbar());
  const list = navigationMenu();
  const classes = useStyles();
  return (
    <SwipeableDrawer
      open={isNavbarOpen}
      onOpen={handleToggle}
      onClose={handleToggle}
    >
      <List className={classes.list}>
        {list.map((item, i) => {
          if (item.canList) {
            return (
              <div key={i}>
                {item.type && <ListSubheader> {item.type} </ListSubheader>}
                {item.title && (
                  <DrawerListItem onClose={handleToggle} {...item} />
                )}
                {item.divider && <Divider className={classes.divider} />}
              </div>
            );
          } else return <div key={i} />;
        })}
      </List>
    </SwipeableDrawer>
  );
};

export default NavigationDrawer;
