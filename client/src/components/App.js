import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import TodoList from './views/Dashboard/TodoList';
import AddTask from './views/Dashboard/AddTask';
import UpdateTask from './views/Dashboard/UpdateTask';
import TodoListArchived from './views/Dashboard/TodoListArchived';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/todolist" component={Auth(TodoList, true)} />
          <Route exact path="/addtask" component={Auth(AddTask, true)} />
          <Route exact path="/update/:todoId" component={Auth(UpdateTask, true)} />
          <Route exact path="/todolist/archived" component={Auth(TodoListArchived, true)} />

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
