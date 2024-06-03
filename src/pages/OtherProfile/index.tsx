import React, { useEffect } from "react";
import Profile from "../Profile/component/Profile";
import { useAppDispatch, useAppSelector } from "../../store";
import { getProfile } from "../../lib/api/call/profile";
import { SET_LOGIN } from "../../store/slice/auth";
import { Box } from "@mui/material";

const Profiles = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
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
    
     return (
        <Box>
            {auth.token && <Profile />}
            
        </Box>
     )
}

export default Profiles;