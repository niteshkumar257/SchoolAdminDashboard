import React from 'react'
import student1 from "../../assest/s1.png";

import "./widgest.scss"

const widgest = () => {
  return (
    <div className="widgest-container">
        <div className="left">
            <div className="title">
                Student
            </div>
            <div className="count">
                10000
            </div>
        </div>
        <div className="right">
            <div className="icon">
                <img src={student1}></img>
            </div>
        </div>
    </div>
  )
}

export default widgest
