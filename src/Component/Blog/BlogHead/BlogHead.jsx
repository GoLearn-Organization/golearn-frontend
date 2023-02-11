import React from 'react';
import { Link } from 'react-router-dom';
import './BlogHead.css'
// import { Link } from 'react-router-dom';

const BlogHead = (props) => {
    return(
        <div className="bloghead">
            <div className="sub-bloghead">
                <div className="text">
                    <h1>{props.title}</h1>
                    <span>
                        <Link to={props.link2}>{props.nav1}</Link> / 
                        <Link to={props.link}>{props.nav2}</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default BlogHead;