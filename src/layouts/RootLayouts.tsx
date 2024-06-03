import {Box} from '@mui/material'
import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import { getProfile } from '../lib/api/call/profile';
import { SET_LOGIN } from '../store/slice/auth';
import { useAppDispatch, useAppSelector } from '../store';
import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import Footer from '../components/Footer';
import SuggestionCard from '../components/SuggestionCard';

const RootLayout = () => {

    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    const location = useLocation();
    const checkToken = async () => {
        try {
           const token = localStorage.getItem("token");
           if (!token) return;
           const res = await getProfile(token);
           dispatch(SET_LOGIN({ user: res.data.data, token }));
        } catch (error) {
           console.log(error);
        }
     };

     useEffect(() => {
        checkToken();
     }, []);

     const[showProfileCard, setShowProfileCard] = useState(true);

     useEffect(() => {
      setShowProfileCard(location.pathname !== "/profile");
     }, [location.pathname])
     
    return(
        <Box
        sx={{
           display: "flex",
           backgroundColor: "#1d1d1d",
           height: "100vh",
           color: "white",
        }}
     >
        <Box flex={1}> 
            <Box
               sx={{
                  color: '#04a51e',
                  px: '5px',
                  fontSize: '55px',
                  fontWeight: 700,
                  height: '64px',
                  marginBottom: 3,
                  marginTop: '20px',
                  marginLeft: '40px',
               }}
               >
               <Link to={"/"} style={{ textDecoration: 'none', color:'#04a51e'}}>
                  circle
               </Link>
            </Box>
            <Sidebar /> 
        </Box>
        <Box 
            flex={2.5} 
            sx={{overflowY: 'auto', 
               scrollbarWidth: 'none',
               "-ms-overflow-style": "none",
               "scrollbar-width": "none",
               border: "1px solid #3f3f3f"}}>
            <Outlet />  
        </Box>
        <Box flex={1.5} sx={{gap:'2px', display:"flex", flexDirection: 'column', overflowY: 'auto', padding: '20px'}}> 
            {showProfileCard && auth.token && <ProfileCard />}
            {auth.token && <SuggestionCard />}
            <Footer />
        </Box>
   </Box>  
    )
}

export default RootLayout