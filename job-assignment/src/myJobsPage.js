import React, { Component } from "react";
// import axios from "axios";
import "./reset.css";
import "./App.css";
import AssignedJobs from "./components/AssignedJobs";
import PopUp2 from "./components/popUp2";

class MyJobsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignedJobs: [],
      showPopUp2: false,
      currentJobId: ""
    };
    this.togglePopUp2 = this.togglePopUp2.bind(this);
  }

  componentDidMount() {
    this.props.isAdmin ? 
      document.title = "Optional Duty List" : document.title = "My Jobs"
  }

  togglePopUp2(id) {
    
    this.setState({
      showPopUp2: !this.state.showPopUp2,
      currentJobId: id
    });
  }

  render() {
    // console.log('PopUp2', this.state.showPopUp2)
    return (
      <div className="MyJobsPage">
        <AssignedJobs
          title="My Jobs"
          assigned_jobs={this.props.assigned_jobs}
          user_id={this.props.user_id}
          togglePopUp2={this.togglePopUp2}
          showPopUp2={this.state.showPopUp2}
          getAssigned={this.getAssigned}
        />
        {this.state.showPopUp2 && (
          <PopUp2
            togglePopUp2={this.togglePopUp2}
            currentJobId={this.state.currentJobId}
            assigned_jobs={this.props.assigned_jobs}
            user_id={this.props.user_id}
            showPopUp2={this.state.showPopUp2}


            getAssigned={this.props.getAssigned}
            // getAssigned={this.getAssigned}
          />
        )}
      </div>
    );
  }
}

export default MyJobsPage;
