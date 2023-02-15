import React from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import logo from "../../assest/Img1.png"
import { Link, NavLink } from "react-router-dom";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { FaChalkboardTeacher } from 'react-icons/fa'
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import "./Sidebar.scss"
import { useState, useEffect } from 'react';


const Sidebar = (props) => {
  const menuItem = [
    {
      path: "/dashBoard",
      name: "Dashboard",
      icon: <DashboardOutlinedIcon className='icon' />
    },
    {
      path: "/Student",
      name: "Student",
      icon: <SchoolOutlinedIcon className='icon' />
    },
    {
      path: "/Grade",
      name: "Grade",
      icon: <GradeOutlinedIcon className='icon' />
    },
    {
      path: "/Teachers",
      name: "Teachers",
      icon: <FaChalkboardTeacher />
    },
    {
      path: "/AddStudent",
      name: "New Student",
      icon: <AddCircleOutlineOutlinedIcon className='icon' />


    },

    {
      path: "/Notification",
      name: "Notification",
      icon: <NotificationsNoneIcon className='icon' />


    },
    {
      path: "/login",
      name: "Logout",
      icon: <LogoutIcon className='icon' />
    }

  ]
  const [isExpanded, setExpendState] = useState(true);

  props.isExpandedHandler(isExpanded)
  return (

    <>
      <div className={isExpanded ? "sidebar " : "sidebar sidebar-toggle"}  >
        <div className="sidebar-container">
          <div className="logo-container">
            {isExpanded && (
              <div className="logo-container-heading">
                <img src={logo}></img>
                <span className='title' >GW Techies</span>
              </div>)}
            <div>
              <MenuIcon className="menu-icon"
                onClick={() => setExpendState(!isExpanded)}
              />
            </div>
          </div>
          <div className="menuItems-container">
            <div className='menu-item'>
              {menuItem.map((item, index) => {
                return (
                  <NavLink key={index} activeclassname="active" className='items' style={{
                    textDecoration: "none", color: "white"
                  }} to={item.path}>
                    <div activeclassname="active" key={index} className={isExpanded ? "item" : "item-toggle"} >
                      <div activeclassname="active" className="icon" > {item.icon}</div>
                      {
                        isExpanded && (
                          <span activeclassname="active" className="link-text" >{item.name}</span>
                        )
                      }
                    </div>
                  </NavLink>
                )

              })
              }
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Sidebar
