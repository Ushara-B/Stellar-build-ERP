import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddVehicle() {
   const history = useNavigate();
   const [inputs, setInputs] = useState({
      RegNo: "",
      Vname: "",
      VIN: "",
      lic_expDay: "",
      ins_expDay: "",
      last_serviceDay: "",
      mileage: "",
      dname: "",
      vstatus: ""
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
    sendRequest().then(() => history('/viewvehicles'));
  };
  
  const sendRequest = async () => {
    await axios.post("http://localhost:5000/Vehicles", {
      RegNo: String(inputs.RegNo),
      Vname: String(inputs.Vname),
      VIN: String(inputs.VIN),
      lic_expDay: Date(inputs.lic_expDay),
      ins_expDay: Date(inputs.ins_expDay),
      last_serviceDay: Date(inputs.last_serviceDay),
      mileage: String(inputs.mileage),
      dname: String(inputs.dname),
      vstatus: String(inputs.vstatus)
    }).then(res => res.data);
  };
  


  return (
    <div>
      <AppBar />
      <Menu />
      <div style={{ marginLeft: '255px', paddingTop: '80px' }}>
        <h1 style={{ textAlign: "center" }}>Add Vehicle Details</h1>
        <form onSubmit={handleSubmit}>
          <label>RegisterNo</label><br/>
          <input type='text' name='RegNo' onChange={handleChange} value={inputs.RegNo} required /><br/><br/>
          <label>Vehicle Name</label><br/>
          <input type='text' name='Vname' onChange={handleChange} value={inputs.Vname} required /><br/><br/>
          <label>VIN</label><br/>
          <input type='text' name='VIN' onChange={handleChange} value={inputs.VIN} required /><br/><br/>
          <label>License Expiry Day</label><br/>
          <input type='date' name='lic_expDay' onChange={handleChange} value={inputs.lic_expDay} required /><br/><br/>
          <label>Insurance Expiry Day</label><br/>
          <input type='date' name='ins_expDay' onChange={handleChange} value={inputs.ins_expDay} required /><br/><br/>
          <label>Last Service Day:</label><br/>
          <input type='date' name='last_serviceDay' onChange={handleChange} value={inputs.last_serviceDay} required /><br/><br/>
          <label>Current Mileage:</label><br/>
          <input type='text' name='mileage' onChange={handleChange} value={inputs.mileage} required /><br/><br/>
          <label>Driver Name:</label><br/>
          <input type='text' name='dname' onChange={handleChange} value={inputs.dname} required /><br/><br/>
          <label>Vehicle Status:</label><br/>
          <input type='text' name='vstatus' onChange={handleChange} value={inputs.vstatus} required /><br/><br/>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddVehicle;
