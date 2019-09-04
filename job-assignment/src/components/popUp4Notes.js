import React, { Component } from "react";
import "./popUp.css";

class PopUp4Notes extends Component {
  displayNotes() {
    const note = this.props.notes.filter(noteItem => {
      return noteItem.job_id === this.props.currentJobId;
    });

    let noteList = note.map((itemNote, i) => {
      return (
        <div className="displayedNotes" key={i}>
          {itemNote.note}
        </div>
      );
    });
    return <div>{noteList}</div>;
  }

  render() {
    const job = this.props.assigned_jobs.find(item => {
      return item.job_id === this.props.currentJobId;
    });

    return (
      <div className="popUp">
        <div className="popUp_inner">
          <h1>{job.description}</h1>
          <h2>{"Notes:"}</h2>
          <h3>{this.displayNotes()}</h3>
          <button onClick={() => this.props.togglePopUp4(this.props.currentJobId)}>Close</button>
        </div>
      </div>
    );
  }
}

export default PopUp4Notes;
