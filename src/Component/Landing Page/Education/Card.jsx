import React from 'react';
import { Link } from "react-router-dom"


const Card = (props) => {
    return(
        <div className="box">
            <div className="icons">
                {props.icons}
            </div>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
            <Link to=""><span>Start Now!</span></Link>
        </div>
    )
}

export default Card;