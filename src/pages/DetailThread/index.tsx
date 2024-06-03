import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReplies, getThreadById } from "../../lib/api/call/thread";
import { IThread } from "../../types/app";
import { Avatar, Box, TextField, Typography } from "@mui/material";
import ThreadCard from "../../components/ThreadCard";
import ThreadPost from "../Home/component/ThreadPost";
import { CiChat2 } from "react-icons/ci";
import LikeButton from "../../components/ButtonLike";

interface IThreadCardProps {
  callback: () => void;
}

const DetailThread: React.FC<IThreadCardProps> = ({  }) => {
  const { threadId } = useParams();

  const [threadDetail, setThreadDetail] = useState<IThread>({
    userId: 0,
    content: "",
    image: [],
    id: 0,
    _count: {
      replies: 0,
      like: 0,
    },
  });

  const [replies, setReplies] = useState<IThread[]>([]);

  const fetchThreadDetail = async () => {
    try {
      const res = await getThreadById(Number(threadId));
      const resReplies = await getReplies(Number(threadId));

      setThreadDetail(res.data.data);
      setReplies(resReplies.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchThreadDetail();
  }, [threadId]);

  return (
    <Box>
      <Box>
        <Typography
          sx={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: 30,
            marginLeft: 5,
          }}
        >
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            ⭠ Status
          </Link>
        </Typography>

        <Box borderBottom={"1px solid #3f3f3f"}>
          <Box sx={{ display: "flex", gap: 1, ml: 1 }}>
            <Avatar src={threadDetail.author?.profile.avatar} sx={{}}></Avatar>
            <Box display="flex" flexDirection="column">
              <Box display="flex" alignItems="center">
                <Typography variant="body1">
                  {threadDetail.author?.fullname}
                </Typography>
              </Box>
              <Typography variant="body2" color="gray" style={{}}>
                @{threadDetail.author?.username}
              </Typography>
              <Typography variant="body1" sx={{ ml: -6, mt: 2 }}>
                {threadDetail.content}
              </Typography>
              <Typography variant="body1" sx={{ ml: -6, mt: 2, color: "grey" }}>
                11:32 PM • Jul 23, 2023
              </Typography>
            </Box>
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
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label htmlFor="reply">
                <LikeButton
                  threadId={threadDetail.id as number}
                  callback={fetchThreadDetail}
                />
              </label>
              <Typography sx={{ ml: 0.5 }}>
                {threadDetail._count?.like} Likes
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label htmlFor="reply">
                <CiChat2 size={30} style={{ marginLeft: 5 }} />
              </label>
              <Typography sx={{ ml: 0.5 }}>
                {threadDetail._count?.replies}
              </Typography>
            </Box>
          </Box>
        </Box>
        {threadDetail.image &&
          threadDetail.image.map((image) => (
            <img
              src={"http://localhost:5000/uploads/" + image.image}
              alt="image"
              style={{
                flex: 1,
                borderRadius: "20px",
                objectFit: "cover",
                display: "block",
                margin: "auto",
                maxHeight: "100%",
                maxWidth: "100%",
              }}
            />
          ))}
      </Box>

      <Box>
        <ThreadPost callback={fetchThreadDetail} threadId={Number(threadId)} />
      </Box>

      <Box>
        {replies.map((reply) => (
          <ThreadCard
            thread={reply}
            key={reply.id}
            callback={fetchThreadDetail}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DetailThread;
