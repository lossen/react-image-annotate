// @flow

import { grey } from "@material-ui/core/colors"

export default {
  regionInfo: {
    borderRadius: 4,
    fontSize: 12,
    cursor: "default",
    transition: "opacity 200ms",
    opacity: 0.5,
    "&:hover": {
      opacity: 0.9,
      cursor: "pointer",
    },
    "&.highlighted": {
      opacity: 0.9,
      "&:hover": {
        opacity: 1,
      },
    },
    // pointerEvents: "none",
    fontWeight: 600,
    color: grey[900],
    padding: 24,
    "& .name": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "& .circle": {
        marginRight: 4,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.4)",
        width: 10,
        height: 10,
        borderRadius: 5,
      },
    },
    "& .tags": {
      "& .tag": {
        color: grey[700],
        display: "inline-block",
        margin: 1,
        fontSize: 10,
        textDecoration: "underline",
      },
    },
  },
  regionPopupFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  btnSmall: {
    borderRadius: '240px',
    backgroundColor: '#F4F3FF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 48,
    minHeight: 35,
    border: 'none',
    boxShadow: 'none',
    cursor: 'poiter',
    marginRight: 8
  },
  input:{
    borderColor: '#817C98',
    borderRadius: 5,
    fontSize: 16,
    color: '#817C98',
    marginBottom: 24,
    outline: 'none',
    borderWidth: 1,
    height: 40,
    width: '100%'

  },
  buttonSubmit: {
    fontSize: 14,
    lineHeight: '16px',
    borderRadius: 5,
    backgroundColor: '#6C63FF',
    color: 'white',
    borderWidth: 0,
    minWidth: 100
  }
}
