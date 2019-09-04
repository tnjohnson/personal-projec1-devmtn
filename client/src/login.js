import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./reset.css";
import "./login.css";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.title = "Login please";
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

handleKeyPress(event) {
  if (event.keyCode === 13) {
    this.handleLogin();
  }
}

  async handleSignUp() {
    try {
      const body = {
        user_name: this.state.username,
        password: this.state.password
      };
      if (body.user_name && body.password) {
        const response = await axios.post("/sign_up", body);
        alert("New user Successfully Added");
        this.props.history.push("/jobs/unassigned");
        console.log(response.data);
      } else {
        alert("Please Enter a User Name and Password");
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  async handleLogin() {
    try {
      const body = {
        user_name: this.state.username,
        password: this.state.password
      };
      if (body.user_name && body.password) {
        await axios.post("/login", body);
        // alert(`Welcome ${this.state.username}`);
        this.props.history.push("/jobs/unassigned");
        // console.log(response.data);
      } else {
        alert("Please Enter a Valid User Name and Password");
      }
    

    } catch (error) {
      console.error("error", error)
    }
  }

  render() {
    // console.log(this.props);
    return (
      <div className="Login">
        <div className="LoginBox">
          <div className="username">
            <input
              placeholder="User"
              onChange={event =>
                this.setState({ username: event.target.value })
              }
            /> 
          </div>
          <div className="passwordInput">
            <input
              placeholder="Password"
              type="password"
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
          </div>
          <div className="loginButton" onClick={this.handleLogin}>
            Login
            {/* <button>Login</button> */}
          </div>
          <div className="signUpInput" onClick={this.handleSignUp}>
            Sign Up
            {/* <button>Sign Up</button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
