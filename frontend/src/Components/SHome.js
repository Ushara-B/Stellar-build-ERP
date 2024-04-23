import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { Box, Paper, Typography,Button } from "@mui/material";
import { Doughnut } from "react-chartjs-2";

/*const useStyles = makeStyles((theme) => ({
  boxConTest: {
   
    justifyContent: "center",
    alignItems: "center",
    gap: 35,
    fontFamily: "Roboto, sans-serif",
    height: "90vh",
  },
  boxHomeTest: {
    backgroundColor: "#2196f3",
    fontSize: 25,
    width: 200,
    color: "white",
    border: "3px solid #2196f3",
    borderRadius: 8,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "white",
      border: "3px solid #2196f3",
      color: "#2196f3",
    },
  },
}));*/

const URL1 = "http://localhost:5000/clients";
const URL2 = "http://localhost:5000/suppliers";


export default function SHome() {
  const navigate = useNavigate();
  const handleAddClick1 = () => {
    navigate(`/add-supplier`);
  };
  const handleAddClick2 = () => {
    navigate(`/add-client`);
  };

  const fetchHandler = async () => {
    return await axios.get(URL1).then((res) => res.data);
    
  };
  const fetchHandler2 = async () => {
    return await axios.get(URL2).then((res) => res.data);
  }
  

  const [totalClients, setTotalClients] = useState(0);
  const [totalSupliers,setTotalSupliers ] = useState(0);
  useEffect(() => {
    fetchHandler().then((data) => {
      
      setTotalClients(data.clients.length);
      
    });

    fetchHandler2().then((data) => {
      setTotalSupliers(data.suppliers.length);
    });
  }, []);

 

  return (
    <div>
    <AppBar />
        <Menu/>

    <div style={{ marginLeft: '255px', paddingTop: '80px' }}>
    <div style={{ display: "flex", justifyContent: "start" }}>

    <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50, backgroundColor: "#708090" }}>
    <h2>Total Supliers</h2>
    <p>{totalSupliers}</p>
  </Paper>
    <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50, backgroundColor: "#708090" }}>
    <h2>Total Clients</h2>
    <p>{totalClients}</p>
  </Paper>
  
    <Paper sx={{ p: 2, m: 2, minWidth: 50, backgroundColor: "#87CEEB" }}>
  <Button style={{backgroundColor: "#4FB7D4",color:"white", margin: "10px"}}  variant="centered" startIcon={<AddIcon />} sx={{p: 2, m: 2, flexGrow: 1, backgroundColor: "#87CEEB"}}  onClick={handleAddClick1}>
    <h2 style={{color:"white"}}>Add Supplier</h2></Button>
 </Paper>
  
  <Paper sx={{ p: 2, m: 2, minWidth: 50, backgroundColor: "#87CEEB" }}>
  <Button style={{backgroundColor: "#4FB7D4",color:"white", margin: "10px"}}  variant="centered" startIcon={<AddIcon />} sx={{p: 2, m: 2, flexGrow: 1, backgroundColor: "#87CEEB"}}  onClick={handleAddClick2}>
    <h2 style={{color:"white"}}>Add Client  </h2></Button>
 </Paper>
</div>
    
     
    
    </div>
    </div>
  );
}
