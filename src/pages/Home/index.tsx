import { useEffect, useState } from "react";
import { IThread } from "../../types/app";
import { getThreads } from "../../lib/api/call/thread";
import ThreadCard from "../../components/ThreadCard";
import ThreadPost from "./component/ThreadPost";
import { useAppSelector } from "../../store";
import { Typography } from "@mui/material";

const Home = () => {
    const auth = useAppSelector((state) => state.auth);
    const [threads, setThreads] = useState<IThread[] | []>([]);

   async function getThread() {
  try {
    const res = await getThreads();
    const sortedThreads = res.data.data.sort((a: IThread, b: IThread) => {
      return (b.id ?? 0) - (a.id ?? 0);
    });
    setThreads(sortedThreads);
  } catch (error) {
    console.log(error);
  }
}

   useEffect(() => {
      getThread();
   }, []);

   return (
      <div>
         <Typography 
            sx={{color:'#ffffff', 
            fontWeight:700, 
            fontSize: 30, 
            marginLeft: 5
         }}>
            Home
         </Typography>
         {auth.token && <ThreadPost callback={getThread} />}

         {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} callback={getThread} />
         ))}
      </div>
   );
};

export default Home;
