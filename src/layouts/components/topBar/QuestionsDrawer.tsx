"use client"
import { Box, IconButton, SwipeableDrawer, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';


const QuestionsDrawer = ({isOpen, setOpen, children }: { isOpen: boolean, setOpen: (open: boolean) => void, children: React.ReactNode  }) => {
//   const open = useSelector(state => state.drawer);
//   const dispatch = useDispatch();
//   const toggleDrawer = () => { dispatch(actions.toggleDrawer()); }

    const toggleDrawer = (open: boolean) => {
        setOpen(open);
      };

  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onOpen = {() => toggleDrawer(false)}
        onClose={() => toggleDrawer(true)}
      >
        <Box sx={{ p: 2, width: 400 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ ml: 15 }} >שאלות נוספות</Typography>
            <IconButton onClick={() => toggleDrawer(false)} sx={{ ml: "auto" }}><Close /></IconButton>
          </Box>
          {children}
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default QuestionsDrawer;