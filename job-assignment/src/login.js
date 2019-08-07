import React, { Component } from "react";
import axios from "axios";
import "./reset.css";
import "./login.css";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      user: []
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  componentDidMount() {
    document.title = "Login please";
  }

  async handleSignUp() {
    try {
      const body = {
        user_name: this.state.username,
        password: this.state.password
      };
      if (body.user_name && body.password) {
        const response = await axios.post("/signUp", body);
        alert("New user Successfully Added");
        this.props.history.push("/mainPage");
        console.log(response.data);
        this.setState({ user: response.data });
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  handleLogin() {
    try {
    } catch (error) {}
  }

  render() {
    // console.log(this.state);
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

export default Login;
