import React, { useState,useEffect } from "react";
import AppBar from "../Components/Appbar";
import Menu from "../Components/menu";
import axios from "axios";
import Addprojects from "../Pages/Addprojects";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

const URL = "http://localhost:5000/projects";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data)
}

function Allprojects() {
  const [projects, setProjects] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setProjects(data.project));
  }, [])

  //Report print functions
    //All report download
    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: 'Project Report',//document name(PDF save name)
        onAfterPrint: () => alert("Project Report successfully Download !"),//after download display alert message
        
    })
   

  

  return (
    <div style={{ marginLeft: '255px', paddingTop: '80px' }}>
      <AppBar />
      <Menu />
      <h1 style={{ color: 'blue', marginLeft: '40px' }}>
  All projects display page
</h1>

      <div ref={ComponentsRef}>
        {projects && projects.map((project) => (
           
              <Addprojects key={project.id} Project={project} />
            
          ))}
      </div>
      <button onClick={handlePrint}>Download ALL Report</button>
    </div>
  );
}

export default Allprojects;
