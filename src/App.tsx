import React from "react";
import Dashboard from "./components/Videos";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import VideoPlayer from "./components/VideoPlayer";
import PublishDashboard from "./components/Publish/dashboard";
import SearchResults from "./components/SearchResults";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  return (
    <Router>
      <Switch>
        <Navigation>
          <Route exact path='/' component={Home} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/videos' component={Dashboard} />
          <Route exact path='/publish' component={PublishDashboard} />
          <Route exact path='/watch/:id' component={VideoPlayer} />
          <Route exact path='/search' component={SearchResults} />
        </Navigation>
      </Switch>
    </Router>
  );
};

export default App;
