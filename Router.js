import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Notification from "./components/Notifications/Notifications";
import Layout from "./HOC/Layout/Layout";
import Profile from "./Containers/Profile/Profile";
import Sideinfo from "./components/sideInfo/SideInfo";
import NewsFeed from "./Containers/NewsFeed/NewsFeed";
import LogIn from "./Containers/Login/LogIn";
import { Route, Switch, Redirect } from "react-router-dom";

function Router() {
  let account = (
    <div className="container">
      <div className="row">
        <div className=" col-lg-3 d-none d-lg-block ">
          <Sideinfo />
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <NewsFeed />
        </div>

        <div className="col-lg-3 d-none d-lg-block ">
          <Notification />
        </div>
      </div>
    </div>
  );
  let layout = (
    <Route>
      <Layout>
        <Switch>
          <Route
            path="/"
            render={() => {
              return account;
            }}
          />
        </Switch>
      </Layout>
    </Route>
  );
  return (
    <div className="App">
      <Redirect to="/login" />
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/profile" component={Profile} />
        <Route
          path="/"
          render={() => {
            return layout;
          }}
        />
      </Switch>
    </div>
  );
}

export default Router;
