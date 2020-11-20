// @flow
import React, { useState } from "react"
import ReactDOM from "react-dom"
import Editor, { examples } from "./Editor"
import Annotator from "../Annotator"
import ErrorBoundaryDialog from "./ErrorBoundaryDialog.js"

export default () => {
  const [annotatorOpen, changeAnnotatorOpen] = useState(false)
  const [annotatorProps, changeAnnotatorProps] = useState(examples["Custom"]())
  const [lastOutput, changeLastOutput] = useState()

  return (
    <div>
      {annotatorOpen ? (
        <ErrorBoundaryDialog
          onClose={() => {
            changeAnnotatorOpen(false)
          }}
        >
          <Annotator
            {...(annotatorProps: any)}
            onExit={(output) => {
              delete (output: any)["lastAction"]
              changeLastOutput(output)
              changeAnnotatorOpen(false)
            }}
            customCloseRegion={(region) => {
              console.log(region,'test customCloseRegion')
            }}
            customDeleteRegion={(region) => {
              console.log(region,'test customDeleteRegion')
            }}
            disableClasses={true}
            disableTags={true}
            disableRegionType={true}
            disableTopNav={true}
            onLinkResource={(region_id) => console.log(region_id,'onLinkResource')}
          />
        </ErrorBoundaryDialog>
      ) : (
        <Editor
          lastOutput={lastOutput}
          onOpenAnnotator={(props) => {
            changeAnnotatorProps(props)
            changeAnnotatorOpen(true)
          }}
        />
      )}
    </div>
  )
}
