import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "../Components/Appbar";
import Menu from "../Components/menu";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputBase,
  Breadcrumbs,
  Link,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";


const URL = "http://localhost:5000/projects";

const ProjectCategories = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => setProjects(data.project));
  }, []);

  const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
  };

  const getProjectTypes = () => {
    return [...new Set(projects.map((project) => project.projectType))];
  };

  const filteredProjectTypes = getProjectTypes().filter((projectType) =>
    projectType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectClick = (projectType) => {
    navigate(`/Allprojects?type=${projectType}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (

    <>
      <AppBar />
      <Menu />
      <div style={{ marginLeft: "200px", paddingTop: "80spx" }}>
        <Box sx={{ p: 10}} height={2}>
          <Breadcrumbs
            arial-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            <Link style={{ marginLeft: "20px" }} underline="hover" key="1" color="inherit" href="/projects">
              Projects
            </Link>
            <Typography key="3" color="text.primary">
              Project Categories
            </Typography>
          </Breadcrumbs>
          <br />
          <Box>
            <Typography variant="h4" gutterBottom color="text.primary" fontWeight="bold" textAlign={"center"}>
              Project Categories
            </Typography>
            <Paper 
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <InputBase 
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search categories..."
                value={searchTerm}
                onChange={handleSearchChange}
                startAdornment={<SearchIcon fontSize="small" />}
              />
            </Paper>
            <Grid container spacing={3}>
              {filteredProjectTypes.map((projectType, index) => (
                <Grid item xs={12} sm={6} md={6} key={projectType}>
                  <Card sx={{ backgroundColor: "#c9cacd" }}>
                    <CardContent>
                      <Typography variant="h5" component="div" color="text.primary" textAlign={"center"} >
                        {projectType}
                      </Typography>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow sx={{ backgroundColor: "#a9aaaf" }}>
                              <TableCell>Project Name</TableCell>
                              <TableCell>Project Budget</TableCell>
                              <TableCell>Owner</TableCell>
                              <TableCell>Start Date</TableCell>
                              <TableCell>End Date</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {projects
                              .filter((project) => project.projectType === projectType)
                              .map((project) => (
                                <TableRow
                                  key={project._id}
                                  onClick={() => handleProjectClick(projectType)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <TableCell>{project.projectName}</TableCell>
                                  <TableCell>{project.projectBudget}</TableCell>
                                  <TableCell>{project.contractor}</TableCell>
                                  <TableCell>{formatDate(project.startDate)}</TableCell>
                                  <TableCell>{formatDate(project.endDate)}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US");
};

export default ProjectCategories;