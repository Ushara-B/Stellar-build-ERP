import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import { TextField, Button, Grid, Box, MenuItem } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function Updateprojects() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(()=>{
        const fetchHandler = async ()=>{
            await axios
            .get(`http://localhost:5000/projects/${id}`)
            .then((res)=> res.data)
            .then((data)=> setInputs(data.project))
            .catch((error) => console.log("Error fetching project:", error));
        };
        fetchHandler();
    },[id]);

    const sendRequest = async (requestData) => {
        try {
          await axios.put(`http://localhost:5000/projects/${id}`, requestData);
          console.log("Project updated successfully!");
        } catch (error) {
          console.log("Error updating project:", error);
        }
      };

    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
      
        const requestData = {
          projectID: String(inputs.projectID),
          projectName: String(inputs.projectName),
          projectBudget: Number(inputs.projectBudget),
          Locate: String(inputs.Locate),
          contractor: String(inputs.contractor),
          Employees: String(inputs.Employees),
          Status: String(inputs.Status),
          projectType: String(inputs.projectType),
          description: String(inputs.description),
          startDate: inputs.startDate ? new Date(inputs.startDate).toISOString() : null,
          endDate: inputs.endDate ? new Date(inputs.endDate).toISOString() : null,
        };
      
        sendRequest(requestData).then(() => history('/Allprojects'));
      };
    
  
    
    return (
        <div>
      <AppBar />
      <Menu />
      <div style={{ marginLeft: "270px", paddingTop: "90px" }}>
        <Breadcrumbs
          arial-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <Link underline="hover" key="1" color="inherit" href="/projects">
            Project Dashboard
          </Link>
          <Link underline="hover" key="2" color="inherit" href="/allprojects">
            Projects List
          </Link>
          <Typography key="3" color="text.primary">
            Update Project
          </Typography>
        </Breadcrumbs>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "80%",
              maxWidth: 800,
              padding: 4,
              bgcolor: "background.paper",
              boxShadow: 3,
            }}
          >
            <Typography align="center" gutterBottom variant="h4" component="h2">
              <strong>Update Project Details</strong>
            </Typography>
            <br></br>

            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project ID"
                  name="projectID"
                  value={inputs.projectID}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Name"
                  name="projectName"
                  value={inputs.projectName}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Budget"
                  name="projectBudget"
                  value={inputs.projectBudget}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField  //GoogleMapComponent
                  label="Location"
                  name="Locate"
                  value={inputs.Locate}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contractor"
                  name="contractor"
                  value={inputs.contractor}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Employees"
                  name="Employees"
                  value={inputs.Employees}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={inputs.startDate}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={inputs.endDate}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Status"
                  name="Status"
                  value={inputs.Status}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  select
                >
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Start">Start</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                  <MenuItem value="End">End</MenuItem>
                  <MenuItem value="Pouse">Pause</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Type"
                  name="projectType"
                  value={inputs.projectType}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  select
                >
                  <MenuItem value="Furniture">Furniture</MenuItem>
                  <MenuItem value="Elevator">Elevator</MenuItem>
                  <MenuItem value="Paint">Paint</MenuItem>
                  <MenuItem value="Water-Supply">Water-supply</MenuItem>
                  <MenuItem value="Tile">Tile</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Description"
                  name="description"
                  value={inputs.description}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={3} >
                <Button 
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    mt: 7,
                    mb: 2,
                    height: "50px",
                    width: "150px",
                    borderRadius: "21px",
                    backgroundColor: "#1B1A55",
                    "&:hover": {
                      backgroundColor: "#16155d",
                    },
                  }}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
 
  
          </Box>  
        </Box>
      </div>
    </div>
  );
}

export default Updateprojects;
