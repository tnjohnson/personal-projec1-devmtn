import React, { Component } from "react";
// import axios from "axios";
import "./reset.css";
import "./App.css";
import AssignedJobs from "./components/AssignedJobs"

class MyJobsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // user_id: this.props.user_id,
      assignedJobs:[]
    }
  }
  
  componentDidMount() {
    document.title = "My Jobs";
    
  }


  render() {
    // console.log(this.props)
    // console.log('I want this 22',this.props.user_id)
    return (
      <div className="MyJobsPage">
        <AssignedJobs
          title="My Jobs"
          assigned_jobs={this.props.assigned_jobs}
          user_id={this.props.user_id}
        />
        Jobs I grabbed!
      </div>
    );
  }
}

export default MyJobsPage;
