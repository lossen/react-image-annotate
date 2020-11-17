import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { Fragment, useState, memo } from "react";
import SidebarBoxContainer from "../SidebarBoxContainer";
import { makeStyles, styled } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import RegionIcon from "@material-ui/icons/PictureInPicture";
import Grid from "@material-ui/core/Grid";
import ReorderIcon from "@material-ui/icons/SwapVert";
import PieChartIcon from "@material-ui/icons/PieChart";
import TrashIcon from "@material-ui/icons/Delete";
import LockIcon from "@material-ui/icons/Lock";
import UnlockIcon from "@material-ui/icons/LockOpen";
import VisibleIcon from "@material-ui/icons/Visibility";
import VisibleOffIcon from "@material-ui/icons/VisibilityOff";
import styles from "./styles";
import classnames from "classnames";
import isEqual from "lodash/isEqual";
var useStyles = makeStyles(styles);
var HeaderSep = styled("div")({
  borderTop: "1px solid ".concat(grey[200]),
  marginTop: 2,
  marginBottom: 2
});

var Chip = function Chip(_ref) {
  var color = _ref.color,
      text = _ref.text;
  var classes = useStyles();
  return /*#__PURE__*/React.createElement("span", {
    className: classes.chip
  }, /*#__PURE__*/React.createElement("div", {
    className: "color",
    style: {
      backgroundColor: color
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "text"
  }, text));
};

var RowLayout = function RowLayout(_ref2) {
  var header = _ref2.header,
      highlighted = _ref2.highlighted,
      order = _ref2.order,
      classification = _ref2.classification,
      area = _ref2.area,
      tags = _ref2.tags,
      trash = _ref2.trash,
      lock = _ref2.lock,
      visible = _ref2.visible,
      onClick = _ref2.onClick;
  var classes = useStyles();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      mouseOver = _useState2[0],
      changeMouseOver = _useState2[1];

  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: function onMouseEnter() {
      return changeMouseOver(true);
    },
    onMouseLeave: function onMouseLeave() {
      return changeMouseOver(false);
    },
    className: classnames(classes.row, {
      header: header,
      highlighted: highlighted
    })
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 2
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      paddingRight: 10
    }
  }, order)), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 5
  }, classification), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 2
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      paddingRight: 6
    }
  }, area)), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 1
  }, trash), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 1
  }, lock), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 1
  }, visible)));
};

var RowHeader = function RowHeader() {
  return /*#__PURE__*/React.createElement(RowLayout, {
    header: true,
    highlighted: false,
    order: /*#__PURE__*/React.createElement(ReorderIcon, {
      className: "icon"
    }),
    classification: /*#__PURE__*/React.createElement("div", {
      style: {
        paddingLeft: 10
      }
    }, "Class"),
    area: /*#__PURE__*/React.createElement(PieChartIcon, {
      className: "icon"
    }),
    trash: /*#__PURE__*/React.createElement(TrashIcon, {
      className: "icon"
    }),
    lock: /*#__PURE__*/React.createElement(LockIcon, {
      className: "icon"
    }),
    visible: /*#__PURE__*/React.createElement(VisibleIcon, {
      className: "icon"
    })
  });
};

var MemoRowHeader = memo(RowHeader);

var Row = function Row(_ref3) {
  var r = _ref3.region,
      highlighted = _ref3.highlighted,
      onSelectRegion = _ref3.onSelectRegion,
      onDeleteRegion = _ref3.onDeleteRegion,
      onChangeRegion = _ref3.onChangeRegion,
      visible = _ref3.visible,
      locked = _ref3.locked,
      color = _ref3.color,
      cls = _ref3.cls,
      index = _ref3.index;
  return /*#__PURE__*/React.createElement(RowLayout, {
    header: false,
    highlighted: highlighted,
    onClick: function onClick() {
      return onSelectRegion(r);
    },
    order: "#".concat(index + 1),
    classification: /*#__PURE__*/React.createElement(Chip, {
      text: cls || "",
      color: color || "#ddd"
    }),
    area: "",
    trash: /*#__PURE__*/React.createElement(TrashIcon, {
      onClick: function onClick() {
        return onDeleteRegion(r);
      },
      className: "icon2"
    }),
    lock: r.locked ? /*#__PURE__*/React.createElement(LockIcon, {
      onClick: function onClick() {
        return onChangeRegion(_objectSpread({}, r, {
          locked: false
        }));
      },
      className: "icon2"
    }) : /*#__PURE__*/React.createElement(UnlockIcon, {
      onClick: function onClick() {
        return onChangeRegion(_objectSpread({}, r, {
          locked: true
        }));
      },
      className: "icon2"
    }),
    visible: r.visible || r.visible === undefined ? /*#__PURE__*/React.createElement(VisibleIcon, {
      onClick: function onClick() {
        return onChangeRegion(_objectSpread({}, r, {
          visible: false
        }));
      },
      className: "icon2"
    }) : /*#__PURE__*/React.createElement(VisibleOffIcon, {
      onClick: function onClick() {
        return onChangeRegion(_objectSpread({}, r, {
          visible: true
        }));
      },
      className: "icon2"
    })
  });
};

var MemoRow = memo(Row, function (prevProps, nextProps) {
  return prevProps.highlighted === nextProps.highlighted && prevProps.visible === nextProps.visible && prevProps.locked === nextProps.locked && prevProps.id === nextProps.id && prevProps.index === nextProps.index && prevProps.cls === nextProps.cls && prevProps.color === nextProps.color;
});
var emptyArr = [];
export var RegionSelectorSidebarBox = function RegionSelectorSidebarBox(_ref4) {
  var _ref4$regions = _ref4.regions,
      regions = _ref4$regions === void 0 ? emptyArr : _ref4$regions,
      onDeleteRegion = _ref4.onDeleteRegion,
      onChangeRegion = _ref4.onChangeRegion,
      onSelectRegion = _ref4.onSelectRegion;
  var classes = useStyles();
  return /*#__PURE__*/React.createElement(SidebarBoxContainer, {
    title: "Regions",
    subTitle: "",
    icon: /*#__PURE__*/React.createElement(RegionIcon, {
      style: {
        color: grey[700]
      }
    }),
    expandedByDefault: true
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.container
  }, /*#__PURE__*/React.createElement(MemoRowHeader, null), /*#__PURE__*/React.createElement(HeaderSep, null), regions.map(function (r, i) {
    return /*#__PURE__*/React.createElement(MemoRow, Object.assign({
      key: r.id
    }, r, {
      region: r,
      index: i,
      onSelectRegion: onSelectRegion,
      onDeleteRegion: onDeleteRegion,
      onChangeRegion: onChangeRegion
    }));
  })));
};

var mapUsedRegionProperties = function mapUsedRegionProperties(r) {
  return [r.id, r.color, r.locked, r.visible, r.highlighted];
};

export default memo(RegionSelectorSidebarBox, function (prevProps, nextProps) {
  return isEqual((prevProps.regions || emptyArr).map(mapUsedRegionProperties), (nextProps.regions || emptyArr).map(mapUsedRegionProperties));
});