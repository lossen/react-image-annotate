import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAlt, faMousePointer, faExpandArrowsAlt, faGripLines, faTag, faPaintBrush, faCrosshairs, faDrawPolygon, faVectorSquare, faHandPaper, faSearch, faMask, faEdit } from "@fortawesome/free-solid-svg-icons";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
var faStyle = {
  marginTop: 4,
  width: 16,
  height: 16,
  marginBottom: 4
};
export var iconDictionary = {
  select: function select() {
    return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      style: faStyle,
      size: "xs",
      fixedWidth: true,
      icon: faMousePointer
    });
  },
  pan: function pan() {
    return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      style: faStyle,
      size: "xs",
      fixedWidth: true,
      icon: faHandPaper
    });
  },
  zoom: function zoom() {
    return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      style: faStyle,
      size: "xs",
      fixedWidth: true,
      icon: faSearch
    });
  },
  "show-tags": function showTags() {
    return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      style: faStyle,
      size: "xs",
      fixedWidth: true,
      icon: faTag
    });
  },
  "create-point": function createPoint() {
    return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      style: faStyle,
      size: "xs",
      fixedWidth: true,
      icon: faCrosshairs
    });
  },
  "create-box": function createBox() {
    return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      style: faStyle,
      size: "xs",
      fixedWidth: true,
      icon: faVectorSquare
    });
  },
  "create-polygon": function createPolygon() {
    return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      style: faStyle,
      size: "xs",
      fixedWidth: true,
      icon: faDrawPolygon
    });
  },
  "create-expanding-line": function createExpandingLine() {
    return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      style: faStyle,
      size: "xs",
      fixedWidth: true,
      icon: faGripLines
    });
  },
  "show-mask": function showMask() {
    return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      style: faStyle,
      size: "xs",
      fixedWidth: true,
      icon: faMask
    });
  },
  "modify-allowed-area": function modifyAllowedArea() {
    return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      style: faStyle,
      size: "xs",
      fixedWidth: true,
      icon: faEdit
    });
  },
  "create-keypoints": AccessibilityNewIcon,
  window: FullscreenIcon
};
export default iconDictionary;