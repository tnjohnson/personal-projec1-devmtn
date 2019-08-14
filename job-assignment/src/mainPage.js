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



class MainPage extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      unassignedJobs: [],
      showPopUp: false,
      currentJobId: "",
      assignedJobs: [],
    };
    this.togglePopUp = this.togglePopUp.bind(this);
  }

  componentDidMount() {
    document.title = "Jobs Available for the Taking!";

    Promise.all([
      axios.get('/logged_in_user'),
      axios.get("/unassigned_jobs"),
      axios.get(`/assigned_jobs`)
    ])
    .then((all) => {
      const [userResponse, jobsResponse, assignedJobsResponse] = all
      this.setState({ 
        user: userResponse.data,
        unassignedJobs: jobsResponse.data,
        assignedJobs: assignedJobsResponse.data
      })
    })
    .catch(error => {
      console.error(error)
      this.props.history.push('/login')
    }); 
  }

  togglePopUp(id) {
    this.setState({
      showPopUp: !this.state.showPopUp,
      currentJobId: id // not sure how this id makes it so that it doesn't do a pop up on all the things, or even what this id does.
    });
  }

  render() {
    // console.log('what this?',this.state.user)
    if (!this.state.user) return <div>Loading</div>
    return (
      <div className="App">
        <Header
          user_name={this.state.user.user_name}
          toggleMenu={this.toggleMenu}
        />

        <Route
          path="/jobs/unassigned"
          render={routeProps => {
            return (
              <div className="unassignedJobsWrapper">
                <UnassignedJobs
                  {...routeProps} //this is how you pass the route props (history, location, match) to the Unassigned Jobs Component
                  title="Unassigned Jobs"
                  unassignedJobs={this.state.unassignedJobs}
                  togglePopUp={this.togglePopUp}
                  showPopUp={this.state.showPopUp}
                />,
                <AdminTools 
                  isAdmin={ this.state.user.administrator }
                />


              </div>
              );
          }}
        />

        <Route
          path="/jobs/grabbed"
          render={routeProps => {
            return <MyJobPage 
              assigned_jobs={this.state.assignedJobs}
              user_id={this.state.user.id}
              {...routeProps} />;
          }}
        />

        {this.state.showPopUp && (
          <PopUp
            togglePopUp={this.togglePopUp}
            currentJobId={this.state.currentJobId}
            unassignedJobs={this.state.unassignedJobs}
            user_name={this.state.user.id}

          />
        )}
      </div>
    );
  }
}

export default MainPage;
