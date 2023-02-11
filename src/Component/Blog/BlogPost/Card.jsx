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
                <Link to="/construction"><h3>{props.title}</h3></Link>
                <p>{props.content}</p>
                <div className="buttom">
                    <ul>
                        <li><Link to="/construction">{props.author}</Link></li>
                        <li><Link to="/construction"> <AiOutlineCalendar fontSize="18px" /> {props.date}</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Card;