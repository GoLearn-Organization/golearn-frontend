import React from 'react';
import {BsPersonCircle} from 'react-icons/bs'
import { Link } from 'react-router-dom';
// import profile from './img/olubori-free3.jpg'

const Card = (props) => {
    return(
        <div className="card">
            <div className="img-div">
                <img src={props.img} alt=""/>
            </div>
            <div className="content-div">
                <Link to="/instructor"  state={{ id: props.data }}>
                    <span><BsPersonCircle fontSize="120%" /></span>
                </Link>
                <h3> {props.firstName} {props.lastName} </h3>
                <span>{props.email}</span>
            </div>
        </div>
    )
}

export default Card;