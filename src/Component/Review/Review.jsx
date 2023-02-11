import React from 'react';
import './Review.css'

const Reviews = (props) => {
    return(
        <div className="rev">
            <div className="up">
                <h4>Course:</h4> 
                <p>{props.course}</p>
            </div>
            <div className="down">
                <div className="opt">
                    <div className="star">⭐⭐⭐⭐⭐</div>
                    <div className="edit">
                        <span>Edit</span>
                        <span>Delete</span>
                    </div>
                </div>
                <div className="content">
                    <p>{props.review}</p>
                </div>
            </div>
        </div>
    )
}

export default Reviews;