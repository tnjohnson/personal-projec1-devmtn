import React, { Component } from "react";
import "./popUp.css";

class PopUp3Admin extends Component {
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
    // console.log(this.props.accomplished_jobs[0].description);
    const job = this.props.accomplished_jobs.find(item => {
      return item.id === this.props.currentJobId;
    });

    // console.log("note", note.job_id);
    return (
      <div className="popUp">
        <div className="popUp_inner">
          <h1>{job.description}</h1>
          <h2>{"Notes:"}</h2>
          <h3>{this.displayNotes()}</h3>
          <button onClick={() => this.props.togglePopUp3(0)}>Close</button>
        </div>
      </div>
    );
  }
}

export default PopUp3Admin;
