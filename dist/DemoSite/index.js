import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Editor, { examples } from "./Editor";
import Annotator from "../Annotator";
import ErrorBoundaryDialog from "./ErrorBoundaryDialog.js";
export default (function () {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      annotatorOpen = _useState2[0],
      changeAnnotatorOpen = _useState2[1];

  var _useState3 = useState(examples["Custom"]()),
      _useState4 = _slicedToArray(_useState3, 2),
      annotatorProps = _useState4[0],
      changeAnnotatorProps = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      lastOutput = _useState6[0],
      changeLastOutput = _useState6[1];

  return /*#__PURE__*/React.createElement("div", null, annotatorOpen ? /*#__PURE__*/React.createElement(ErrorBoundaryDialog, {
    onClose: function onClose() {
      changeAnnotatorOpen(false);
    }
  }, /*#__PURE__*/React.createElement(Annotator, Object.assign({}, annotatorProps, {
    onExit: function onExit(output) {
      delete output["lastAction"];
      changeLastOutput(output);
      changeAnnotatorOpen(false);
    },
    customCloseRegion: function customCloseRegion(region) {
      return 25;
    },
    customDeleteRegion: function customDeleteRegion(region) {
      console.log(region, 'test customDeleteRegion');
    },
    disableClasses: true,
    disableTags: true,
    disableRegionType: true,
    disableTopNav: true,
    onLinkResource: function onLinkResource(region_id) {
      return console.log(region_id, 'onLinkResource');
    },
    customOpenRegion: function customOpenRegion(region_id) {
      return console.log(region_id, 'customOpenRegion');
    },
    images: [{
      src: "https://images.unsplash.com/photo-1496905583330-eb54c7e5915a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      name: "Image 1",
      regions: [{
        type: "box",
        x: 0.25,
        y: 0.25,
        w: 0.5,
        h: 0.5,
        color: "#00f",
        id: 222
      }]
    }],
    newRegions: [{
      type: "box",
      x: 0.25,
      y: 0.25,
      w: 0.5,
      h: 0.5,
      color: "#00f",
      id: 222
    }, {
      type: "box",
      x: 0.8,
      y: 0.25,
      w: 0.1,
      h: 0.1,
      highlighted: true,
      color: "#00f",
      id: 333
    }],
    readOnly: true
  }))) : /*#__PURE__*/React.createElement(Editor, {
    lastOutput: lastOutput,
    onOpenAnnotator: function onOpenAnnotator(props) {
      changeAnnotatorProps(props);
      changeAnnotatorOpen(true);
    }
  }));
});