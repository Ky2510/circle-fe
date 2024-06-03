import {
  Avatar,
  Box,
  Button,
  ImageList,
  ImageListItem,
  Tab,
  Tabs,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useAppSelector } from "../../../store";
import { useEffect, useMemo, useState } from "react";
import ModalDialog from "../../../components/ModalDialog";
import EditProfilForm from "../../../components/EditProfile";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { IThread } from "../../../types/app";
import { getUserThreads } from "../../../lib/api/call/thread";
import ThreadCard from "../../../components/ThreadCard";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #3f3f3f",
  "& .MuiTabs-indicator": {
    backgroundColor: "#04A51E",
  },
});

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Profile = () => {
  const theme = useTheme();
  const profile = useAppSelector((state) => state.auth.user);
  const _host_url = "http://localhost:5000/uploads/";

  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [value, setValue] = React.useState(0);
  const [threads, setThreads] = useState<IThread[] | []>([]);

  async function getThread() {
    try {
      const res = await getUserThreads();
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

  const postFilter = useMemo(
    () =>
      threads?.filter((post) => post.userId === profile?.user.id && post.image),
    [threads, profile?.id] 
  )

  const mediaFilter = useMemo(
    () =>
      postFilter.reduce((a, b) => {
        if (!b.image) return a;

        a.push(...b.image.map((item) => item.image as unknown as string));
        return a;
      }, [] as string[]),
      [threads, profile?.id]
  )

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangesIndex = (index: number) => {
    setValue(index);
  };

  const handleShowEditForm = () => {
    setShowEditForm(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#262626",
        borderRadius: "10px",
        padding: "20px",
        width: "100%",
        alignContent: "center",
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: "20px" }}>
        {profile?.user.fullname}
      </Typography>
      <img
        src={profile?.cover}
        alt="cover"
        style={{
          width: "100%",
          height: "200px",
          borderRadius: "20px",
          objectFit: "cover",
        }}
      />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"flex-end"}
        paddingInline={"25px"}
        marginTop={-7}
      >
        <Avatar
          src={profile?.avatar}
          alt="avatar"
          sx={{
            width: 100,
            height: 100,
            objectFit: "cover",
            border: "5px solid #262626",
          }}
        />
        <Button onClick={() => setShowEditForm(true)}>Edit Profile</Button>
        <ModalDialog callback={handleShowEditForm} show={showEditForm}>
          <div>
            {showEditForm && (
              <EditProfilForm onClose={handleShowEditForm} token={""} />
            )}
          </div>
        </ModalDialog>
      </Box>

      <Typography>{profile?.user.fullname}</Typography>
      <Typography>@{profile?.user.username}</Typography>
      <Typography>{profile?.bio}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography sx={{ fontWeight: 700 }}>200</Typography>
          <Typography sx={{ ml: 0.5 }}>Follower</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography sx={{ fontWeight: 700 }}>200</Typography>
          <Typography sx={{ ml: 0.5 }}>Following</Typography>
        </Box>
      </Box>
      <Box>
        <AntTabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{ borderBottom: "1px solid #3f3f3f" }}
        >
          <Tab label="All Post" {...a11yProps(0)} />
          <Tab label="Media" {...a11yProps(1)} />
        </AntTabs>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangesIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {threads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} callback={getThread} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ImageList sx={{ width: '100%', height: 400 }} cols={3} rowHeight={164}>
              {mediaFilter?.map((image, index) => (
                <ImageListItem key={index} sx={{ width: '100%', height: 'auto' }}>
                  <img
                    src={`${ _host_url + image}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${_host_url + image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt="image"
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Box>
  );
};

export default Profile;
