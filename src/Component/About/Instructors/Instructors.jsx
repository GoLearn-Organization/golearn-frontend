import React, {useEffect} from 'react';
import './Instructors.css'
// import InstructorsData from '../Data/InstructorsData'
import Card from './Card'
import { useState } from "react"

const Instructors = () => {

    const [instruct, instructFunc] = useState([]);
    const handleinstructor = async () => {
        let result = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/user/publishers`,
          {
            method: "get",
            credencials: "include",
            headers: {    
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' },
          }
        );
        result = await result.json();
        console.warn(result);
        console.log(result);
    
        instructFunc(result.data);
      };

      useEffect(() => {
        handleinstructor()
      }, []);

      console.log(instruct)

    const prof = instruct.map((item)=>{
        return(
            <Card 
                user={item._id}
                work={item.Work}
                firstName={item.firstName}
                lastName={item.lastName}
                email={item.email}
                role={item.role}
                data={item}
            />
        )
    })

    return(
        <div className="instructors">
            <div className="sub-instructors">
                <div className="instructors-content">
                    <span>Instructor</span>
                    <h2>GoLearn Faculty</h2>
                    <p>Meet our expert instructors for the courses we are offering! Every course is designed to render utmost value and insight to the desired topic addressed.</p>
                </div>
                <div className="instructures-wrapper">
                    {prof}
                </div>
            </div>
        </div>
    )
}

export default Instructors;