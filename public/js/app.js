import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Provider } from "react-redux";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Users from "./components/Users";
import NewUser from "./components/NewUser";
import EditUser from "./components/EditUser";
import Articles from "./components/Articles";
import Contact from "./components/Contact";
import store from "./store";

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history = { hashHistory }>
      <Route path = "/" component = { Layout }>
        <IndexRoute component = { Home }></IndexRoute>
        <Route path = "users" component = { Users }></Route>
        <Route path = "users/new" component = { NewUser }></Route>
        <Route path = "users/:id/edit" component = { EditUser }></Route>
        <Route path = "articles" component = { Articles }></Route>
        <Route path = "contact" component = { Contact }></Route>
      </Route>
    </Router>
  </Provider>,
    app);
