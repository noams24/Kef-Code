"use client"
//import Box from '@mui/material/Box';
//import CircularProgress from "@mui/material/CircularProgress";
//import Typography from '@mui/material/Typography';
//import logo from "/public/logo.svg";
//import Image from 'next/image';

const SplashScreen: React.FC<{ title?: string, loading?: boolean }> = ({ title = "Loading", loading = true }) => {
  return (
    <div className='splash-screen'>
      <div className='splash-screen-content text-center'>
        ..טוען
       {/*  <Image src={logo} alt="Logo" width={192} height={192} priority />
        
        <Box sx={{ textAlign: 'center' }}>
          {loading && <CircularProgress size={36} disableShrink />}
          <Typography variant='overline' component='h3'>{title}</Typography>
        </Box>
        */}
      </div>
    </div>
  );
}
export default SplashScreen;