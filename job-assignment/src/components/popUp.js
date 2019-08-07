import React, { Component } from "react";
import './popUp.css'

class PopUp extends Component {
    // let textOfDescription = props.unassignedJobs.filter()

    render() {
        console.log('what is this in popup?',this)
        return (
            <div className='popUp'>
                <div className='popUp_inner'>
                    <h1>{this.props.text}</h1>
                    <button onClick={() => this.props.togglePopUp(0)}>Close</button>
                </div>
            </div>
        )
    }
}

export default PopUp;


// said I would need to filter then map over my array to find the item and then put 
// it in the box.