import React, { useEffect, useState, useRef } from "react";
import Menu from '../Components/menu';
import AppBar from '../Components/Appbar';
import axios from "axios";
import Vehicle from './Vehicle';
import { useReactToPrint } from 'react-to-print';

const URL = "http://localhost:5000/Vehicles";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

function Vehicles(){

    const [vehicles, setVehicles] = useState();

    useEffect(() => {
        fetchHandler().then((data) => setVehicles(data.vehicle));
    },[]);   

//Report print functions
    //All report download
    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: 'Vehicles Report',//document name(PDF save name)
        onAfterPrint: () => alert("Vehicles Report successfully Download !"),//after download display alert message
        
    })
   
//search function
    const[searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
   
    
    const handlesearch = () => {
        fetchHandler().then((data) => {
            
            const filteredVehicles = data.vehicle.filter((vehicle) =>
                Object.values(vehicle).some((field) => 
                    field.toString().toLowerCase().includes(searchQuery.toLowerCase()) 
            ));
            setVehicles(filteredVehicles);
            setNoResults(filteredVehicles.length === 0);
        });                   
    }//using ref function relevent section print
    return (
       <div style={{ marginLeft: '255px', paddingTop: '80px' }}> 
            <AppBar/>
            <Menu/>
            
            <input 
                onChange={(e) => setSearchQuery(e.target.value) } 
                type="text" 
                name="search" 
                placeholder="Search vehicle Details">
            </input>

            <button onClick={handlesearch}>Search</button>
            {noResults ?(
                <div>
                    <p>No results found</p>
                </div>
            ):(

            <div ref={ComponentsRef}>
                <h1>Details of Vehicles</h1>
                {vehicles && vehicles.map((vehicle) => ( 
                    <Vehicle key={vehicle._id} Vehicle={vehicle} />  
                ))}
            </div>
            )}
          <br/><br/>
            <button onClick={handlePrint}>Download ALL Report</button>
      </div>
    )  
}

export default Vehicles;
