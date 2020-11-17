import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Select from "react-select";
import Code from "react-syntax-highlighter";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import MonacoEditor from "react-monaco-editor";
var useStyles = makeStyles({
  editBar: {
    padding: 10,
    borderBottom: "1px solid #ccc",
    backgroundColor: "#f8f8f8",
    display: "flex",
    alignItems: "center",
    "& .button": {
      margin: 5
    }
  },
  select: {
    width: 240,
    fontSize: 14
  },
  contentArea: {
    padding: 10
  },
  specificationArea: {
    padding: 10
  }
});

var loadSavedInput = function loadSavedInput() {
  try {
    return JSON.parse(window.localStorage.getItem("customInput") || "{}");
  } catch (e) {
    return {};
  }
};

export var examples = {
  "Simple Bounding Box": function SimpleBoundingBox() {
    return {
      taskDescription: "Annotate each image according to this _markdown_ specification.",
      // regionTagList: [],
      // regionClsList: ["hotdog"],
      regionTagList: ["has-bun"],
      regionClsList: ["hotdog", "not-hotdog"],
      enabledTools: ["select", "create-box"],
      // showTags: true,
      images: [{
        src: "https://images.unsplash.com/photo-1496905583330-eb54c7e5915a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        name: "hot-dogs-1"
      }, {
        src: "https://www.bianchi.com/wp-content/uploads/2019/07/YPB17I555K.jpg",
        name: "bianchi-oltre-xr4"
      }]
    };
  },
  "Simple Segmentation": function SimpleSegmentation() {
    return {
      taskDescription: "Annotate each image according to this _markdown_ specification.",
      regionClsList: ["car", "truck"],
      enabledTools: ["select", "create-polygon"],
      images: [{
        src: "https://images.unsplash.com/photo-1561518776-e76a5e48f731?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        name: "car-image-1"
      }]
    };
  },
  Custom: function Custom() {
    return loadSavedInput();
  }
};

var Editor = function Editor(_ref) {
  var onOpenAnnotator = _ref.onOpenAnnotator,
      lastOutput = _ref.lastOutput;
  var c = useStyles();

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      currentError = _useState2[0],
      changeCurrentError = _useState2[1];

  var _useState3 = useState(window.localStorage.getItem("customInput") ? "Custom" : "Simple Bounding Box"),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedExample = _useState4[0],
      changeSelectedExample = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      outputDialogOpen = _useState6[0],
      changeOutputOpen = _useState6[1];

  var _useState7 = useState(JSON.stringify(examples[selectedExample](), null, "  ")),
      _useState8 = _slicedToArray(_useState7, 2),
      currentJSONValue = _useState8[0],
      changeCurrentJSONValue = _useState8[1];

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: c.editBar
  }, /*#__PURE__*/React.createElement("h3", null, "React Image Annotate"), /*#__PURE__*/React.createElement("div", {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Select, {
    className: c.select,
    value: {
      label: selectedExample,
      value: selectedExample
    },
    options: Object.keys(examples).map(function (s) {
      return {
        label: s,
        value: s
      };
    }),
    onChange: function onChange(selectedOption) {
      changeSelectedExample(selectedOption.value);
      changeCurrentJSONValue(JSON.stringify(selectedOption.value === "Custom" ? loadSavedInput() : examples[selectedOption.value](), null, "  "));
    }
  })), /*#__PURE__*/React.createElement(Button, {
    className: "button",
    disabled: !lastOutput,
    onClick: function onClick() {
      return changeOutputOpen(true);
    }
  }, "View Output"), /*#__PURE__*/React.createElement(Button, {
    className: "button",
    variant: "outlined",
    disabled: Boolean(currentError),
    onClick: function onClick() {
      onOpenAnnotator(selectedExample === "Custom" ? loadSavedInput() : examples[selectedExample]);
    }
  }, "Open Annotator"))), /*#__PURE__*/React.createElement("div", {
    className: c.contentArea,
    style: currentError ? {
      border: "2px solid #f00"
    } : {
      border: "2px solid #fff"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MonacoEditor, {
    value: currentJSONValue,
    language: "javascript",
    onChange: function onChange(code) {
      try {
        window.localStorage.setItem("customInput", JSON.stringify(JSON.parse(code)));
        changeCurrentError(null);
      } catch (e) {
        changeCurrentError(e.toString());
      }

      changeCurrentJSONValue(code);
    },
    width: "100%",
    height: "550px"
  }))), /*#__PURE__*/React.createElement("div", {
    className: c.specificationArea
  }, /*#__PURE__*/React.createElement("h2", null, "React Image Annotate Format"), /*#__PURE__*/React.createElement(Code, {
    language: "javascript"
  }, "\n{\n  taskDescription?: string, // markdown\n  regionTagList?: Array<string>,\n  regionClsList?: Array<string>,\n  imageTagList?: Array<string>,\n  imageClsList?: Array<string>,\n  // all tools are enabled by default\n  enabledTools?: Array< \"select\" | \"create-point\" | \"create-box\" | \"create-polygon\">,\n  selectedImage?: string, // initial selected image\n  images: Array<{\n    src: string,\n    thumbnailSrc?: string, // use this if you are using high-res images\n    name: string,\n    regions?: Array<{\n      id: string | number,\n      cls?: string,\n      color?: string,\n      tags?: Array<string>,\n\n      // Point\n      type: \"point\",\n      x: number, // [0-1] % of image width\n      y: number, // [0-1] % of image height\n\n      // Bounding Box\n      type: \"box\",\n      x: number, // [0-1] % of image width\n      y: number, // [0-1] % of image height\n      w: number, // [0-1] % of image width\n      h: number, // [0-1] % of image height\n\n      // Polygon\n      type: \"polygon\",\n      open?: boolean, // should last and first points be connected, default: true\n      points: Array<[number, number]> // [0-1] % of image width/height\n    }>\n  }>,\n}\n")), /*#__PURE__*/React.createElement(Dialog, {
    fullScreen: true,
    open: outputDialogOpen
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "React Image Annotate Output"), /*#__PURE__*/React.createElement(DialogContent, {
    style: {
      minWidth: 400
    }
  }, /*#__PURE__*/React.createElement(MonacoEditor, {
    value: JSON.stringify(lastOutput, null, "  "),
    language: "javascript",
    width: "100%",
    height: "550px"
  })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick() {
      return changeOutputOpen(false);
    }
  }, "Close"))));
};

export default Editor;