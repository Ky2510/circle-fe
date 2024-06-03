import { Avatar, Box, Button, Typography } from "@mui/material";
import { getOtherUsers } from "../../lib/api/call/user";
import { IUser } from "../../types/app";
import { useEffect, useState } from "react";
import ButtonFollow from "../ButtonFollow";

const SuggestionCard = () => {
  const [suggestion, setSuggestion] = useState<IUser[]>([]);

  async function getOtherUser() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const res = await getOtherUsers(token);
      setSuggestion(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOtherUser();
  }, []);

  return (
    <Box
      style={{
        borderRadius: "8px",
        backgroundColor: "#262626",
        marginTop: "5px",
        marginBottom: "5px",
        marginRight: "5px"
      }}
    >
      <Box
        style={{
          fontWeight: 700,
          marginLeft: "16px",
          marginTop: "8px",
        }}
        sx={{marginBottom:"2px"}}
      >
        Suggested for You
      </Box>
      <Box sx={{width: "100%"}}>
        {suggestion.map((user, index) => (
          <Box key={index} sx={{ display: "flex", gap: 2, ml: 2, alignItems: "center"}}>
            <Avatar sx={{ mt: 2 }} src={user.avatar} />
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
                sx={{ fontSize: "xs" , color: "grey"}}
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

export default SuggestionCard;
