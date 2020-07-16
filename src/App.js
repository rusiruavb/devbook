import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/layouts/header.component";
import Login from "./components/auth/login.component";
import Profile from "./components/auth/profile.component";
import CreateProfile from "./components/layouts/create-profile.component";
import CreateExperience from "./components/layouts/create-experience.component";
import UpdateExperience from "./components/layouts/update-experience.component";

function App() {
  return (
    <div>
      <div>
        <Router>
          <Fragment>
            <Header />
            <section className="container">
              <Switch>
                <Route path="/register" component={CreateProfile} />
                <Route path="/login" component={Login} />
                <Route path="/me/update-experience/" component={UpdateExperience} />
                <Route path="/me" component={Profile} />
                <Route path="/addexperience" component={CreateExperience} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </div>
    </div>
  );
}

export default App;
