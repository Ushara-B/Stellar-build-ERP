import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
const URL = "http://localhost:8080/suppliers";
const useStyles = makeStyles((theme) => ({
  clientDetails: {
    padding: theme.spacing(2),
  },
  actionAdminCon: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  topic: {
    textAlign: "center",
    fontSize: "50px",
  },
  topicsub: {
    textAlign: "center",
    fontSize: "30px",
  },
  searchBoxAdmin: {
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    marginRight: theme.spacing(2),
  },
  adminTopicClient: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  tableDetailsAdmin: {
    marginTop: theme.spacing(2),
  },
  alertNoResults: {
    marginBottom: theme.spacing(2),
  },
  btnDashAdmin: {
    marginRight: theme.spacing(2),
  },
  btnDashAdminDlt: {
    backgroundColor: "red",
    color: "white",
    border: "2px solid red",
    fontWeight: "bold",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#d32f2f",
      border: "2px solid #d32f2f",
    },
  },
}));
const SupplierDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    bname: "",
    email: "",
    contact: "",
    address: "",
    tax: 0,
    total: 0,
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(URL);
      setSuppliers(response.data.suppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleSearch = () => {
    const filteredSuppliers = suppliers.filter((supplier) =>
      Object.values(supplier).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setSuppliers(filteredSuppliers);
    setNoResults(filteredSuppliers.length === 0);
  };

  const handleUpdate = (id) => {
    // Navigate to UpdateDetails page with the supplier ID
    navigate(`/update/${id}`);
  };

  const handleChange = (newValue, name) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Update Data:", updateData); // Add this line for debugging
    try {
      await axios.put(`${URL}/${updateData.id}`, updateData);
      fetchSuppliers(); // Refresh suppliers after update
      setUpdateData({
        id: "",
        name: "",
        bname: "",
        email: "",
        contact: "",
        address: "",
        tax: 0,
        total: 0,
      });
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedSuppliers = suppliers.filter(
          (supplier) => supplier._id !== id
        );
        setSuppliers(updatedSuppliers); // Update suppliers after delete
      } catch (error) {
        console.error("Error deleting supplier:", error);
      }
    }
  };

  /*PDF---------- */
  const summaryRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
    documentTitle: "Supplier Document",
    onAfterPrint: () => alert("Successfully Downloaded!"),
    onClose: () => alert("Print canceled"),
  });

  return (
    <div className={classes.clientDetails}>
      <Typography variant="h1" className={classes.topic}>
        Admin <span className="admin_sub_topic_client">Dashboard</span>
      </Typography>
      <div className={classes.actionAdminCon}>
        <div className={classes.searchBoxAdmin}>
          <TextField
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            className={classes.searchInput}
            placeholder="Search Clients"
          />
          <Button
            onClick={handleSearch}
            variant="contained"
            color="primary"
            className={classes.btnDashAdmin}
          >
            Search
          </Button>
        </div>
        <div>
          <Link to="/add-supplier">
            <Button
              variant="contained"
              color="primary"
              className={classes.btnDashAdmin}
            >
              Add Suplier
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            className={classes.btnDashAdmin}
            onClick={handlePrint}
          >
            Generate Report
          </Button>
        </div>
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper ref={summaryRef}>
          <Typography variant="h2" className={classes.topicsub}>
          Suplier <span className="admin_sub_topic_client">Details</span>
          </Typography>
          {noResults && (
            <Alert severity="info" className={classes.alertNoResults}>
              No results found
            </Alert>
          )}
          <Table className={classes.tableDetailsAdmin}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Business Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Tax</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier._id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.bname}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>{supplier.tax}</TableCell>

                  <TableCell>{supplier.total}</TableCell>
                  <TableCell>
                    <Link
                      to={`/updatesuplier/${supplier._id}`}
                      className={classes.btnDashAdmin}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.btnDashAdmin}
                      >
                        Update
                      </Button>
                    </Link>
                    <Button
                      className={classes.btnDashAdminDlt}
                      onClick={() => handleDelete(supplier._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </div>
  );
};

export default SupplierDetails;
