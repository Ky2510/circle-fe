import { Avatar, Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useAppSelector } from "../../store";
import { useState } from "react";
import ModalDialog from "../ModalDialog";
import EditProfilForm from "../EditProfile";
import React from "react";

const ProfileCard = () => {
  const profile = useAppSelector((state) => state.auth.user);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const handleShowEditForm = () => {
    setShowEditForm(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#262626",
        borderRadius: "10px",
        padding: "20px",
        // width:""
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: "20px" }}>
        My Profile
      </Typography>
      <img
        src={profile?.cover}
        alt="cover"
        style={{
          width: "100%",
          height: "200px",
          borderRadius: "20px",
          objectFit: "cover",
        }}
      />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"flex-end"}
        paddingInline={"25px"}
        marginTop={-7}
      >
        <Avatar
          src={profile?.avatar}
          alt="avatar"
          sx={{
            width: 100,
            height: 100,
            objectFit: "cover",
            border: "5px solid #262626",
          }}
        />
        <Button onClick={() => setShowEditForm(true)}>Edit Profile</Button>
        <ModalDialog callback={handleShowEditForm} show={showEditForm}>
          <div>
            {showEditForm && (
              <EditProfilForm onClose={handleShowEditForm} token={""} />
            )}
          </div>
        </ModalDialog>
      </Box>

      <Typography>{profile?.user.fullname}</Typography>
      <Typography>@{profile?.user.username}</Typography>
      <Typography>{profile?.bio}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography sx={{ fontWeight: 700 }}>{profile?.user.follower.length}</Typography>
          <Typography sx={{ ml: 0.5 }}>Following</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography sx={{ fontWeight: 700 }}>{profile?.user.following.length}</Typography>
          <Typography sx={{ ml: 0.5 }}>Folower</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCard;
