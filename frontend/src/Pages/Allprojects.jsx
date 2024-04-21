import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import SearchIcon from '@mui/icons-material/Search';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Box, Paper, InputBase, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Breadcrumbs, Link, Typography, Divider } from '@mui/material';
import MilestoneBar from './MilestoneBar';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import VisibilityIcon from '@mui/icons-material/Visibility';

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";



const URL = "http://localhost:5000/projects";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: 'projectName', label: 'Project Name', minWidth: 170 },
  { id: 'projectBudget', label: 'Project Budget', minWidth: 170 },
  { id: 'Employees', label: 'Employees', minWidth: 170 },
  { id: 'Status', label: 'Status', minWidth: 170 },
  { id: 'startDate', label: 'Start Date', minWidth: 170 },
  { id: 'endDate', label: 'End Date', minWidth: 170 },
  { id: 'projectType', label: 'Project Type', minWidth: 170 },
  { id: 'milestone', label: 'Milestone', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' },
];


const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const ComponentsRef = useRef();
  const ComponentsRefsingle = useRef();

  useEffect(() => {
    fetchHandler().then((data) => setProjects(data.project));
  }, []);

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: 'All Projects Report',
    onAfterPrint: () => alert("All Projects Report successfully Downloaded!"),
  });

  const handlePrintSingle = (projectData) => {
    // Here you can generate a report for the specific vehicleData
    // For example, you can create a new window/tab with the vehicle details to print
    const reportWindow = window.open("", "_blank");
    reportWindow.document.write(`<html><head><title>Project Report</title></head><body><h1>Project Details</h1><p>Project Name : ${projectData.projectName}</p><p>Budget : ${projectData.projectBudget}</p><p>Project Employees : ${projectData.Employees}</p><p>Project Start Date : ${formatDate(projectData.startDate)}</p><p>Project End Date : ${formatDate(projectData.endDate)}</p><p>Project Type : ${projectData.projectType}</p><p>Project Status : ${projectData.Status}</p><p>Project Milestone : ${projectData.milestone}</p></body></html>`);
    reportWindow.document.close();
    reportWindow.print();
    reportWindow.onAfterPrint = () => {
      alert("Project Report successfully Downloaded!");
      
    }
    
};



  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredProjects = data.project.filter((project) =>
        Object.values(project).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        ));
      setProjects(filteredProjects);
      setNoResults(filteredProjects.length === 0);
    });
  };

  const handleAddClick = () => {
    navigate(`/Newprojects`);
  };

  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/projects/${_id}`);
      setProjects(prevProjects => prevProjects.filter(project => project._id !== _id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const calculateMilestoneProgress = (project) => {
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);
    const currentDate = new Date();

    if (currentDate < startDate) {
      return 0; // Project hasn't started yet
    } else if (currentDate >= endDate) {
      return 100; // Project is completed
    } else {
      const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
      const elapsedDays = (currentDate - startDate) / (1000 * 60 * 60 * 24);
      const progress = (elapsedDays / totalDays) * 100;
      return Math.round(progress);
    }
  };

  return (
    <>
    <AppBar />
    <Menu />
    <div style={{ marginLeft: '250px', paddingTop: '20px' }}>
     
      <Box sx={{ p: 9 }} height={2}>
        <Breadcrumbs
          arial-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <Link underline="hover" key="1" color="inherit" href="/projects">
            Projects
          </Link>
          <Typography key="3" color="text.primary">
            All Projects
          </Typography>
        </Breadcrumbs>

        <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ padding: "20PX" }}
          >
            All Projects
          </Typography>
          <Divider />

          <br />
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '40px' }}>
            <InputBase
              sx={{ flex: 1, marginLeft: '10px' }}
              placeholder="Search project Details"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startAdornment={<SearchIcon fontSize="small" />}
            />
            <Box>
            <IconButton color="primary" aria-label="search" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
            <IconButton color="primary" aria-label="add project" onClick={handleAddClick}>
              <AddIcon />
            </IconButton>
            <IconButton color="primary" aria-label="print all" onClick={handlePrint}>
              <PrintIcon />
            </IconButton>
          </Box>
          </Box>


          <TableContainer ref={ComponentsRef}>
            <Table stickyHeader
                aria-label="sticky table"
                sx={{ borderCollapse: "collapse" }}
              >
             
               
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: '#b1c5d4',
                      fontWeight: 'bold',
                      border: 'none',
                      padding: '5px 10px',
                      '&:hover': {
                        backgroundColor: '#b1c5d4',
                      },
                    }}>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Project Budget</TableCell>
                    <TableCell>Employees</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Project Type</TableCell>
                    <TableCell>Milestone</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow ref={ComponentsRefsingle} key={row._id}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                          border: "none",
                          padding: "8px 16px",
                        }}
                      >
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          {row.projectName}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          {row.projectBudget}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          {row.Employees}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          {row.Status}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          {formatDate(row.startDate)}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          {formatDate(row.endDate)}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          {row.projectType}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          <MilestoneBar progress={calculateMilestoneProgress(row)} />
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                           <IconButton onClick={() => navigate(`/Updateprojects/${row._id}`)} >
                                                <EditIcon
                                                    color="primary"
                                                    aria-label="edit"
                                                    sx={{
                                                      '&:hover': {
                                                        color: '#00008b',
                                                      },
                                                      color: '',
                                                    }} 
                                                />
                                                </IconButton>
                                                <IconButton onClick={() => deleteHandler(row._id)} >
                                                    <DeleteIcon  color="secondary"
                                                                aria-label="delete"
                                                                sx={{
                                                                    '&:hover': {
                                                                    color: '#FF1B1B',
                                                                    },
                                                                    color: '#CF5C5C',
                                                                    }}/>
                                                </IconButton>
                                                <IconButton onClick={() => handlePrintSingle(row)} >
                                                    <PrintIcon
                                                     color="primary"
                                                     aria-label="edit"
                                                     sx={{
                                                       '&:hover': {
                                                         color: '#00008b',
                                                       },
                                                       color: '',
                                                     }}  />
                                                </IconButton>
                                                <IconButton onClick={() => navigate(`/Projectdetails/${row._id}`)} >
                                                    <VisibilityIcon
                                                     color="primary"
                                                     aria-label="edit"
                                                     sx={{
                                                       '&:hover': {
                                                         color: '#00008b',
                                                       },
                                                       color: '',
                                                     }}

                                                     /> 
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                    ))}
                </TableBody>

            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={projects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderTop: "none",
              padding: "12px 16px",
            }}
          />
        </Paper>
      </Box>
    </div>
    </>
  );
}

