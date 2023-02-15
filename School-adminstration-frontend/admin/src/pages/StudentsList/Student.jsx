import { useEffect, useState } from 'react'
import "./Student.scss"
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"
import DataTable from '../../components/DataTable/DataTable'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from "jwt-decode";

// Student List columns
const columns = [
  { field: 'id', headerName: 'SI.No', width: 150, flex: 1, headerAlign: "left", align: "left", },
  { field: 'student_name', flex: 1, headerName: 'Name', width: 150, editable: false, headerAlign: "left", align: "left" },
  { field: 'class_id', headerName: 'Class', type: 'number', width: 150, flex: 1, editable: false, headerAlign: "left", align: "left" },
  { field: 'medium', headerName: 'Medium', editable: false, width: 150, flex: 1, headerAlign: "left", align: "left" },
];



const Student = (props) => {
  const [studentId, setStudentId] = useState(0);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  let decode = jwt_decode(localStorage.getItem("auth_token"));
  let school_id = decode.result.school_id;

  useEffect(() => {
    axios.get(`http://localhost:8080/schools/${school_id}/allstudent`)
      .then((data) => {
        console.log(data.data.allStudent);
        setRows(data.data.allStudent);
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  const handleSelect = (id) => {
    props.getStudentId(id);
    setStudentId(studentId);
    navigate(`/Student/${id}`);
  }
  
  // view button of the student table
  const viewColumn = [
    {
      field: "view", headerName: "Student Details", width: 200, editable: false, sortable: false, align: "left", headerAlign: "left",
      flex: 1,
      disableFilter: true,
      renderCell: (params) => {
        return (
          <div className="viewButton">
            <button onClick={() => handleSelect(params.row.id)}  >View</button>
          </div>
        );
      },
    }
  ]
 
  const [isExpanded, setExpanded] = useState(false);
  const isExpandedHandler = (value) => {
    setExpanded(value);
  }
  return (
    <div className='student-container '>
      <Sidebar isExpandedHandler={isExpandedHandler} />
      <div className='student'>
        <Navbar adminName={props.AdminName} />
        <div className='student-page page-container'>
          <div className="student-detail-heading">
            <span>Student Details</span>
            <div className="student-detail-search">
              <input type='number' placeholder='search by class-wise ....' />
              <div className="student-detail-search-btn">
                <button className='btn'>SEARCH</button>
              </div>
            </div>
          </div>
          <Box>
            {rows.length != 0 && <DataTable rows={rows} columns={columns.concat(viewColumn)} />}
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Student
