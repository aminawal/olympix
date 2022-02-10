import React from "react";

import { Switch, Route, Redirect } from "react-router";

import Grid from "./components/Grid";
import Categories from "./pages/Categories/Categories";
import Category from "./pages/Category/Category";

function App() {
  return (
    <Grid>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/sports"/>
        </Route>
        <Route path="/sports" exact>
          <Categories />
        </Route>
        <Route path="/sports/:category" exact>
          <Category />
        </Route>
      </Switch>
    </Grid>
  );
}

export default App;
