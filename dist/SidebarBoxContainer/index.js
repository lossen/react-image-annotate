import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, memo } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ExpandIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import { grey } from "@material-ui/core/colors";
import classnames from "classnames";
import useEventCallback from "use-event-callback";
import SidebarBox from "react-material-workspace-layout/SidebarBox";
var useStyles = makeStyles({
  container: {
    margin: 8
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    flexGrow: 1,
    paddingLeft: 8,
    color: grey[800],
    "& span": {
      color: grey[600],
      fontSize: 12
    }
  },
  expandButton: {
    padding: 0,
    width: 30,
    height: 30,
    "& .icon": {
      marginTop: -6,
      width: 20,
      height: 20,
      transition: "500ms transform",
      "&.expanded": {
        transform: "rotate(180deg)"
      }
    }
  },
  expandedContent: {
    maxHeight: 300,
    overflowY: "auto",
    "&.noScroll": {
      overflowY: "visible",
      overflow: "visible"
    }
  }
});
export var SidebarBoxContainer = function SidebarBoxContainer(_ref) {
  var icon = _ref.icon,
      title = _ref.title,
      subTitle = _ref.subTitle,
      children = _ref.children,
      _ref$noScroll = _ref.noScroll,
      noScroll = _ref$noScroll === void 0 ? false : _ref$noScroll,
      _ref$expandedByDefaul = _ref.expandedByDefault,
      expandedByDefault = _ref$expandedByDefaul === void 0 ? false : _ref$expandedByDefaul;
  var classes = useStyles();
  var content = /*#__PURE__*/React.createElement("div", {
    className: classnames(classes.expandedContent, noScroll && "noScroll")
  }, children);

  var _useState = useState(expandedByDefault),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      changeExpanded = _useState2[1];

  var toggleExpanded = useEventCallback(function () {
    return changeExpanded(!expanded);
  });
  return /*#__PURE__*/React.createElement(SidebarBox, {
    icon: icon,
    title: title
  }, children);
  return /*#__PURE__*/React.createElement(Paper, {
    className: classes.container
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.header
  }, icon, /*#__PURE__*/React.createElement("div", {
    className: classes.title
  }, title, " ", /*#__PURE__*/React.createElement("span", null, subTitle)), /*#__PURE__*/React.createElement(IconButton, {
    onClick: toggleExpanded,
    className: classes.expandButton
  }, /*#__PURE__*/React.createElement(ExpandIcon, {
    className: classnames("icon", expanded && "expanded")
  }))), noScroll ? expanded ? content : null : /*#__PURE__*/React.createElement(Collapse, {
    in: expanded
  }, content));
};
export default memo(SidebarBoxContainer, function (prev, next) {
  return prev.title === next.title && prev.children === next.children;
});