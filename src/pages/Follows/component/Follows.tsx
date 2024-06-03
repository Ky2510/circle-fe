import { Box, Tab, Tabs, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import UserFollower from "../../../components/UserFollower";
import UserFollowing from "../../../components/UserFollowing";

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

const Follow = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);


  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangesIndex = (index: number) => {
    setValue(index);
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
          <Tab label="Followers" {...a11yProps(0)} />
          <Tab label="Following" {...a11yProps(1)} />
        </AntTabs>
        <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangesIndex}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
                <UserFollower />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <UserFollowing />
            </TabPanel>
        </SwipeableViews>
      </Box>
    </Box>
  );
};

export default Follow;