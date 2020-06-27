import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Notification from "./components/Notifications/Notifications";
import Layout from "./HOC/Layout/Layout";
// import SharedThoughts from "./Containers/SharedThoughts/SharedThoughts";
// import ShareThoughts from "./Containers/ShareThoughts/ShareThoughts";
import Profile from "./Containers/Profile/Profile";
import Sideinfo from "./components/sideInfo/SideInfo";
import NewsFeed from "./Containers/NewsFeed/NewsFeed";
import LogIn from "./Containers/Login/LogIn";
import { Route, Switch, Redirect } from "react-router-dom";
// import "node_modules/video-react/dist/video-react.css";

function App() {
  let account = (
    <div className="container">
      <div className="row">
        <div className=" col-lg-3 d-none d-lg-block ">
          <Sideinfo />
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          {/* <ShareThoughts /> */}
          <NewsFeed />
          {/* <SharedThoughts /> */}
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
          {/* <Route exact path="/" component={LogIn} /> */}
          <Route
            path="/"
            render={() => {
              return account;
            }}
          />
        </Switch>

        {/* <LogIn /> */}
      </Layout>
    </Route>
  );
  return (
    <div className="App">
      {/* <Route path="/login" component={LogIn} /> */}
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
        {/* <Redirect to="/login" /> */}
      </Switch>
    </div>
  );
}

export default App;
