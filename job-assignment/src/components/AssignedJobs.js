import React from "react";

function AssignedJobs(props) {
    console.log('this is the props for Assigned', props);
    let list = props.assigned_jobs.map((item, i) => {
        return (
            <div className="displayedAssignedJobs"
            key={i}
            >
            {item.job_title}

            </div>
        )
    })
    return(
        <div className="assignedJobsWrapper" assignedJobs={props.assignedJobs}>
            <h1>{props.title}</h1>
            <h2>{list}</h2>
        </div>
    )
}

export default AssignedJobs;
