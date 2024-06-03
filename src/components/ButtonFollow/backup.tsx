import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import API from "../../lib/api";

interface IButtonFollowProps {
  followerId: number;
  callback: () => void;
}

const ButtonFollow: React.FC<IButtonFollowProps> = ({ followerId, callback }) => {
  const [follow, setFollow] = useState(false);

  const getFollow = async () => {
    try {
      const res = await API.get(`follow/${followerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFollow(res.data.data.follow === null ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async () => {
    try {
      const res = await API.post(
        `follow`,
        {
          followerId: followerId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res);
      await getFollow();
      callback();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollow();
  }, [followerId]); // Add followerId to the dependency array to prevent infinite loop

  return (
    <Button
      onClick={handleFollow}
      variant="text"
      size="medium"
      sx={{ color: follow ? "red" : "green" }}
    >
      {follow ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default ButtonFollow;
