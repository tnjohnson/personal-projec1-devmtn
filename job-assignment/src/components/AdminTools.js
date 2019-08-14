import React, { Component } from "react";
// import ".reset.css";
// import "./src/App.css";
import "./AdminTools.css";


class AdminTools extends Component {

    render() {
        console.log('admin?', this.props.isAdmin)
        if (!this.props.isAdmin) {
            return null;
        } else {
            return (
                <div className="AdminToolWrapper">
                    <h1>Add Job:</h1>
                    <div className="AdminAddJob">
                        <input
                            placeholder="Job"
                            onChange={event =>
                            this.setState({ username: event.target.value })
                            }
                        />

                        <input
                            placeholder="Description"
                            onChange={event =>
                            this.setState({ username: event.target.value })
                            }
                        />
                        <button>Add</button>

                    </div>
                    <div className="AdminAssignJob">
                        <select>
                            <option>Boss</option>
                            <option>Lieutenant</option>
                            <option>Red Shirt</option>
                        </select>

                        <button>Assign</button>

                    </div>

                    {/* <input>New Tasks</input> */}
                    {/* <button>Extend the Suffering!</button> */}
                </div>
            )
        }
    }
}

export default AdminTools;