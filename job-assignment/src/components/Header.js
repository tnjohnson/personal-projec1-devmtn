import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';


function Header(props) {
    return <div className="header">
        {`Welcome ${props.user_name}!`}
        <Link className="myJobsMenu" to='/jobs/grabbed'>My Jobs</Link>
        <Link className="logOutMenu" to='/login' >Log Out</Link>
    </div>
}

export default Header;