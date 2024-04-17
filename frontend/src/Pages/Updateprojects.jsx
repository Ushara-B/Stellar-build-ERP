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
            .then((data)=> setInputs(data.project))
            .catch((error) => console.log("Error fetching project:", error));
        };
        fetchHandler();
    },[id]);

    const  sendRequest = async()=>{
        try {
            await axios.put(`http://localhost:5000/projects/${id}`, {
                projectName: String(inputs.projectName),
                projectBudget: Number(inputs.projectBudget),
                Employees: String(inputs.Employees),
                Status: String(inputs.Status),
                startDate: Date(inputs.startDate),
                endDate: Date(inputs.endDate),
                projectType: String(inputs.projectType),
            });
            console.log("Project updated successfully!");
        } catch (error) {
            console.log("Error updating project:", error);
        }
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
  
      // Check if start date and end date are empty
      const requestData = {
          projectName: String(inputs.projectName),
          projectBudget: Number(inputs.projectBudget),
          Employees: String(inputs.Employees),
          Status: String(inputs.Status),
          projectType: String(inputs.projectType),
      };
  
      if (inputs.startDate) {
          requestData.startDate = Date(inputs.startDate);
      }
  
      if (inputs.endDate) {
          requestData.endDate = Date(inputs.endDate);
      }
  
      sendRequest(requestData).then(() => 
          history('/Allprojects')
      );
  };
  
    
    return (
        <div>
            <AppBar />
            <Menu />
            <div style={{ marginLeft: '255px', paddingTop: '70px' }}>
                <h1 style={{ textAlign: "center" }}>Update Project Details</h1>
                <form onSubmit={handleSubmit}>
                    <label>Project Name</label>
                    <input type='text' name='projectName' onChange={handleChange} value={inputs.projectName} required /><br/>
                    <label>Project Budget</label>
                    <input type='number' name='projectBudget' onChange={handleChange} value={inputs.projectBudget} required /><br/>
                    <label>Employees</label>
                    <input type='text' name='Employees' onChange={handleChange} value={inputs.Employees} required /><br/>
                    <label>Status</label>
                    <input type='text' name='Status' onChange={handleChange} value={inputs.Status} required /><br/>
                    <label>Start Date</label>
                    <input type='date' name='startDate' onChange={handleChange} value={inputs.startDate} required /><br/>
                    <label>End Date</label>
                    <input type='date' name='endDate' onChange={handleChange} value={inputs.endDate} required /><br/>
                    <label>Project Type</label>
                    <input type='text' name='projectType' onChange={handleChange} value={inputs.projectType} required /><br/><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Updateprojects;
