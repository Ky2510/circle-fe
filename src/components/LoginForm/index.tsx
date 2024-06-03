import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { loginApi } from "../../lib/api/call/user";
import { getProfile } from "../../lib/api/call/profile";
import { useAppDispatch } from "../../store";
import { SET_LOGIN } from "../../store/slice/auth";

interface ILoginFormProps {
  onRegisterClick: () => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ onRegisterClick }) => {
  const [formInput, setFormInput] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginApi(formInput);
      const token = res.data.data;
      const resProfile = await getProfile(token);
      localStorage.setItem("token", token);
      dispatch(SET_LOGIN({ user: resProfile.data.data, token }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleLogin}>
        <Box
          sx={{
            color: "#04a51e",
            fontSize: "36px",
            fontWeight: 700,
            height: "64px",
            marginTop: "20px",
          }}
        >
          circle
        </Box>
        <Box
          sx={{
            color: "white",
            fontSize: "28px",
            fontWeight: 700,
            height: "64px",
            marginBottom: 3
          }}
        >
          Login to Circle
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            placeholder="Username"
            value={formInput.username}
            onChange={(e) =>
              setFormInput({ ...formInput, username: e.target.value })
            }
          />
          <TextField
            placeholder="Password"
            type="password"
            value={formInput.password}
            onChange={(e) =>
              setFormInput({ ...formInput, password: e.target.value })
            }
          />
          <Typography>Forgot password?</Typography>
          <Button type="submit" variant="contained">
            LOGIN
          </Button>
          <Button variant="contained" onClick={onRegisterClick}>
            REGISTER
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
