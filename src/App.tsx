import React, {useEffect} from "react";
import Dashboard from "./components/Videos";
import Home from "./components/Home";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Navigation} from "./components/Navigation";
import VideoPlayer from "./components/VideoPlayer";
import AdminDashboard from "./components/Admin/dashboard";
import SearchResults from "./components/SearchResults";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/reducers";
import {fetchAdmin} from "./redux/slice/adminSlice";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const admin = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    if (user.uid) {
      dispatch(fetchAdmin(user.uid));
    }
  }, [user.uid]);

  return (
    <Router>
      <Switch>
        <Navigation>
          <Route exact path='/' component={Home} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/videos' component={Dashboard} />
          <Route exact path='/watch/:id' component={VideoPlayer} />
          <Route exact path='/search' component={SearchResults} />
          {admin.admin ?
            <Route exact path='/admin/dashboard' component={AdminDashboard} /> :
            null}
        </Navigation>
      </Switch>
    </Router>
  );
};

export default App;
