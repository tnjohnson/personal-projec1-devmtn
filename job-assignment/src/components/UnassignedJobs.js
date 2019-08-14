import React from "react";

function UnassignedJobs(props) {
  // console.log('this is props in Unassigned',props)
  let list = props.unassignedJobs.map((item, i) => {
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
      className="unassignedJobsWrapper2"
      text="Prop of DOOM"
      unassignedJobs={props.unassignedJobs}
    >
      <h1>{props.title}</h1>
      <h2>{list}</h2>
    </div>
  );
}

export default UnassignedJobs;
