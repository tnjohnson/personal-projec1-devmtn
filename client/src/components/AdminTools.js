import React, { Component } from "react";
import axios from "axios";
import "./AdminTools.css";

class AdminTools extends Component {
  constructor() {
    super();

    this.state = {
      newJob: "",
      newDescription: ""
      // userList: []
    };
    this.inputJob = this.inputJob.bind(this);
  }

  componentDidMount() {
    this.props.isAdmin ? document.title = "Minion's Menial Labor List": document.title ="Jobs Available for the Taking!";
  }

  async inputJob() {
    try {
      const body = {
        newJob: this.state.newJob,
        newDescription: this.state.newDescription
      };
      if (body.newJob && body.newDescription) {
        await axios.post("/add_job", body);
        this.setState({ newJob: "", newDescription: "" });
        this.props.getUnassigned();
      } else {
        alert("Job needs both a Title and a Description");
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  render() {
    // console.log(this.state);
    // console.log('admin?', this.props.isAdmin)
    if (!this.props.isAdmin) {
      return null;
    } else {
      return (
        <div className="AdminToolWrapper">
          <h1>Add Job:</h1>
          <div className="AdminAddJob">
            <input
              placeholder="Job"
              value={this.state.newJob}
              onChange={event => this.setState({ newJob: event.target.value })}
            />

            <input
              placeholder="Description"
              // need to add this value in order to be specific on what im grabbing
              // and so I can clear the input box by resetting state.
              value={this.state.newDescription}
              onChange={event =>
                this.setState({ newDescription: event.target.value })
              }
            />
            <button onClick={() => this.inputJob()}>Add</button>
          </div>
        </div>
      );
    }
  }
}

export default AdminTools;
