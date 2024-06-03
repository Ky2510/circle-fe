import { Avatar, Box, Button, Typography, TextField } from "@mui/material";
import { getUsers } from "../../lib/api/call/user";
import { IUser } from "../../types/app";
import { useEffect, useState } from "react";
import ButtonFollow from "../../components/ButtonFollow";

const SuggestionCard = () => {
  const [search, setSearch] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  async function getSearch() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const res = await getUsers(token);
      setSearch(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSearch();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredSuggestions = search.filter((user) => {
    return (
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Box
      style={{
        overflowX: "hidden",
        overflowY: "auto",
        borderRadius: "8px",

        marginTop: "5px",
      }}
      sx={{
        padding: "20px",
      }}
    >
      <TextField
      fullWidth
        type="text"
        placeholder="Search for people"
        variant="filled"
        size="medium"
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginLeft: "8px", marginBottom: "8px", borderRadius: '50%' }}
        InputProps={{ sx: { color: 'white' } }} 
      />
      {searchQuery && filteredSuggestions.length === 0 ? (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}
        >
          <Typography
            variant="body1"
            style={{ fontWeight: "bold", color: "white" }}
          >
            No result for "{searchQuery}"
          </Typography>
          <Typography variant="body2" style={{ color: "#909090" }}>
            Try searching for something else or check the spelling of what you
            typed
          </Typography>
        </Box>
      ) : (
        searchQuery && (
          <Box>
            {filteredSuggestions.map((user, index) => (
              <Box
                key={index}
                sx={{ display: "flex", gap: 2, ml: 2, alignItems: "center" }}
              >
                <Avatar
                  sx={{ alignContent: "center" }}
                  src={user.profile?.avatar}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mb: 2,
                    mt: 2,
                    w: "170px",
                  }}
                >
                  <Typography variant="body2" style={{ fontWeight: "bold" }}>
                    {user.fullname}
                  </Typography>
                  <Typography variant="body2" style={{ color: "grey" }}>
                    {user.username}
                  </Typography>
                </Box>
                <ButtonFollow followingId={user.id}/>
              </Box>
            ))}
          </Box>
        )
      )}
    </Box>
  );
};

export default SuggestionCard;
