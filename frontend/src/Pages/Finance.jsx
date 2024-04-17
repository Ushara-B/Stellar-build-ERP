import AppBar from '../Components/Appbar';
import Menu from '../Components/menu';
import {GlobalStyle} from '../Styles/globalStyle';
import styled, { css } from 'styled-components';
import { MainLayout} from '../Styles/Layout';
import FinDashboard from '../Components/Finance/Finance/finDashboard';

import { useGlobalContext } from '../Context/globalContext';
import Income from '../Components/Finance/Finance/Income';
import Form from '../Components/Finance/Finance/Form';
import Expense from '../Components/Finance/Finance/Expense';


function Finance(){


  const global = useGlobalContext();
  console.log(global);
    return(
      
        <div>
        <AppStyled className='App'>
         
        <MainLayout>
        <GlobalStyle/>
       <AppBar/>
        <Menu/>
        <main>
        <FinDashboard/>
        </main>
        </MainLayout>
        </AppStyled>
        </div>
       

    );

}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    width:2000px;
    height:1050px;
    margin-left: 250px;
    margin-top:50px;
    background: #FFFFFF;
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    
    
    overflow-x: hidden;
    
  }
`;
export default Finance