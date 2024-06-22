import React, {useState} from 'react';
import axios from 'axios';

import PersonUI from "./PersonUI";
import AuditionUI from "./AuditionUI";
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/500.css';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

const App = () => {
  return (
    <div className="App">
      <Typography variant="h4" component="h2" sx={{mt: 2, mb: 1, textAlign: "center", backgroundColor: "#E0D3DE", padding: "15px", borderRadius: "4px"}}> DanceInSync </Typography>
      <Box sx={{marginBottom: 2, justifyContent: "center"}}>
        <Card sx={{ border: "8px solid #B3B492", borderRadius: '10px', padding: "20px"}}>
          <Typography variant="h5" component="h2" sx={{mt: 2, mb: 1, textAlign: "center"}}>
            <span style={{backgroundColor: "#6F686D", padding: '8px 8px 8px 8px', borderRadius: '8px', color: "#ffffff"}}> Input Student Information
            </span>
          </Typography>
          <PersonUI/>
        </Card>
      </Box>
      <Box sx={{marginBottom: 2, justifyContent: "center"}}>
        <Card sx={{ border: "8px solid #B3B492", borderRadius: '10px', padding: "20px"}}>
          <Typography variant="h5" component="h2" sx={{mt: 2, mb: 1, textAlign: "center"}}>
            <span style={{backgroundColor: "#6F686D", padding: '8px 8px 8px 8px', borderRadius: '8px', color: "#ffffff"}}>
            Input Audition Results 
            </span> 
            </Typography>
          <AuditionUI/>
        </Card>
      </Box>
    </div>
  );
};

export default App;

