import React from "react";

import { Switch, Route } from "react-router";

import Grid from "./components/Grid";
import Categories from "./pages/Categories/Categories";

function App() {
  return (
    <Grid>
      <Switch>
        <Route path="/" exact>
          <Categories />
        </Route>
      </Switch>
    </Grid>
  );
}

export default App;
