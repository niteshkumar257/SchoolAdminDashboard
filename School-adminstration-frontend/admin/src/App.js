
import Login from './pages/Login/Login';
import { useState } from 'react';
import DashBoard from './pages/DashBoard/DashBoard';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Grade from "./pages/Grade/Grade"
import StudentList from "./pages/StudentsList/Student";
import TeacherList from "./pages/TeachersList/Teachers"
import StudentForm from "./pages/StudentForm/StudentForm"
import TeacherForm from "./pages/TeacherForm/TeachersForm";
import Notification from "./pages/Notification/Notification";
import StudentePage from "./pages/StudentPage/Studentpage"
import TeacherPage from "./pages/TeacherPage/TeacherPage"
import ChangePassword from "./pages/ChangePassword/ChangePassword"




const App=()=>
{
    // gettinh student id from the student list page 
    // for showing student inforamtion in the SingleStudentapage
    // funtion for getting data from studentList page which is child of the app.js file
    
const [adminName,setAdminName]=useState("");
  const AdminNameHandler=(admin_name)=>
  {
     console.log("App");
     
      setAdminName(admin_name)
      console.log(adminName)
  }
  const [studentId,setStudentid]=useState(0);
  const [teacherId,setTeacherid]=useState(0);
  const [isExpand,setIsExpand]=useState(false);
  

  const isExapnedHandler=(value)=>
  {
      setIsExpand(value);
  }

  // getting TeacherId from TecherList Page 
  const getTeacherId=(id)=>
  {
      setTeacherid(id);
  }
  // getting studentPage
    const getStudentId=(id)=>
    {
      setStudentid(id);
    }
    
    return (
        <div>
           <BrowserRouter>
        <Routes>
        <Route path='/' element={<DashBoard/>}/>

         <Route path="login">
         <Route  index element={<Login/>}/>
          <Route path="change" element={<ChangePassword/>}/>
         </Route>
          
          <Route  path='dashBoard' element={<DashBoard AdminNameHandler={AdminNameHandler}/>}/>
          <Route path='Student' >
          <Route index element={<StudentList  AdminName={adminName} getStudentId={getStudentId} />} />
              <Route path=":student_id" element={<StudentePage AdminName={adminName} />} />
          </Route>
          <Route path='Grade' element={<Grade AdminName={adminName}/>}/>
          <Route path='Teachers' >
              <Route index element={<TeacherList AdminName={adminName} getTeacherId={getTeacherId} />} />
              <Route path="newTeacher"   element={<TeacherForm AdminName={adminName}/>}/>
              <Route path=":TeacherId"  element={<TeacherPage  AdminName={adminName} teacherId={teacherId}  />} />
             
          </Route>
         <Route path='AddStudent' element={<StudentForm AdminName={adminName}/>}/>
         <Route path='AddTeacher' element={<TeacherForm AdminName={adminName}/>}/>
         <Route path='Notification' element={<Notification AdminName={adminName}/>}/>
        
         
         </Routes>

        </BrowserRouter> 
        
        </div>

    );
}
export default App;