import React, { Component } from "react";
import "./popUp.css";
import Axios from "axios";

class PopUp extends Component {
  
  takeJob = async (userId, jobId) => {
    const payload = {userId: userId, jobId: jobId}
    const sendJob = await Axios.post("/my_jobs", payload);
    console.log('sent job', sendJob)
  } ;

  render() {
    // console.log("jobs", this.props.unassignedJobs);
    const job = this.props.unassignedJobs.find(item => {
      return item.id === this.props.currentJobId;
    });

    const userId = this.props.user_name;
    const jobId = job.id;  

    console.log(userId, jobId)
    return (
      <div className="popUp">
        <div className="popUp_inner">
          <h1>{job.description}</h1>
          <button onClick={() => this.props.togglePopUp(0)}>Close</button>
          <button onClick={() => {
            this.takeJob(userId, jobId);

            
            console.log('hi')
            this.props.togglePopUp(0)
          } }>Grab This Job</button>
        </div>
      </div>
    );
  }
}

export default PopUp;
