import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage";

const Routes = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5">Welcome to Williams-Sonoma</Typography>
      </Toolbar>
    </AppBar>
    <BrowserRouter>
      <Switch>
        <Route path="/product-list" component={ProductListPage} />
        <Route path="/" component={ProductListPage} />
      </Switch>
    </BrowserRouter>
  </>
);

export default Routes;
