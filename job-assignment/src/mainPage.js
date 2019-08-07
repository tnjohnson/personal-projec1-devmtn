import React, { Component } from "react";
import axios from "axios";
import "./reset.css";
import "./App.css";
import Header from "./components/Header";
import UnassignedJobs from "./components/UnassignedJobs";
import PopUp from "./components/popUp"

class MainPage extends Component {
  constructor() {
    super();

    this.state = {
      unassignedJobs: [],
      showPopUp: false,
      currentJobId: ''
    };
    this.togglePopUp=this.togglePopUp.bind(this);
  }

  componentDidMount() {
    document.title = "Jobs Available for the Taking!";
    axios
      .get("http://localhost:8080/unassignedJobs")
      .then(response => {
        console.log('this is in mainPage',response.data);
        this.setState({ unassignedJobs: response.data });
      })
      .catch(error => console.error(error));
  }


togglePopUp(id) {
  this.setState({
    showPopUp: !this.state.showPopUp, 
    currentJobId: id  // not sure how this id makes it so that it doesnt do a pop up on all the things, or even what this id does.
  });
}



  render() {
    // console.log(this.state.unassignedJobs)
    return (
      <div className="App">
        <Header />
        <UnassignedJobs
          title="Unassigned Jobs"
          unassignedJobs={this.state.unassignedJobs}
          togglePopUp={this.togglePopUp}
          showPopUp={this.state.showPopUp}
        />
        {this.state.showPopUp ? <PopUp togglePopUp={this.togglePopUp} currentJobId={this.state.currentJobId} unassignedJobs={this.state.unassignedJobs} /> : null}
      </div>
    );
  }
}

export default MainPage;
