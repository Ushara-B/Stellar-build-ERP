import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Menu from "../Components/menu";
import AppBar from "../Components/Appbar";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { Box, Paper, Typography, Button } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
import Chart from "chart.js/auto";
import {
  
  
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  
  TableCell,
  
} from "@mui/material";

const URL = "http://localhost:5000/projects";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [projectCategories, setProjectCategories] = useState({});
  const [startProjects, setStartProjects] = useState(0);
  const [endProjects, setEndProjects] = useState(0);
  const [soonToEndProjects, setSoonToEndProjects] = useState([]);
  const navigate = useNavigate();
  const ComponentsRef = useRef();
  const [maintainerProjects, setMaintainerProjects] = useState({});

  useEffect(() => {
    fetchHandler().then((data) => {
      setProjects(data.project);
      setTotalProjects(data.project.length);

      
  

      // Calculate project categories
      const categories = {};
      data.project.forEach((project) => {
        const category = project.projectType;
        categories[category] = (categories[category] || 0) + 1;
      });
      setProjectCategories(categories);

      // Calculate start projects
      const startProjects = data.project.filter((project) => {
        const startDate = new Date(project.startDate);
        const currentDate = new Date();
        return startDate <= currentDate;
      }).length;
      setStartProjects(startProjects);

      

      // Calculate end projects
      const endProjects = data.project.filter((project) => {
        const endDate = new Date(project.endDate);
        const currentDate = new Date();
        return endDate <= currentDate;
      }).length;
      setEndProjects(endProjects);

      // Calculate soon-to-end projects
      const oneMonthFromNow = new Date();
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
      const tempSoonToEndProjects = data.project.filter((project) => {
        const endDate = new Date(project.endDate);
        return endDate <= oneMonthFromNow;
      });
      setSoonToEndProjects(tempSoonToEndProjects);
    });
  }, []);

  useEffect(() => {
    fetchHandler().then((data) => {
      setProjects(data.project);
      setTotalProjects(data.project.length);
  
      // ... (existing code)
  
      // Group projects by maintainers
      const maintainerProjects = {};
      data.project.forEach((project) => {
        const maintainer = project.Employees;
        if (!maintainerProjects[maintainer]) {
          maintainerProjects[maintainer] = [];
        }
        maintainerProjects[maintainer].push(project);
      });
      setMaintainerProjects(maintainerProjects);
    });
  }, []);

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Project Dashboard",
    onAfterPrint: () => alert("Project Dashboard successfully Downloaded!"),
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };
  const handleAddClick = () => {
    navigate(`/Newprojects`);
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

  const milestoneChartData = {
    labels: projects.map((project) => project.projectName), // Use project names as labels
    datasets: [
      {
        label: "Project Milestone Progress",
        data: projects.map((project) => calculateMilestoneProgress(project)), // Use milestone progress values
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 1,
      },
    ],
  };
  const barChartOptions = {
    maintainAspectRatio: false, // Set this to false to control the chart size manually
    responsive: true,
    scales: {
      x: {
        ticks: {
          autoSkip: false, // Set to false to show all x-axis labels
        },
      },
    },
    plugins: {
      legend: {
        display: true, // Show the legend
        position: "bottom", // Position of the legend
      },
    },
  };

  const projectTypeData = {
    labels: Object.keys(projectCategories),
    datasets: [
      {
        label: "Project Types",
        data: Object.values(projectCategories),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(66, 73, 73, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };



  return (
    <div
      style={{ marginLeft: "250px", paddingTop: "80px", position: "relative" }}
    >
      <AppBar />
      <Menu />

      <div ref={ComponentsRef}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Paper
            sx={{
              p: 2,
              m: 2,
              flexGrow: 1,
              minWidth: 50,
              backgroundColor: "#708090",
            }}
          >
            <h2 style={{ color: "black", textAlign: "center" }}>
              Total Projects
            </h2>
            <p style={{ color: "black", textAlign: "center" }}>
              {totalProjects}
            </p>
          </Paper>
          <Paper
            sx={{
              p: 2,
              m: 2,
              flexGrow: 1,
              minWidth: 50,
              backgroundColor: "#87CEEB",
            }}
          >
            <h2 style={{ color: "black", textAlign: "center" }}>
              Existing Projects
            </h2>
            <p style={{ color: "black", textAlign: "center" }}>
              {startProjects}
            </p>
          </Paper>
          <Paper
            sx={{
              p: 2,
              m: 2,
              flexGrow: 1,
              minWidth: 50,
              backgroundColor: "#87CEEB",
            }}
          >
            <h2 style={{ color: "black", textAlign: "center" }}>
              End Projects
            </h2>
            <p style={{ color: "black", textAlign: "center" }}>{endProjects}</p>
          </Paper>

          <Paper sx={{ p: 2, m: 2, minWidth: 50, backgroundColor: "#87CEEB" }}>
            <Button
              style={{
                backgroundColor: "#708090",
                color: "white",
                margin: "10px",
              }}
              variant="centered"
              startIcon={<AddIcon />}
              sx={{ p: 2, m: 2, flexGrow: 1, backgroundColor: "#87CEEB" }}
              onClick={handleAddClick}
            >
              <h2 style={{ color: "white" }}>Add New Project</h2>
            </Button>
          </Paper>
        </div>

        <div
          style={{ display: "flex", justifyContent: "start" }}
          className="flex-container"
        >
          <div>
            <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50 }}>
              <h2 style={{ textAlign: "center" }}>Project Categories</h2>
              {Object.entries(projectCategories).map(
                ([category, count], index) =>
                  `${category}: ${count}${
                    index === Object.keys(projectCategories).length - 1
                      ? ""
                      : "| "
                  }`
              )}
              <Doughnut data={projectTypeData} />
            </Paper>
          </div>
          <div>
  <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50 }}>
    <h2 style={{ textAlign: "center" }}>Project Milestone Progress</h2>
    <div style={{ height: "440px", width: "700px" }}>
      <Bar data={milestoneChartData} options={barChartOptions} />
    </div>
  </Paper>
</div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "start" }}
          className="flex-container"
        >
          <div>
            <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50 }}>
              <h2>Soon-to-End Projects</h2>
              {soonToEndProjects.map((project) => (
                <Typography key={project._id}>
                  {project.projectName} : Ending on{" "}
                  {formatDate(project.endDate)}
                  <br/>
                  <br/>
                  
                </Typography>
              ))}
            </Paper>
            <br/>
          </div>
          <div>
          <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50 }}>
  <h2 style={{ textAlign: "center" }}>Maintainer and Their Projects</h2>
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          {Object.keys(maintainerProjects).map((maintainer) => (
            <TableCell key={maintainer} align="center">
              {maintainer}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {Object.entries(maintainerProjects).map(([maintainer, projects]) => (
            <TableCell key={maintainer}>
              {projects.map((project) => (
                <Typography key={project._id}> {project.projectName}</Typography>
              ))}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
</Paper>
  </div>
        </div>
        
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "2px",
            width: "450px",
            height: "300px",
            backgroundImage:
              "url(https://kingsedu.ac/wp-content/uploads/2022/03/project-mangement-courses.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <br />
      <br />
      {/* Background image */}
      <Box
        sx={{
          display: "left",
          alignItems: "center",
          marginBottom: "20px",
          marginLeft: "30px",
        }}
      >
        <IconButton
          color="primary"
          aria-label="add project"
          onClick={handleAddClick}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="print all"
          onClick={handlePrint}
        >
          <PrintIcon />
        </IconButton>
      </Box>
    </div>
  );
}

export default ProjectDashboard;
