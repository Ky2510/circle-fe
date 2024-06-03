import { Avatar, Box, Typography } from "@mui/material";
import { IThread } from "../../types/app";
import { useNavigate } from "react-router-dom";
import { CiChat2, CiHeart } from "react-icons/ci";
import LikeButton from "../ButtonLike";

interface IThreadCardProps {
  thread: IThread;
  callback: () => void;
}

const ThreadCard: React.FC<IThreadCardProps> = ({ thread, callback }) => {
  const navigate = useNavigate();

  console.log(thread), "thread theadcrd";

  const handleClick = () => {
    navigate(`/profile/${thread.author?.id}`)
  }



  return (
    <Box
      borderBottom={"1px solid #3f3f3f"}
      padding={"20px"}
      mb={1}
      sx={{ cursor: "pointer" }}
    >
      <Box>
        <Box
          onClick={() => {
            navigate(`/detail/${thread.id}`);
          }}
          sx={{ display: "flex", gap: 1, overflow: "hidden" }}
        >
          <Avatar src={thread.author?.profile.avatar}></Avatar>
          <Box display="flex" flexDirection="column" overflow="hidden">
            <Box display="flex" alignItems="center">
              <Typography variant="body1">{thread.author?.fullname}</Typography>
              <Typography
                variant="body2"
                color="gray"
                style={{ marginLeft: "5px" }}
              >
                @{thread.author?.username}
              </Typography>
            </Box>
            <Typography variant="body1">{thread.content}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {thread.image &&
            thread.image.map((image) => (
              <img
                src={"http://localhost:5000/uploads/" + image.image}
                alt="image"
                style={{
                  flex: 1,
                  height: "200px",
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
              />
            ))}
        </Box>
        <Box
          sx={{
            mt: "10px",
            mb: "10px",
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <label htmlFor="reply">
              <LikeButton threadId={thread.id as number} callback={callback} />
            </label>
            <Typography sx={{ ml: 0.5 }}>{thread._count?.like}</Typography>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <label htmlFor="reply">
              <CiChat2 size={30} style={{ marginLeft: 5 }} />
            </label>
            <Typography sx={{ ml: 0.5 }}>{thread._count?.replies}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ThreadCard;
