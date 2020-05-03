import React from "react";
import PropTypes from "prop-types";
import {
  useTheme,
  IconButton,
  Button,
  DialogContent,
  useMediaQuery,
  Dialog,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CommonHeader from "./CommonHeader";

const withFormDialog = (Component) => {
  const WithDialog = ({
    open,
    onClose,
    title,
    formId,
    onSubmit,
    onDelete,
    width,
    ...props
  }) => {
    const [formWidth, setFormWidth] = React.useState(width);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

    const handleSubmit = (obj) => {
      if (onSubmit.constructor.name === "AsyncFunction") {
        onSubmit(obj).then(() => onClose());
      } else {
        onSubmit(obj);
        onClose();
      }
    };

    return (
      <>
        <Dialog
          open={open}
          onClose={onClose}
          fullScreen={fullScreen}
          maxWidth={formWidth}
          fullWidth
          {...props}
        >
          <CommonHeader
            title={title}
            vPadding={1}
            hPadding={0}
            buttonMargin={2}
            elevation={3}
            leftButtons={() => (
              <IconButton id="closeForm" onClick={onClose} aria-label="Cancel">
                <CloseIcon />
              </IconButton>
            )}
            buttons={() => (
              <Button
                id="submitForm"
                type="submit"
                form={formId || "simpleFormId"}
                size="medium"
              >
                Salvar
              </Button>
            )}
          />

          <DialogContent>
            <Component
              formId={formId || "simpleFormId"}
              changeFormWidth={setFormWidth}
              onSubmit={handleSubmit}
              onDelete={onDelete}
              {...props}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };
  return WithDialog;
};

withFormDialog.defaultProps = {
  width: "sm",
};

withFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  formId: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  width: PropTypes.string,
};

export default withFormDialog;
