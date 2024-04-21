import React, { useState, useEffect } from 'react';
import Drawer from '../Components/menu';
import Appbar from '../Components/Appbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, Grid} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Projects from './projects';

const Projectdetails = () => {
  const { id } = useParams();
  const [Projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/projects/${id}`);
        setProjects(response.data.project);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProject();
  }, [id]);

  if (!Projects) {
    return <div>Loading...</div>;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
};
  return (
    <div>
      <Appbar />
      <Drawer />
      <div style={{ marginLeft: '255px', paddingTop: '80px'}}>
      <Breadcrumbs arial-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                <Link underline="hover" key="1" color="inherit" href="/projects">
                    Project DashBoard
                </Link>
                <Link underline="hover" key="2" color="inherit" href="/Allprojects">
                    Projects List
                </Link>
                <Typography key="3" color="text.primary">
                    Project Advance List
                </Typography>
      </Breadcrumbs>
      <Box sx={{ marginLeft: '50px', marginTop: '20px', padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2 ,marginRight: '50px'}}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Project Details
            </Typography>
            <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Project ID :
                </Typography>
                <Typography variant="body1">{Projects.projectID}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Project Name :
                </Typography>
                <Typography variant="body1">{Projects.projectName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Project Budget :
                </Typography>
                <Typography variant="body1">{Projects.projectBudget}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Project Location :
                </Typography>
                <Typography variant="body1">{Projects.Locate}</Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Project Owner :
                </Typography>
                <Typography variant="body1">{Projects.contractor}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Project Employeees :
                </Typography>
                <Typography variant="body1">{Projects.Employees}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Start Date :
                </Typography>
                <Typography variant="body1">{formatDate(Projects.startDate)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  End Date :
                </Typography>
                <Typography variant="body1">{formatDate(Projects.endDate)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Project Status :
                </Typography>
                <Typography variant="body1">{Projects.Status}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Project Type :
                </Typography>
                <Typography variant="body1">{Projects.projectType}</Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Project Description :
                </Typography>
                <Typography variant="body1">{Projects.description}</Typography>
              </Grid>
              
            </Grid>
          </CardContent>
        </Card>
      </Box>         
      </div>
      
    </div>
  );
};

export default Projectdetails;
