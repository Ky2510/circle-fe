import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector } from "../../store";
import API from "../../lib/api";

interface ILikeButtonProps {
   threadId: number;
   callback: () => void;
}

const LikeButton: React.FC<ILikeButtonProps> = ({ threadId, callback }) => {
   const [liked, setliked] = useState(false);
   

   const getLike = async () => {
      try {
         const res = await API.get(`like/${threadId}`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         });

         setliked(res.data.data.like === null ? false : true);
      } catch (error) {
         console.log(error);
      }
   };

   const handleLike = async () => {
      try {
         const res = await API.post(
            `like`,
            {
               threadId: threadId,
            },
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            }
         );

         console.log(res);
         await getLike();
          callback();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getLike();
   }, []);

   return (
      <IconButton aria-label="delete" onClick={() => handleLike()}>
         <FavoriteIcon sx={{ color: liked ? "red" : "gray" }} />
      </IconButton>
   );
};

export default LikeButton;