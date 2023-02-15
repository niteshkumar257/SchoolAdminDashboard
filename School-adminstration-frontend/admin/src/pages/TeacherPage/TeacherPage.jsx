import { useState, useEffect } from 'react'
import "./TeacherPage.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Table from "../../components/Table/TableFee"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from '@mui/material/Modal';
import { TextField, Stack, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';


//  Mnoths data 
const Month = [
  {
    year: "2023",
    months: [
      { value: 'Jan', lable: "Jan" }, { value: 'Feb', lable: "Feb" }, { value: 'March', lable: "March" }, { value: 'April', lable: "April" }, { value: 'May', lable: "May" }, { value: 'June', lable: "June" }, { value: "July", lable: "July" },
      { value: 'Aug', lable: "Aug" }, { value: 'Sep', lable: "Sep" }, { value: 'Oct', lable: "Oct" }, { value: 'Nov', lable: "Nov" }, { value: 'Dec', lable: "Dec" },
    ]
  },

  {
    year: "2024",
    months: [
      { value: 'Jan', lable: "Jan" }, { value: 'Feb', lable: "Feb" }, { value: 'March', lable: "March" }, { value: 'April', lable: "April" }, { value: 'May', lable: "May" }, { value: 'June', lable: "June" }, { value: "July", lable: "July" },
      { value: 'Aug', lable: "Aug" }, { value: 'Sep', lable: "Sep" }, { value: 'Oct', lable: "Oct" }, { value: 'Nov', lable: "Nov" }, { value: 'Dec', lable: "Dec" },
    ]
  }
];
const Year = [
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" }
]


const columns = [
  { field: 'id', headerName: 'SI.No', width: 150, headerAlign: "left", align: "left", flex: 1, sortable: false },
  { field: 'month', headerName: 'Month', width: 150, editable: false, headerAlign: "left", align: "left", sortable: false, flex: 1 },
  { field: 'year', headerName: 'Year', type: 'number', width: 150, editable: false, headerAlign: "left", sortable: false, flex: 1, align: "left" },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 150, editable: false, headerAlign: "left", sortable: false, flex: 1, align: "left" },
];


