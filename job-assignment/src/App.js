import React, { Component } from "react";
import "./reset.css";
import "./App.css";
import myRoutes from "./routes";

class App extends Component {
  render() {
    return myRoutes;
  }
}

export default App;

// import React,  { Component } from 'react';
// import axios from "axios";
// import './reset.css';
// import './App.css';
// import Header from './components/Header';
// import UnassignedJobs from './components/UnassignedJobs';

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       unassignedJobs: [],
//     }
//   }

//   componentDidMount() {
//     axios.get('http://localhost:8080/unassignedJobs').then(response => {
//     console.log(response.data)
//     this.setState({unassignedJobs: response.data})}).catch(error => console.error(error));

//   }

//   render() {
//     // console.log(this.state.unassignedJobs)
//     return (
//       <div className="App">
//         <Header />
//         <UnassignedJobs title="Unassigned Jobs" value={this.state.unassignedJobs}/>
//       </div>
//     );

//   }
// }

// export default App;
