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
    border:1,
    borderColor:'black',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
    borderRadius: 15,
  },
}));

const StyledButton = styled("button")({
  width: "50%",
  padding: "15px",
});

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
            maxWidth: "100%",
            alignContent: "center",
            display: "block",
            margin: "150px auto auto 250px",
            overflow: "hidden",
            borderRadius: "15px",
          }}
        >
          <Table
            sx={{
              minWidth: 650,
              width: 1000,
              margin: "auto",
              borderCollapse: "collapse",
              borderRadius: "15px",
              overflow: "hidden",
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Employee ID</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">Reason</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
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
                  <StyledTableCell align="right">
                    {leave.reason}
                  </StyledTableCell>
                  <StyledTableCell align="right" sx={{
                    display:'flex',
                    padding:5
                  }}>
                    <StyledButton style={{ width: "45%", padding: "15px" }}>
                      Edit
                    </StyledButton>
                    <StyledButton style={{ width: "45%", padding: "15px"}}>Delete</StyledButton>
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
