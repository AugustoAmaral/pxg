import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core";

const withDialog = (Component) => {
  const WithDialog = ({ open, onClose, title, ...props }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

    return (
      <>
        <Dialog
          open={open}
          onClose={onClose}
          fullScreen={fullScreen}
          maxWidth="xs"
        >
          <Component onClose={onClose} {...props} />
        </Dialog>
      </>
    );
  };
  return WithDialog;
};

withDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withDialog;
