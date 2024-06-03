import React from "react";
import { registerApi } from "../../lib/api/call/user";
import { Box, Button, TextField, Typography } from "@mui/material";

interface IRegisterFormProps {
  onClose: () => void;
}

const RegisterForm: React.FC<IRegisterFormProps> = ({ onClose }) => {
  const [formInput, setFormInput] = React.useState<{
    username: string;
    password: string;
    email: string;
    fullname: string;
  }>({
    username: "",
    password: "",
    email: "",
    fullname: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerApi(formInput);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleRegister}>
        <Box display="flex" flexDirection="column">
          <TextField
            label="Fullname"
            value={formInput.fullname}
            onChange={(e) =>
              setFormInput({ ...formInput, fullname: e.target.value })
            }
          />
          <TextField
            label="Username"
            value={formInput.username}
            onChange={(e) =>
              setFormInput({ ...formInput, username: e.target.value })
            }
          />
          <TextField
            label="Email"
            value={formInput.email}
            onChange={(e) =>
              setFormInput({ ...formInput, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            type="password"
            value={formInput.password}
            onChange={(e) =>
              setFormInput({ ...formInput, password: e.target.value })
            }
          />
          <Button type="submit" variant="contained">
            REGISTER
          </Button>
          <Typography>Already have an account? Login</Typography>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterForm;
