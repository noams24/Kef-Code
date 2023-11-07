"use client"
import { Box, IconButton, SwipeableDrawer, Typography } from '@mui/material';
import { Article, Close } from '@mui/icons-material';
import React, { useState } from 'react';

const AppDrawer = ({isOpen, setOpen, children }: { isOpen: boolean, setOpen: (open: boolean) => void, children: React.ReactNode  }) => {
//   const open = useSelector(state => state.drawer);
//   const dispatch = useDispatch();
//   const toggleDrawer = () => { dispatch(actions.toggleDrawer()); }

    const toggleDrawer = (open: boolean) => {
        setOpen(open);
      };

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onOpen = {() => toggleDrawer(false)}
        onClose={() => toggleDrawer(true)}
        sx={{ displayPrint: 'none' }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <Typography variant="h6" sx={{ ml: 8 }}>מידע על הפתרון</Typography> */}
            <IconButton onClick={() => toggleDrawer(false)} sx={{ ml: "auto" }}><Close /></IconButton>
          </Box>
          {children}
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default AppDrawer;