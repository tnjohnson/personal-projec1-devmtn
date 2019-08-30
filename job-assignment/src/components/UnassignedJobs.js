import React from "react";

function UnassignedJobs(props) {
  // console.log('this is props in Unassigned',props.unassigned_jobs)
  let list = props.unassigned_jobs.map((item, i) => {
    // console.log('hey', item.id)
    return (
      <div
        className="displayedJobs"
        key={i}
        onClick={() => props.togglePopUp(item.id)}
      >
        {" "}
        {item.job_title}
        {/* what the heck are these spaces... I used the prettier format and they just appeared */}
      </div>
    );
  });
  return (
    <div
      className="jobsWrapper2"
      // unassignedJobs={props.unassignedJobs}
    >
      <h1>{props.title}</h1>
      <h2>{list}</h2>
    </div>
  );
}

export default UnassignedJobs;
