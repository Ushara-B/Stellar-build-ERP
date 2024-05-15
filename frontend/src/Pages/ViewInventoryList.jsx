import React, { useRef } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import AppBar from "../Components/Appbar";
import Menu from "../Components/menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Divider from "@mui/material/Divider";
import Swal from "sweetalert2";





const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "Icategory", label: "ICategory", minWidth: 170 },
  { id: "quantity", label: "Quantity", minWidth: 170 },
  { id: "value", label: "Value", minWidth: 170 },
  { id: "supplier", label: "Supplier", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 170, align: "center" },
];

export default function ViewInventoryList() {
  const [inventories, setInventories] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ComponentsRef = useRef();


  React.useEffect(() => {
    fetchInventories();
  }, []);

  const fetchInventories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/inventories");
      setInventories(response.data.inventories);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //pdf print function
  // const ComponentsRef = useRef();
  // const handlePrintToPdf = useReactToPrint({
  //   content: () => ComponentsRef.current,
  //   documentTitle: "All inventory",
  // });




  const handlePrint = useReactToPrint({
    content: () => {
        const clonedComponent = ComponentsRef.current.cloneNode(true); // Cloning the component to avoid manipulating the original DOM
        const table = clonedComponent.querySelector('table'); // Selecting the table element
        const actionColumnIndex = 5; // Assuming the index of the "Action" column is 9 (0-indexed)

        // Hide the "Action" column header
        const headerRow = table.querySelector('thead tr');
        if (headerRow) {
            const headerCell = headerRow.querySelectorAll('th')[actionColumnIndex];
            if (headerCell) {
                headerCell.style.display = 'none'; // Hide the "Action" column header cell
            }
        }

        // Loop through each row and hide the "Action" column
        table.querySelectorAll('tr').forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > actionColumnIndex) {
                cells[actionColumnIndex].style.display = 'none'; // Hide the "Action" column cell
            }
        });

        return clonedComponent;
    },
    documentTitle: 'Inventory Report',
    onAfterPrint: () => alert("Inventory Report successfully Downloaded!"),
});













  const handleViewInventory = (inventoryId) => {
    navigate(`/viewinventory/${inventoryId}`);
  };

  const handleUpdateInventory = (inventoryId) => {
    navigate(`/updateinventory/${inventoryId}`);
  };

  const handleDeleteInventory = async (inventoryId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:5000/inventories/${inventoryId}`
        );
        if (response.status === 200) {
          Swal.fire("Deleted!", "Your inventory has been deleted.", "success");
        }
      }
    } catch (error) {
      console.error(
        "Error deleting inventory:",
        error.response ? error.response.data : error
      );
      Swal.fire(
        "Error",
        "An error occurred while deleting the inventory.",
        "error"
      );
    }
  };

  const filteredInventories = inventories.filter((inventory) =>
    inventory.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AppBar />
      <Menu />
      <div style={{ marginLeft: "200px", paddingTop: "20px" }}>
        <Box sx={{ p: 9 }} height={2}>
          <Breadcrumbs
            arial-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            <Link underline="hover" key="1" color="inherit" href="/inventory">
              Inventory
            </Link>
            <Typography key="3" color="text.primary">
              View Inventory List
            </Typography>
          </Breadcrumbs>

          <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{ padding: "20PX" }}
            >
              Inventory List
            </Typography>
            <Divider />

            <br />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Inventory.."
                value={searchTerm}
                onChange={handleSearchChange}
                startAdornment={<SearchIcon fontSize="small" />}
              />

              <Box>
                <IconButton
                  color="primary"
                  aria-label="print"
                  onClick={handlePrint}
                >
                  <PrintIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="Add inventory"
                  onClick={() => navigate('/addinventory')}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            <div ref={ComponentsRef}>
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ borderCollapse: "collapse" }}
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          backgroundColor: "#b1c5d4",
                          fontWeight: "bold",
                          border: "none",
                          padding: "5px 10px",
                          "&:hover": {
                            backgroundColor: "#b1c5d4",
                          },
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredInventories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                          border: "none",
                          padding: "8px 16px",
                        }}
                      >
                        <TableCell
                          sx={{
                            border: "1px",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          {row.Name}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "none",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          {row.ICategory}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "none",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          {row.Quantity}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "none",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          {row.Value}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "none",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          {row.Supplier}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "none",
                            padding: "10px 12px",
                            backgroundColor: "white",
                          }}
                        >
                          <IconButton
                            color="primary"
                            aria-label="view"
                            sx={{
                              "&:hover": {
                                color: "#00008b",
                              },
                              color: "",
                            }}
                            onClick={() => handleViewInventory(row._id)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            color="primary"
                            aria-label="edit"
                            sx={{
                              "&:hover": {
                                color: "#00008b",
                              },
                              color: "",
                            }}
                            onClick={() => handleUpdateInventory(row._id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            aria-label="delete"
                            sx={{
                              "&:hover": {
                                color: "#FF1B1B",
                              },
                              color: "#CF5C5C",
                            }}
                            onClick={() => handleDeleteInventory(row._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                borderTop: "none",
                padding: "12px 16px",
              }}
            />
          </Paper>
        </Box>
      </div>
    </>
  );
}
