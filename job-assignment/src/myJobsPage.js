import React, { Component } from "react";
// import axios from "axios";
import "./reset.css";
import "./App.css";
import AssignedJobs from "./components/AssignedJobs";
import PopUp2 from "./components/popUp2";
import PopUp4Notes from "./components/popUp4Notes";
import axios from "axios";

class MyJobsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignedJobs: [],
      showPopUp2: false,
      currentJobId: "",
      showPopUp4Notes: false,
      notes: []

    };
    this.togglePopUp2 = this.togglePopUp2.bind(this);
    this.togglePopUp4 = this.togglePopUp4.bind(this);
    this.refreshNote = this.refreshNote.bind(this);
  }

  componentDidMount() {
    this.props.isAdmin ? 
      document.title = "Optional Duty List" : document.title = "My Jobs"

    axios.get("/get_notes")
    .then(response => this.setState({notes: response.data}))
    .catch(error => {console.error(error);})
  }

  refreshNote() {
   axios
    .get('/get_notes')
    .then(response => 
      this.setState({ notes: response.data })
      )
    .catch(error => {
      console.error(error);
    });
  }

  togglePopUp2(id) {
    this.setState({
      showPopUp2: !this.state.showPopUp2,
      currentJobId: id
    });
  }

  togglePopUp4(id) {
    this.setState({
      showPopUp4Notes: !this.state.showPopUp4Notes,
      currentJobId: id
    });
  }


  render() {
    // console.log('PopUp4', this.state.showPopUp4Notes)
    console.log('notes', this.state.notes)
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
            togglePopUp4={this.togglePopUp4}
            currentJobId={this.state.currentJobId}
            assigned_jobs={this.props.assigned_jobs}
            user_id={this.props.user_id}
            showPopUp2={this.state.showPopUp2}
            getAssigned={this.props.getAssigned}
            refreshNote={this.refreshNote}
            // getAssigned={this.getAssigned}
          />
        )}
        {/* {this.state.showPopUp3Admin && (
          <PopUp3Admin
            togglePopUp3={this.togglePopUp3}
            currentJobId={this.state.currentJobId}
            assigned_jobs={this.props.assigned_jobs}
            notes={this.state.notes}
          />
        )} */}
        {this.state.showPopUp4Notes && (
          <PopUp4Notes 
            togglePopUp4={this.togglePopUp4}
            currentJobId={this.state.currentJobId}
            assigned_jobs={this.props.assigned_jobs}
            notes={this.state.notes}
          />
        )}
      </div>
    );
  }
}

export default MyJobsPage;
