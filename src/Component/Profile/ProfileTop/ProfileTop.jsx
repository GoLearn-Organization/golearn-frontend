import React from 'react';
import '../../Blog/BlogHead/BlogHead'
import { Link } from 'react-router-dom';

const ProfileTop = () => {
    return(
        <div className="bloghead">
            <div className="sub-bloghead">
                <div className="text">
                    <h1>Dashboard</h1>
                    <span>
                        <Link to="/">Home</Link> / 
                        <Link to="/profile"> DashBoard</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProfileTop;