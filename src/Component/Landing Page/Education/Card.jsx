import React from 'react';
import { Link } from "react-router-dom"


const Card = (props) => {
    let token = localStorage.getItem("goLearn-token");
    let islog = token
    return(
        <div className="box">
            <div className="icons">
                {props.icons}
            </div>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
            {islog === null ? <Link to="/register"><span>Start Now!</span></Link> : <Link to="/courses"><span>Start Learning!</span></Link>}
            
        </div>
    )
}

export default Card;