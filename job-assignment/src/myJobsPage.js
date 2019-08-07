import React, { Component } from "react";
// import axios from "axios";
import "./reset.css";
import "./App.css";
import Header from "./components/Header";

class MyJobsPage extends Component {
  componentDidMount() {
    document.title = "My Jobs";
  }
  render() {
    return (
      <div>
        <Header />
        Jobs I grabbed!
      </div>
    );
  }
}

export default MyJobsPage;
