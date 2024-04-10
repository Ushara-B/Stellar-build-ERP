import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import{ useParams } from 'react-router'
import{ useNavigate } from 'react-router'

function UpdateVehicle() {

    const[inputs,setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;


    useEffect(()=>{
        const fetchHandler = async ()=>{
            await axios
            .get(`http://localhost:5000/Vehicles/${id}`)
            .then((res)=> res.data)
            .then((data)=> setInputs(data.vehicle));
        };
        fetchHandler();
    },[id]);
    const  sendRequest = async()=>{
        await axios
        .put(`http://localhost:5000/Vehicles/${id}`,{
            RegNo: String(inputs.RegNo),
            Vname: String(inputs.Vname),
            VIN: String(inputs.VIN),
            lic_expDay: new Date(inputs.lic_expDay),
            ins_expDay: new Date(inputs.ins_expDay),
            last_serviceDay: new Date(inputs.last_serviceDay),
            mileage: String(inputs.mileage),
            dname: String(inputs.dname),
            vstatus: String(inputs.vstatus)
          }).then((res) => res.data);
    };
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(() => 
        history('/viewvehicles'));
      };
      return (
        <div>
          <AppBar />
          <Menu />
          <div style={{ marginLeft: '255px', paddingTop: '80px' }}>
            <h1 style={{ textAlign: "center" }}>Update Vehicle Details</h1>
            <form onSubmit={handleSubmit}>
              <label>RegisterNo</label><br/>
              <input type='text' name='RegNo' onChange={handleChange} value={inputs.RegNo} required /><br/><br/>
              <label>Vehicle Name</label><br/>
              <input type='text' name='Vname' onChange={handleChange} value={inputs.Vname} required /><br/><br/>
              <label>VIN</label><br/>
              <input type='text' name='VIN' onChange={handleChange} value={inputs.VIN} required /><br/><br/>
          
              <label>License Expiry Day</label><br/>
              <input type='date' name='lic_expDay' onChange={handleChange} value={inputs.lic_expDay ? new Date(inputs.lic_expDay).toISOString().split('T')[0] : ''} required /><br/><br/>
              <label>Insurance Expiry Day</label><br/>
              <input type='date' name='ins_expDay' onChange={handleChange} value={inputs.ins_expDay ? new Date(inputs.ins_expDay).toISOString().split('T')[0] : ''} required /><br/><br/>
              <label>Last Service Day:</label><br/>
              <input type='date' name='last_serviceDay' onChange={handleChange} value={inputs.last_serviceDay ? new Date(inputs.last_serviceDay).toISOString().split('T')[0] : ''} required /><br/><br/>
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

export default UpdateVehicle
