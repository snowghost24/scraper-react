import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SavedA from "./pages/savedarticles";
import ScrapedA from "./pages/scraperarticles";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () =>
  <Router>
    <div>
      {/* <Nav /> */}
      <Switch>
        <Route exact path="/" component={ScrapedA} />
        <Route exact path="/scraper" component={ScrapedA}  />
        <Route exact path="/saver" component={SavedA} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
