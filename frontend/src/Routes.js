import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./User/Login";
import Register from "./User/Register";
import Calendar from "./Calendar/Calendar";


export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/calendar" exact component={Calendar} />
  </Switch>;
