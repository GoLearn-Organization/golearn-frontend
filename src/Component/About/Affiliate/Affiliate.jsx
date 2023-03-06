import React from 'react';
import { Link } from 'react-router-dom';
import '../../Landing Page/GoAlumni/GoAlumni'

const Affiliate = () => {
    return(
        <div className="goalumni">
            <div className="sub-goalumni">
                <div className="goalumni-content">
                    <span>GoLearn Affiliates</span>
                    <h2>Earn and Get Quality Skills Through Our Affiliate Program</h2>
                    <p>We pride ourselves in being the only eLearning platform that enables students on our platform to earn while they improve their skill.</p>
                    <Link to="/Page-Not-Available"><button> Get Started Now</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Affiliate;