import React, { Component } from "react";
import "./reset.css";
import "./App.css";
import axios from "axios";
import Accomplished from "./components/AccomplishedJobs";
import PopUp3Admin from "./components/popUp3Admin";

class AdminSummary extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      showPopUp3Admin: false,
      accomplishedJobs: [],
      currentJobId: "",
      notes: []
    };
    this.togglePopUp3 = this.togglePopUp3.bind(this);
  }

  togglePopUp3(id) {
    this.setState({
      showPopUp3Admin: !this.state.showPopUp3Admin,
      currentJobId: id
    });
  }

  componentDidMount() {
    document.title = "Jobs Accomplished";

    Promise.all([axios.get("/accomplished_jobs"), axios.get("/get_notes")])
      .then(all => {
        const [accomplishedJobsResponse, notesResponse] = all;
        this.setState({
          accomplishedJobs: accomplishedJobsResponse.data,
          notes: notesResponse.data
        });
      })
      .catch(error => {
        console.error(error);
        // this.props.history.push("/login");
      });
  }

  render() {
    // console.log('FIND THE STATE',this.state)
    // console.log('notes', this.state.notes)
    return (
      <div className="jobsWrapper">
        <Accomplished
          title="Successfully Completed!"
          accomplished_jobs={this.state.accomplishedJobs}
          togglePopUp3={this.togglePopUp3}
          showPopUp3Admin={this.state.showPopUp3Admin}
        />
        {this.state.showPopUp3Admin && (
          <PopUp3Admin
            togglePopUp3={this.togglePopUp3}
            // showPopUp3Admin={this.state.showPopUp3Admin}
            currentJobId={this.state.currentJobId}
            accomplished_jobs={this.state.accomplishedJobs}
            notes={this.state.notes}
          />
        )}
      </div>
    );
  }
}

export default AdminSummary;
