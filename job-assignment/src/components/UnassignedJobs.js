import React from "react";

function UnassignedJobs(props) {
  console.log('this is props in Unassigned',props)
  let list = props.unassignedJobs.map((item, i) => {
    // let popUp = this.props.popUp();
    return (
      <div className="displayedJobs" key={i} onClick={() => props.togglePopUp(item.id) }>
        {" "}
        {item.job_title} 
        {/* what the heck are these spaces... I used the prettier format and they just appeared */}



      </div>
    );
  });
  return (
    <div className="unassignedJobsWrapper" text='Prop of DOOM' unassignedJobs={props.unassignedJobs}>  
    {/* trying to pass the array on to popUp.js */}
      <h1>{props.title}</h1>
      <h2>{list}</h2>
    </div>
  );
}

export default UnassignedJobs;


// function UnassignedJobs(props) {
//   let list = props.value.map((item, i) => {
//     return (
//       <div className="displayedJobs" key={i}>
//         {" "}
//         {item.job_title} 
//         {/* <button>Grab Job</button> */}
//         {/* what the heck are these spaces... I used the prettier format and they just appeared */}
//       </div>
//     );
//   });
//   return (
//     <div className="unassignedJobsWrapper">
//       <h1>{props.title}</h1>
//       <h2>{list}</h2>
//     </div>
//   );
// }