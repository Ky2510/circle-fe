import { Box, Typography } from '@mui/material';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      sx={{
        height: 'fit-content',
        borderRadius: '8px',
        bgcolor: "#262626",
        mt: '5px',
        textAlign: 'center',
        py: '20px'
      }}
    >
      <Box fontSize={14} ml={1} display="flex" flexDirection="row">
        <Typography ml={1}>Developed by</Typography>
        <Typography ml={1} fontSize={15} fontWeight="bold">Reza Liswara</Typography>
        <Typography color="gray" ml={1}> - </Typography>
        <FaGithub style={{ marginLeft: '1px', color: 'gray', width: '20px', height: '20px' }} />
        <FaLinkedin style={{ marginLeft: '2px', color: 'gray', width: '20px', height: '20px' }} />
        <FaFacebook style={{ marginLeft: '2px', color: 'gray', width: '20px', height: '20px' }} />
        <FaInstagram style={{ marginLeft: '2px', color: 'gray', width: '20px', height: '20px' }} />
      </Box>
      <Box color="gray" fontSize={12} mr={2}>
        Powered by Dumbways Indonesia - #1 Coding Bootcamp
      </Box>
    </Box>
  );
};

export default Footer;
