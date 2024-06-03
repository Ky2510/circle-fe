import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { useState } from "react";
import ModalDialog from "../ModalDialog";
import LoginForm from "../LoginForm";
import RegisterForm from "../registerForm";
import { SET_LOGOUT } from "../../store/slice/auth";
import { FaHome } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { RiHeartLine } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { MdExitToApp } from "react-icons/md";

const MENU = [
  {
    title: "Home",
    link: "/",
    icon: FaHome,
  },
  {
    title: "Search",
    link: "/search",
    icon: RiSearchLine,
  },
  {
    title: "Follows",
    link: "/follows",
    icon: RiHeartLine,
  },
  {
    title: "Profile",
    link: "/profile",
    icon: IoPersonOutline,
  },
];

const Sidebar = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const handleShowRegisterForm = () => {
   setShowLoginForm(false); 
   setShowRegisterForm(true);
};

  return !auth.user ? (
    <>
      <Box
        sx={{
          marginTop: 60,
          display: "flex",
          alignItems: "center",
          marginLeft: 5,
        }}
      >
        <MdExitToApp size={20} />
        <Button sx={{ color: "white" }} onClick={() => setShowLoginForm(true)}>
          LOGIN
        </Button>
      </Box>
      <ModalDialog
        callback={handleCloseModal}
        show={showLoginForm || showRegisterForm}
      >
        <div>
          {showLoginForm && <LoginForm onRegisterClick={handleShowRegisterForm} />}
          {showRegisterForm && <RegisterForm onClose={handleCloseModal} />}
        </div>
      </ModalDialog>
    </>
  ) : (
    <Box>
      {MENU.map((menu) => (
        <Box
          key={menu.title}
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: 5,
            marginBottom: 3,
          }}
        >
          <menu.icon size={20} />
          <Link
            to={menu.link}
            style={{ textDecoration: "none", marginLeft: 5 }}
          >
            <Typography color="white" variant="body1">
              {menu.title}
            </Typography>
          </Link>
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: 5,
          marginTop: 35,
        }}
      >
        <MdExitToApp size={20} />
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            dispatch(SET_LOGOUT());
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
