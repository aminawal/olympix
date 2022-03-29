import React from "react";

import { Switch, Route, Redirect } from "react-router";

import Grid from "./components/Grid";
import Categories from "./pages/Categories/Categories";
import Category from "./pages/Category/Category";
import EventDetails from "./pages/EventDetails/EventDetails";
import Events from "./pages/Events/Events";
import Create from "./pages/Create/Create";

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
        <Route path="/sports/:category/:eventId" exact>
          <EventDetails />
        </Route>
        <Route path="/events">
          <Events />
        </Route>
        <Route>
          <Create />
        </Route>
      </Switch>
    </Grid>
  );
}

export default App;
