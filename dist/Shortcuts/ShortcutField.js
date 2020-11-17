import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
var useStyles = makeStyles({
  shortcutKeyFieldWrapper: {
    paddingTop: 8,
    display: "inline-flex",
    width: "100%"
  },
  shortcutKeyText: {
    lineHeight: 0
  },
  shortcutTextfield: {
    width: "100%",
    boxSizing: "border-box",
    textAlign: "center"
  }
});

var ShortcutField = function ShortcutField(_ref) {
  var actionId = _ref.actionId,
      actionName = _ref.actionName,
      keyName = _ref.keyName,
      onChangeShortcut = _ref.onChangeShortcut;
  var classes = useStyles();
  return /*#__PURE__*/React.createElement("div", {
    className: classes.shortcutKeyFieldWrapper
  }, /*#__PURE__*/React.createElement(TextField, {
    variant: "outlined",
    label: actionName,
    className: classes.shortcutTextfield,
    value: keyName,
    onKeyPress: function onKeyPress(e) {
      onChangeShortcut(actionId, e.key);
      e.stopPropagation();
    }
  }));
};

export default ShortcutField;