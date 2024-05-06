import Menu from "../Components/menu";
import AppBar from "../Components/Appbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InventoryCategory from "./InventoryCategory";

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

function AddInventory() {
  const history = useNavigate();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputs, setInputs] = useState({
    Name: "",
    Category: "",
    Quantity: "",
    Value: "",
    Supplier: "",
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
    sendRequest().then(() => history("/viewInventoryList"));
  };

  const sendRequest = async () => {
    await axios
      .post(`http://localhost:5000/inventories`, {
        Name: String(inputs.Name),
        Category: String(inputs.Category),
        Quantity: String(inputs.Quantity),
        Value: Number(inputs.Value),
        Supplier: String(inputs.Supplier),
      })
      .then((res) => res.data);
  };
  useEffect(() => {
    // Fetch the categories when the component mounts
    axios
      .get("http://localhost:5000/categories")
      .then((res) => {
        console.log(res.data); // Log the response data to the console
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div>
        <Modal
          open={open}
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <InventoryCategory closeEvent={handleClose} />
          </Box>
        </Modal>
      </div>
      <div>
        <AppBar />
        <Menu />

        <div style={{ marginLeft: "255px", paddingTop: "80px" }}>
          <h1 style={{ textAlign: "center" }}>Add New Inventory Details</h1>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <br />
            <input
              type="text"
              name="Name"
              onChange={handleChange}
              value={inputs.Name}
              placeholder="Enter Name here"
              required
              pattern="[A-Za-z]+"
              onInvalid={(e) => {
                e.target.setCustomValidity(
                  "Only letter characters are allowed."
                );
              }}
              onInput={(e) => e.target.setCustomValidity("")}
            />
            <br />
            <br />
            <label>
              Category
              <IconButton
                color="primary"
                aria-label="Add category"
                onClick={handleOpen}
              >
                <AddIcon />
              </IconButton>
            </label>
            <input
              type="text"
              name="Category"
              onChange={handleChange}
              value={inputs.Category}
              select
              required
            />
            <br />
            <br />
            <label>Quantity</label>
            <br />
            <input
              type="number"
              name="Quantity"
              onChange={handleChange}
              value={inputs.Quantity}
              placeholder="Enter quantity here"
              required
              min="1"
              max="10000"
              onInvalid={(e) => {
                e.target.setCustomValidity(
                  "Please enter a number between 1 and 10000."
                );
              }}
              onInput={(e) => e.target.setCustomValidity("")}
            />
            <br />
            <br />
            <label>Value (Unit Price)</label>
            <br />
            <input
              type="text"
              name="Value"
              onChange={handleChange}
              value={inputs.Value}
              placeholder="Enter value here"
              required
            />
            <br />
            <br />
            <label>Supplier</label>
            <br />
            <input
              type="text"
              name="Supplier"
              onChange={handleChange}
              value={inputs.Supplier}
              placeholder="Enter Supplier Name here"
              required
            />
            <br />
            <br />
            <div></div>

            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddInventory;
