import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



const OutlinedCard = ({project ,getTotalIncome,getTotalExpense,getTotalBalance }) =>{
  return (
    <Box sx={{ minWidth: 275 }}>
      <React.Fragment>
    <CardContent>
      
      <Typography variant="h4" component="div">
      {project.projectName}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
       BUDGET :{project.projectBudget}
      </Typography>
      <Typography variant="h5">
        Incomes: {getTotalIncome(project.projectName)}
        <br />
        Expenses: {getTotalExpense(project.projectName)}
        <br />
        <br/>
        Total Balance: {getTotalBalance(project.projectName)}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
    </Box>
  );
}

export default OutlinedCard