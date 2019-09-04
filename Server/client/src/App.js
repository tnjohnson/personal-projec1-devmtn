import React, { Component } from "react";
import "./reset.css";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./login";
import MainPage from "./mainPage";

class App extends Component {
  render() {
    // console.log(this.state.user)
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/jobs" component={MainPage} />
        
      </Switch>
    );
  }
}

export default App;

