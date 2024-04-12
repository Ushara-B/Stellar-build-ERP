import * as React from 'react';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Menu from '../Components/menu';
import AppBar from '../Components/Appbar'; 
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from "axios";


const URL = "http://localhost:5000/Projects";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

// Styled components

function Projects() {
    const [projects, setProjects] = useState([]);
    
    const [totalProjects, setTotalProjects] = useState(0);
    
    

    useEffect(() => {
        fetchHandler().then((data) => {
          setProjects(data?.project || []); // Set an empty array if data.project is undefined
         
          setTotalProjects(data?.project?.length || 0);
          
        });
      }, []);

    return (
        <div style={{ marginLeft: '300px', paddingTop: '90px' }}>
            <AppBar/>
            <Menu/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Total Projects
                            </Typography>
                            <Typography variant="body2" component="p">
                                {totalProjects}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
               
                {/* Add more cards for additional statistics if needed */}
            </Grid>
            <br />
            <br />
            <Paper elevation={3}>
                {/* Display Table of Vehicles here */}
            </Paper>
        </div>
    );
}

export default Projects;
