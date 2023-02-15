import { useState, useEffect } from 'react'
import "./Dash.scss"
import student1 from "../../assest/s5.png";
import teacher from "../../assest/t2.png";
import department from "../../assest/d2.png";
import widgest from '../Widgest/widgest';
import s4 from "../../assest/school4.png";
import jwt_decode from "jwt-decode";
import axios from "axios";
const info = {
    school_name: "GAANV Wala High School Academy, Jaipur",
    city_name: "Jaipur",
    email: "admin123@gaanvwala.com",
    mobile: "82XXXXXXX96",
    admin_name: "GW Head"
}

const Dashboard = (props) => {
    const [data, setData] = useState(info);
    const [studentCount, setStudentCount] = useState(0);
    const [teacherCount, setTeacherCount] = useState(0);

    let decodeToken = jwt_decode(localStorage.getItem("auth_token"));
    let school_id = decodeToken.result.school_id;
    useEffect(() => {
        axios.get(`http://localhost:8080/schools/${school_id}`, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
            //  console.log(res)
            setData(res.data.schoolDetail);
            setStudentCount(res.data.totalStudent);
            setTeacherCount(res.data.totalTeacher);
            props.AdminNameHandler(res.data.schoolDetail.admin_name);
        })
    }, []);

    return (
        <div>
            <div className='dash'>
                <div className="top">
                    <div className='school-image'>
                        <img src={s4}></img>
                    </div>
                    <div className="basic-info">
                        <div className='Name-of-school'>
                            <li>
                                <span> {data.school_name}</span>
                            </li>

                        </div>
                        <div className="basic-info-container">
                            <div className='basic-info-container-components'>
                                <div className="info-container">
                                    <li>
                                        <label>Owner Name : </label>
                                        <span> {data.admin_name && ((data.admin_name).replace(/_/g, " ")).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</span>
                                    </li>
                                </div>
                                <div className="info-container">
                                    <li>
                                        <label>City : </label>
                                        <span>{data.city_name && ((data.city_name).replace(/_/g, " ")).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</span>
                                    </li>
                                </div>
                            </div>
                            <div className='basic-info-container-components'>
                                <div className="info-container">
                                    <li>
                                        <label>Owner Email :</label>
                                        <span>{data.email}</span>
                                    </li>
                                </div>
                                <div className="info-container">
                                    <li>
                                        <label>Phone : </label>
                                        <span>{data.mobile}</span>
                                    </li>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='bottom'>
                    <div className="left-container">
                        <div className="widgest-container">
                            <div className="left">
                                <div className="Title">
                                    Student
                                </div>
                                <div className="count">
                                    {studentCount}
                                </div>
                            </div>
                            <div className="right">
                                <div className="icon">
                                    <img src={student1}></img>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mid-container">
                        <div className="widgest-container">
                            <div className="left">
                                <div className="Title">
                                    Deapartment
                                </div>
                                <div className="count">
                                    3
                                </div>
                            </div>
                            <div className="right">
                                <div className="icon">
                                    <img src={department}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-container">
                        <div className="widgest-container">
                            <div className="left">
                                <div className="Title">
                                    Teachers
                                </div>
                                <div className="count">
                                    {teacherCount}
                                </div>
                            </div>
                            <div className="right">
                                <div className="image-icon">
                                    <img src={teacher}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