const SingleTeacherPage = (props) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,

  };
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  let params = useParams();
  const [name, setName] = useState("Nitesh Kumar Reddy");
  const [medium, setMedium] = useState("English");
  const [email, SetEmail] = useState("niteshredd257@gmail.com");
  const [age, setAge] = useState(23);
  const [salary, setSalary] = useState(10000);
  const [City, setCity] = useState("Ambikar Pur");
  const [workExp, setWorkExp] = useState(10);
  const [AadharCard, setAadharCard] = useState("1989300192");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("Male");

  // salary update useState variable
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [yearError, setYearError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [rows, setRows] = useState([]);

  let teacher_id = params.TeacherId;

  const renderSalary = () => {
    axios.get(`http://localhost:8080/teacher/${teacher_id}/paymentdetails`)
      .then((data) => {
        let allSalary = data.data.teacherDetails;
        let salary = [];
        for (let i = 0; i < allSalary.length; i++) {
          salary.push({ id: i + 1, amount: allSalary[i].amount, year: allSalary[i].year, month: allSalary[i].month });
        }
        setRows(salary);
      }).catch((err) => {
        console.log(err);
      })
  }
  let MonthSort = [];
  let SalaryRow = Object.entries(rows);
  const todayDate = new Date();
  let curentYear = todayDate.getFullYear();

  SalaryRow.map((value) => { if (value[1].year == curentYear) { MonthSort.push(value[1].month) } })

  const filteredMonths = Month.map(yearData => {
    console.log(yearData.year)
    if (yearData.year == curentYear) {
      console.log(yearData.year, curentYear);
      return {
        year: yearData.year, months: yearData.months.filter(month => !MonthSort.includes(month.value))
      }
    }
    else return {
      year: yearData.year, months: yearData.months
    }
  });
  const [newMonths, setNewMonths] = useState([]);
  const yearSelectHandler = (e) => {
    setYear(e.target.value);
    filteredMonths.map((item) => {
      if (e.target.value === item.year) {
        console.log(year, item, year);
        setNewMonths(item.months)
      }
    })
  }
  const salaryAmountHandler = (e) => {
    if (e.target.value < 0) {
      setAmount(-e.target.value);
    }
    else setAmount(e.target.value);
  }
  const handleAgree = () => {
    setOpenModal(false);
    if (year == '') setYearError(true);
    if (month == '') setMonthError(true);
    if (amount == '') setAmountError(true);
    if (amount > 0) {

      if (year.length != 0 && month.length != 0 && amount.length != 0) {
        axios.post(`http://localhost:8080/teacher/${teacher_id}/updatepayment`, {
          amount, month, year
        })

          .then((data) => {
            console.log(data.data.message);
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
            renderSalary();
          }).catch((err) => {
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
        setOpenDialog(false);
        setOpenModal(false);

      }
      setYearError(false);
      setMonthError(false);
      setAmountError(false)
    }
    else {
      toast.warn("Enter a Valid Salary", {
        position: "top-center",
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
  const AddSalaryHandler = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  }

  // new column for update status
  const handleDialogClose = () => {
    setOpenDialog(false);
    setOpenModal(false);
  }
  useEffect(() => {
    console.log(teacher_id)
    axios.get(`http://localhost:8080/teacher/${teacher_id}`)
      .then((data) => {
        console.log(data.data)
        setName(data.data.teacherDetails[0].teacher_name);
        SetEmail(data.data.teacherDetails[0].email);
        setAge(data.data.teacherDetails[0].age);
        setSalary(data.data.teacherDetails[0].salary);
        setCity(data.data.teacherDetails[0].city);
        setAadharCard(data.data.teacherDetails[0].aadhar_no);
        setDate(data.data.teacherDetails[0].date_of_joining.slice(0, 10))
        setWorkExp(data.data.teacherDetails[0].experience);
        setGender(data.data.teacherDetails[0].gender);
        setMedium(data.data.teacherDetails[0].medium)
      }).catch((err) => {
        console.log(err);
      })
    renderSalary();
  }, [])
  const [isExpanded, setExpanded] = useState(false);
  const isExpandedHandler = (value) => {
    setExpanded(value);
  }
  return (
    <div className='SingleTeacherPage-container '>
      <Sidebar isExpandedHandler={isExpandedHandler} />
      <div className='SingleTeacher'>
        <Navbar adminName={props.AdminName} />
        <div className='SingleTeacher-page page-container'>
          <div className='student-info-main-container'>
            <div className='student-info-heading'>
              <h1> Teachers Details</h1>
            </div>
            <div className="section basic-info">
              <div className="basic-info-right">
                <div className='student-Name'>
                  <span >{name}</span>
                </div>
                <div className='other-info-container'>
                  <div className='other-detail-info-container page-container'>
                    <div className='student'>
                      <span className='label'
                        style={{ color: "#1377C0", fontSize: ".9rem" }}
                      > Medium :</span>
                      <span>{medium}</span>
                    </div>
                    <div className='student'>
                      <span className='lable'> Email :</span>
                      <span>{email}</span>
                    </div>
                    <div className='student'>
                      <span className='lable'> Work-Experinece :</span>
                      <span>{workExp}</span>
                    </div>
                  </div>
                  <div className='other-detail-info-container'>
                    <div className='student'>
                      <span className='lable'>
                        Age :
                      </span>
                      <span>{age}</span>
                    </div>
                    <div className='student'>
                      <span className='lable'>Gender :</span>
                      <span>{gender}</span>
                    </div>
                    <div className='student'>
                      <span className='lable'>Salary :</span>
                      <span>{salary}</span>
                    </div>
                  </div>
                  <div className='other-detail-info-container'>
                    <div className='student'>
                      <span className='lable'>
                        Start Date :
                      </span>
                      <span>{date}</span>
                    </div>
                    <div className='student'>
                      <span className='lable'>City :</span>
                      <span>{City}</span>
                    </div>
                    <div className='student'>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='student-salary-container' style={{ width: "98%", }}>
              <div className='student-salary-container-heading'>
                <h1>Salary Details</h1>
              </div>
              <div className='student-info-container-body'>
                {rows.length == 0 ? <CircularProgress /> : <Table rows={rows} columns={columns} />}
              </div>
              {
                rows.length != 0 &&
                <div className='btn'>
                  <button onClick={handleOpen}>Update Salary</button>
                  {openModal && <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <form onSubmit={AddSalaryHandler}>
                      <Box sx={style} >
                        <div style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 20
                        }}>
                          <div>
                            <Stack spacing={3}>
                              <div>
                                <span>Salary update</span>
                              </div>
                              <TextField sx={{ flex: 1 }} defaultValue="" error={yearError} required select label="year" onChange={yearSelectHandler} helperText="Select year">
                                {Year.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                              <TextField defaultValue="" sx={{ flex: 1 }} error={monthError} required select label="Month" onChange={(e) => setMonth(e.target.value)} helperText="Select Month">
                                {newMonths.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.lable}
                                  </MenuItem>
                                ))}
                              </TextField>
                              <TextField sx={{ flex: 1 }} error={amountError} required label="Amount" onChange={salaryAmountHandler} helperText="Enter Amount" />
                            </Stack>
                          </div>
                          <div style={{
                            display: "flex",
                            justifyContent: "flex-end"
                          }}>
                            <button
                              style={{
                                width: 150,
                                height: 54,
                                backgroundColor: "#08B3F3",
                                border: "none",
                                borderRadius: 9,
                                fontSize: "1.1rem",
                                backgroundColor: "#1377C0",
                                color: "white",
                                textDecoration: "none",
                                cursor: "pointer"
                              }}>Submit</button>
                          </div>
                        </div>
                      </Box>
                    </form>
                  </Modal>}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      {openDialog && <Dialog
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
          {"Salary Update?"}
        </DialogTitle>

        <DialogActions>
          <Button
            style={{
              backgroundColor: "#1377C0",
              color: "white",
              fontSize: "0.7rem"
            }}
            onClick={handleAgree}>confirm</Button>
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

export default SingleTeacherPage;