import React from 'react';
import './Title.css'
import ClassesData from '../../Courses/Data/ClassesData.json'
import { FaStar } from "react-icons/fa";

const Title = (props) => {

    // let details = []
    // let cate1 = []
    // let cate2 = []
    // let cate3 = []
    // let star = []
    
    for( let i=0; i<ClassesData.length; i++){
        // console.log(ClassesData[5].title)
        // details = ClassesData[5].title
        // cate1 = ClassesData[5].author.job1
        // cate2 = ClassesData[5].author.job2
        // cate3 = ClassesData[5].author.job3
        // star = ClassesData[5].star
    }
    let data = props.data
    console.log(data)

    // button.addEventListener("click", () => {
    
        // select text of input field
        // inputField.select();
        // copy the selected text
        // document.execCommand('copy');
    // })


    return(
        <div className="title">
            <div className="sub-title">
                <div className="detail">
                    <span>
                        <FaStar fill="rgb(226, 194, 12)" />
                        <FaStar fill="rgb(226, 194, 12)" />
                        <FaStar fill="rgb(226, 194, 12)" />
                        <FaStar fill="rgb(226, 194, 12)" />
                        <FaStar fill="rgb(226, 194, 12)" />
                    </span>
                    {/* <span>{star}</span> */}
                    <h3>{data.courseTitle}</h3>
                    <p>Categories: <span>{data.category}</span></p>
                </div>
                {/* <div className="shear-save">
                    <input type="text" id='link' value="https://infopediya.com/create-copy-link-input-field-in-javascript/" />
                    <span to="" onClick={share}><FaShareSquare fontSize={18} /></span>
                    <Link to="/Page-Not-Available">Wishlist</Link>
                </div> */}
            </div>
        </div>
    )
}

export default Title;