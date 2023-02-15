import React, { useEffect } from 'react'
import "./Studentpage.scss";
import StudentImage from "../../assest/StudentImage.png";
import { useState } from "react"
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import Table from "../../components/Table/TableFee"
import { useParams } from 'react-router';
import axios from "axios"
import Chart from '../../components/Chart/Chart';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

import Fee from "../../assest/SchoolFee.png";

let MonthArray = ["Jan", "Feb", "March", "April", "Jan", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
const columns = [
  { field: 'id', headerName: 'Installment No', width: 150, flex: 1, headerAlign: "left", align: "left", flex: 1, sortable: false },
  { field: 'amount', flex: 1, headerName: 'Amount', width: 150, editable: false, headerAlign: "left", align: "left", sortable: false },
  { field: 'lastDate', headerName: 'Last Date', width: 150, flex: 1, editable: false, headerAlign: "left", align: "left", sortable: false },
  { field: 'status', headerName: 'Status', type: 'date', width: 150, flex: 1, editable: false, headerAlign: "left", sortable: false, align: "left" },
];

const SingleStudentpage = (props) => {

  const params = useParams();
  let student_id = params.student_id;

  // Student Detail state
  const [name, setName] = useState("Nitesh Kumar Reeddy");
  const [medium, setMedium] = useState("English");
  const [course, setCourse] = useState("JEE");
  const [board, setBoard] = useState("ICSE");
  const [Class, setClass] = useState("12th");
  const [fathername, setFathername] = useState("G NagaRaju Reddy");
  const [mothername, setMotherrname] = useState("G Laxmi Reddy");
  const [fatherProfession, setFatherProfession] = useState("Worker");
  const [motherProfession, setMotherProfessin] = useState("Housewife");
  const [childrenCount, setChildrenCount] = useState(3);
  const [altNumber, setAltNumber] = useState("8767856873");
  const [primaryNumber, setPrimaryNumber] = useState("58383432");
  const [email, SetEmail] = useState("niteshredd257@gmail.com");
  const [total_fees, setTotalFees] = useState("");
  const [first_installment_status, setFirstInstallment] = useState(0);
  const [second_installment_status, setSecondInstallment] = useState(0);
  const [third_installment_status, setThirdInstallment] = useState(0);
  const [testDetail, setTestDetail] = useState([{}]);
  const [feeDetails, setFeeDetails] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [installmentId, setInstallmentId] = useState(0);

  let TestTableColumn = [];
  const columnValue = Object.entries(testDetail[0])
  columnValue.map((it, index) => {

    if (it[0] === "subject_name") {
      it[1].map((it, index) => {
        const data = { field: it, headerName: it, width: "150px", align: "left", headerAlign: "left", sortable: false, flex: 1 }
        TestTableColumn.push(data)
      })
    }
    if (it[0] === "test_id" || it[0] === 'test_date' || it[0] === 'percentage') {
      const data = {
        field: it[0],
        headerName: it[0].replace(/_/g, " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()), width: "150px", align: "left", headerAlign: "left", sortable: false, flex: 1
      }
      TestTableColumn.push(data);
    }

  })


  let TestTableRow = [];
  testDetail.map((item, index) => {
    let temp = Object.entries(item);
    const subjectArray = [];
    const markArray = [];
    temp.map((item, index) => {

      if (item[0] === 'subject_name') item[1].map((it, index) => { subjectArray.push(it); })
      if (item[0] === 'mark_obtained') item[1].map((it, index) => { markArray.push(it); })

    })

    const result = {}
    temp.map((item, index) => {
      if (item[0] === "test_id" || item[0] === 'test_date' || item[0] === 'percentage')
        result[item[0]] = item[1];

      if (item[0] === 'test_id') {

        result["id"] = item[1];
      }
      if (item[0] === 'percentage') {
        result[item[0]] = item[1] + "%"
      }
      if (item[0] == 'test_date') {
        result[item[0]] = item[1].slice(0, 10)
      }

    })

    for (let i = 0; i < markArray.length; i++) result[subjectArray[i]] = markArray[i];

    TestTableRow.push(result);

  })
  const subjectWisemark = [];
  const Array = Object.entries(testDetail)
  let Array2 = []
  Array.map((item, index) => {
    let it = Object.entries(item[1])
    Array2.push(it)

  })
  const numberOfTest = Array2.length;
  const Months = [];
  let subjects = [];
  let TotalMark = [];
  let MarkObtained = [];

  Array2.map((item, index) => {
    item.map((it, index) => {
      if (it[0] == 'test_date') {
        let result = it[1].slice(5, 7);

        Months.push(result)
      }
      if (it[0] == 'subject_name') subjects = (it[1]);
      if (it[0] == 'total_marks') TotalMark.push(it[1]);
      if (it[0] == 'mark_obtained') MarkObtained.push(it[1]);

    })

  })
  Months.sort();

  for (let i = 0; i < subjects.length; i++) {
    let data = {
      value: subjects[i],
      lable: subjects[i],
      temp: "TotalMark",
      color: "#82ca9d",
      arr: []
    }
    let array;

    for (let j = i; j <= i; j++) {
      let mon = 0;
      for (let k = 0; k < Months.length; k++) {
        array = {
          Month: MonthArray[Months[mon] - 1],
          "Mark obtained": MarkObtained[k][j],
          "Total mark": TotalMark[k][j],
          "Virtual_totalmark": 100,
        }
        mon++;

        data.arr.push(array);
      }

    }
    subjectWisemark.push(data);

  }






  const renderFees = () => {
    axios.get(`http://localhost:8080/students/${student_id}/fees`)
      .then((data) => {
        let tot = parseInt(data.data.studentFees[0].first_installment) + parseInt(data.data.studentFees[0].second_installment) + parseInt(data.data.studentFees[0].third_installment);
        setTotalFees(tot);

        let newFeeDetails = [];
        let arr1 = { id: 1, amount: data.data.studentFees[0].first_installment, lastDate: data.data.studentFees[0].first_installment_eta.slice(0, 10), status: (data.data.studentFees[0].first_installment_status).charAt(0).toUpperCase() + (data.data.studentFees[0].first_installment_status).slice(1) };
        let arr2 = { id: 2, amount: data.data.studentFees[0].second_installment, lastDate: data.data.studentFees[0].second_installment_eta.slice(0, 10), status: (data.data.studentFees[0].second_installment_status).charAt(0).toUpperCase() + (data.data.studentFees[0].second_installment_status).slice(1) };
        let arr3 = { id: 3, amount: data.data.studentFees[0].third_installment, lastDate: data.data.studentFees[0].third_installment_eta.slice(0, 10), status: (data.data.studentFees[0].third_installment_status).charAt(0).toUpperCase() + (data.data.studentFees[0].third_installment_status).slice(1) };
        newFeeDetails.push(arr1);
        newFeeDetails.push(arr2);
        newFeeDetails.push(arr3);
        setFeeDetails(newFeeDetails);

        setFirstInstallment(arr1.status);
        setSecondInstallment(arr2.status);
        setThirdInstallment(arr3.status);

      }).catch((err) => {
        alert("Something went wrong");
        console.log(err);
      })
  }


  const updatePayment = (first_installment_status, second_installment_status, third_installment_status) => {
    axios.put(`http://localhost:8080/students/${student_id}/updatepaymentstatus`, {
      first_installment_status,
      second_installment_status,
      third_installment_status
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
      renderFees();
    }).catch((err) => {
      alert("Something went wrong");
      console.log(err);
      toast.error(err.error, {
        position: "top-center",
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

  useEffect(() => {
    let parent_id;
    // axios request for student details
    axios.get(`http://localhost:8080/students/${student_id}`)
      .then((data) => {
        setName(data.data.studentDetails[0].student_name);
        setMedium(data.data.studentDetails[0].medium);
        setCourse(data.data.studentDetails[0].course_name);
        setBoard(data.data.studentDetails[0].board);
        setClass(data.data.studentDetails[0].class_id);
        parent_id = data.data.studentDetails[0].parent_id;
        // axios request for parent details
        axios.get(`http://localhost:8080/parents/${parent_id}`)
          .then((data) => {
            setPrimaryNumber(data.data.parentDetails.whatsapp_no);
            SetEmail(data.data.parentDetails.email);
            setMotherProfessin(data.data.parentDetails.mother_profession);
            setMotherrname(data.data.parentDetails.mother_name);
            setFathername(data.data.parentDetails.father_name);
            setFatherProfession(data.data.parentDetails.father_profession);
            setAltNumber(data.data.parentDetails.alternative_mobile);
            setChildrenCount(data.data.parentDetails.children);
            // function for request for fee details             
            renderFees();
          }).catch((err) => {
            console.log(err);
          })
      }).catch((err) => {
        console.log(err);
      });

  }, [])




  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleDialogDisagree = () => {

    setOpenDialog(false);
    setInstallmentId(0);

  };
  const handleDialogAgree = () => {
    if (installmentId == 1) {
      setFirstInstallment("paid");
      updatePayment("paid", second_installment_status, third_installment_status);
    } else if (installmentId == 2) {
      setSecondInstallment("paid");
      updatePayment(first_installment_status, "paid", third_installment_status);
    } else {
      setThirdInstallment("paid");
      updatePayment(first_installment_status, second_installment_status, "paid");
    }
    setInstallmentId(0);
    setOpenDialog(false);


  };
  const InstallmentUpdateHandler = (id) => {

    setOpenDialog(true);
    setInstallmentId(id);
  }

  // Dynamic button InstallMent Status update
  const viewColumn = [
    {
      field: "view", headerName: "Update", width: 200, editable: false, sortable: false, align: "left", headerAlign: "left", flex: 1,
      renderCell: (params) => {

        return (
          <div className="InstallmentUpdateHandler">
            {/* <Link   to= {`/Student/${studentId}`} style={{ textDecoration: "none" }}> */}

            {(params.row.status === "Unpaid") ? <button onClick={() => InstallmentUpdateHandler(params.row.id)}  >Update</button> :
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "green",
                  marginLeft: "1rem",
                }}
              >
                <CheckIcon sx={{
                  fontSize: "1.5rem",
                  fontWeight: "300"
                }} />
              </div>
            }
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
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {" InstallMent Updated  ?"}
              </DialogTitle>

              <DialogActions>
                <Button
                  style={{
                    backgroundColor: "#1377C0",
                    color: "white",
                    fontSize: "0.7rem"
                  }}
                  onClick={handleDialogAgree}>Confirm</Button>
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    fontSize: "0.7rem"
                  }}
                  onClick={handleDialogDisagree} autoFocus>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

          </div>
        );
      },
    }
  ]

  // Sidebar toggle Handler
  const [isExpanded, setExpanded] = useState(false);
  const isExpandedHandler = (value) => {
    setExpanded(value);
  }


  const [showPerformance, setShowPerformance] = useState(0);
  const [buttonValue, setButtonValue] = useState("Show");
  const perFormanceHandler = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/students/${student_id}/performance`)
      .then((data) => {
        setTestDetail(data.data.allmarksDetail);

      }).catch((err) => {
        console.log(err);
      })

    if (showPerformance == 0) {
      setShowPerformance(1);
      setButtonValue("Hide");
    }

    else {
      setShowPerformance(0);
      setButtonValue("Show");
    }
  }
  console.log(TestTableColumn);
  console.log(TestTableRow);
  return (
    <>
      <div className="SingleStudent-container">
        <Sidebar isExpandedHandler={isExpandedHandler} />
        <div className="singleStudent">

          <Navbar adminName={props.AdminName} />
          {/* main contaiener */}
          <div className="singleStudentPage-container page-container">

            {/* student Details container  */}
            <div className='student-info-main-container'>
              <div className='student-info-heading'>
                <h1>Student Details</h1>
              </div>
              <div className="section basic-info">

                <div className="basic-info-left">
                  <div className="studentImageWrapper">
                    <img src={StudentImage} alt='profile'
                    ></img>
                  </div>
                </div>
                <div className="basic-info-right">
                  <div className='student-Name'>
                    <span >{name}</span>
                  </div>
                  <div className='other-info-container'>
                    <div className='other-detail-info-container'>
                      <div className='student'>

                        <span className='label'
                          style={{ color: "#1377C0", fontSize: ".9rem" }}
                        > Medium:</span>
                        <span>{medium}</span>
                      </div>
                      <div className='student'>
                        <span className='lable'> Class:</span>
                        <span>{Class}</span>
                      </div>

                    </div>
                    <div className='other-detail-info-container'>
                      <div className='student'>
                        <span className='lable'>Course:</span>
                        <span>{course}</span>
                      </div>
                      <div className='student'>
                        <span className='lable'>Board:</span>
                        <span>{board}</span>
                      </div>
                    </div>
                    <div className='other-detail-info-container'>

                      <div className='student'>
                        <span className='lable'>Student Id:</span>
                        <span>{student_id}</span>
                      </div>
                      <div className='student'>
                        <span className='lable'></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* student Parent detaiils  */}
            <div className='section  parent-info'>
              <div className="parent-info-heading">
                <h1>Parent Details</h1>
              </div>
              <div className="parent-info-container">
                <div className="parent-detail-info-container">
                  <div className='parent-detail-info-container-subbox'>
                    <span className='lable'>Father Name:</span>
                    <span>{fathername}</span>
                  </div>
                  <div className='parent-detail-info-container-subbox'>
                    <span className='lable'>Mother Name:</span>
                    <span>{mothername}</span>
                  </div>
                </div>
                <div className="parent-detail-info-container">
                  <div className='parent-detail-info-container-subbox'>
                    <span className='lable'>Email:</span>
                    <span>{email}</span>
                  </div>
                  <div className='parent-detail-info-container-subbox'>
                    <span className='lable'>Phone Number:</span>
                    <span>{primaryNumber}</span>
                  </div>
                </div>
                <div className="parent-detail-info-container">
                  <div className='parent-detail-info-container-subbox'>
                    <span className='lable'>Alternate Number:</span>
                    <span>{altNumber}</span>
                  </div>
                  <div className='parent-detail-info-container-subbox'>
                    <span className='lable'>Total children:</span>
                    <span>{childrenCount}</span>
                  </div>
                </div>
                <div className="parent-detail-info-container">
                  <div className='parent-detail-info-container-subbox'>
                    <span className='lable'>Father Profession :</span>
                    <span>{fatherProfession}</span>
                  </div>
                  <div className='parent-detail-info-container-subbox'>
                    <span className='lable'>Mother Profession :</span>
                    <span>{motherProfession}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* student Fee details */}
            <div className='section  fee-info'>
              <div className='fee-details-heading'>
                <h1>Fee Details</h1>
              </div>
              <div className="top">
                <div className="total-fee-container">
                  <div className="left">
                    <div className="fee-amount">
                      <span >Total Fees</span>
                      <h1>{total_fees}</h1>
                    </div>
                    <div className="feeIcon">
                      <img src={Fee} alt='fee'></img>
                    </div>
                  </div>
                  <div className="right"></div>
                </div>
              </div>
              <div className="bottom">
                {feeDetails.length == 0 ? <Box sx={{ display: 'flex' }}> <CircularProgress />
                </Box> : <Table rows={feeDetails} columns={columns.concat(viewColumn)} />
                }
              </div>
            </div>
            {/* student performance details */}
            <div className='section perfomanceAnalytic-info'>
              <div className="performanceAnalytic-heading">
                <h1>Performance Analytic</h1>
              </div>
              <div className='performanceAnalytic-toggle-button' >
                {showPerformance == 0 && <button onClick={perFormanceHandler}>{buttonValue}</button>}
              </div>
              {TestTableColumn.length > 0 && TestTableRow.length > 0 &&
                <div className='PerformanceAnalytic-body'>
                  <div className="performanceAnalytic-body-content">
                    <div className='perfomanceAnalytic-body-content-table'>
                      {TestTableColumn.length > 0 ? <Table rows={TestTableRow} columns={TestTableColumn} /> :
                        <div style={{
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",

                        }}>
                          <p style={{ color: "red" }}>No Test Given</p></div>}
                    </div>

                    <div className="performanceAnalytic-body-content-charts">
                      {
                        subjectWisemark.length == 0 ? <Box sx={{ display: 'flex' }}>
                          <CircularProgress />
                        </Box> : subjectWisemark.map((item, index) => (
                          <div key={index} className="container">
                            <div className='heading'>
                              <span className='head'>{item.value}</span>
                              <span className='subhead'>Recent Test Results</span>
                            </div>
                            <div className='content'>
                              <Chart color={item.color} temp={item.temp} total_mark={"Total mark"} Mark_obtained={"Mark obtained"} data={item.arr} />
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>

    </>
  )

}
export default SingleStudentpage;
