import React from "react";
import Menu from "../Components/menu";
import AppBar from "../Components/Appbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Stack from "@mui/material/Stack";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import "../css/Idash.css";
import { CardContent } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInventoryContext } from "../Context/inventoryContext";
const URL = "http://localhost:5000/inventories";


const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

export default function Inventory() {
  const [inventories, setInventories] = useState([]);
  const [inventoryStatus, setInventoryStatus] = useState({
    Stock: 15,
    OutOfStock: 5,
  });
  const [totalInventories, setTotalInventories] = useState(0);
  const [totalStoreValue, setTotalStoreValue] = useState(0);
  //const { values, addInventory, getValues, totalValue } = useInventoryContext();
  const navigate = useNavigate();

  const calculateTotalStoreValue = (inventories) => {
    let totalValue = 0;
    inventories.forEach(inventory => {
      const value = Number(inventory.value);
      const quantity = Number(inventory.quantity);
      console.log('Value:', value, 'Quantity:', quantity); // Add this line
      if (!isNaN(value) && !isNaN(quantity)) {
        totalValue += value * quantity;
      }
    });
    return totalValue;
  }
  useEffect(() => {
    fetchHandler().then((data) => {
      console.log('Inventories:', data.inventories); // Add this line
      setInventories(data.inventories);
      setTotalInventories(data.inventories.length);
      const totalValue = calculateTotalStoreValue(data.inventories);
      setTotalStoreValue(totalValue);
    });
  }, []);


  const inventoryStatusData = {
    labels: ["Stock", "OutOfStock"],
    datasets: [
      {
        label: "Inventory Status",
        data: Object.values(inventoryStatus),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div style={{ marginLeft: "200px", paddingTop: "20px" }}>
        <AppBar />
        <Menu />
        <Box height={50} />
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 8 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }} className="gradient">
                  <Stack spacing={2} direction="row">
                    <div className="iconstyle">
                      <ShoppingCartIcon />
                    </div>
                    <div
                      className="paddingall"
                      onClick={() => navigate("/viewInventoryList")}
                    >
                      <span className="pricetitle"> Total products </span>
                      <br />
                      <span className="pricesubtitle">
                        {" "}
                        {totalInventories}{" "}
                      </span>
                    </div>
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }} className="gradient">
                  <Stack spacing={2} direction="row">
                    <div className="iconstyle">
                      <CurrencyExchangeIcon />
                    </div>
                    <div
                      className="paddingall"
                      onClick={() => navigate("/viewInventoryList")}
                    >
                      <span className="pricetitle"> Total Store Value</span>
                      <br />
                      <span className="pricesubtitle"> $3000 
                      {" "}
                      {totalStoreValue}{" "}
                      </span>
                    </div>
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }} className="gradient">
                  <Stack spacing={2} direction="row">
                    <div className="iconstyle">
                      <RemoveShoppingCartIcon />
                    </div>
                    <div
                      className="paddingall"
                      onClick={() => navigate("/viewInventoryList")}
                    >
                      <span className="pricetitle"> Out Of Stock</span>
                      <br />
                      <span className="pricesubtitle"> 9 </span>
                    </div>
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }} className="gradient">
                  <Stack spacing={2} direction="row">
                    <div className="iconstyle">
                      <CategoryIcon />
                    </div>
                    <div
                      className="paddingall"
                      onClick={() => navigate("/viewInventoryList")}
                    >
                      <span className="pricetitle"> All Categories</span>
                      <br />
                      <span className="pricesubtitle"> 6
                       </span>
                    </div>
                  </Stack>
                </Card>
              </Grid>
            </Grid>

            <Box height={20} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ height: 60 } + "vh"}>
                  <CardContent>
                    <div
                      style={{ width: "30%", height: "30%" }}
                      className="flex-container"
                    >
                      <div>
                        <Paper sx={{ p: 2, m: 2, flexGrow: 1, minWidth: 50 }}>
                          <h2>Inventory Status</h2>
                          {Object.entries(inventoryStatus).map(
                            ([status, count], index) =>
                              `${status}: ${count}${
                                index ===
                                Object.keys(inventoryStatus).length - 1
                                  ? ""
                                  : "| "
                              }`
                          )}
                          <Doughnut data={inventoryStatusData} />
                        </Paper>
                      </div>

            
                    </div>
                    <div
                      style={{
                        bottom: "0",
                        left: "500px",
                        width: "300px",
                        height: "300px",
                        backgroundImage:
                          "url(https://www.datalex.com.ng/wp-content/uploads/2021/08/img-inventory-control.png)",

                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "100% 100%",
                        zIndex: "-1",
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}
