import React from "react";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import SidebarBoxContainer from "../SidebarBoxContainer";
import * as colors from "@material-ui/core/colors";
import getTimeString from "../KeyframeTimeline/get-time-string.js";
import TrashIcon from "@material-ui/icons/Delete";
import { styled } from "@material-ui/core/styles";
var KeyframeRow = styled("div")({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: 8,
  fontSize: 14,
  color: colors.grey[700],
  "&.current": {
    backgroundColor: colors.blue[100]
  },
  "&:hover": {
    backgroundColor: colors.grey[100]
  },
  "& .time": {
    flexGrow: 1,
    fontWeight: "bold",
    "& .regionCount": {
      marginLeft: 8,
      fontWeight: "normal",
      color: colors.grey[500]
    }
  },
  "& .trash": {
    "& .icon": {
      fontSize: 18,
      color: colors.grey[600],
      transition: "transform 80ms",
      "&:hover": {
        color: colors.grey[800],
        transform: "scale(1.25,1.25)"
      }
    }
  }
});

var KeyframesSelectorSidebarBox = function KeyframesSelectorSidebarBox(_ref) {
  var currentVideoTime = _ref.currentVideoTime,
      keyframes = _ref.keyframes,
      onChangeVideoTime = _ref.onChangeVideoTime,
      onDeleteKeyframe = _ref.onDeleteKeyframe;
  var keyframeTimes = Object.keys(keyframes).map(function (t) {
    return parseInt(t);
  });
  return /*#__PURE__*/React.createElement(SidebarBoxContainer, {
    title: "Keyframes",
    subTitle: "",
    icon: /*#__PURE__*/React.createElement(AddLocationIcon, {
      style: {
        color: colors.grey[700]
      }
    }),
    expandedByDefault: true
  }, keyframeTimes.map(function (t) {
    var _keyframes$t;

    return /*#__PURE__*/React.createElement(KeyframeRow, {
      fullWidth: true,
      key: t,
      className: currentVideoTime === t ? "current" : "",
      onClick: function onClick() {
        return onChangeVideoTime(t);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "time"
    }, getTimeString(t, 2), /*#__PURE__*/React.createElement("span", {
      className: "regionCount"
    }, "(", (((_keyframes$t = keyframes[t]) === null || _keyframes$t === void 0 ? void 0 : _keyframes$t.regions) || []).length, ")")), /*#__PURE__*/React.createElement("div", {
      className: "trash"
    }, /*#__PURE__*/React.createElement(TrashIcon, {
      onClick: function onClick(e) {
        onDeleteKeyframe(t);
        e.stopPropagation();
      },
      className: "icon"
    })));
  }));
};

export default KeyframesSelectorSidebarBox;