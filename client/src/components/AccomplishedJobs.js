import React from "react";

function AccomplishedJobs(props) {
    let list = props.accomplished_jobs.map((item, i) => {
        return (
            <div
                // className="displayAccomplished"
                className="displayedJobs"
                key={i}
                onClick={() => props.togglePopUp3(item.id)}
                // might be item.job_id that is added here, or just item.id
                // maybe add a pop up feature here
            >
                {item.job_title}
            </div>
        )
    });
    return (
        <div
            // className="displayAccomplishedWrapper"
            className="jobsWrapper2"
        >
            <h1>{props.title}</h1>
            <h2>{list}</h2>
        </div>
    );
}

export default AccomplishedJobs;