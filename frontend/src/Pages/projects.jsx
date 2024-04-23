import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Menu from "../Components/menu";
import AppBar from "../Components/Appbar";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { Box, Paper, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";

const URL = "http://localhost:5000/projects";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [projectCategories, setProjectCategories] = useState({});
  const [startProjects, setStartProjects] = useState(0);
  const [soonToEndProjects, setSoonToEndProjects] = useState([]);
  const navigate = useNavigate();
  const ComponentsRef = useRef();

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

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Project Dashboard",
    onAfterPrint: () => alert("Project Dashboard successfully Downloaded!"),
  });

  const handleAddClick = () => {
    navigate(`/Newprojects`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
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
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ marginLeft: "250px", paddingTop: "80px", position: "relative" }}>
      <AppBar />
      <Menu />
      
      <div ref={ComponentsRef}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
  <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50, backgroundColor: "#708090" }}>
    <h2>Total Projects</h2>
    <p>{totalProjects}</p>
  </Paper>
  <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50, backgroundColor: "#708090" }}>
    <h2>Total Projects</h2>
    <p>{totalProjects}</p>
  </Paper>
  <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50, backgroundColor: "#708090" }}>
    <h2>Total Projects</h2>
    <p>{totalProjects}</p>
  </Paper>
  <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50, backgroundColor: "#87CEEB" }}>
    <h2>Start Projects</h2>
    <p>{startProjects}</p>
  </Paper>
</div>

          
          

          <div style={{ width: "30%", height: "30%" }}>
            <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50 }}>
              <h2>Project Categories</h2>
              {Object.entries(projectCategories).map(([category, count], index) => (
                `${category}: ${count}${index === Object.keys(projectCategories).length - 1 ? "" : "| "}`
              ))}
              <Doughnut data={projectTypeData} />
            </Paper>
            
            <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50 }}>
              <h2>Project Categories</h2>
              {Object.entries(projectCategories).map(([category, count], index) => (
                `${category}: ${count}${index === Object.keys(projectCategories).length - 1 ? "" : "| "}`
              ))}
              <Doughnut data={projectTypeData} />
            </Paper>
          </div>
          <div style={{ width: "30%", height: "30%" }}>
            <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50 }}>
              <h2>Soon-to-End Projects</h2>
              {soonToEndProjects.map((project) => (
                <Typography key={project._id}>
                  - {project.projectName}: Ending on {formatDate(project.endDate)}
                </Typography>
              ))}
            </Paper>
          </div>
        
      </div>

      <br />
      <br />
      {/* Background image */}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          right: "5px",
          width: "450px",
          height: "300px",
          backgroundImage: "url(https://kingsedu.ac/wp-content/uploads/2022/03/project-mangement-courses.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: "-1",
        }}
      />
      <Box sx={{ display: "lef", alignItems: "center", marginRight: "40px" }}>
        <IconButton color="primary" aria-label="add project" onClick={handleAddClick}>
          <AddIcon />
        </IconButton>
        <IconButton color="primary" aria-label="print all" onClick={handlePrint}>
          <PrintIcon />
        </IconButton>
      </Box>
    </div>
  );
}

export default ProjectDashboard;