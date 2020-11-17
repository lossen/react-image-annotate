import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React, { useState } from "react";
import { RemoveScroll } from "react-remove-scroll";
import { styled } from "@material-ui/core/styles";
import useEventCallback from "use-event-callback";
var Container = styled("div")({
  "& > div": {
    width: "100%",
    height: "100%"
  }
});
export var PreventScrollToParents = function PreventScrollToParents(_ref) {
  var children = _ref.children,
      otherProps = _objectWithoutProperties(_ref, ["children"]);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      mouseOver = _useState2[0],
      changeMouseOver = _useState2[1];

  var onMouseMove = useEventCallback(function (e) {
    if (!mouseOver) changeMouseOver(true);

    if (otherProps.onMouseMove) {
      otherProps.onMouseMove(e);
    }
  });
  var onMouseLeave = useEventCallback(function (e) {
    setTimeout(function () {
      if (mouseOver) {
        changeMouseOver(false);
      }
    }, 100);
  });
  return /*#__PURE__*/React.createElement(Container, Object.assign({}, otherProps, {
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave
  }), /*#__PURE__*/React.createElement(RemoveScroll, {
    enabled: mouseOver,
    removeScrollBar: false
  }, children));
};
export default PreventScrollToParents;