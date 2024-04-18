import React, { useState, useEffect } from 'react';
import Drawer from '../Components/menu';
import Appbar from '../Components/Appbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';

const ViewProject = () => {
  const { id } = useParams();
  const [prject, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/projects/${id}`);
        setProject(response.data.user);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProject();
  }, [id]);

  if (!prject) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Appbar />
      <Drawer />
      <Box sx={{ marginLeft: '255px', marginTop: '80px', padding: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Project Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Project Name:
                </Typography>
                <Typography variant="body1">{prject.projectName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Project Budget:
                </Typography>
                <Typography variant="body1">{prject.projectBudget}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Employees:
                </Typography>
                <Typography variant="body1">{prject.Employees}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Status:
                </Typography>
                <Typography variant="body1">{prject.Status}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Start Date:
                </Typography>
                <Typography variant="body1">{prject.StartDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  End Date:
                </Typography>
                <Typography variant="body1">{prject.EndDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Project Type:
                </Typography>
                <Typography variant="body1">{prject.ProjectType}</Typography>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ViewProject;