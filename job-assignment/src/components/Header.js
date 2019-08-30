import React from "react";
import "./header.css";
import { Link, withRouter } from "react-router-dom";

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

      <Link className="logOutMenu" to="/login">
        Log Out
      </Link>
    </div>
  );
}

export default withRouter(Header);

// {
//   /* <Link className="unassignedJobsMenu" to='/jobs/unassigned'>Available Jobs</Link>
// <Link className="myJobsMenu" to='/jobs/grabbed'>My Jobs</Link> */
// }
