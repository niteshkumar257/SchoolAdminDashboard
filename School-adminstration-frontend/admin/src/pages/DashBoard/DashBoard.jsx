import {useState}from 'react'
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"
import "./DashBoard.scss"
import Dashboard from "../../components/Dashboard/Dash"
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect } from 'react'

const DashBoard = (props) => {
  let decodeToken = jwt_decode(localStorage.getItem("auth_token"));
  let school_id = decodeToken.result.school_id;

  // Api call
  useEffect(() => {
     axios.get(`http://localhost:8080/schools/${school_id}`,{headers: { 'Content-Type': 'application/json'}}).then((res) => {
       console.log(res)
     }) 
  }, []);
  const [adminName,setAdminName]=useState("");
  const adminNamehandler=(name)=>
  {
     setAdminName(name);
     props.AdminNameHandler(name);
  }
  const [isExpanded,setExpanded]=useState(false);
  const isExpandedHandler=(value)=>setExpanded(value);
  
  return (
     <div className='dashboard-container '>
     <Sidebar  isExpandedHandler={isExpandedHandler}/>
    <div className='dashboard'>
      <Navbar  adminName={adminName}/>
      <div className='dashboard-page page-container'>
        <div 
        style={{
          width:"100%",
          height:"100vh"
        }}
        >
        <Dashboard AdminNameHandler={adminNamehandler}/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default DashBoard;
