import React, { useEffect, useState } from 'react'   
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';

function Updateprojects() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(()=>{
        const fetchHandler = async ()=>{
            await axios
            .get(`http://localhost:5000/projects/${id}`)
            .then((res)=> res.data)
            .then((data)=> setInputs(data.project));
        };
        fetchHandler();
    },[id]);

    const  sendRequest = async()=>{
        await axios
        .put(`http://localhost:5000/projects/${id}`,{
            projectName: String(inputs.projectName),
            projectBudget: Number(inputs.projectBudget),
            Employees: String(inputs.Employees),
            Status: String(inputs.Status),
            startDate: Date(inputs.startDate),
            endDate: Date(inputs.endDate),
            projectType: String(inputs.projectType),
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
        history('/Allprojects'));
      };
  return (
    <div>
      <AppBar />
      <Menu />
      <div style={{ marginLeft: '255px', paddingTop: '80px' }}>
        <h1 style={{ textAlign: "center" }}>Update Project Details</h1>
        <form onSubmit={handleSubmit}>
          <label>Project Name</label><br/>
          <input type='text' name='projectName' onChange={handleChange} value={inputs.projectName} required /><br/><br/>
          <label>Project Budget</label><br/>
          <input type='number' name='projectBudget' onChange={handleChange} value={inputs.projectBudget} required /><br/><br/>
          <label>Employees</label><br/>
          <input type='text' name='Employees' onChange={handleChange} value={inputs.Employees} required /><br/><br/>
          <label>Status</label><br/>
          <input type='text' name='Status' onChange={handleChange} value={inputs.Status} required /><br/><br/>
          <label>Start Date</label><br/>
          <input type='date' name='startDate' onChange={handleChange} value={inputs.startDate} required /><br/><br/>
          <label>End Date</label><br/>
          <input type='date' name='endDate' onChange={handleChange} value={inputs.endDate} required /><br/><br/>
          <label>Project Type</label><br/>
          <input type='text' name='projectType' onChange={handleChange} value={inputs.projectType} required /><br/><br/>
          <button>Submit</button>
        </form>
      </div>

      
    </div>
  )
}

export default Updateprojects
