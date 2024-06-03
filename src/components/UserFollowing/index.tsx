import { useEffect, useState } from "react";
import { IFollow } from "../../types/app";
import { getFollowings } from "../../lib/api/call/folllow";
import { Avatar, Box, Button, Typography } from "@mui/material";
import ButtonFollow from "../ButtonFollow";

const UserFollowing = () => {
  const [following, setFollowing] = useState<IFollow[]>([]);
  async function getFollowing() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const res = await getFollowings();
      setFollowing(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFollowing();
  });

  return (
    <Box
      style={{
        overflowX: "hidden",
        overflowY: "auto",
        borderRadius: "8px",
        backgroundColor: "#262626",
        marginTop: "5px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        {following.map((user, index) => (
          <Box
            key={index}
            sx={{ display: "flex", gap: 2, ml: 2, alignItems: "center" }}
          >
            <Avatar sx={{ mt: 2 }} src={user.profile.avatar} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                overflow: "hidden",
              }}
            >
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  fontSize: "xs",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {user.fullname}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: "xs", color: "grey" }}
              >
                @{user.username}
              </Typography>
            </Box>
            <ButtonFollow followingId={user.id} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserFollowing;
