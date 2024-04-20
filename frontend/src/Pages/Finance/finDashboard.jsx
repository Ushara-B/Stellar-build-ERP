import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../Context/globalContext';
import History from './History';
import { InnerLayout,MainLayout } from '../../Styles/Layout';
import { GlobalStyle } from '../../Styles/globalStyle';
import  AppBar  from '../../Components/Appbar';
import  Menu  from '../../Components/menu';
import Chart from './chart';

function FinanceDashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <DashboardStyled>
        <MainLayout> 
      
      <GlobalStyle/>
     <AppBar/>
      <Menu/>
      <main>
      <h1>All Transactions</h1>
              <div className="stats-con">
                  <div className="chart-con">
                      <Chart />
                      <div className="amount-con">
                          <div className="income">
                              <h2>Total Income</h2>
                              <p>
                                  Rs{totalIncome()}
                              </p>
                          </div>
                          <div className="expense">
                              <h2>Total Expense</h2>
                              <p>
                                   Rs{totalExpenses()}
                              </p>
                          </div>
                          <div className="balance">
                              <h2>Total Balance</h2>
                              <p>
                                   Rs{totalBalance()}
                              </p>
                          </div>
                      </div>
                  </div>
                  <div className="history-con">
                      <History />
                      <h2 className="salary-title">Min <span>Income</span>Max</h2>
                      <div className="salary-item">
                          <p>
                              Rs{Math.min(...incomes.map(item => item.amount))}
                          </p>
                          <p>
                              Rs{Math.max(...incomes.map(item => item.amount))}
                          </p>
                      </div>
                      <h2 className="salary-title">min<span>Expense</span>Max</h2>
                      <div className="salary-item">
                          <p>
                              Rs{Math.min(...expenses.map(item => item.amount))}
                          </p>
                          <p>
                              Rs{Math.max(...expenses.map(item => item.amount))}
                          </p>
                      </div>
                  </div>
              </div>
              
      </main>
    
     
      </MainLayout>        
      </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
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

    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #D9D9D9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #D9D9D9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default FinanceDashboard