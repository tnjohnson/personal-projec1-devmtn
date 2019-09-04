import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import "./reset.css";
import "./App.css";
import Header from "./components/Header";
import UnassignedJobs from "./components/UnassignedJobs";
import PopUp from "./components/popUp";
import MyJobPage from "./myJobsPage";
import AdminTools from "./components/AdminTools";
import AdminSummary from "./adminSummary";

// import nodemailer from 'nodemailer';

class MainPage extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      unassignedJobs: [],
      showPopUp: false,
      currentJobId: "",
      assignedJobs: []
    };
    this.togglePopUp = this.togglePopUp.bind(this);
    this.getUnassigned = this.getUnassigned.bind(this);
    this.getAssigned = this.getAssigned.bind(this);
  }

  componentDidMount() {
    document.title = "Jobs Available for the Taking!";

    Promise.all([
      axios.get("/logged_in_user"),
      axios.get("/unassigned_jobs"),
      axios.get(`/assigned_jobs`)
    ])
      .then(all => {
        const [userResponse, jobsResponse, assignedJobsResponse] = all;
        this.setState({
          user: userResponse.data,
          unassignedJobs: jobsResponse.data,
          assignedJobs: assignedJobsResponse.data
        });
      })
      .catch(error => {
        console.error(error);
        this.props.history.push("/login");
      });
  }

  getAssigned() {
    axios
      .get("/assigned_jobs")
      .then(assignedJobsResponse =>
        this.setState({ assignedJobs: assignedJobsResponse.data })
      )
      .catch(error => {
        console.error(error);
      });
  }

  getUnassigned() {
    axios
      .get("/unassigned_jobs")
      .then(jobsResponse =>
        this.setState({ unassignedJobs: jobsResponse.data })
      )
      .catch(error => {
        console.error(error);
      });
  }

  togglePopUp(id) {
    this.setState({
      showPopUp: !this.state.showPopUp,
      currentJobId: id // not sure how this id makes it so that it doesn't do a pop up on all the things, or even what this id does.
    });
  }

  render() {
    // console.log(this.state)
    // console.log("what this?", this.state.unassignedJobs);

    // if (!this.state.user) return <div className="loader"></div>;
    // check the css for credit on how the loading icon was made.
    if (!this.state.user)
      return (
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
      );
    return (
      <div className="App">
        <Header
          user_name={this.state.user.user_name}
          toggleMenu={this.toggleMenu}
          isAdmin={this.state.user.administrator}
          // not sure what this toggleMenu is for.  Might be removable.
        />

        <Route
          path="/jobs/unassigned"
          render={routeProps => {
            return (
              <div className="jobsWrapper">
                <UnassignedJobs
                  {...routeProps} //this is how you pass the route props (history, location, match) to the Unassigned Jobs Component
                  title="Unassigned Jobs"
                  unassigned_jobs={this.state.unassignedJobs}
                  togglePopUp={this.togglePopUp}
                  showPopUp={this.state.showPopUp}
                />
                ,
                <AdminTools
                  isAdmin={this.state.user.administrator}
                  getUnassigned={this.getUnassigned}
                />
              </div>
            );
          }}
        />

        <Route
          path="/jobs/grabbed"
          render={routeProps => {
            return (
              <MyJobPage
                assigned_jobs={this.state.assignedJobs}
                user_id={this.state.user.id}
                currentJobId={this.state.currentJobId}
                getAssigned={this.getAssigned}
                isAdmin={this.state.user.administrator}
                {...routeProps}
              />
            );
          }}
        />

        <Route
          path="/jobs/accomplished"
          render={routeProps => {
            return (
              <AdminSummary
                user_id={this.state.user.id}
                isAdmin={this.state.user.administrator}
                currentJobId={this.state.currentJobId}
                // togglePopUp={this.togglePopUp}

                {...routeProps}
              />
            );
          }}
        />

        {this.state.showPopUp && (
          <PopUp
            togglePopUp={this.togglePopUp}
            currentJobId={this.state.currentJobId}
            unassigned_jobs={this.state.unassignedJobs}
            user_name={this.state.user.id}
            isAdmin={this.state.user.administrator}
            getUnassigned={this.getUnassigned}
            getAssigned={this.getAssigned}
          />
        )}
      </div>
    );
  }
}

export default MainPage;
