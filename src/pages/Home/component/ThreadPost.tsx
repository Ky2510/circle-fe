import {
   Avatar,
   Box,
   Button,
   ImageList,
   ImageListItem,
   TextField,
} from "@mui/material";
import React, { useState } from "react";
import { createThread } from "../../../lib/api/call/thread";
import { BiImageAdd } from "react-icons/bi";
import { useAppSelector } from "../../../store";


interface IThreadPostProps {
   threadId?: number;
   callback?: () => void;
}

const ThreadPost: React.FC<IThreadPostProps> = ({ threadId, callback }) => {
   const [threadPost, setThreadPost] = useState<{
      content: string;
      image: FileList | null;
      threadId?: number;
   }>({ content: "", image: null });

   const handlePostThread = async (e: React.MouseEvent) => {
      try {
         e.preventDefault();

         if (threadId) {
            threadPost.threadId = threadId;
         }

         console.log(threadPost, threadId, callback);

         const res = await createThread(threadPost);

         console.log(res);

         if (callback) {
            await callback();
         }

         window.location.reload();
      } catch (error) {
         console.log(error);
      }
   };

   const profile = useAppSelector((state) => state.auth.user);

   return (
      <>
         <Box
            borderBottom={"1px solid #3f3f3f"}
            sx={{padding:"20px"}}
         >
         <Box
            my={5}
            sx={{
               display: "flex",
               alignItems: "center",
               width: "100%",
               gap: 2,
               ml: 1,
            }}
         >
            
            <Avatar src={profile?.avatar}/>
            <TextField
               fullWidth
               variant="standard"
               autoComplete="off"
               value={threadPost.content}
               sx={{ color: "white" }}
               // color="success"
               onChange={(e) =>
                  setThreadPost({ ...threadPost, content: e.target.value })
               }
               InputProps={{ sx: { color: 'white' } }} 
            />
            <label htmlFor="contained-button-file">
               <BiImageAdd/> {threadPost.image?.length}
            </label>
            <input
               accept="image/*"
               id="contained-button-file"
               multiple
               max={4}
               type="file"
               hidden
               onChange={(e) => {
                  setThreadPost({ ...threadPost, image: e.target.files });
               }}
            />
            <Button
               onClick={handlePostThread}
               variant="contained"
               sx={{ backgroundColor: "#04A51E", borderRadius:"full-rounded", ml: -1 }}
            >
               Post
            </Button>
         </Box>
         </Box>
      </>
   );
};

export default ThreadPost;