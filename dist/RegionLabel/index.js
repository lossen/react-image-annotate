import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import React, { useState, memo } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
import classnames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TrashIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import UndoIcon from "@material-ui/icons/Undo";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { asMutable } from "seamless-immutable";
import TextField from "@material-ui/core/TextField";
import { ReactSVG } from "react-svg";
import DeleteIcon from '../static/delete-icon.svg';
import LinkIcon from '../static/link-icon.svg';
var useStyles = makeStyles(styles);

function handleCloseRegionEditor(onClose, region, customCloseRegion, onUpdateRegions, newRegions) {
  onClose(region);
  customCloseRegion(region); // onUpdateRegions(newRegions)
}

function handleDeleteRegionEditor(onDelete, region, customDeleteRegion) {
  onDelete(region);
  customDeleteRegion(region.id);
}

function handleOpenRegionEditor(onOpen, region, customOpenRegion) {
  onOpen(region);
  customOpenRegion(region);
}

export var RegionLabel = function RegionLabel(_ref) {
  var region = _ref.region,
      newRegions = _ref.newRegions,
      editing = _ref.editing,
      allowedClasses = _ref.allowedClasses,
      disableClasses = _ref.disableClasses,
      disableTags = _ref.disableTags,
      disableRegionType = _ref.disableRegionType,
      allowedTags = _ref.allowedTags,
      onDelete = _ref.onDelete,
      _onChange = _ref.onChange,
      onUpdateRegions = _ref.onUpdateRegions,
      onClose = _ref.onClose,
      onOpen = _ref.onOpen,
      onRegionClassAdded = _ref.onRegionClassAdded,
      customCloseRegion = _ref.customCloseRegion,
      onLinkResource = _ref.onLinkResource,
      customDeleteRegion = _ref.customDeleteRegion,
      customOpenRegion = _ref.customOpenRegion,
      regionName = _ref.regionName,
      readOnly = _ref.readOnly;
  var classes = useStyles();
  return /*#__PURE__*/React.createElement(Paper, {
    onClick: function onClick() {
      return !editing ? handleOpenRegionEditor(onOpen, region, customOpenRegion) : null;
    },
    className: classnames(classes.regionInfo, {
      highlighted: region.highlighted
    })
  }, !editing ? /*#__PURE__*/React.createElement("div", null, region.cls && /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, /*#__PURE__*/React.createElement("div", {
    className: "circle",
    style: {
      backgroundColor: region.color
    }
  }), region.cls), region.tags && /*#__PURE__*/React.createElement("div", {
    className: "tags"
  }, region.tags.map(function (t) {
    return /*#__PURE__*/React.createElement("div", {
      key: t,
      className: "tag"
    }, t);
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: 250,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row"
    }
  }, !disableRegionType && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      backgroundColor: region.color || "#888",
      color: "#fff",
      padding: 4,
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 4,
      fontWeight: "bold",
      textShadow: "0px 0px 5px rgba(0,0,0,0.4)"
    }
  }, region.type), /*#__PURE__*/React.createElement("div", {
    style: {
      flexGrow: 1
    }
  })), !disableClasses && (allowedClasses || []).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(CreatableSelect, {
    placeholder: "Classification",
    onChange: function onChange(o, actionMeta) {
      if (actionMeta.action == "create-option") {
        onRegionClassAdded(o.value);
      }

      return _onChange(_objectSpread({}, region, {
        cls: o.value
      }));
    },
    value: region.cls ? {
      label: region.cls,
      value: region.cls
    } : null,
    options: asMutable(allowedClasses.map(function (c) {
      return {
        value: c,
        label: c
      };
    }))
  })), !disableTags && (allowedTags || []).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Select, {
    onChange: function onChange(newTags) {
      return _onChange(_objectSpread({}, region, {
        tags: newTags.map(function (t) {
          return t.value;
        })
      }));
    },
    placeholder: "Tags",
    value: (region.tags || []).map(function (c) {
      return {
        label: c,
        value: c
      };
    }),
    isMulti: true,
    options: asMutable(allowedTags.map(function (c) {
      return {
        value: c,
        label: c
      };
    }))
  })), /*#__PURE__*/React.createElement("input", {
    className: classes.input,
    type: "text",
    autoFocus: true,
    value: region.regionName,
    onChange: function onChange(newName) {
      return _onChange(_objectSpread({}, region, {
        regionName: newName.target.value
      }));
    },
    readOnly: readOnly
  }), /*#__PURE__*/React.createElement("div", {
    className: classes.regionPopupFooter
  }, /*#__PURE__*/React.createElement("button", {
    className: classes.btnSmall,
    onClick: function onClick() {
      return handleDeleteRegionEditor(onDelete, region, customDeleteRegion);
    },
    disabled: readOnly
  }, /*#__PURE__*/React.createElement(ReactSVG, {
    src: DeleteIcon
  })), onLinkResource && /*#__PURE__*/React.createElement("button", {
    className: classes.btnSmall,
    onClick: onLinkResource,
    disabled: readOnly
  }, /*#__PURE__*/React.createElement(ReactSVG, {
    src: LinkIcon
  })), onClose && /*#__PURE__*/React.createElement("button", {
    className: classes.buttonSubmit,
    onClick: function onClick() {
      return handleCloseRegionEditor(onClose, region, customCloseRegion, onUpdateRegions, newRegions);
    },
    disabled: readOnly
  }, "Save"))));
};
export default memo(RegionLabel, function (prevProps, nextProps) {
  return prevProps.editing === nextProps.editing && prevProps.region === nextProps.region;
});