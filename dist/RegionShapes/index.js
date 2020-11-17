import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { memo } from "react";
import colorAlpha from "color-alpha";

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

var RegionComponents = {
  point: memo(function (_ref) {
    var region = _ref.region,
        iw = _ref.iw,
        ih = _ref.ih;
    return /*#__PURE__*/React.createElement("g", {
      transform: "translate(".concat(region.x * iw, " ").concat(region.y * ih, ")")
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 8L8 0L0 -8L-8 0Z",
      strokeWidth: 2,
      stroke: region.color,
      fill: "transparent"
    }));
  }),
  box: memo(function (_ref2) {
    var region = _ref2.region,
        iw = _ref2.iw,
        ih = _ref2.ih;
    return /*#__PURE__*/React.createElement("g", {
      transform: "translate(".concat(region.x * iw, " ").concat(region.y * ih, ")")
    }, /*#__PURE__*/React.createElement("rect", {
      strokeWidth: 2,
      x: 0,
      y: 0,
      width: Math.max(region.w * iw, 0),
      height: Math.max(region.h * ih, 0),
      stroke: colorAlpha(region.color, 0.75),
      fill: colorAlpha(region.color, 0.25)
    }));
  }),
  polygon: memo(function (_ref3) {
    var region = _ref3.region,
        iw = _ref3.iw,
        ih = _ref3.ih,
        fullSegmentationMode = _ref3.fullSegmentationMode;
    var Component = region.open ? "polyline" : "polygon";
    var alphaBase = fullSegmentationMode ? 0.5 : 1;
    return /*#__PURE__*/React.createElement(Component, {
      points: region.points.map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            x = _ref5[0],
            y = _ref5[1];

        return [x * iw, y * ih];
      }).map(function (a) {
        return a.join(" ");
      }).join(" "),
      strokeWidth: 2,
      stroke: colorAlpha(region.color, 0.75),
      fill: colorAlpha(region.color, 0.25)
    });
  }),
  keypoints: function keypoints(_ref6) {
    var region = _ref6.region,
        iw = _ref6.iw,
        ih = _ref6.ih,
        keypointDefinitions = _ref6.keypointDefinitions;
    var points = region.points,
        keypointsDefinitionId = region.keypointsDefinitionId;

    if (!keypointDefinitions[keypointsDefinitionId]) {
      throw new Error("No definition for keypoint configuration \"".concat(keypointsDefinitionId, "\""));
    }

    var _keypointDefinitions$ = keypointDefinitions[keypointsDefinitionId],
        landmarks = _keypointDefinitions$.landmarks,
        connections = _keypointDefinitions$.connections;
    return /*#__PURE__*/React.createElement("g", null, Object.entries(points).map(function (_ref7, i) {
      var _ref8 = _slicedToArray(_ref7, 2),
          keypointId = _ref8[0],
          _ref8$ = _ref8[1],
          x = _ref8$.x,
          y = _ref8$.y;

      return /*#__PURE__*/React.createElement("g", {
        key: i,
        transform: "translate(".concat(x * iw, " ").concat(y * ih, ")")
      }, /*#__PURE__*/React.createElement("path", {
        d: "M0 8L8 0L0 -8L-8 0Z",
        strokeWidth: 2,
        stroke: landmarks[keypointId].color,
        fill: "transparent"
      }));
    }), connections.map(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          kp1Id = _ref10[0],
          kp2Id = _ref10[1];

      var kp1 = points[kp1Id];
      var kp2 = points[kp2Id];
      var midPoint = {
        x: (kp1.x + kp2.x) / 2,
        y: (kp1.y + kp2.y) / 2
      };
      return /*#__PURE__*/React.createElement("g", {
        key: "".concat(kp1, ".").concat(kp2)
      }, /*#__PURE__*/React.createElement("line", {
        x1: kp1.x * iw,
        y1: kp1.y * ih,
        x2: midPoint.x * iw,
        y2: midPoint.y * ih,
        strokeWidth: 2,
        stroke: landmarks[kp1Id].color
      }), /*#__PURE__*/React.createElement("line", {
        x1: kp2.x * iw,
        y1: kp2.y * ih,
        x2: midPoint.x * iw,
        y2: midPoint.y * ih,
        strokeWidth: 2,
        stroke: landmarks[kp2Id].color
      }));
    }));
  },
  "expanding-line": memo(function (_ref11) {
    var region = _ref11.region,
        iw = _ref11.iw,
        ih = _ref11.ih;
    var _region$expandingWidt = region.expandingWidth,
        expandingWidth = _region$expandingWidt === void 0 ? 0.005 : _region$expandingWidt,
        points = region.points;
    expandingWidth = points.slice(-1)[0].width || expandingWidth;
    var pointPairs = points.map(function (_ref12, i) {
      var x = _ref12.x,
          y = _ref12.y,
          angle = _ref12.angle,
          width = _ref12.width;

      if (!angle) {
        var n = points[clamp(i + 1, 0, points.length - 1)];
        var p = points[clamp(i - 1, 0, points.length - 1)];
        angle = Math.atan2(p.x - n.x, p.y - n.y) + Math.PI / 2;
      }

      var dx = Math.sin(angle) * (width || expandingWidth) / 2;
      var dy = Math.cos(angle) * (width || expandingWidth) / 2;
      return [{
        x: x + dx,
        y: y + dy
      }, {
        x: x - dx,
        y: y - dy
      }];
    });
    var firstSection = pointPairs.map(function (_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
          p1 = _ref14[0],
          p2 = _ref14[1];

      return p1;
    });
    var secondSection = pointPairs.map(function (_ref15) {
      var _ref16 = _slicedToArray(_ref15, 2),
          p1 = _ref16[0],
          p2 = _ref16[1];

      return p2;
    }).asMutable();
    secondSection.reverse();
    var lastPoint = points.slice(-1)[0];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polygon", {
      points: firstSection.concat(region.candidatePoint ? [region.candidatePoint] : []).concat(secondSection).map(function (p) {
        return "".concat(p.x * iw, " ").concat(p.y * ih);
      }).join(" "),
      strokeWidth: 2,
      stroke: colorAlpha(region.color, 0.75),
      fill: colorAlpha(region.color, 0.25)
    }), points.map(function (_ref17, i) {
      var x = _ref17.x,
          y = _ref17.y,
          angle = _ref17.angle;
      return /*#__PURE__*/React.createElement("g", {
        key: i,
        transform: "translate(".concat(x * iw, " ").concat(y * ih, ") rotate(").concat(-(angle || 0) * 180 / Math.PI, ")")
      }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: -5,
        y: -5,
        width: 10,
        height: 10,
        strokeWidth: 2,
        stroke: colorAlpha(region.color, 0.75),
        fill: colorAlpha(region.color, 0.25)
      })));
    }), /*#__PURE__*/React.createElement("rect", {
      x: lastPoint.x * iw - 8,
      y: lastPoint.y * ih - 8,
      width: 16,
      height: 16,
      strokeWidth: 4,
      stroke: colorAlpha(region.color, 0.5),
      fill: "transparent"
    }));
  }),
  pixel: function pixel() {
    return null;
  }
};
export var WrappedRegionList = memo(function (_ref18) {
  var regions = _ref18.regions,
      keypointDefinitions = _ref18.keypointDefinitions,
      iw = _ref18.iw,
      ih = _ref18.ih,
      fullSegmentationMode = _ref18.fullSegmentationMode;
  return regions.filter(function (r) {
    return r.visible !== false;
  }).map(function (r) {
    var Component = RegionComponents[r.type];
    return /*#__PURE__*/React.createElement(Component, {
      key: r.regionId,
      region: r,
      iw: iw,
      ih: ih,
      keypointDefinitions: keypointDefinitions,
      fullSegmentationMode: fullSegmentationMode
    });
  });
}, function (n, p) {
  return n.regions === p.regions && n.iw === p.iw && n.ih === p.ih;
});
export var RegionShapes = function RegionShapes(_ref19) {
  var mat = _ref19.mat,
      imagePosition = _ref19.imagePosition,
      _ref19$regions = _ref19.regions,
      regions = _ref19$regions === void 0 ? [] : _ref19$regions,
      keypointDefinitions = _ref19.keypointDefinitions,
      fullSegmentationMode = _ref19.fullSegmentationMode;
  var iw = imagePosition.bottomRight.x - imagePosition.topLeft.x;
  var ih = imagePosition.bottomRight.y - imagePosition.topLeft.y;
  if (isNaN(iw) || isNaN(ih)) return null;
  return /*#__PURE__*/React.createElement("svg", {
    width: iw,
    height: ih,
    style: {
      position: "absolute",
      zIndex: 2,
      left: imagePosition.topLeft.x,
      top: imagePosition.topLeft.y,
      pointerEvents: "none",
      width: iw,
      height: ih
    }
  }, /*#__PURE__*/React.createElement(WrappedRegionList, {
    key: "wrapped-region-list",
    regions: regions,
    iw: iw,
    ih: ih,
    keypointDefinitions: keypointDefinitions,
    fullSegmentationMode: fullSegmentationMode
  }));
};
export default RegionShapes;