import React from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import TaskDescription from "../TaskDescriptionSidebarBox";
import ImageSelector from "../ImageSelectorSidebarBox";
import RegionSelector from "../RegionSelectorSidebarBox";
import History from "../HistorySidebarBox";
import DebugBox from "../DebugSidebarBox";
import TagsSidebarBox from "../TagsSidebarBox";
import KeyframesSelector from "../KeyframesSelectorSidebarBox";
var Container = styled("div")({});
var emptyArr = [];
export var Sidebar = function Sidebar(_ref) {
  var debug = _ref.debug,
      taskDescription = _ref.taskDescription,
      keyframes = _ref.keyframes,
      images = _ref.images,
      regions = _ref.regions,
      history = _ref.history,
      labelImages = _ref.labelImages,
      currentImage = _ref.currentImage,
      currentVideoTime = _ref.currentVideoTime,
      imageClsList = _ref.imageClsList,
      imageTagList = _ref.imageTagList,
      onChangeImage = _ref.onChangeImage,
      onSelectRegion = _ref.onSelectRegion,
      onSelectImage = _ref.onSelectImage,
      onChangeRegion = _ref.onChangeRegion,
      onDeleteRegion = _ref.onDeleteRegion,
      _onRestoreHistory = _ref.onRestoreHistory,
      onChangeVideoTime = _ref.onChangeVideoTime,
      onDeleteKeyframe = _ref.onDeleteKeyframe,
      onShortcutActionDispatched = _ref.onShortcutActionDispatched;
  if (!regions) regions = emptyArr;
  return /*#__PURE__*/React.createElement(Container, null, debug && /*#__PURE__*/React.createElement(DebugBox, {
    state: debug,
    lastAction: debug.lastAction
  }), taskDescription && (taskDescription || "").length > 1 && /*#__PURE__*/React.createElement(TaskDescription, {
    description: taskDescription
  }), labelImages && /*#__PURE__*/React.createElement(TagsSidebarBox, {
    currentImage: currentImage,
    imageClsList: imageClsList,
    imageTagList: imageTagList,
    onChangeImage: onChangeImage,
    expandedByDefault: true
  }), /*#__PURE__*/React.createElement(RegionSelector, {
    regions: regions,
    onSelectRegion: onSelectRegion,
    onChangeRegion: onChangeRegion,
    onDeleteRegion: onDeleteRegion
  }), keyframes && /*#__PURE__*/React.createElement(KeyframesSelector, {
    currentVideoTime: currentVideoTime,
    keyframes: keyframes,
    onChangeVideoTime: onChangeVideoTime,
    onDeleteKeyframe: onDeleteKeyframe
  }), /*#__PURE__*/React.createElement(History, {
    history: history,
    onRestoreHistory: function onRestoreHistory() {
      return _onRestoreHistory();
    }
  }));
};
export default Sidebar;