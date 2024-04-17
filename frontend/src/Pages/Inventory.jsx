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


export default function Inventory() {
  return (
    <>
      <AppBar />
      <Menu />
      <div style={{ marginLeft: "200px", paddingTop: "20px" }}>
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 8 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Stack spacing={2}>
                  <Card sx={{ maxWidth: 345 }} className="gradient">
                    <Stack spacing={2} direction="row">
                      <div className="iconstyle">
                        <ShoppingCartIcon />
                      </div>
                      <div className="paddingall">
                        <span className="pricetitle"> Total products</span>
                        <br />
                        <span className="pricesubtitle"> 9 </span>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }} className="gradient">
                  <Stack spacing={2} direction="row">
                    <div className="iconstyle">
                      <CurrencyExchangeIcon />
                    </div>
                    <div className="paddingall">
                      <span className="pricetitle"> Total Store Value</span>
                      <br />
                      <span className="pricesubtitle"> $350000 </span>
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
                    <div className="paddingall">
                      <span className="pricetitle"> Out Of Stock</span>
                      <br />
                      <span className="pricesubtitle"> 2 </span>
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
                    <div className="paddingall">
                      <span className="pricetitle"> All Categories</span>
                      <br />
                      <span className="pricesubtitle"> 15</span>
                    </div>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}
