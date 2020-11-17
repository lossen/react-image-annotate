import React from "react";
import SidebarBoxContainer from "../SidebarBoxContainer";
export var DebugSidebarBox = function DebugSidebarBox(_ref) {
  var state = _ref.state,
      lastAction = _ref.lastAction;
  var image = (state.images || [])[state.selectedImage];
  var region = image ? (image.regions || []).filter(function (r) {
    return r.highlighted;
  }) : null;
  return /*#__PURE__*/React.createElement(SidebarBoxContainer, {
    title: "Debug",
    icon: /*#__PURE__*/React.createElement("span", null),
    expandedByDefault: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 4
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "region"), ":"), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(region, null, "  ")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "lastAction"), ":"), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(lastAction, null, "  ")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "mode"), ":"), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(state.mode, null, "  ")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "frame:")), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(state.selectedImageFrameTime, null, "  "))));
};
export default DebugSidebarBox;