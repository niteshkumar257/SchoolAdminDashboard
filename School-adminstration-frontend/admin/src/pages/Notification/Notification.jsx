import {useState} from 'react'
import "./Notifications.scss"
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"

const Notification = (props) => {
  
  const [isExpanded,setExpanded]=useState(false);
  const isExpandedHandler=(value)=>
  {
        setExpanded(value);
  }
  return (
    <div className='SingleTeacherPage-container'>
    <Sidebar  isExpandedHandler={isExpandedHandler}/>
    <div className='SingleTeacher'>
        <Navbar/>
        <div className='SingleTeacher-page page-container'>
          
    </div>
    
  
    </div>
   </div>
  )
}

export default Notification
