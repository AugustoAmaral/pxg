import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Box,
  makeStyles,
  IconButton,
  Typography,
} from "@material-ui/core";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles((theme) => ({
  arrowIcon: {
    transform: "rotate(0deg)",
    transition: "all 0.3s linear",
  },
  rotatedArrowIcon: {
    transform: "rotate(180deg)",
    transition: "all 0.3s linear",
  },
}));

const CommonHeader = ({
  title,
  buttons: Buttons,
  leftButtons: LeftButtons,
  hPadding,
  vPadding,
  buttonMargin,
  elevation,
  lightMode,
  headerVariant,
  withCollapse,
  onCollapse,
  startCollapsed,
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(
    startCollapsed ? true : false
  );
  const classes = useStyles();
  const handleCollapse = () => {
    setIsCollapsed((oldState) => !oldState);
    onCollapse();
  };
  return (
    <Box
      component={Paper}
      square
      elevation={elevation}
      display="flex"
      alignItems="center"
      px={hPadding}
      py={vPadding}
      {...props}
    >
      {LeftButtons && <Box mx={1}>{LeftButtons && <LeftButtons />}</Box>}
      <Box flex={1} onClick={withCollapse && handleCollapse}>
        <Typography variant={headerVariant} style={{ fontWeight: 500 }}>
          {title}
        </Typography>
      </Box>
      {Buttons && (
        <Box mr={withCollapse ? 0.5 : buttonMargin}>
          {Buttons && <Buttons />}
        </Box>
      )}
      {withCollapse && (
        <IconButton onClick={handleCollapse} size={"small"}>
          <ArrowDownIcon
            className={
              isCollapsed ? classes.arrowIcon : classes.rotatedArrowIcon
            }
          />
        </IconButton>
      )}
    </Box>
  );
};

CommonHeader.defaultProps = {
  hPadding: 2,
  vPadding: 0.5,
  buttonMargin: -1,
  elevation: 0,
  lightMode: false,
  headerVariant: "h6",
};

CommonHeader.propTypes = {
  title: PropTypes.string.isRequired,
  buttons: PropTypes.func,
  leftButtons: PropTypes.func,
  hPadding: PropTypes.number,
  vPadding: PropTypes.number,
  buttonMargin: PropTypes.number,
  elevation: PropTypes.number,
  lightMode: PropTypes.bool,
  headerVariant: PropTypes.string,
};

export default CommonHeader;
