import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { GlobalProvider, useGlobalContext } from '../../Context/globalContext';
import Button from './Button';
import axios from 'axios'
import { GlobalStyle } from '../../Styles/globalStyle';
import  AppBar  from '../../Components/Appbar';
import  Menu  from '../../Components/menu';
import { Box, Typography, Avatar } from '@mui/material';
import { MainLayout,InnerLayout } from '../../Styles/Layout';



function Form() {
    const {addIncome,error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        project: '',
        description: '',
    })

    

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
 

    useEffect(() => {
        // Fetch projects when the component mounts
        getProject();
    }, []);

    const getProject = async () => {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/v1/get-projects");
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      };

    const { title, amount, date, category,project,description } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

  

    const handleSubmit = e => {
        e.preventDefault()
        addIncome(inputState)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            project: '',
            description: '',
        })
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            <InnerLayout>
            <GlobalStyle/>
            <AppBar/>
            <Menu/>
            <main>
            <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
           Add Income
           </Typography>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder="Salary Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input value={amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder={'Salary Amount'}
                    onChange={handleInput('amount')} 
                />
            </div>
            
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
             {/* Other form elements */}
             <div className="selects input-control">
                <select required value={project} name="project" id="project" onChange={handleInput('project')}>
                    <option value="" disabled>Select Project</option>
                    <option value="Kalaniya">Kalaniya</option>
                  
                </select>
            </div> 
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value=""  disabled >Select Category</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investiments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Add Income'}
                    
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
            </main>
        </InnerLayout>
        </FormStyled>
    )
}


const FormStyled = styled.form`

    

display: center;
flex-direction: column;
gap: 50px;
margin-top:100px;
margin-left:400px;
input, textarea, select{
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 2rem 2rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder{
        color: rgba(34, 34, 96, 0.4);
    }
}
.input-control{
    gap: 70px; /* Increase the gap between input tabs */
    input {
        width: 80%;
    }
}

.selects{
    display: flex;
    justify-content: flex-start;
    select{
        color: rgba(34, 34, 96, 0.4);
        &:focus, &:active{
            color: rgba(34, 34, 96, 1);
        }
    }
}

.submit-btn{
    button{
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        &:hover{
            background: var(--color-green) !important;
        }
    }
}
`;
export default Form