import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useGlobalContext } from '../../Context/globalContext';
import AppBar from '../../Components/Appbar';
import Menu from '../../Components/menu';
import { GlobalStyle } from '../../Styles/globalStyle';
import { InnerLayout } from '../../Styles/Layout';
import {  Container, Grid } from '@mui/material';
import ProjectChart from '../../Components/Finance/projectChart';
import Card from '../../Components/Finance/card';



const URL = "http://localhost:5000/projects";
const IURL = "http://localhost:5000/finance/get-incomes";

const fetchProjects = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const fetchIncomes = async () => {
  return await axios.get(IURL).then((res) => res.data);
};

const fetchExpenses = async () => {
  return await axios.get("http://localhost:5000/finance/get-expenses").then((res) => res.data);
};





function Project() {
  const [projects, setProjects] = useState([]);
  const { incomes, getIncomes, expenses, getExpenses } = useGlobalContext();
  
  useEffect(() => {
    fetchProjects().then((data) => setProjects(data.project));
    getIncomes();
    getExpenses();
  }, []);

  // Function to calculate total income for a project
  const getTotalIncome = (projectName) => {
    return incomes.filter(income => income.project === projectName)
                  .reduce((total, income) => total + income.amount, 0);
  };

  // Function to calculate total expense for a project
  const getTotalExpense = (projectName) => {
    return expenses.filter(expense => expense.project === projectName)
                   .reduce((total, expense) => total + expense.amount, 0);
  };

  // Function to calculate total balance for a project
  const getTotalBalance = (projectName) => {
    return getTotalIncome(projectName) - getTotalExpense(projectName);
  };

  // Function to calculate total balance for all projects
  const getTotalOverallBalance = () => {
    return projects.reduce((total, project) => total + getTotalBalance(project.projectName), 0);
  };

  return (
    <ProjectStyled>
      <InnerLayout>
        
        <AppBar />
        <Menu/>
      
        <div className="project-content">
          
          <Container>
            <Grid >
            <h1>Projects</h1>
              <div>
            {projects.map(project => (
             <Grid  className="history-item" item key={project._id} xs={12} md={6} lg={4} sx={{
              display: 'grid',
              columnGap: 10,
              rowGap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }} >
              <Card  project={project} getTotalExpense={getTotalExpense} getTotalIncome={getTotalIncome} getTotalBalance={getTotalBalance}/>
              <ProjectChart project={project}/>
               </Grid>
                     ))}
               </div>

        </Grid>
          </Container>
          <div className="total-balance">Total Overall Balance: {getTotalOverallBalance()}</div>
        </div>
      </InnerLayout>
    </ProjectStyled>
  );
}

const ProjectStyled = styled.div`
   
    .history-item{
        background: #D9D9D9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    .income{
      color: green;
    }

    .expense{
      color: red;
    }

    .total-balance{
      font-weight: bold;
    }
`;

export default Project;
