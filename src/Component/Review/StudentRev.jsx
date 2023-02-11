import React from 'react';
import './StudentRev.css'
import profile from './img/Group 1.png'
import { FaStar } from 'react-icons/fa'
import moment from "moment";

const StudentRev = (props) => {
    
    let sta = [
        <FaStar fill='rgb(226, 194, 12)' />,
        <FaStar fill='rgb(226, 194, 12)' />,
        <FaStar fill='rgb(226, 194, 12)' />,
        <FaStar fill='rgb(226, 194, 12)' />,
        <FaStar fill='rgb(226, 194, 12)' />
    ]
    let stars = ""
    function reload(){
        if( props.star === 5 ){
            stars = sta
        } else if( props.star === 4 ){
            stars = sta.slice(1)
        } else if( props.star === 3 ){
            stars = sta.slice(2)
        } else if( props.star === 2 ){
            stars = sta.slice(3)
        } else if( props.star === 1 ){
            stars = sta.slice(4)
        } else if( props.star > 5 ){
            stars = sta
        }
    }
    reload()



    return(
        <div className='studentrev'>
            <div className="top">
                <div className="cont">
                    <div className="img-div">
                        <img src={props.img ?? profile} alt="" />
                    </div>
                    <div className="text-div">
                        <span>{props.name}</span>
                        <p>{moment(props.time).format("DD MMM YYYY, h:mm A")}</p>
                    </div>
                </div>
                <div className="star">
                    <p>{stars}</p>
                </div>
            </div>
            <div className="body">
                <p>{props.review}</p>
            </div>
        </div>
    )
}

export default StudentRev;