import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Paper } from "@mui/material";

const URL = "http://localhost:5000/users";

export default function SHome() {
  const fetchHandlerUsers = async () => {
    return await axios.get(URL).then((res) => res.data);
  };

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalEmployers, setTotalEmployers] = useState(0);
  const [totalManagers, setTotalManagers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  useEffect(() => {
    fetchHandlerUsers()
      .then((data) => {
        if (data.Users && Array.isArray(data.Users)) {
          setTotalUsers(data.Users.length);
          const employers = data.Users.filter((user) => user.role === "employer");
          setTotalEmployers(employers.length);
          const managers = data.Users.filter((user) => user.role === "manager");
          setTotalManagers(managers.length);
          const admins = data.Users.filter((user) => user.role === "admin");
          setTotalAdmins(admins.length);
        } else {
          console.error("Invalid data structure from API:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div>
      <AppBar />
      <Menu />
      <div style={{ marginLeft: '255px', paddingTop: '80px' }}>
        <div style={{ display: "flex", justifyContent: "start" }}>
          <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50, backgroundColor: "#87CEEB" }}>
            <h2>Total Users</h2>
            <p>{totalUsers}</p>
          </Paper>
          <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50, backgroundColor: "#708090" }}>
            <h2>Total Employers</h2>
            <p>{totalEmployers}</p>
          </Paper>
          <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50, backgroundColor: "#708090" }}>
            <h2>Total Managers</h2>
            <p>{totalManagers}</p>
          </Paper>
          <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50, backgroundColor: "#708090" }}>
            <h2>Total Admins</h2>
            <p>{totalAdmins}</p>
          </Paper>
        </div>
      </div>
    </div>
  );
}



