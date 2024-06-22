import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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

const PersonUI = () => {
  useEffect(() => {
    console.log("loaded");
    handleGetTableData();
  }, [])
  //for storing retrieved values from GET
  const [tableData, setTableData] = useState([]);

  // data is for storing the values to CREATE new entry (as part of POST mechanic)
  const [data, setData] = useState({
    PUID: "",
    Name: "",
    Email: "",
    Year: ""
  });

  // when user CHANGES VALUE in text field (typing), auto update and save values
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  //When user CLICKS SUBMIT complete axios call to CREATE NEW ENTRY (post)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.PUID || !data.Name || !data.Email || !data.Year) {
      alert("All fields must be filled out");
      return;
    }

    console.log("Submitting form", data);
    try {
      const response = await axios.post('http://localhost:3001/person', data); // Assuming you want to post to person endpoint
      console.log(response.data); // Assuming the response contains the created entry
      handleGetTableData();
      setData({
        PUID: "",
        Name: "",
        Email: "",
        Year: ""
      });
      // Handle success, maybe update UI or show a success message
    } catch (error) {
      console.error(error);
      // Handle error, maybe show an error message to the user
    }
  };

  //When user retrieves table data, send axios call to GET ALL from Table Person
  const handleGetTableData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/person');
      setTableData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // data is for storing the values to UPDATE existing entry (as part of PUT mechanic)
  const [update, setUpdate] = useState({
    PUID: "",
    Name: "",
    Email: "",
    Year: ""
  });

  // when user CHANGES VALUE in text field FOR UPDATE (typing), auto update and save values
  const handleChangeUpdate = (e) => {
    setUpdate({
      ...update,
      [e.target.name]: e.target.value
    });
  };

  //When user CLICKS UPDATE complete axios call to UPDATE EXISTING ENTRY (put)
  const handleUpdate = async (e) => {
    e.preventDefault();


    // console.log("Updating form...", update);
    try {
      const response = await axios.put(`http://localhost:3001/person/${update.PUID}`, update); // Assuming you want to post to person endpoint
      console.log(response.data); // Assuming the response contains the created entry
      handleGetTableData();
      // Handle success, maybe update UI or show a success message
    } catch (error) {
      console.error(error);
      // Handle error, maybe show an error message to the user
    }
  };


  const handleDelete = async (PUID) => {
    // e.preventDefault();
    if (!PUID) {
      console.error("PUID is missing");
      return;
    }
    // console.log("Deleting entry...", update);
    try {
      const response = await axios.delete(`http://localhost:3001/person/${PUID}`); // Assuming you want to post to person endpoint
      console.log("Deleted row with PUID: ${PUID}",response.data); // Assuming the response contains the created entry
      handleGetTableData();
      // Handle success, maybe update UI or show a success message
    } catch (error) {
      console.error("Error deleting row with PUID: ${PUID}", error);
      // Handle error, maybe show an error message to the user
    }
  };

  const handleDeleteEmptyRows = async () => {

    try {
      const response = await axios.delete("http://localhost:3001/person/empty");
      console.log(response);
    } catch (error) {
      console.error("Error fetching or deleting empty rows", error);
    }
  };

  return (
    <>
    <Typography variant="h6" component="h2" sx={{mt: 2, mb: 1}}> Create Student Entry </Typography>
    <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
      <Grid item xs={2.75}>
      <TextField
      fullWidth
        type="text"
        name="PUID"
        value={data.PUID}
        onChange={handleChange}
        placeholder="PUID"
      />
      </Grid>
      <Grid item xs={2.75}>
      <TextField
        fullWidth
        type="text"
        name="Name"
        value={data.Name}
        onChange={handleChange}
        placeholder="Name"
      />
      </Grid>
      <Grid item xs={2.75}>
      <TextField
        fullWidth
        type="text"
        name="Email"
        value={data.Email}
        onChange={handleChange}
        placeholder="Email"
      />
      </Grid>
      <Grid item xs={2.75}>
      <TextField
        fullWidth
        type="text"
        name="Year"
        value={data.Year}
        onChange={handleChange}
        placeholder="Year"
      />
      </Grid>
      <Grid item xs={1}>
      <Button variant='contained' sx={{ mt: 1, backgroundColor: "#D8D0C1", fontFamily: "Roboto, sans-serif", color: "#6F686D", '&:hover': {backgroundColor: '#D1BF9D'},}} type="submit">Submit</Button>
      </Grid>
    </Grid>
    </form>
    <Typography variant="h6" component="h2" sx={{mt: 2, mb: 1}}> View Student Entries </Typography>
    <TableContainer component={Paper} sx={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
      <Table sx={{ minWidth: 650 }} aria-label="get person table">
        <TableHead>
          <TableRow>
            <TableCell>PUID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Year</TableCell>
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
              <TableCell align="right">{row.Name}</TableCell>
              <TableCell align="right">{row.Email}</TableCell>
              <TableCell align="right">{row.Year}</TableCell>
              <Button variant="contained" color="error" sx={{ mt: 1, ml: 2, backgroundColor: "#C9716B", fontFamily: "Roboto, sans-serif", color: "#ffffff", '&:hover': {backgroundColor: '#C14D44'},}} onClick={() => handleDelete(row.PUID)}>Delete</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Typography variant="h6" component="h2" sx={{mt: 2, mb: 1}}> Update Student Entry </Typography>
    <form onSubmit={handleUpdate}>
    <Grid container spacing={2}>
    <Grid item xs={2.75}>
      <TextField
        fullWidth
        type="text"
        name="PUID"
        value={update.PUID}
        onChange={handleChangeUpdate}
        placeholder="PUID"
      />
      </Grid>
      <Grid item xs={2.75}>
      <TextField
        fullWidth
        type="text"
        name="Name"
        value={update.Name}
        onChange={handleChangeUpdate}
        placeholder="Name"
      />
      </Grid>
      <Grid item xs={2.75}>
      <TextField
        fullWidth
        type="text"
        name="Email"
        value={update.Email}
        onChange={handleChangeUpdate}
        placeholder="Email"
      />
      </Grid>
      <Grid item xs={2.75}>
      <TextField
        fullWidth
        type="text"
        name="Year"
        value={update.Year}
        onChange={handleChangeUpdate}
        placeholder="Year"
      />
      </Grid>
      <Grid item xs={1}>
      <Button variant='contained'sx={{ mt: 1, backgroundColor: "#D8D0C1", fontFamily: "Roboto, sans-serif", color: "#6F686D", '&:hover': {backgroundColor: '#D1BF9D'},}} type="submit">Update</Button>
      </Grid>
    </Grid>
    </form>
    </>
  );
};

export default PersonUI;
