import React from "react";

function AssignedJobs(props) {
    
    // looks like the password is being passed within props here
    let list = props.assigned_jobs.map((item, i) => {
        
        return (
            <div className="displayedAssignedJobs"
            key={i}
            onClick={() => props.togglePopUp2(item.job_id)}
            >
            {item.job_title}

            </div>
        )
    })
    return(
        <div className="jobsWrapper" 
        // assignedJobs={props.assignedJobs}
        >
            <h1>{props.title}</h1>
            <h2>{list}</h2>
        </div>
    )
}

export default AssignedJobs;
