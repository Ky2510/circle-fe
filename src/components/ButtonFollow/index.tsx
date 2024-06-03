import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import API from "../../lib/api";
import { IFollow } from "../../types/app";
import { getFollowers } from "../../lib/api/call/folllow";
import { getProfileAsync } from "../../store/slice/auth";

interface IButtonFollow{
  followingId?: number,
  isFollowed?: boolean
}


const ButtonFollow: React.FC<IButtonFollow> = ({ followingId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [follower, setFollower] = useState<boolean>(false);
  
  
  const Profile = useAppSelector((state) => state.auth.user);

  const getFollower = async () => {
  
  async function getFollower() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const res = await getFollowers();
      setFollower(res.data.data === null? false : true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFollower();
  }, []);

    try {
      const res = await API.get(`/followers`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      if (Profile?.userId && res.data.data.followingId !== Profile?.userId) {
        setIsFollowing(true);
      } else if (
        Profile?.userId &&
        res.data.data.followingId == Profile?.userId
      ) {
        setIsFollowing(false);
      }
    } catch (error) {
      console.log("error kawan");
    }
  };


  useEffect(() => {
    getFollower();
  }, [followingId, Profile?.userId]);

  const dispatch = useAppDispatch();

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      await API.post(
        `follow`,
        {
          followingId: followingId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      const token = localStorage.getItem("token")
      await dispatch(getProfileAsync(token!))
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log("error token");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect (() => {
    const checkIsFollowing = () => {
      try {
        const following = Profile?.user?.follower?.find(
          (following) => following.followingId === followingId
        );

        setIsFollowing(following? true : false)
      } catch (error) {
        console.log(error);
        
      }
    };

    checkIsFollowing()
  }, [Profile, followingId]);
  
  return (
    <Button
      color={isFollowing ? "secondary" : "primary"}
      onClick={handleFollow}
      disabled={isLoading}
      variant="outlined"
      size="small"
      sx={{
        color: "white",
        ml: "auto",
        borderRadius: "20px",
        borderColor: "#FFFFFF",
        lineHeight: 1.5
      }}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default ButtonFollow;
