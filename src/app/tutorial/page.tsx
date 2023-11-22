"use client"
import Editor from "@/layouts/editor/components/Editor"
// import { Helmet } from "react-helmet";
import { useState } from "react";
import Button from "@mui/material/Button";
import { type EditorState } from "lexical";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from "@mui/material/Divider";

import { tasks, checkpoints } from "@/tutorial";
import Pagination from "@mui/material/Pagination";
type CheckpointItem = typeof checkpoints[0][0];

const Tutorial: React.FC = () => {
  const [currentTask, setCurrentTask] = useState(0);
  const [currentCheckpoints, setCurrentCheckpoints] = useState<(CheckpointItem & { checked?: boolean })[]>(checkpoints[0]);

  const onChange = (editorState: EditorState) => {
    const orderedCheckpoints = currentCheckpoints
      .map((checkpoint, index) => ({ ...checkpoint, checked: checkpoint.check(editorState), index }))
      .sort((a, b) => a.checked === b.checked ? a.index - b.index : a.checked ? 1 : -1);
    setCurrentCheckpoints(orderedCheckpoints);
  };

  const pages = tasks.length;
  const [page, setPage] = useState(1);
  const handlePageChange = (_: any, value: number) => {
    setPage(value);
    setCurrentTask(value - 1);
    setCurrentCheckpoints(checkpoints[value - 1]);
  }

  return <>
    {/* <Helmet title="Tutorial" /> */}
    <div className="h-[70vh] overflow-y-auto font-primary">
    <Editor key={currentTask} document={tasks[currentTask]} onChange={onChange} />
    <Paper className="dark:bg-darkmode-body" sx={{ p: 2, mt: 3, displayPrint: 'none' }}>
      <Box key={`task-${currentTask}`} sx={{ mb: 2 }}>
        <Typography variant="h6">{tasks[currentTask].name}</Typography>
        <List>
          {/* {currentCheckpoints.map((checkpoint, index) =>
          <div className="dark:bg-zinc-800 text-white rounded mb-1" >
            <CheckpointItem key={`checkpoint-${index}`} name={checkpoint.name} steps={checkpoint.steps} checked={!!checkpoint.checked} />
            </div>
          )} */}
              {currentCheckpoints.map((checkpoint, index) =>
                                <CheckpointItem key={`checkpoint-${index}`} name={checkpoint.name} steps={checkpoint.steps} checked={!!checkpoint.checked} />
                            )}
        </List>
      </Box>
      {/* <div className="dark:text-white dark:focus:text-white "> */}
      <div>
      <Pagination color="primary" count={pages} page={page} onChange={handlePageChange} sx={{display: "flex", justifyContent: "center", mt: 3, width: "100%" }} />
      </div>
    </Paper>
    </div>
  </>;
}

const CheckpointItem = ({ name, steps, checked }: { name: string, steps: JSX.Element, checked: boolean }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return <>
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        {checked ? <CheckIcon /> : <ClearIcon />}
      </ListItemIcon>
      <ListItemText primary={name} sx={checked ? { textDecoration: "line-through" } : {}} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ p: 2 }}>
        <Typography variant="button" component="div" sx={{ mb: 2 }}>Steps</Typography>
        {steps}
      </Box>
    </Collapse >
    <Divider />
    
  </>
}

export default Tutorial;