import React from "react";
import "./header.css";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

function Header(props) {
  // console.log("Header!", props.location.pathname);

  return (
    <div className="header">
      <div className="welcomeUser">
      {`Welcome ${props.user_name}!`}
      </div>
      {props.isAdmin ? (
        <Link className="Admin" to="/jobs/accomplished">
          Admin
        </Link>
      ) : null}

      {props.location.pathname === "/jobs/unassigned" ? (
        <Link className="myJobsMenu" to="/jobs/grabbed">
          My Jobs
        </Link>
      ) : (
        <Link className="unassignedJobsMenu" to="/jobs/unassigned">
          Available Jobs
        </Link>
      )}

      <div className="logOutMenu" onClick={async() => {
        await axios.post('/logout')
        props.history.push('/login')
      }}>
        Log Out
      </div>
    </div>
  );
}

export default withRouter(Header);

// {
//   /* <Link className="unassignedJobsMenu" to='/jobs/unassigned'>Available Jobs</Link>
// <Link className="myJobsMenu" to='/jobs/grabbed'>My Jobs</Link> */
// }
