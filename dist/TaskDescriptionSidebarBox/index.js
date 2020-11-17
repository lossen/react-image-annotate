import React, { memo } from "react";
import SidebarBoxContainer from "../SidebarBoxContainer";
import DescriptionIcon from "@material-ui/icons/Description";
import { styled } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import Markdown from "react-markdown";
var MarkdownContainer = styled("div")({
  paddingLeft: 16,
  paddingRight: 16,
  fontSize: 12,
  "& h1": {
    fontSize: 18
  },
  "& h2": {
    fontSize: 14
  },
  "& h3": {
    fontSize: 12
  },
  "& h4": {
    fontSize: 12
  },
  "& h5": {
    fontSize: 12
  },
  "& h6": {
    fontSize: 12
  },
  "& p": {
    fontSize: 12
  },
  "& a": {},
  "& img": {
    width: "100%"
  }
});
export var TaskDescriptionSidebarBox = function TaskDescriptionSidebarBox(_ref) {
  var description = _ref.description;
  return /*#__PURE__*/React.createElement(SidebarBoxContainer, {
    title: "Task Description",
    icon: /*#__PURE__*/React.createElement(DescriptionIcon, {
      style: {
        color: grey[700]
      }
    }),
    expandedByDefault: description && description !== "" ? false : true
  }, /*#__PURE__*/React.createElement(MarkdownContainer, null, /*#__PURE__*/React.createElement(Markdown, {
    source: description
  })));
};
export default memo(TaskDescriptionSidebarBox);