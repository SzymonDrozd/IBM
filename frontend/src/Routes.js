import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./User/Login";
import Register from "./User/Register";
import CalendarTeacher from "./Calendar/CalendarTeacher";
import CalendarStudent from "./Calendar/CalendarStudent";
import MyCalendar from "./Calendar/MyCalendar";
import EditLesson from "./Lesson/EditLesson"
//import AppliedRoute from "./Components/AppliedRoute";
import AuthenticatedRoute from "./Authentication/AuthenticatedRoute";
import TeacherAuthenticatedRoute from "./Authentication/TeacherAuthenticatedRoute";
import StudentAuthenticatedRoute from "./Authentication/StudentAuthenticatedRoute";
import UnauthenticatedRoute from "./Authentication/UnauthenticatedRoute";
import NotFound from "./NotFound/NotFound";



export default ({ childProps }) =>
  <Switch>
    <UnauthenticatedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/register" exact component={Register} props={childProps} />
    <TeacherAuthenticatedRoute path="/calendarTeacher" exact component={CalendarTeacher} props={childProps} />
    <StudentAuthenticatedRoute path="/calendarStudent" exact component={CalendarStudent} props={childProps} />
    <AuthenticatedRoute path="/myCalendar" exact component={MyCalendar} props={childProps} />
    <AuthenticatedRoute path="/editlesson" exact component={EditLesson} props={childProps}/>
    <Route component={NotFound} />
  </Switch>;
