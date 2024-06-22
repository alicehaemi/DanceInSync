import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './styles.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/500.css';

const AuditionUI = () => {
  useEffect(() => {
    console.log("loaded");
    handlePresp();
    handleFinalsp();
    handleGetTableData();
  }, [])

  //for storing retrieved values from GET
  const [tableData, setTableData] = useState([]);

  // data is for storing the values to CREATE new entry (as part of POST mechanic)
  const [data, setData] = useState({
    PUID: "",
    Years_experience: "",
    Song_genre: "",
    Duration: "",
    pre_placement: "",
    final_placement: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [report, setReportContent] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // when user CHANGES VALUE in text field (typing), auto update and save values
  const handleChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  //When user CLICKS SUBMIT complete axios call to CREATE NEW ENTRY (post)
  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log("Submitting form", data);
    try {
      const response = await axios.post('http://localhost:3001/audition', data); // Assuming you want to post to person endpoint
      console.log(response.data); // Assuming the response contains the created entry
      handleGetTableData();
      // Handle success, maybe update UI or show a success message
    } catch (error) {
      console.error(error);
      // Handle error, maybe show an error message to the user
    }
  };

  //When user retrieves table data, send axios call to GET ALL from Table Person
  const handleGetTableData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/audition');
      setTableData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  //below
  const [del, setDel] = useState("");

  const handleChangeDelete = (e) => {
    setDel(e.target.value);
  };

  const handleDelete = async (e) => {
    // e.preventDefault();

    console.log("Deleting entry...", e);
    try {
      // const response = await axios.delete(`http://localhost:3001/audition/${del}`); // Assuming you want to post to person endpoint
      const response = await axios.delete(`http://localhost:3001/audition/${e}`);
      console.log(response.data); // Assuming the response contains the created entry
      handleGetTableData();
      // Handle success, maybe update UI or show a success message
    } catch (error) {
      console.error(error);
      // Handle error, maybe show an error message to the user
    }
  };

  //for storing retrieved values from GET PRESP
  const [prespData, setPrespData] = useState([]);

  //W stored procedure (preplacement)
  const handlePresp = async () => {
    try {
      const response = await axios.get('http://localhost:3001/audition/presp');
      console.log(response.data);
      setPrespData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const [finalspData, setFinalspData] = useState([]);

  //W stored procedure (finalplacement)
  const handleFinalsp = async () => {
    try {
      const response = await axios.get('http://localhost:3001/audition/finalsp');
      console.log(response.data);
      setFinalspData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const generateReport = (entry) => {
    // Logic to generate report based on entry.final_placement
    const perfEntries = tableData.filter(item => item.final_placement === entry.final_placement);
    const totalDuration = perfEntries.reduce((acc, item) => acc + parseFloat(item.Duration), 0);
    const avgDuration = totalDuration / perfEntries.length;

    const totalYearsExp = perfEntries.reduce((total, item) => total + parseFloat(item.Years_experience), 0);
    const avgYears = totalYearsExp / perfEntries.length;

    const report = `Summary for ${entry.final_placement} team\n\nAverage Duration of audition for ${entry.final_placement} team: ${avgDuration}\nAverage Years of Experience for ${entry.final_placement} team: ${avgYears} year(s)`;

    setReportContent(report);
    setShowModal(true);

    console.log(`Report for ${entry.final_placement} team\n\n - Average years: ${avgYears}, ${totalYearsExp}`);

  }
  const [updatedata, setupdateData] = useState({
    PUID: "",
    Years_experience: "",
    Song_genre: "",
    Duration: "",
    pre_placement: "",
    final_placement: ""
  });

  const handleChangeUpdate = (e) => {
    setupdateData({
      ...updatedata,
      [e.target.name]: e.target.value
    });
  };

  //When user CLICKS UPDATE complete axios call to UPDATE EXISTING ENTRY (put)
  const handleUpdate = async (e) => {
    e.preventDefault();


    console.log("Updating form...", updatedata);
    try {
      const response = await axios.put(`http://localhost:3001/audition/${updatedata.PUID}`, updatedata); // Assuming you want to post to person endpoint
      console.log(response.data); // Assuming the response contains the created entry
      handleGetTableData();
      // Handle success, maybe update UI or show a success message
    } catch (error) {
      console.error(error);
      // Handle error, maybe show an error message to the user
    }
  };

  return (
    <>
    <Typography variant="h6" component="h2" sx={{mt: 2, mb: 1}}> Create Audition Entry </Typography>
    <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
      <Grid item xs={3.65}>
      <TextField
        fullWidth
        type="text"
        name="PUID"
        value={data.PUID}
        onChange={handleChange}
        placeholder="PUID"
      />
      </Grid>
      <Grid item xs={3.65}>
        <TextField
          fullWidth
          type="text"
          name="Years_experience"
          value={data.Years_experience}
          onChange={handleChange}
          placeholder="Years of Experience (nearest year)"
        />
      </Grid>
      <Grid item xs={3.65}>
        <TextField
          fullWidth
          type="text"
          name="Song_genre"
          value={data.Song_genre}
          onChange={handleChange}
          placeholder="Song Genre"
        />
      </Grid>
      <Grid item xs={3.65}>
        <TextField
          fullWidth
          type="text"
          name="Duration"
          value={data.Duration}
          onChange={handleChange}
          placeholder="Duration"
        />
      </Grid>
      <Grid item xs={3.65}>
      <FormControl fullWidth>
        <InputLabel id="presp-label">Pre Placement</InputLabel>
        <Select fullWidth labelId="presp-label" name="pre_placement" value={data.pre_placement} label="Pre Placement" onChange={handleChange}>
          {prespData.map((option, index) => (
            <MenuItem key={index} value={option.pre_placement}>
              {option.pre_placement}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3.65}>
      <FormControl fullWidth>
      <InputLabel id="finalsp-label">Final Placement</InputLabel>
        <Select fullWidth labelId="finalsp-label" name="final_placement" value={data.final_placement} label="Final Placement" onChange={handleChange}>
          {finalspData.map((option, index) => (
            <MenuItem key={index} value={option.final_placement}>
              {option.final_placement}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1}>
      <Button variant="contained" sx={{ mt: 1, backgroundColor: "#D8D0C1", fontFamily: "Roboto, sans-serif", color: "#6F686D", '&:hover': {backgroundColor: '#D1BF9D'},}}type="submit">Submit</Button>
      </Grid>
    </Grid>
    </form>
    
    <Typography variant="h6" component="h2" sx={{mt: 2, mb: 1}}> View Audition Entries </Typography>
    {/* <Button onClick={handleGetTableData}>Refresh Audition Data Table</Button> */}
      <TableContainer component={Paper} sx={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
      <Table sx={{ minWidth: 650 }} aria-label="get audition table">
        <TableHead>
          <TableRow>
            <TableCell>PUID</TableCell>
            <TableCell align="right">Years of Experience</TableCell>
            <TableCell align="right">Song Genre</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Pre Placement</TableCell>
            <TableCell align="right">Final Placement</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow
              key={row.PUID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.PUID}
              </TableCell>
              <TableCell align="right">{row.Years_experience}</TableCell>
              <TableCell align="right">{row.Song_genre}</TableCell>
              <TableCell align="right">{row.Duration}</TableCell>
              <TableCell align="right">{row.pre_placement}</TableCell>
              <TableCell align="right">{row.final_placement}</TableCell>
              <Button variant="contained" color="success" sx={{ mt: 1, ml: 2, backgroundColor: "#ACBDC1", fontFamily: "Roboto, sans-serif", color: "#ffffff", '&:hover': {backgroundColor: '#60939E'},}} onClick={() => generateReport(row)} >Generate Report</Button>
              <Button variant="contained" color="error" sx={{ mt: 1, ml: 2, backgroundColor: "#C9716B", fontFamily: "Roboto, sans-serif", color: "#ffffff", '&:hover': {backgroundColor: '##C14D44'},}} onClick={() => handleDelete(row.PUID)}>Delete</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <h2>Report</h2>
        <pre>{report}</pre>
      </Modal>

    <Typography variant="h6" component="h2" sx={{mt: 2, mb: 1}}> Update Audition Entry </Typography>
    <form onSubmit={handleUpdate}>
    <Grid container spacing={2}>
      <Grid item xs={3.65}>
      <TextField
        fullWidth
        type="text"
        name="PUID"
        value={updatedata.PUID}
        onChange={handleChangeUpdate}
        placeholder="PUID"
      />
      </Grid>
      <Grid item xs={3.65}>
      <TextField
        fullWidth
        type="text"
        name="Years_experience"
        value={updatedata.Years_experience}
        onChange={handleChangeUpdate}
        placeholder="Years of Experience (nearest year)"
      />
      </Grid>
      <Grid item xs={3.65}>
      <TextField
        fullWidth
        type="text"
        name="Song_genre"
        value={updatedata.Song_genre}
        onChange={handleChangeUpdate}
        placeholder="Song Genre"
      />
      </Grid>
      <Grid item xs={3.65}>
      <TextField
        fullWidth
        type="text"
        name="Duration"
        value={updatedata.Duration}
        onChange={handleChangeUpdate}
        placeholder="Duration"
      />
      </Grid>
      <Grid item xs={3.65}>
      <FormControl fullWidth>
        <InputLabel id="presp-label">Pre Placement</InputLabel>
        <Select fullWidth labelId="presp-label" name="pre_placement" value={updatedata.pre_placement} label="Pre Placement" onChange={handleChangeUpdate}>
          {prespData.map((option, index) => (
            <MenuItem key={index} value={option.pre_placement}>
              {option.pre_placement}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3.65}>
      <FormControl fullWidth>
      <InputLabel id="finalsp-label">Final Placement</InputLabel>
        <Select fullWidth labelId="finalsp-label" name="final_placement" value={updatedata.final_placement} label="Final Placement" onChange={handleChangeUpdate}>
          {finalspData.map((option, index) => (
            <MenuItem key={index} value={option.final_placement}>
              {option.final_placement}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1}>
      <Button variant="contained" sx={{ mt: 1, backgroundColor: "#D8D0C1", fontFamily: "Roboto, sans-serif", color: "#6F686D", '&:hover': {backgroundColor: '#D1BF9D'},}}type="submit">Update</Button>
      </Grid>
    </Grid>
    </form>
    </>
  );
};

export default AuditionUI;
