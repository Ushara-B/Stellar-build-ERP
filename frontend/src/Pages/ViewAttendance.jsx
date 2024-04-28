import React, { useState, useEffect } from "react";
import Drawer from "../Components/menu";
import Appbar from "../Components/Appbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const ViewAttendance = () => {
  const { id } = useParams(); 
  const [attendance, setAttendance] = useState();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/attendance/${id}`
        );
        const attendanceData = response.data.attendance;
  
        if (attendanceData) {
          const employeeResponse = await axios.get(
            `http://localhost:5000/employee/${id}`
          );
          const employeeData = employeeResponse.data;
  
          if (attendanceData.uId) {
            const userResponse = await axios.get(
              `http://localhost:5000/attendance/uId/${attendanceData.uId}`
            );
            const userData = userResponse.data;
  
            setAttendance({
              ...attendanceData,
              employee: employeeData,
              user: userData
            });
          } else {
            console.error("uId field not found in attendance data");
          }
        } else {
          console.error("Attendance data not found");
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };
    fetchAttendance();
  }, [id]);
  const handleViewUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/attendance/${userId}`
      );
      const attendanceData = response.data;
      console.log(attendanceData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  return (
    <div>
      <Appbar />
      <Drawer />
      <Box sx={{ marginLeft: "255px", marginTop: "80px", padding: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              User Details
            </Typography>
            <Grid container spacing={2}>
              {attendance && (
                <>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Username:
                    </Typography>
                    <Typography variant="body1">{attendance.emp_id}</Typography>
                    <button onClick={() => handleViewUser(attendance.uId)}>
                      View User
                    </button>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Date:
                    </Typography>
                    <Typography variant="body1">{attendance.date}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Clock In:
                    </Typography>
                    <Typography variant="body1">
                      {attendance.clock_in}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ViewAttendance;
