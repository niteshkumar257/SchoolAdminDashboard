import React from 'react'
import "./Grade.scss"
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"
import DataTable from '../../components/DataTable/DataTable'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { MenuItem } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button"


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: "auto",
  bgcolor: 'background.paper',
  border: 'none',
  display: "flex",
  flexDirection: "column",
  rowGap: "30px",
  borderRadius: 3,
  boxShadow: "0 2px 4px rgb(0 0 0 / 4%), 0 4px 8px rgb(0 0 0 / 4%)",
  backdropFilter: "blur(5px)",
  p: 4,

};
const Studentcolumns = [
  { field: 'id', headerName: 'SI.No', flex: 1, align: "left", headerAlign: "left" },
  { field: 'student_name', headerName: 'Name', editable: false, flex: 1, headerAlign: "left", align: "left", },
  { field: 'class_id', headerName: 'Class', type: 'number', editable: false, flex: 1, headerAlign: "left", align: "left", },
  { field: 'medium', headerName: 'Medium', editable: false, align: "left", headerAlign: "left", flex: 1, },
];

const Grade = (props) => {
  const [Studentrows, setStudentRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [test, setTest] = useState([]);
  const [student_id, setStudentId] = useState("");
  const [showButton, setShowButton] = useState(0);
  const [studenName, setStudentName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [subject_list, setSubjectList] = useState([]);

  let decode = jwt_decode(localStorage.getItem("auth_token"));
  let school_id = decode.result.school_id;

  useEffect(() => {

    axios.get(`http://localhost:8080/schools/${school_id}/allstudent`)
      .then((data) => {
        setStudentRows(data.data.allStudent);

      }).catch((err) => {
        console.log(err);
      })

  }, [Studentrows])




  const handleOpen = (row) => {
    setOpenModal(true);
    setStudentId(row.id);
    setStudentName(row.student_name)
    axios.get(`http://localhost:8080/schools/${school_id}/tests`)
      .then((data) => {
        setTest(data.data.testDetails);

      }).catch((err) => {
        console.log(err);
      })
  }
  const handleClose = () => {
    setShowButton(0);
    setOpenModal(false);
    setSubjectList([]);
    setTestid(0);
  }
  const [test_id, setTestid] = useState(0);
  const [tempRow, setTempRow] = useState([]);
  const markUploadHandler = (e) => {
    e.preventDefault();
    pushMarks(test_id);
  }

  const handleDialogConfirm = () => {
    axios.post(`http://localhost:8080/students/${student_id}/tests/${test_id}/uploadmarks`, {
      inputField
    }).then((data) => {

      toast.success(data.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });


    }).catch((err) => {

      toast.error("Something Went Wrong", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log(err);
    })
    setInputField([]);
    setTempRow([]);
    setOpenModal(false)
    setSubjectList([]);
    setOpenDialog(false);
  }
  const handleDialogClose = () => {
    setOpenDialog(false);
    setSubjectList([]);
    setOpenModal(false)

  }
  const pushMarks = () => {
    setOpenDialog(true);
  }

  const getSubjects = (test_id) => {

    axios.get(`http://localhost:8080/student/${student_id}/getSubjects`)
      .then((data) => {
        setSubjectList(data.data.allSubjects);

        setShowButton(1);
        data.data.allSubjects.map((item) => {
          const data = {
            mark_obtained: "",
            total_marks: "",
            subject_id: item.subject_id
          }
          tempRow.push(data);
        })
      }).catch((err) => {
        console.log(err);
      })
  }
  // console.log(subject_list)

  const [inputField, setInputField] = useState(tempRow)

  const changeHandler = (index, e) => {
    // console.log(e.target.value);


    let data = [...inputField];
    console.log(e.target.name);
    data[index][e.target.name] = e.target.value;
    console.log(data);
    setInputField(data);
    setTempRow([]);
  }
  // mark upload handler

  const UpdateColumn = [
    {
      field: "view",
      headerName: "Student Details",
      width: 200,
      sortable: false,
      // align:"center",
      // headerAlign:"center",
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div>
            <div className="UpdateButton">
              <button onClick={() => { handleOpen(params.row) }} >Update</button>
            </div>
            {openModal && <Modal
              open={openModal}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              BackdropProps={{ style: { backgroundColor: 'rgba(255, 255, 255, 0)' } }}
              sx={{ backdropFilter: "blur(.25px)" }}>
              <form onSubmit={markUploadHandler}>
                <Box sx={style}>

                  <div className='form-container'>
                    <div className='heading'>
                      <span>Mark Upload</span>
                    </div>
                    <div className='student-info'>
                      <div className='student-info-modal'>
                        <label>ID:</label>
                        <span>{student_id}</span>
                      </div>
                      <div className='student-info-modal'>
                        <label>Name : </label>
                        <span>{studenName}</span>
                      </div>
                    </div>
                    <div className='test_id_select'>
                      <TextField
                        sx={{ flex: 1 }}
                        select
                        label="Test ID"
                        required
                        defaultValue=""
                        onChange={(e) => { setTestid(e.target.value); getSubjects(test_id) }}>
                        {test.map((option) => (
                          <MenuItem key={option.test_id} value={option.test_id}>
                            {option.test_id}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className='modal-subject-main-container'>
                      {
                        subject_list.map((item, index) => (
                          <div key={index} className='modal-subject-container'  >
                            <div className='container'>
                              <span>{item.subject_name}:</span>
                            </div>
                            <div>
                              <TextField
                                defaultValue=""
                                name="mark_obtained"
                                value={tempRow[index]?.name}
                                onChange={(e) => changeHandler(index, e)}
                                required label="Mark Obtained" variant="outlined" />
                            </div>
                            <div>
                              <TextField
                                name="total_marks"
                                defaultValue=""
                                value={tempRow[index]?.name}
                                onChange={(e) => changeHandler(index, e)}
                                required label="Total Mark" variant="outlined" />
                            </div>
                          </div>
                        ))
                      }
                      {showButton == 1 && subject_list.length != 0 && <div className='form-button-submit'> <button>Submit</button> </div>}

                    </div>
                  </div>
                </Box>
              </form>
            </Modal>}
          </div>
        );
      },
    }
  ]
  const [isExpanded, setExpanded] = useState(false);
  const isExpandedHandler = (value) => {
    setExpanded(value);
  }
  console.log(inputField);

  return (
    <div className='grade-container ' >
      <Sidebar isExpandedHandler={isExpandedHandler} />
      <div className='grade'>
        <Navbar adminName={props.AdminName} />
        <div className='grade-page page-container'>
          <div className="grade-detail-heading">
            <span>Mark  Details</span>
            <div className="grade-detail-search">
              <input type='number' placeholder='search by class-wise ....' />
              <div className="grade-detail-search-btn">
                <button className='btn'>SEARCH</button>
              </div>
            </div>
          </div>
          {Studentrows.length != 0 && <Box sx={{ style }}><DataTable rows={Studentrows} columns={Studentcolumns.concat(UpdateColumn)} /></Box>}
        </div>
      </div>
      {openDialog &&
        <Dialog
          sx={{
            "& .MuiDialog-container": {
              justifyContent: "center",
              alignItems: "flex-start"

            }
          }}
          PaperProps={{
            sx: {
              width: "25%", height: "20%",
              justifyContent: "center",
              alignItems: "center"

            }
          }}
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {"Salary Update?"}
          </DialogTitle>

          <DialogActions>
            <Button
              style={{
                backgroundColor: "#1377C0",
                color: "white",
                fontSize: "0.7rem"
              }}

              onClick={handleDialogConfirm}>confirm</Button>
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                fontSize: "0.7rem"
              }}
              onClick={handleDialogClose} autoFocus>Cancel</Button>
          </DialogActions>
        </Dialog>}
      <ToastContainer />
    </div>
  )
}

export default Grade
