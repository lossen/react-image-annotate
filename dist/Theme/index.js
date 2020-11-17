import React from "react";
import { ThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles";
var useStyles = makeStyles({
  container: {
    fontFamily: '"Inter", sans-serif'
  }
});
var theme = createMuiTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif'
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none"
      }
    }
  }
});
export var Theme = function Theme(_ref) {
  var children = _ref.children;
  var classes = useStyles();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.container
  }, children));
};
export default Theme;