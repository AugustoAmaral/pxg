import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuItemStyle: {
    marginRight: 15,
    marginLeft: 15,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: "0.4em",
    color: "black",
    "& .MuiListItemText-primary": {
      fontWeight: 500,
    },
    "& .MuiTouchRipple-root": {
      color: theme.palette.secondary.main,
    },
    "&:focus": {
      backgroundColor: "white",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.secondary.main,
      },
    },
    "&.Mui-selected": {
      backgroundColor: "#E42F1733",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.secondary.main,
        fontWeight: 700,
      },
    },
  },
}));

const DrawerListItem = ({
  title,
  icon,
  disabled,
  path,
  customOnClick,
  onClose,
}) => {
  const history = useHistory();
  const Icon = icon;
  const classes = useStyles();

  const onClick = () => {
    history.push(path);
    onClose && onClose();
  };

  return (
    <MenuItem
      id={`${path ? path : title}_Button`}
      onClick={customOnClick ? customOnClick : onClick}
      disabled={disabled}
      selected={history.location.pathname === path}
      className={classes.menuItemStyle}
    >
      <ListItemIcon style={{ color: "rgba(0, 0, 0, 0.54) !important" }}>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={title} />
    </MenuItem>
  );
};

DrawerListItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  customOnClick: PropTypes.func,
  path: PropTypes.any,
};

export default DrawerListItem;
