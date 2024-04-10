import React from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Vehicle(props){
    
    const {_id,RegNo,Vname,VIN,lic_expDay,ins_expDay,last_serviceDay,mileage,dname,vstatus}=props.Vehicle;
    
    const history = useNavigate();

    const deleteHandler =  async()=>{
        await axios.delete(`http://localhost:5000/vehicles/${_id}`)
        .then (res => res.data)
        .then (() => history('/'))
        .then(() => history('/viewvehicles'));

    }
    
    // Function to format date in a human-readable format
    // Function to format date in "YYYY-MM-DD" format

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US'); // Adjust locale as needed
    };
    return(
    <div>
        <div> 
           <br></br>
           <h1>ID:{_id}</h1>
           <h1>RegisterNo:{RegNo}</h1>
           <h1>Vehicle Name:{Vname}</h1>
           <h1>VIN:{VIN}</h1>
           <h1>License Expiry Day:{formatDate(lic_expDay)}</h1>
           <h1>Insurance Expiry Day:{formatDate(ins_expDay)}</h1>
           <h1>Last Service Day:{formatDate(last_serviceDay)}</h1>
           <h1>Mileage:{mileage}</h1>
           <h1>Driver Name:{dname}</h1>
           <h1>Vehicle Status:{vstatus}</h1>
           
           <button><Link to={`/viewvehicles/${_id}`}></Link>Update</button>
           
           <button onClick={deleteHandler}>Delete</button>
        </div>
        
          
           
    </div>
    )
}

export default Vehicle;