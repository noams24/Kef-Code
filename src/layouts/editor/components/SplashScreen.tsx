"use client"
//import Box from '@mui/material/Box';
//import CircularProgress from "@mui/material/CircularProgress";
//import Typography from '@mui/material/Typography';
//import logo from "/public/logo.svg";
//import Image from 'next/image';
import LinearProgress from '@mui/material/LinearProgress';

const SplashScreen: React.FC<{ title?: string, loading?: boolean }> = ({ title = "Loading", loading = true }) => {
  return (
    <div className='mt-8'>
    <LinearProgress/>
    </div>
  );
}
export default SplashScreen;