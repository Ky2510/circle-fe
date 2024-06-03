import React from "react";
import { updateProfile } from "../../lib/api/call/profile";
import { Box, Button, TextField, Typography } from "@mui/material";

interface IEditFormProps {
    onClose: () => void;
    token: string;
}

const EditProfilForm: React.FC<IEditFormProps> = ({ onClose, token }) => {
    const [formInput, setFormInput] = React.useState<{
        username?: string | null;
        bio?: string | null;
        cover?: File | null;
        avatar?: File | null;
        fullname: string | null;
      }>({
        username: null,
        bio: null,
        cover: null,
        avatar: null,
        fullname: null,
      });

      const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const res = await updateProfile(formInput, token);
          onClose();
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      };

      const handleStringChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormInput(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setFormInput(prevState => ({
          ...prevState,
          [name]: files?.[0] || null
        }));
      };

      return (
        <Box>
          <form onSubmit={handleEdit}>
                <TextField
                    name="username"
                    label="Username"
                    value={formInput.username}
                    onChange={handleStringChange}
                />
                <TextField
                    name="fullname"
                    label="Fullname"
                    value={formInput.fullname}
                    onChange={handleStringChange}
                />
                <TextField
                    name="bio"
                    label="Bio"
                    value={formInput.bio}
                    onChange={handleStringChange}
                />
                <Typography>Cover</Typography>
                <input
                    type="file"
                    name="cover"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <Typography>Avatar</Typography>
                <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </Box>
      );
}

export default EditProfilForm