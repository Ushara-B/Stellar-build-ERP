import { useEffect, useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useGlobalContext } from '../../Context/GlobalContext'; 
import moment from 'moment';    
import { grey } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';

const Income = () => {
  const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();
  const [pageSize, setPageSize] = useState(5);
  const [selectedRowId, setSelectedRowId] = useState(null);

  useEffect(() => {
    getIncomes();
  }, []);

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
      headerName: 'project',
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
        return (
          <div>
           <DeleteIcon onClick={handleDelete}/>
          </div>
        );
      },
    },
  ];

  const totalIncomeStyle = {
    backgroundColor: 'green', // Set green background color
    color: 'white', // Set text color to white
    padding: '15px',
    fontSize:'30px',
    borderRadius: '16px',
    alignSelf: 'right'
  
     // Add padding for better visual appearance
  };

  
  const addIncomeStyle = {
    backgroundColor: 'grey', // Set green background color
    color: 'white', // Set text color to white
    padding: '15px',
    fontSize:'30px',
    borderRadius: '16px',
    alignSelf: 'right'
  
     // Add padding for better visual appearance
  };

  return (
    <Box sx={{ height: 800, width: '100%' }}>
      <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
        Incomes
      </Typography>
      <Box  sx={{ display: 'flex',gap: 2 }}>
      <Typography variant="h6" component="h6" sx={{ textAlign: 'center', mb: 3, }}>
      <span style={totalIncomeStyle}> Total Income:Rs{totalIncome()}</span>
      </Typography>
      <Typography variant="h6" component="h6" sx={{ textAlign: 'center', mb: 3, }}>
      <span style={addIncomeStyle}> Add Income</span>
      </Typography>
      </Box>
      <DataGrid
        columns={columns}
        rows={incomes}
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
    </Box>
  );
};

export default Income;
