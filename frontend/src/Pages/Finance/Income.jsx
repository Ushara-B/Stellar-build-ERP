import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Box, Typography, Avatar,Button,TextField } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useGlobalContext } from '../../Context/globalContext'; 
import moment from 'moment';    
import { grey } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import  AppBar  from '../../Components/Appbar';
import  Menu  from '../../Components/menu';
import { InnerLayout,MainLayout } from '../../Styles/Layout';
import { GlobalStyle } from '../../Styles/globalStyle';
import { useNavigate } from 'react-router-dom';
import ReactToPrint  from 'react-to-print';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print'; 

const Income = () => {
  const { incomes, getIncomes, deleteIncome, updateIncome, totalIncome } = useGlobalContext();
  const [pageSize, setPageSize] = useState(5);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const componentRef = useRef(); // Reference to the component you want to print
  const handlePrintToPdf = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Leave Summary Sheet",
    pageStyle: `@page {
      size: A4;
    }
    @media print {
      .hide-on-print {
        display: none;
      }
      
    }`,
  });

  useEffect(() => {
    getIncomes();
  }, []);

  useEffect(() => {
    const filteredData = incomes.filter((income) =>
      Object.values(income).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredIncomes(filteredData);
  }, [incomes, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  
  
  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      renderCell: (params) => `Rs${params.value}`,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      renderCell: (params) => moment(params.value).format('YYYY-MM-DD'),
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
    },
    {
      field: 'project',
      headerName: 'Project',
      width: 150,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
    },
    {
      field: '_id',
      headerName: 'Id',
      width: 350,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 200,
      renderCell: (params) => {
        const handleDelete = () => {
          deleteIncome(params.row._id);
        };

        const handleEdit = () => {
          // Navigate to edit page with the selected row id
          navigate(`/finance/updateincome/${params.row._id}`);
        };
      
        return (
          <div>
            <DeleteIcon onClick={handleDelete}/>
            <EditIcon onClick={handleEdit}/>
          </div>
        );
      },
    },
  ];

  const totalIncomeStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '15px',
    fontSize:'30px',
    borderRadius: '16px',
    alignSelf: 'right'
  };

  const addIncomeStyle = {
    backgroundColor: 'grey',
    color: 'white',
    padding: '15px',
    fontSize:'30px',
    borderRadius: '16px',
    alignSelf: 'right'
  };

  return (
    <IncomeStyled>
      <MainLayout>
        <GlobalStyle/>
        <AppBar/>
        <Menu/>
        <div>
          <main> 
            <Box sx={{ height: 800, width: '100%' }}>
              <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
                Incomes
              </Typography>
              <Box  sx={{ display: 'flex',gap: 2 }}>
                <Typography variant="h6" component="h6" sx={{ textAlign: 'center', mb: 3, }}>
                  <span style={totalIncomeStyle}> Total Income: Rs{totalIncome()}</span>
                </Typography>
                <Typography variant="h6" component="h6" sx={{ textAlign: 'center', mb: 3, }} onClick={() => navigate('/finance/incomeform')}>
                  <span style={addIncomeStyle}> Add Income</span>
                </Typography>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearch}
                  sx={{ width: '300px', ml:130 }}
                />
              </Box>
              <div ref={componentRef}>
              <DataGrid
                columns={columns}
                rows={filteredIncomes}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[5, 10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                getRowSpacing={(params) => ({
                  top: params.isFirstVisible ? 0 : 5,
                  bottom: params.isLastVisible ? 0 : 5,
                })}
                componentsOverrides={{
                  Footer: {
                    container: {
                      backgroundColor: 'green',
                    },
                  },
                }}
                sx={{
                  [`& .${gridClasses.row}`]: {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light' ? grey[200] : grey[900],
                  },
                  fontSize: '20px',
                }}
                onCellEditCommit={(params) => setSelectedRowId(params.id)}
              />
              </div>
            </Box>
            <Button onClick={handlePrintToPdf}>Download Report</Button> {/* Button to trigger printing */}
          </main>
        </div>
         
      </MainLayout>
      
    </IncomeStyled>
  );
};

const IncomeStyled = styled.div`
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

export default Income;