// @flow

import React, { useReducer, useEffect } from "react"
import type { Node } from "react"
import MainLayout from "../MainLayout"
import type {
  ToolEnum,
  Image,
  Mode,
  MainLayoutState,
  Action,
} from "../MainLayout/types"
import type { KeypointsDefinition } from "../ImageCanvas/region-tools"
import SettingsProvider from "../SettingsProvider"

import combineReducers from "./reducers/combine-reducers.js"
import generalReducer from "./reducers/general-reducer.js"
import imageReducer from "./reducers/image-reducer.js"
import videoReducer from "./reducers/video-reducer.js"
import historyHandler from "./reducers/history-handler.js"

import useEventCallback from "use-event-callback"
import makeImmutable, { without } from "seamless-immutable"

type Props = {
  taskDescription?: string,
  allowedArea?: { x: number, y: number, w: number, h: number },
  regionTagList?: Array<string>,
  regionClsList?: Array<string>,
  imageTagList?: Array<string>,
  imageClsList?: Array<string>,
  enabledTools?: Array<string>,
  disableNavs?: boolean,
  disableClasses?: boolean,
  disableTags?: boolean,
  disableSettings?: boolean,
  disableRightSidebar?: boolean,
  selectedTool?: String,
  showTags?: boolean,
  selectedImage?: string | number,
  images?: Array<Image>,
  newRegions?: Array<Region>,
  showPointDistances?: boolean,
  pointDistancePrecision?: number,
  RegionEditLabel?: Node,
  onExit: (MainLayoutState) => any,
  customCloseRegion: (MainLayoutState) => any,
  customDeleteRegion: (MainLayoutState) => any,
  customOpenRegion: (MainLayoutState) => any,
  onLinkResource: (MainLayoutState) => any,
  videoTime?: number,
  videoSrc?: string,
  keyframes?: Object,
  videoName?: string,
  keypointDefinitions: KeypointsDefinition,
  fullImageSegmentationMode?: boolean,
  readOnly?: boolean,
  disableRegionType?: boolean,
  disableTopNav?: boolean,
  autoSegmentationOptions?:
    | {| type: "simple" |}
    | {| type: "autoseg", maxClusters?: number, slicWeightFactor?: number |},
}

export const Annotator = ({
  images,
  newRegions,
  readOnly,
  allowedArea,
  selectedImage = images && images.length > 0 ? 0 : undefined,
  showPointDistances,
  pointDistancePrecision,
  showTags = true,
  enabledTools = [
    "select",
    "create-point",
    "create-box",
    "create-polygon",
    "create-expanding-line",
    "show-mask",
  ],
  disableNavs = true,
  disableRegionType = true,
  disableTopNav = true,
  disableClasses = true,
  disableTags = true,
  disableSettings = true,
  disableRightSidebar = true,
  selectedTool = "select",
  regionTagList = [],
  regionClsList = [],
  imageTagList = [],
  imageClsList = [],
  keyframes = {},
  taskDescription = "",
  fullImageSegmentationMode = false,
  RegionEditLabel,
  videoSrc,
  videoTime = 0,
  videoName,
  onExit,
  customCloseRegion,
  customDeleteRegion,
  customOpenRegion,
  onLinkResource,
  onNextImage,
  onPrevImage,
  keypointDefinitions,
  autoSegmentationOptions = { type: "autoseg" },
}: Props) => {
  if (typeof selectedImage === "string") {
    selectedImage = (images || []).findIndex((img) => img.src === selectedImage)
    if (selectedImage === -1) selectedImage = undefined
  }
  const annotationType = images ? "image" : "video"
  const [state, dispatchToReducer] = useReducer(
    historyHandler(
      combineReducers(
        annotationType === "image" ? imageReducer : videoReducer,
        generalReducer
      )
    ),
    makeImmutable({
      annotationType,
      showTags,
      newRegions,
      readOnly,
      allowedArea,
      showPointDistances,
      pointDistancePrecision,
      selectedTool,
      fullImageSegmentationMode: fullImageSegmentationMode,
      autoSegmentationOptions,
      mode: null,
      taskDescription,
      showMask: true,
      labelImages: imageClsList.length > 0 || imageTagList.length > 0,
      regionClsList,
      regionTagList,
      imageClsList,
      imageTagList,
      currentVideoTime: videoTime,
      enabledTools,
      disableSettings,
      disableRightSidebar,
      disableNavs,
      disableClasses,
      disableTags,
      disableRegionType,
      disableTopNav,
      customCloseRegion,
      customDeleteRegion,
      customOpenRegion,
      onLinkResource,
      history: [],
      videoName,
      keypointDefinitions,
      ...(annotationType === "image"
        ? {
            selectedImage,
            images,
            selectedImageFrameTime:
              images && images.length > 0 ? images[0].frameTime : undefined,
          }
        : {
            videoSrc,
            keyframes,
          }),
    })
  )

  const dispatch = useEventCallback((action: Action) => {
    if (action.type === "HEADER_BUTTON_CLICKED") {
      if (["Exit", "Done", "Save", "Complete"].includes(action.buttonName)) {
        return onExit(without(state, "history"))
      } else if (action.buttonName === "Next" && onNextImage) {
        return onNextImage(without(state, "history"))
      } else if (action.buttonName === "Prev" && onPrevImage) {
        return onPrevImage(without(state, "history"))
      }
    }
    dispatchToReducer(action)
  })

  const onRegionClassAdded = useEventCallback((cls) => {
    dispatchToReducer({
      type: "ON_CLS_ADDED",
      cls: cls,
    })
  })

  useEffect(() => {
    if (selectedImage === undefined) return
    dispatchToReducer({
      type: "SELECT_IMAGE",
      imageIndex: selectedImage,
      image: state.images[selectedImage],
    })
  }, [selectedImage])

  useEffect(() => {
    dispatchToReducer({
      type: "UPDATE_IMAGES",
      images: images,
    })
  }, [images])

  if (!images && !videoSrc)
    return 'Missing required prop "images" or "videoSrc"'


  return (
    <SettingsProvider>
      <MainLayout
        RegionEditLabel={RegionEditLabel}
        alwaysShowNextButton={Boolean(onNextImage)}
        alwaysShowPrevButton={Boolean(onPrevImage)}
        state={state}
        dispatch={dispatch}
        onRegionClassAdded={onRegionClassAdded}
      />
    </SettingsProvider>
  )
}

export default Annotator
