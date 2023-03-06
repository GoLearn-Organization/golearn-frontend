import React from 'react';
import './BlogPost.css'
import img from './img/blog-img-1.jpg'
import { Link } from 'react-router-dom';
import { AiOutlineCalendar } from 'react-icons/ai'

const Card = (props) => {
    return(
        <div className="card">
            <div className="img-div">
                <img src={img} alt=""/>
            </div>
            <div className="content">
                <Link to="/Page-Not-Available"><h3>{props.title}</h3></Link>
                <p>{props.content}</p>
                <div className="buttom">
                    <ul>
                        <li>{props.author}</li>
                        <li><AiOutlineCalendar fontSize="18px" /> {props.date}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Card;