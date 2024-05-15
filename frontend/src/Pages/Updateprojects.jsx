import Menu from "../Components/menu";
import AppBar from "../Components/Appbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function UpdateProject() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/projects/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.project));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/projects/${id}`, {
        projectName: inputs.projectName,
        projectBudget: inputs.projectBudget,
        Locate: inputs.Locate,
        contractor: inputs.contractor,
        Employees: inputs.Employees,
        Status: inputs.Status,
        startDate: new Date(inputs.startDate).toISOString(),
        endDate: new Date(inputs.endDate).toISOString(),
        projectType: inputs.projectType,
        description: inputs.description,
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/allprojects"));
  };

  return (
    <div>
      <AppBar />
      <Menu />
      <div style={{ marginLeft: "255px", paddingTop: "80px" }}>
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
            <br />

            <Grid container spacing={4} justifyContent="center">
              {/* Add your form fields here, similar to the AddProject component */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Name"
                  name="projectName"
                  value={inputs.projectName || ""}
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
                  value={inputs.projectBudget || ""}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  type="number"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  name="Locate"
                  value={inputs.Locate || ""}
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
                  value={inputs.contractor || ""}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Maintainer"
                  name="Employees"
                  value={inputs.Employees || ""}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              
              

              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="Status">Status</InputLabel>
                  <Select
                    labelId="Status"
                    name="Status"
                    value={inputs.Status ? inputs.Status : ''}
                    onChange={handleChange}
                  >
                     <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Start">Start</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                  <MenuItem value="End">End</MenuItem>
                  <MenuItem value="Pause">Pause</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  name="startDate"
                  value={
                    inputs.startDate
                      ? new Date(inputs.startDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  type="date"
                  
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  name="endDate"
                  value={
                    inputs.endDate
                      ? new Date(inputs.endDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  type="date"
                  
                />
              </Grid>

              <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                  <InputLabel id="projectType">Project Type</InputLabel>
                  <Select
                    labelId="project Type"
                    name="projectType"
                    value={inputs.projectType ? inputs.projectType : ''}
                    onChange={handleChange}
                  >
                     <MenuItem value="Furniture">Furniture</MenuItem>
                  <MenuItem value="Elevator">Elevator</MenuItem>
                  <MenuItem value="Paint">Paint</MenuItem>
                  <MenuItem value="Water-Supply">Water-supply</MenuItem>
                  <MenuItem value="Tile">Tile</MenuItem>
                  <MenuItem value="Electrical">Electrical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
                

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Description"
                  name="projectDescription"
                  value={inputs.description || ""}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={0} sm={0}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    mt: 2,
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

export default UpdateProject;
