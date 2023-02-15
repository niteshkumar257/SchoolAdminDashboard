import React from 'react'
import "./ChangePassword.scss";
import img from "../../assest/img3.png";
import image from "../../assest/Img1.png"
import { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [userIdError, setUserIdError] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [reEnteredPasswordError, setReEnteredPasswordError] = useState(true);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();


  const changePasswordHandler = (e) => {
    e.preventDefault();
    if (userId == "") setUserIdError(true);
    if (currentPassword == '') setCurrentPasswordError(true);
    if (newPassword == '') setNewPasswordError(true);
    if (userId && currentPassword && newPassword && reEnteredPassword) {
    if (newPassword === reEnteredPassword) {

        // api call
        axios.put("http://localhost:8080/user/changePassword", {
          admin_id: userId,
          oldPassword: currentPassword,
          newPassword: newPassword
        }).then((data) => {
          navigate("/login");
          toast.success(data.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

        }).catch((err) => {
          console.log(err);
          toast.error("Old password is wrong", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })

      }
      else {
        toast.error('Both Password are diffent', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }



    }
    else {
      toast.warn('All Fileds are Required', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setCurrentPassword("");
    setNewPassword("");
    setReEnteredPassword("");
    setUserId("");

  }
  return (
    <div>
      <div className='changePassword-container'>
        <div className='main-container'>
          <div className="left-container">
            <div className='content-box'>
              <div className="logo">
                <img className='photo' src={img}></img>
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="headerImage">
              <div>
                <img src={image}></img>
              </div>
              <div>
                <span>GW Techies</span>
              </div>
            </div>
            <form onSubmit={changePasswordHandler}>
              <div className="input-container">
                <label >Admin Id</label>
                <input value={userId} type='number' placeholder='User Id...' onChange={(e) => setUserId(e.target.value)}></input>
              </div>
              <div className="input-container">
                <label>Current Password</label>
                <input value={currentPassword} type='password' placeholder='enter current Password...' onChange={(e) => setCurrentPassword(e.target.value)}></input>
              </div>
              <div className="input-container">
                <label>New Password</label>
                <input type='password' value={newPassword} placeholder='New password' onChange={(e) => setNewPassword(e.target.value)}></input>
              </div>
              <div className={reEnteredPasswordError ? "input-container-error input-container" : "input-container"}>
                <label>Confirm Password</label>
                <input className="input-container-error" value={reEnteredPassword} type='password' placeholder='Re enter Password' onChange={(e) => setReEnteredPassword(e.target.value)}></input>
              </div>
              <div className='button-container'>
                <button type='submit'>Submit</button>
                <div className='forgotpassword'>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login;
