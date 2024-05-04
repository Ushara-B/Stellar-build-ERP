import { Box, Button, Grid, IconButton } from "@mui/material";
import axios from "axios";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useState ,useEffect} from "react";

import { create } from "@mui/material/styles/createTransitions";
import { useNavigate } from "react-router-dom";



export default function InventoryCategory({ closeEvent }) {
  const history = useNavigate();
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    Name: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => navigate("/addInventory"));
  };


  const sendRequest = async () => {
    try {
      await axios.post(`http://localhost:5000/categories`, {
        Name: String(inputs.Name),
      });
      closeEvent();
      navigate('/addInventory');
      alert('Successfully added category');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Category already exists');
      } else {
        alert('An error occurred');
      }
    }
  };
  
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Add Inventory Category
      </Typography>
      <br />
      <br />

      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            id="outlined-basic"
            name="Name"
            label="Add New Category"
            variant="outlined"
            size="small"
            onChange={handleChange}
            value={inputs.Name}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h7" align="center">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSubmit}
              
            >
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
      
    </>
  );
}
