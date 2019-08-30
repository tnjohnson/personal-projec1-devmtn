import React, { Component } from "react";
import axios from "axios";
import "./popUp.css";

class PopUp extends Component {
  constructor() {
    super();

    this.state = {
      userList: [],
      value: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAssignJob = this.handleAssignJob.bind(this);
    this.handleRemoveJob = this.handleRemoveJob.bind(this);
  }

  componentDidMount() {
    axios
      .get("/get_user_list")
      .then(response => this.setState({ userList: response.data }))
      .catch(error => console.error(error));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log("value", event.target.value);
    console.log("id of user", event.target.value);
  }

  takeJob = async (userId, jobId) => {
    const payload = { userId: userId, jobId: jobId };
    const sendJob = await axios.post("/my_jobs", payload);

    console.log("sent job", sendJob);
  };

  async handleAssignJob() {
    try {
      const id = this.state.value;
      const jobId = this.props.currentJobId;
      const body = {
        jobId: jobId,
        userId: id
      };
      // add another condition below that a user has to be selected.
      // console.log("body", body);
      if (body.userId) {
        await axios.post("/assign_job_admin", body);
        this.props.getUnassigned();
        this.props.togglePopUp(0);
      } else {
        alert("boo");
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  async handleRemoveJob() {
    try {
      // want to put a window.prompt in to ask if the admin is sure that he would
      // like to delete the job.  Maybe have him enter his password to delete the job
      const jobId = this.props.currentJobId;
      console.log(this.props);
      await axios
        .delete(`/remove_job/${jobId}`)
        .then(response => {
          this.props.getUnassigned();
          this.props.getAssigned();
          this.props.togglePopUp(0);
        })
        .catch(error => console.error(error));
    } catch (error) {}
  }

  render() {
    // console.log("jobs", this.props.unassigned_jobs);
    const job = this.props.unassigned_jobs.find(item => {
      return item.id === this.props.currentJobId;
    });
    // console.log(this.props.currentJobId)
    const userId = this.props.user_name;
    const jobId = job.id;
    // console.log(job)
    // console.log(userId, jobId);
    return (
      <div className="popUp">
        <div className="popUp_inner">
          <h1>{job.description}</h1>
          <button
            onClick={() => {
              this.takeJob(userId, jobId);
              this.props.getUnassigned();
              this.props.getAssigned();
              this.props.togglePopUp(0);
            }}
          >
            Grab This Job
          </button>
          <button onClick={() => this.props.togglePopUp(0)}>Close</button>
          {/* in the middle of a react app, cant use an IF statement, but you can use
          a ternary */}
          {this.props.isAdmin ? (
            <div className="AdminAssignJob">
              <h1>Assign Job:</h1>
              <select value={this.state.value} onChange={this.handleChange}>
                <option>{"Users"}</option>
                {this.state.userList.map((user, i) => {
                  return (
                    <option key={i} value={user.id}>
                      {user.user_name}
                    </option>
                  );
                })}
              </select>
              <button onClick={this.handleAssignJob}>Submit </button>

              <h1>Delete This Job:</h1>
              <button onClick={this.handleRemoveJob}>Delete</button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default PopUp;
