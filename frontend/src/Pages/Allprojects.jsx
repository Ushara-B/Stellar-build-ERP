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
import { Box, Paper, InputBase, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination } from '@mui/material';

const URL = "http://localhost:5000/projects";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

function AllProjects() {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
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

    const handlePrintSingle = useReactToPrint({
        content: () => ComponentsRefsingle.current,
        documentTitle: 'Project Report',
        onAfterPrint: () => alert("Project Report successfully Downloaded!"),
    });

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

    return (
        <div style={{ marginLeft: '250px', paddingTop: '80px' }}>
            <AppBar />
            <Menu />
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '40px' }}>
                <InputBase
                    sx={{ flex: 1, marginLeft: '10px' }}
                    placeholder="Search project Details"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startAdornment={<SearchIcon />}
                />
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

            {noResults ? (
                <div>
                    <p>No results found</p>
                </div>
            ) : (
                <div>
                    <TableContainer component={Paper}>
                        <Table>
                            <div ref={ComponentsRef}>
                            <h1>Details of Projects</h1>
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
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projects.map((project) => (
                                    <TableRow ref={ComponentsRefsingle} key={project._id}>
                                        <TableCell>{project.projectName}</TableCell>
                                        <TableCell>{project.projectBudget}</TableCell>
                                        <TableCell>{project.Employees}</TableCell>
                                        <TableCell>{project.Status}</TableCell>
                                        <TableCell>{formatDate(project.startDate)}</TableCell>
                                        <TableCell>{formatDate(project.endDate)}</TableCell>
                                        <TableCell>{project.projectType}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => navigate(`/Updateprojects/${project._id}`)} className="update-button">Update</IconButton>
                                            <IconButton onClick={() => deleteHandler(project._id)} className="delete-button">Delete</IconButton>
                                            <IconButton onClick={() => handlePrintSingle()} className="report-button">Report</IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </div>
                        </Table>
                    </TableContainer>
                </div>
            )}
            <br /><br />
        </div>
    )
}

export default AllProjects;


/*
import React, { useRef, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import AppBar from '../Components/Appbar';
import Drawer from '../Components/menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const columns = [
  { id: 'projectName', label: 'Project Name', minWidth: 170 },
  { id: 'projectBudget', label: 'Project Budget', minWidth: 170 },
  { id: 'Employees', label: 'Employees', minWidth: 170 },
  { id: 'Status', label: 'Status', minWidth: 170 },
  { id: 'startDate', label: 'Start Date', minWidth: 170 },
  { id: 'endDate', label: 'End Date', minWidth: 170 },
  { id: 'projectType', label: 'Project Type', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' },
];

export default function AllProjects() {
  const [projects, setProjects] = React.useState([]);
  const [page, setPage] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/projects');
      setProjects(response.data.Projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const ComponentsRef = useRef();
  const handlePrintToPdf = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: 'All Projects',
  });

  const handleViewProject = (projectId) => {
    navigate(`/Viewproject/${projectId}`);
  };

  const handleUpdateProject = (projectId) => {
    navigate(`/Updateprojects/${projectId}`);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/projects/${projectId}`);
      fetchProjects(); // Refresh the project list after successful deletion
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const filteredProjects = projects && projects.length > 0 ? projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <>
      <AppBar />
      <Drawer />
      <div style={{ marginLeft: '260px', paddingTop: '100px' }}>
        <Paper sx={{ width: '100%', boxShadow: 'none' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearchChange}
              startAdornment={<SearchIcon fontSize="small" />}
            />
            <Box>
              <IconButton color="primary" aria-label="print" onClick={handlePrintToPdf}>
                <PrintIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Add project" onClick={() => navigate('/Newprojects')}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <TableContainer ref={ComponentsRef}>
            <Table stickyHeader aria-label="sticky table" sx={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        backgroundColor: '#b1c5d4',
                        fontWeight: 'bold',
                        border: 'none',
                        padding: '5px 10px',
                        '&:hover': {
                          backgroundColor: '#b1c5d4',
                        },
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProjects
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                        border: 'none',
                        padding: '8px 16px',
                      }}
                    >
                      <TableCell align="center" sx={{ border: 'none', padding: '10px 12px', backgroundColor: 'white' }}>
                        {row.projectName}
                      </TableCell>
                      <TableCell align="center" sx={{ border: 'none', padding: '10px 12px', backgroundColor: 'white' }}>
                        {row.startDate}
                      </TableCell>
                      <TableCell align="center" sx={{ border: 'none', padding: '10px 12px', backgroundColor: 'white' }}>
                        {row.endDate}
                      </TableCell>
                      <TableCell align="center" sx={{ border: 'none', padding: '10px 12px', backgroundColor: 'white' }}>
                        {row.projectType}
                      </TableCell>
                      <TableCell align="center" sx={{ border: 'none', padding: '10px 12px', backgroundColor: 'white' }}>
                        <IconButton
                          color="primary"
                          aria-label="view"
                          sx={{
                            '&:hover': {
                              color: '#00008b',
                            },
                            color: '',
                          }}
                          onClick={() => handleViewProject(row._id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          aria-label="edit"
                          sx={{
                            '&:hover': {
                              color: '#00008b',
                            },
                            color: '',
                          }}
                          onClick={() => handleUpdateProject(row._id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="delete"
                          sx={{
                            '&:hover': {
                              color: '#FF1B1B',
                            },
                            color: '#CF5C5C',
                          }}
                          onClick={() => handleDeleteProject(row._id)}
                        >
                          <DeleteIcon />
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
            count={filteredProjects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderTop: 'none',
              padding: '12px 16px',
            }}
          />
        </Paper>
      </div>
    </>
  );
}
*/
