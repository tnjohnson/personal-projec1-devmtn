import React, { Component } from "react";
import axios from "axios";
import "./popUp.css";

class PopUp2 extends Component {
  constructor() {
    super();

    this.state = {
      newNote: ""
    };
    this.addNote = this.addNote.bind(this);
    this.jobCompleted = this.jobCompleted.bind(this);
  }

  async addNote() {
    try {
      const body = {
        newNote: this.state.newNote,
        jobId: this.props.currentJobId
      };
      if (body.newNote) {
        await axios.post("/add_note", body);
        this.setState({ newNote: "" });
        this.props.togglePopUp2(0);
      } else {
        alert("Note cannot be blank!");
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  async jobCompleted() {
    try {
      // send jobId, call up job, and change table to true for completed
      const jobId = this.props.currentJobId;
      await axios.patch(`/complete_job/${jobId}`).then(response => {
        this.props.getAssigned();
        this.props.togglePopUp2(0);
      });
    } catch (error) {
      console.error("error", error);
    }
  }

  render() {
    // console.log('FIND ME',this.props.getAssigned)
    const job = this.props.assigned_jobs.find(item => {
      return item.job_id === this.props.currentJobId;
    });
    return (
      <div className="popUp">
        <div className="popUp_inner">
          <h1>{job.description}</h1>
          <input
            placeholder="Notes"
            value={this.state.newNote}
            onChange={event => this.setState({ newNote: event.target.value })}
          />

          <button onClick={() => this.addNote(this.props.currentJobId)}>
            Submit Notes
          </button>
          <button>View Notes</button>
          <button onClick={this.jobCompleted}>Job Completed</button>
          <button onClick={() => this.props.togglePopUp2(0)}>Close</button>
        </div>
      </div>
    );
  }
}

export default PopUp2;
