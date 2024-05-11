import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Menu from "../Components/menu";
import AppBar from "../Components/Appbar";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Paper,
  InputBase,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Tooltip,
  TableCell,
  TablePagination,
  Breadcrumbs,
  Link,
  Typography,
  Divider,
} from "@mui/material";
import MilestoneBar from "./MilestoneBar";
import '../css/confirmAlert.css';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import VisibilityIcon from "@mui/icons-material/Visibility";

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
  { id: "projectID", label: "Project ID", minWidth: 170 },
  { id: "projectName", label: "Project Name", minWidth: 170 },
  { id: "projectBudget", label: "Project Budget", minWidth: 170 },
  { id: "Locate", label: "Locate", minWidth: 170 },
  { id: "contractor", label: "Contractor", minWidth: 170 },
  { id: "Employees", label: "Employees", minWidth: 170 },
  { id: "Status", label: "Status", minWidth: 170 },
  { id: "startDate", label: "Start Date", minWidth: 170 },
  { id: "endDate", label: "End Date", minWidth: 170 },
  { id: "projectType", label: "Project Type", minWidth: 170 },
  { id: "milestone", label: "Milestone", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 170, align: "center" },
];

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const ComponentsRef = useRef();
  const ComponentsRefsingle = useRef();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchParams] = useSearchParams();
  const projectType = searchParams.get("type");

  useEffect(() => {
    fetchHandler().then((data) => setProjects(data.project));
  }, []);
  
  const searchFilteredProjects = projects.filter(
    (project) =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.contractor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjectsByType = projectType
    ? searchFilteredProjects.filter(
        (project) => project.projectType.toLowerCase() === projectType.toLowerCase()
      )
    : searchFilteredProjects;

  

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "All Projects Report",
    onAfterPrint: () => alert("All Projects Report successfully Downloaded!"),
  });

  const handlePrintSingle = (projectData) => {
    // Here you can generate a report for the specific vehicleData
    // For example, you can create a new window/tab with the vehicle details to print
    const reportWindow = window.open("", "_blank");
    reportWindow.document.write(
      `<html><head><title>Project Report</title></head><body><h1>Project Details</h1><p>Project ID : ${projectData.projectID
      }</p><p>Project Name : ${projectData.projectName}</p><p>Budget : ${projectData.projectBudget
      }</p><p>Project location : ${projectData.Locate}</p><p>Project owner : ${projectData.contractor
      }</p><p>Project Employees : ${projectData.Employees
      }</p><p>Project Start Date : ${formatDate(
        projectData.startDate
      )}</p><p>Project End Date : ${formatDate(
        projectData.endDate
      )}</p><p>Project Type : ${projectData.projectType
      }</p><p>Project Status : ${projectData.Status
      }</p><p>Project Milestone : ${projectData.milestone
      }</p><p>Project Description : ${projectData.description
      }</p></body></html>`
    );
    reportWindow.document.close();
    reportWindow.print();
    reportWindow.onAfterPrint = () => {
      alert("Project Report successfully Downloaded!");
    };
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || project.contractor.toLowerCase().includes(searchTerm.toLowerCase())
    


  );

  const handleAddClick = () => {
    navigate(`/Newprojects`);
  };

  const deleteHandler = async (_id) => {
    confirmAlert({
      title: 'Delete Project',
      message: 'Are you sure you want to delete this project?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:5000/projects/${_id}`);
              setProjects((prevProjects) =>
                prevProjects.filter((project) => project._id !== _id)
              );
            } catch (error) {
              console.error('Error deleting project:', error);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
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
      <div style={{ marginLeft: "200px", paddingTop: "20px" }}>
        <Box sx={{ p: 8 }} height={2}>
          <Breadcrumbs
            arial-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            <Link style={{ marginLeft: "20px" }} underline="hover" key="1" color="inherit" href="/projects">
              Projects
            </Link>
            <Typography key="3" color="text.primary">
              All Projects
            </Typography>
          </Breadcrumbs>
          <br/>
          <Paper sx={{ width: "100%", overflow: "hidden", padding: "15px",boxShadow: 'Auto' }}>
          <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "40px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search projects.."
                value={searchTerm}
                onChange={handleSearchChange}
                startAdornment={<SearchIcon fontSize="small" />}
              />
              
              <Box>
              <Tooltip title="Add Project">
                <IconButton
                  color="primary"
                  aria-label="add project"
                  onClick={handleAddClick}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Print">
                <IconButton
                  color="primary"
                  aria-label="print all"
                  onClick={handlePrint}
                >
                  <PrintIcon />
                </IconButton>
              </Tooltip>
              </Box>
            </Box>
            <h1
              gutterBottom
              variant="h4"
              component="div"
              sx={{ padding: "20px" ,textAlign: 'center'}}
            >
              Details of Projects
            </h1>
            <Divider />

            <br />
            
           
            

            <TableContainer ref={ComponentsRef}>
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ borderCollapse: "collapse" }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#b1c5d4",
                      fontWeight: "bold",
                      border: "none",
                      padding: "5px 10px",
                      "&:hover": {
                        backgroundColor: "#b1c5d4",
                      },
                    }}
                  >
                    <TableCell  sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold', textAlign: 'center',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}> Project ID</TableCell>
                    <TableCell  sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold', textAlign: 'center',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Project Name</TableCell>
                    <TableCell  sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold', textAlign: 'center',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}> Budget</TableCell>
                    <TableCell  sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold', textAlign: 'center',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Location</TableCell>

                    <TableCell  sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold', textAlign: 'center',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}> Owner</TableCell>
                    <TableCell  sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold', textAlign: 'center',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Employees</TableCell>
                    <TableCell  sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold', textAlign: 'center',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Status</TableCell>
                    <TableCell  sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold', textAlign: 'center',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Start Date</TableCell>
                    <TableCell  sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold', textAlign: 'center',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>End Date</TableCell>
                    <TableCell  sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold', textAlign: 'center',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Type</TableCell>
                    <TableCell  sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold', textAlign: 'center',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Milestone</TableCell>
                    <TableCell  sx={{backgroundColor: '#b1c5d4',fontWeight: 'bold', textAlign: 'center',border: 'none',padding: '5px 10px','&:hover': {backgroundColor: '#b1c5d4'}}}>Action</TableCell>


                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProjects
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row,index) => (
                      <TableRow
                        ref={ComponentsRefsingle}
                        key={row._id}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                          border: 'none',
                          padding: "8px 16px",
                        }}
                      >
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "8px 10px",
                            backgroundColor: "white",
                            textAlign: "center",
                          }}
                        >
                          {index+1}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 10px",
                            backgroundColor: "white",
                            textAlign: "center",
                          }}
                        >
                          {row.projectName}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 10px",
                            backgroundColor: "white",
                            textAlign: "center",
                          }}
                        >
                          {row.projectBudget}
                        </TableCell>

                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 10px",
                            backgroundColor: "white",
                            textAlign: "center",
                          }}
                        >
                          {row.Locate}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 10px",
                            backgroundColor: "white",
                            textAlign: "center",
                          }}
                        >
                          {row.contractor}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 10px",
                            backgroundColor: "white",
                            textAlign: "center",
                          }}
                        >
                          {row.Employees}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 10px",
                            backgroundColor: "white",
                            textAlign: "center",
                          }}
                        >
                          {row.Status}
                        </TableCell>

                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 10px",
                            backgroundColor: "white",
                            textAlign: "center",
                          }}
                        >
                          {formatDate(row.startDate)}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 10px",
                            backgroundColor: "white",
                            textAlign: "center",
                          }}
                        >
                          {formatDate(row.endDate)}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 10px",
                            backgroundColor: "white",
                            textAlign: "center",
                          }}
                        >
                          {row.projectType}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 10px",
                            backgroundColor: "white",
                            textAlign: "center",
                          }}
                        >
                          <MilestoneBar
                            progress={calculateMilestoneProgress(row)}
                          />
                        </TableCell>
                        
                        <TableCell  style={{ display: "flex", justifyContent: "start" }}  className="flex-container"
                          sx={{
                            border: "1px",
                            padding: "10px 10px",
                            backgroundColor: "white",
                            textAlign: "center",
                          }}
                        >
                          <div>
                           <Tooltip title="Update Project">
                          <IconButton
                            onClick={() =>
                              navigate(`/Updateprojects/${row._id}`)
                            }
                          >
                            <EditIcon
                              color="primary"
                              aria-label="edit"
                              sx={{
                                "&:hover": {
                                  color: "#00008b",
                                },
                                color: "",
                              }}
                            />
                          </IconButton>
                          </Tooltip>
                          </div>
                          <div>
                          <Tooltip title="Delete Project">
                          <IconButton onClick={() => deleteHandler(row._id)}>
                            <DeleteIcon
                              color="secondary"
                              aria-label="delete"
                              sx={{
                                "&:hover": {
                                  color: "#FF1B1B",
                                },
                                color: "#CF5C5C",
                              }}
                            />
                          </IconButton>
                          </Tooltip>
                          </div>
                          <div>
                          <Tooltip title="Print ">
                          <IconButton onClick={() => handlePrintSingle(row)}>
                            <PrintIcon
                              color="primary"
                              aria-label="edit"
                              sx={{
                                "&:hover": {
                                  color: "#00008b",
                                },
                                color: "",
                              }}
                            />
                          </IconButton>
                          </Tooltip>
                          </div>
<div>
                          <Tooltip title="View Details">
                          <IconButton
                            onClick={() =>
                              navigate(`/Projectdetails/${row._id}`)
                            }
                          >
                            <VisibilityIcon
                              color="primary"
                              aria-label="edit"
                              sx={{
                                "&:hover": {
                                  color: "#00008b",
                                },
                                color: "",
                              }}
                            />
                          </IconButton>
                          </Tooltip>
                          </div>
                        </TableCell>
                      
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredProjects.length}
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
