"use client"
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FORMAT_ELEMENT_COMMAND, INDENT_CONTENT_COMMAND, LexicalEditor, OUTDENT_CONTENT_COMMAND } from 'lexical';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

export default function AlignTextMenu({ editor, isRTL }: { editor: LexicalEditor, isRTL: boolean }): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="align-button"
        aria-controls={open ? 'align-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label='Align Text'
        onClick={handleClick}>
        <FormatAlignLeftIcon />
      </IconButton>
      <Menu
        id="align-menu"
        aria-labelledby="align-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
          setTimeout(() => { editor.focus() }, 0);
          handleClose();
        }}>
          <ListItemIcon>
            <FormatAlignLeftIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>ישר לשמאל</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
          setTimeout(() => { editor.focus() }, 0);
          handleClose();
        }}>
          <ListItemIcon>
            <FormatAlignCenterIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>מרכז</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
          setTimeout(() => { editor.focus() }, 0);
          handleClose();
        }}>
          <ListItemIcon>
            <FormatAlignRightIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>ישר לימין</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
          setTimeout(() => { editor.focus() }, 0);
          handleClose();
        }}>
          <ListItemIcon>
            <FormatAlignJustifyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>ישר לשני הצדדים</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => {
          editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
          setTimeout(() => { editor.focus() }, 0);
          handleClose();
        }}>
          <ListItemIcon>
            {isRTL ? <FormatIndentIncreaseIcon fontSize="small" /> : <FormatIndentDecreaseIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>הקטן כניסה</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
          setTimeout(() => { editor.focus() }, 0);
          handleClose();
        }}>
          <ListItemIcon>
            {isRTL ? <FormatIndentDecreaseIcon fontSize="small" /> : <FormatIndentIncreaseIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>הגדל כניסה</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
