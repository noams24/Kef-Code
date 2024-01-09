"use client";
import { $getSelection, $setSelection, LexicalEditor } from "lexical";
import React, { memo, useState } from "react";
import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SET_DIALOGS_COMMAND } from "..";
import { INSERT_LAYOUT_COMMAND } from "../../LayoutsPlugin";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const LAYOUTS = [
  ["1fr 1fr", "שתי עמודות (בגודל שווה)"],
  ["1fr 3fr", " (25% - 75%) שתי עמודות"],
  ["1fr 1fr 1fr", "שלוש עמודות (בגודל שווה)"],
  ["1fr 2fr 1fr", "(25% - 50% - 25%) שלוש עמודות"],
  ["1fr 1fr 1fr 1fr", "ארבע עמודות (בגודל שווה)"],
];

function ColumnsDialog({
  editor,
  open,
}: {
  editor: LexicalEditor;
  open: boolean;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [layout, setLayout] = useState<string>(LAYOUTS[0][0]);

  const closeDialog = () => {
    editor.dispatchCommand(SET_DIALOGS_COMMAND, { columns: { open: false } });
  };

  const restoreSelection = () => {
    editor.getEditorState().read(() => {
      const selection = $getSelection()?.clone() ?? null;
      editor.update(() => $setSelection(selection));
    });
  };

  const handleClose = () => {
    closeDialog();
    restoreSelection();
  };

  const handleClick = () => {
    editor.dispatchCommand(INSERT_LAYOUT_COMMAND, layout);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      onClose={handleClose}
      aria-labelledby="columns-dialog-title"
      disableEscapeKeyDown
    >
      <DialogTitle id="columns-dialog-title">הוספת עמודות</DialogTitle>
      <DialogContent>
        <Select
          size="small"
          sx={{ width: 250 }}
          onChange={(e) => setLayout((e.target as HTMLSelectElement).value)}
          value={layout}
        >
          {LAYOUTS.map(([option, text]) => (
            <MenuItem key={option} value={option}>
              {" "}
              {text}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          ביטול
        </Button>
        <Button onClick={handleClick}>אישור</Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(ColumnsDialog);
