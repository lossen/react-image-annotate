// @flow

import React, { useState, memo } from "react"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import styles from "./styles"
import classnames from "classnames"
import type { Region } from "../ImageCanvas/region-tools.js"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import TrashIcon from "@material-ui/icons/Delete"
import CheckIcon from "@material-ui/icons/Check"
import UndoIcon from "@material-ui/icons/Undo"
import Select from "react-select"
import CreatableSelect from "react-select/creatable"

import { asMutable } from "seamless-immutable"
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(styles)

type Props = {
  region: Region,
  editing?: boolean,
  allowedClasses?: Array<string>,
  disableClasses?: boolean,
  disableTags?: boolean,
  disableRegionType?: boolean,
  allowedTags?: Array<string>,
  cls?: string,
  tags?: Array<string>,
  regionName?: string,
  onDelete: (Region) => null,
  onChange: (Region) => null,
  onClose: (Region) => null,
  onOpen: (Region) => null,
  onRegionClassAdded: () => {},
}

function handleCloseRegionEditor(onClose,region,customCloseRegion) {
  onClose(region)
  customCloseRegion(region)
}

function handleDeleteRegionEditor(onDelete,region,customDeleteRegion) {
  onDelete(region)
  customDeleteRegion(region.id)
}

export const RegionLabel = ({
  region,
  editing,
  allowedClasses,
  disableClasses,
  disableTags,
  disableRegionType,
  allowedTags,
  onDelete,
  onChange,
  onClose,
  onOpen,
  onRegionClassAdded,
  customCloseRegion,
  customDeleteRegion,
  regionName
}: Props) => {
  const classes = useStyles()

  return (
    <Paper
      onClick={() => (!editing ? onOpen(region) : null)}
      className={classnames(classes.regionInfo, {
        highlighted: region.highlighted,
      })}
    >
      {!editing ? (
        <div>
          {region.cls && (
            <div className="name">
              <div
                className="circle"
                style={{ backgroundColor: region.color }}
              />
              {region.cls}
            </div>
          )}
          {region.tags && (
            <div className="tags">
              {region.tags.map((t) => (
                <div key={t} className="tag">
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ width: 200 }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
           {!disableRegionType && <div
              style={{
                display: "flex",
                backgroundColor: region.color || "#888",
                color: "#fff",
                padding: 4,
                paddingLeft: 8,
                paddingRight: 8,
                borderRadius: 4,
                fontWeight: "bold",
                textShadow: "0px 0px 5px rgba(0,0,0,0.4)",
              }}
            >
              {region.type}
            </div>}
            <div style={{ flexGrow: 1 }} />
            <IconButton
              onClick={() => handleDeleteRegionEditor(onDelete,region,customDeleteRegion)}
              tabIndex={-1}
              style={{ width: 22, height: 22 }}
              size="small"
              variant="outlined"
            >
              <TrashIcon style={{ marginTop: -8, width: 16, height: 16 }} />
            </IconButton>
          </div>
          {!disableClasses && (allowedClasses || []).length > 0 && (
            <div style={{ marginTop: 6 }}>
              <CreatableSelect
                placeholder="Classification"
                onChange={(o, actionMeta) => {
                  if (actionMeta.action == "create-option") {
                    onRegionClassAdded(o.value)
                  }
                  return onChange({
                    ...(region: any),
                    cls: o.value,
                  })
                }}
                value={
                  region.cls ? { label: region.cls, value: region.cls } : null
                }
                options={asMutable(
                  allowedClasses.map((c) => ({ value: c, label: c }))
                )}
              />
            </div>
          )}
          {!disableTags && (allowedTags || []).length > 0 && (
            <div style={{ marginTop: 4 }}>
              <Select
                onChange={(newTags) =>
                  onChange({
                    ...(region: any),
                    tags: newTags.map((t) => t.value),
                  })
                }
                placeholder="Tags"
                value={(region.tags || []).map((c) => ({ label: c, value: c }))}
                isMulti
                options={asMutable(
                  allowedTags.map((c) => ({ value: c, label: c }))
                )}
              />
            </div>
          )}
          <input type="text" autoFocus value={region.regionName} onChange={(newName) =>
              onChange({
                ...(region: any),
                regionName: newName.target.value
              })
          }/>
          {onClose && (
            <div style={{ marginTop: 4, display: "flex" }}>
              <div style={{ flexGrow: 1 }} />
              <Button
                onClick={() => handleCloseRegionEditor(onClose,region,customCloseRegion)}
                size="small"
                variant="contained"
                color="primary"
              >
                <CheckIcon />
              </Button>
            </div>
          )}
        </div>
      )}
    </Paper>
  )
}

export default memo(
  RegionLabel,
  (prevProps, nextProps) =>
    prevProps.editing === nextProps.editing &&
    prevProps.region === nextProps.region
)
