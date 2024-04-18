import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function AddInventory() {
   const history = useNavigate();
   const [inputs, setInputs] = useState({
      Name: "",
      Category: "",
      Quantity: "",
      Value: "",
      Supplier: "",
  });
  
 
  const handleChange = (e) => {
    setInputs(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/viewInventoryList'));
  };
  
  const sendRequest = async () => {
    await axios.post("http://localhost:5000/inventories", {
      Name: String(inputs.Name),
      Category: String(inputs.Category),
      Quantity: String(inputs.Quantity),
      Value: Date(inputs.Value),
      Supplier: Date(inputs.Supplier)
    }).then(res => res.data);
  };
  

  return (
    <div>
      <AppBar />
      <Menu />
      <div style={{ marginLeft: '255px', paddingTop: '80px' }}>
        <h1 style={{ textAlign: "center" }}>Add New Inventory Details</h1>
        <form onSubmit={handleSubmit}>
          <label>Name</label><br/>
          <input type='text' name='Name' onChange={handleChange} value={inputs.Name} required /><br/><br/>
          <label>Category</label><br/>
          <input type='text' name='Category' onChange={handleChange} value={inputs.Category} required /><br/><br/>
          <label>Quantity</label><br/>
          <input type='text' name='Quantity' onChange={handleChange} value={inputs.Quantity} required /><br/><br/>
          <label>Value</label><br/>
          <input type='text' name='Value' onChange={handleChange} value={inputs.Value} required /><br/><br/>
          <label>Supplier</label><br/>
          <input type='text' name='Supplier' onChange={handleChange} value={inputs.Supplier} required /><br/><br/>
          
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddInventory;