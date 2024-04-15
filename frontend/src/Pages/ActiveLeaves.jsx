import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBar from "../Components/Appbar";
import Drawer from "../Components/menu";
import { Grid } from "@mui/material";
import axios from "axios";

const URL = "http://localhost:5000/leaves";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1B1A55",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ActiveLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeavesFromDatabase();
  }, []);

  const fetchLeavesFromDatabase = async () => {
    try {
      const response = await axios.get(URL);
      setLeaves(response.data.leaves);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  return (
    <Grid container>
      <Grid item>
        <AppBar />
        <Drawer />
      </Grid>
      <Grid alignContent={"center"}>
        <TableContainer
          component={Paper}
          xs={12}
          sm={8}
          sx={{
            maxWidth: "60%",
            alignContent: "center",
            display: "block",
            margin: "150px auto auto 350px",
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Employee ID</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Type</StyledTableCell>
                <StyledTableCell align="right">Reason</StyledTableCell>
                <StyledTableCell align="right">....</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.map((leave, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {leave.emp_id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{leave.date}</StyledTableCell>
                  <StyledTableCell align="right">{leave.type}</StyledTableCell>
                  <StyledTableCell align="right">{leave.reason}</StyledTableCell>
                  <StyledTableCell align="right">
                    <button style={{ width: "50%", padding: "15px" }}>Edit</button>
                    <button style={{ width: "50%" }}>Delete</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
