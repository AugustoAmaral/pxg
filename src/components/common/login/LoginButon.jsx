import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircle";
import LoginForm from "./LoginForm";
import user from "../../config/User";

const LoginButon = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const onToggle = () => setIsFormOpen((oldState) => !oldState);
  return (
    <>
      <IconButton id="loginButton" onClick={onToggle} color="inherit">
        <AccountIcon />
      </IconButton>
      {user.loggedIn ? (
        <Menu
          anchorEl={document.getElementById("loginButton")}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isFormOpen}
          onClose={onToggle}
        >
          <MenuItem onClick={user.logout}>Logout</MenuItem>
        </Menu>
      ) : (
        <LoginForm open={isFormOpen} onClose={onToggle} />
      )}
    </>
  );
};

export default LoginButon;
