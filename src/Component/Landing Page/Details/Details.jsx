import './Details.css'
// import React, { useEffect } from "react"

const Details = () => {

    // const [value, func] = React.useState(0)

    // useEffect(() => {
    //     setInterval(() => {
    //         func(prevCount => {
    //             return(
    //                 prevCount + 1
    //             )
    //         })
    //     }, 2000)
    // }, [])
    
    // console.log(value)

    return(
        <div className="details">
            {/* <div className="sub-details"> */}
                <div className="details-text">
                    <span>Distance learning</span>
                    <h2>Flexible Study At Your Own Pace, According to Your Own Needs</h2>
                    <p>With Go-Learn, you can choose to study whenever and wherever you choose. Our tutors and course facilitators are experienced professionals in their respective fields. Our teaching also means, if you travel often or need to relocate, you can continue to study wherever you go.</p>
                </div>
                <div className="details-box">
                    <div className="detail-wrapper">
                        <div className="card">
                            <h1>115</h1>
                            <p>Enrolled Learners</p>
                        </div>
                        <div className="card">
                            <h1>100</h1>
                            <p>Satisfaction Rate</p>
                        </div>
                    </div>
                    <div className="detail-wrapper">
                        <div className="card">
                            <h1>1,926</h1>
                            <p>Finished Sessions</p>
                        </div>
                        <div className="card">
                            <h1>25</h1>
                            <p>Online Instructors</p>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}



export default Details;