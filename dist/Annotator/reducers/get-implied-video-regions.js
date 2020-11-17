import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var emptyArr = [];
export default (function (keyframes, time) {
  if (keyframes[time || 0]) {
    return keyframes[time || 0].regions;
  } // Get surrounding video keyframes


  var keyframeTimes = Object.keys(keyframes).map(function (a) {
    return parseInt(a);
  }).filter(function (a) {
    return !isNaN(a);
  });
  if (keyframeTimes.length === 0) return emptyArr;
  keyframeTimes.sort(function (a, b) {
    return a - b;
  });
  var nextKeyframeTimeIndex = keyframeTimes.findIndex(function (kt) {
    return kt >= time;
  });

  if (nextKeyframeTimeIndex === -1) {
    return keyframes[keyframeTimes[keyframeTimes.length - 1]].regions || emptyArr;
  } else if (nextKeyframeTimeIndex === 0) {
    return emptyArr;
  }

  var t1 = keyframeTimes[nextKeyframeTimeIndex - 1];
  var prevKeyframe = keyframes[t1];
  var t2 = keyframeTimes[nextKeyframeTimeIndex];
  var nextKeyframe = keyframes[t2];
  var prevRegionMap = {},
      nextRegionMap = {};

  var _iterator = _createForOfIteratorHelper(prevKeyframe.regions),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var region = _step.value;
      prevRegionMap[region.id] = region;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = _createForOfIteratorHelper(nextKeyframe.regions),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _region = _step2.value;
      nextRegionMap[_region.id] = _region;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var impliedRegions = []; // Weighted time coefficients for linear transition

  var w1 = (t2 - time) / (t2 - t1);
  var w2 = 1 - w1;

  var _loop = function _loop(regionId) {
    var _ref = [prevRegionMap[regionId], nextRegionMap[regionId]],
        prev = _ref[0],
        next = _ref[1];

    if (!next) {
      impliedRegions.push(_objectSpread({}, prev, {
        highlighted: false,
        editingLabels: false
      }));
      return "continue";
    }

    switch (prev.type) {
      case "point":
        {
          impliedRegions.push(_objectSpread({}, prev, {
            highlighted: false,
            editingLabels: false,
            x: prev.x * w1 + next.x * w2,
            y: prev.y * w1 + next.y * w2
          }));
          break;
        }

      case "box":
        {
          impliedRegions.push(_objectSpread({}, prev, {
            highlighted: false,
            editingLabels: false,
            x: prev.x * w1 + next.x * w2,
            y: prev.y * w1 + next.y * w2,
            w: prev.w * w1 + next.w * w2,
            h: prev.h * w1 + next.h * w2
          }));
          break;
        }

      case "polygon":
        {
          if (next.points.length === prev.points.length) {
            impliedRegions.push(_objectSpread({}, prev, {
              highlighted: false,
              editingLabels: false,
              points: prev.points.map(function (pp, i) {
                return [pp[0] * w1 + next.points[i][0] * w2, pp[1] * w1 + next.points[i][1] * w2];
              })
            }));
          } else {
            impliedRegions.push(prev);
          }

          break;
        }

      default:
        break;
    }
  };

  for (var regionId in prevRegionMap) {
    var _ret = _loop(regionId);

    if (_ret === "continue") continue;
  }

  return impliedRegions;
});