import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Button from './Button';
import { GlobalStyle } from '../../Styles/globalStyle';
import AppBar from '../../Components/Appbar';
import Menu from '../../Components/menu';
import { Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router';

function UpdateExpense() {
    const { id } = useParams();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: new Date(), // Initialize date property with the current date
        category: '',
        project: '',
        description: '',
    });

    const history = useNavigate();

    useEffect(() => {
        // Fetch income data for the specific ID when the component mounts
        fetchExpense();
    }, []);

    const  fetchExpense = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/finance/get-expense/${id}`);
            setInputState(response.data.expense);
        } catch (error) {
            console.error('Error fetching expense:', error);
        }
    };

    const handleInput = name => e => {
        if (name === 'date') {
            setInputState({ ...inputState, date: e }); // Update date directly
        } else {
            setInputState({ ...inputState, [name]: e.target.value });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/finance/update-expense/${id}`, inputState);
            alert("expense Updated Successfully");
            history("/finance/expense"); // Redirect to desired path after successful update
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <GlobalStyle />
            <AppBar />
            <Menu />
            <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
                Update Expense
            </Typography>
            <div className="input-control">
                <input
                    type="text"
                    value={inputState.title}
                    name="title"
                    placeholder="Salary Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    type="text"
                    value={inputState.amount}
                    name="amount"
                    placeholder={'Salary Amount'}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
            <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={inputState.date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={inputState.project} name="project" id="project" onChange={handleInput('project')}>
                    <option value="" disabled>Select Project</option>
                    <option value="Kalaniya">Kalaniya</option>
                </select>
            </div>
            <div className="selects input-control">
                <select required value={inputState.category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Category</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="youtube">Youtube</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={inputState.description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Update Income'}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    );
}

// Function to format date string to "yyyy-MM-dd" format


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

export default UpdateExpense;
