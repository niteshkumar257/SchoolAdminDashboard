import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"
import "./Studentform.scss";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// select medium for the selecti list
const Medium = [
  {
    value: 'English',
    label: 'English',
  },
  {
    value: 'Hindi',
    label: 'Hindi',
  },

];

// select course for the drop down

const Course = [
  {
    value: 'foundation',
    label: 'Foundation',
  },
  {
    value: 'Jee-12',
    label: 'Jee-12',
  },
  {
    value: 'Jee-11',
    label: 'Jee-11',
  },
  {
    value: 'Neet-11',
    label: 'Neet-11',
  },
  {
    value: 'Neet-12',
    label: 'Neet-12',
  },
]

// select board from boardList
const Board = [
  {
    value: 'CBSE',
    label: 'CBSE',
  },
  {
    value: 'ICSE',
    label: 'ICSE',
  },
  {
    value: 'State Board',
    label: 'State Board',
  },

]

// choose  a class
const Batch = [

  {
    value: '12',
    label: '12',
  },
  {
    value: '11',
    label: '11',
  },
  {
    value: '10',
    label: '10',
  },
  {
    value: '9',
    label: '9',
  },
  {
    value: '8',
    label: '8',
  },
  {
    value: '7',
    label: '7',
  },
  {
    value: '6',
    label: '6',
  },
  {
    value: '5',
    label: '5',
  },

]

// gender 
const Gender = [
  {
    value: 'Male',
    label: 'Male'
  },
  {
    value: 'Female',
    label: 'Female'
  },
  {
    value: 'Not-disclose',
    label: 'Not-disclose'
  },
  {
    value: 'Binary',
    label: 'Binary'
  },



]
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const StudentForm = (props) => {
  let decode = jwt_decode(localStorage.getItem("auth_token"));
  let school_id = decode.result.school_id;


  // Date maker
  let objectDate = new Date();
  let day = objectDate.getDate();
  let month = objectDate.getMonth() + 1;
  month = month.toString();
  day = day.toString();
  if (month.length == 1) month = "0" + month;
  if (day.length == 1) day = "0" + day;
  let year = objectDate.getFullYear();
  let format = year + "-" + month + "-" + day;

  
  const [firstInsallMentEta, setFirstInstallMentEta] = useState("");
  const [secondInsallMentEta, setSecondInstallMentEta] = useState("");
  const [thirdInsallMentEta, setThirdInstallMentEta] = useState("");

  const [firstInstallMentStatus, setFirstInstallMentStatus] = useState(0);
  const [secondInstallMentStatus, setSecondInstallMentStatus] = useState(0);
  const [thirdInstallMentStatus, setThirdInstallMentStatus] = useState(0);

  const [firstInstallMentAmount, setFirstInstallMentAmount] = useState("");
  const [secondInstallMentAmount, setSecondInstallMentAmount] = useState("");
  const [thirdInstallMentAmount, setThirdInstallMentAmount] = useState("");




  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [medium, setMedium] = useState("");
  const [date, setDate] = useState("");
  const [Class, setClass] = useState("");
  const [email, setEmail] = useState("");
  const [Fathername, setFatherName] = useState("");
  const [MotherName, setMotherName] = useState("");
  const [FatherProfession, setFatherProfession] = useState("");
  const [MotherProfession, setMotherProfession] = useState("");


  const [PrimaryNumber, setPrimaryNumber] = useState("");
  const [AlternateNumber, setAlternateNumber] = useState("");
  const [AadharNumber, setAadharNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [board, setBoard] = useState("");



  // error handler

  const [nameError, setNameError] = useState(false);
  const [mediumError, setMediumError] = useState(false);
  const [courseError, setCourseError] = useState(false);
  const [boardError, setBoardError] = useState(false);
  const [classError, setClassError] = useState(false);
  const [fatherNameError, setFahterNameError] = useState(false);
  const [motherNameError, setMohterNameError] = useState(false);
  const [fatherProfessionError, setFatherProfessionError] = useState(false);
  const [motherProfessionError, setmotherProfessionError] = useState(false);
  const [altNumberError, setAltNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [primaryError, setPrimaryError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [aadhaError, setAadharError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [oneError, setOneError] = useState(false);
  const [twoError, setTwoError] = useState(false);
  const [thirdError, setThirdError] = useState(false);
  const [firstInstallMentError, setFirstInstallMentError] = useState(false);
  const [secondInstallMentError, setSecondInstallMentError] = useState(false);
  const [thirdInstallMentError, setThirdInstallMentError] = useState(false);




  // fee detals

  const handleChange1 = (e) => {

    setFirstInstallMentEta(format);
    if (firstInstallMentStatus == 0) setFirstInstallMentStatus(1);
    else setFirstInstallMentStatus(0)
  }
  const handleChange2 = (e) => {
    setSecondInstallMentEta(format);
    if (secondInstallMentStatus == 0) setSecondInstallMentStatus(1);
    else setSecondInstallMentStatus(0)

  }
  const handleChange3 = (e) => {
    setThirdInstallMentEta(format);
    if (thirdInstallMentStatus) setThirdInstallMentStatus(0)
    else setThirdInstallMentStatus(1)
  }










  const AddStudentHandler = (e) => {
    e.preventDefault();

    setNameError(false);
    setMediumError(false);
    setAltNumberError(false);
    setBoardError(false);
    setClassError(false);
    setCourseError(false);
    setFahterNameError(false);
    setMohterNameError(false);
    setFatherProfessionError(false);
    setmotherProfessionError(false);
    setPrimaryError(false);
    setAltNumberError(false);
    setDateError(false);
    setAddressError(false);
    setOneError(false);
    setTwoError(false);
    setThirdError(false);
    setGenderError(false);
    setEmailError(false);
    setAadharError(false);




    if (name == '') setNameError(true);
    if (medium == '') setMediumError(true);
    if (Class == '') setClassError(true);
    if (course == '') setCourseError(true);
    if (gender == '') setGenderError(true);
    if (email == '') setEmailError(true);
    if (Fathername == '') setFahterNameError(true);
    if (MotherName == '') setMohterNameError(true);
    if (FatherProfession == '') setFatherProfessionError(true);
    if (MotherProfession == '') setmotherProfessionError(true);
    if (AlternateNumber == '') setAltNumberError(true);
    if (PrimaryNumber == '') setPrimaryError(true);
    if (date == '') setDateError(true);
    if (Address == '') setAddressError(true);
    if (AadharNumber == '') setAadharError(true);
    if (board == '') setBoardError(true);
    if (firstInstallMentAmount == '') setOneError(true);
    if (secondInstallMentAmount == '') setTwoError(true);
    if (thirdInstallMentAmount == '') setThirdError(true);

    if (firstInsallMentEta == '') setFirstInstallMentEta(true);
    if (secondInsallMentEta == '') setSecondInstallMentEta(true);
    if (thirdInsallMentEta == '') setThirdInstallMentEta(true);

    if (firstInsallMentEta == '') setFirstInstallMentError(true);
    if (secondInsallMentEta == '') setSecondInstallMentError(true);
    if (thirdInsallMentEta == '') setThirdInstallMentError(true);




    if (name.length != 0 && medium.length != 0 && Class.length != 0 && course.length != 0 && email.length != 0 && Fathername.length != 0 && MotherName.length != 0 && FatherProfession.length != 0 && MotherProfession.length != 0 && AlternateNumber.length != 0 && PrimaryNumber.length != 0 && date.length != 0 && Address.length != 0 && board.length != 0 &&
      firstInstallMentAmount.length != 0 && secondInstallMentAmount.length != 0 && thirdInstallMentAmount.length != 0) {


      let totalFees = parseInt(firstInstallMentAmount) + parseInt(secondInstallMentAmount) + parseInt(thirdInstallMentAmount);

      let formData = ({
        student_name: name, gender, dob: date, address: Address, class_id: Class, course_name: course,
        medium, board, father_name: Fathername, father_profession: FatherProfession, mother_name: MotherName,
        mother_profession: MotherProfession, whatsapp_no: PrimaryNumber, alternative_mobile: AlternateNumber,
        email, total_fees: totalFees, first_installment: firstInstallMentAmount,
        first_installment_eta: firstInsallMentEta, first_installment_status: firstInstallMentStatus,
        second_installment: secondInstallMentAmount, second_installment_eta: secondInsallMentEta,
        second_installment_status: secondInstallMentStatus,
        third_installment: thirdInstallMentAmount, third_installment_eta: thirdInsallMentEta,
        third_installment_status: thirdInstallMentStatus, aadhar_no: AadharNumber
      });

      axios.post(`http://localhost:8080/schools/${school_id}/addStudent`, {
        student_name: name, gender, dob: date, address: Address, class_id: Class, course_name: course,
        medium, board, father_name: Fathername, father_profession: FatherProfession, mother_name: MotherName,
        mother_profession: MotherProfession, whatsapp_no: PrimaryNumber, alternative_mobile: AlternateNumber,
        email, total_fees: totalFees, first_installment: firstInstallMentAmount,
        first_installment_eta: firstInsallMentEta, first_installment_status: firstInstallMentStatus,
        second_installment: secondInstallMentAmount, second_installment_eta: secondInsallMentEta,
        second_installment_status: secondInstallMentStatus,
        third_installment: thirdInstallMentAmount, third_installment_eta: thirdInsallMentEta,
        third_installment_status: thirdInstallMentStatus, aadhar_no: AadharNumber
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
        console.log(err);
      })

    }
    else {
      toast.error('All Field are Required', {
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





    setName("");
    setEmail("");
    setGender("");
    setAddress("");
    setClass("");
    setCourse("");
    setMedium("");
    setBoard("");
    setAadharNumber("");
    setFatherName("");
    setMotherName("");
    setFatherProfession("");
    setMotherProfession("");
    setPrimaryNumber("");
    setAlternateNumber("");
    setDate("");
    setFirstInstallMentAmount("");
    setSecondInstallMentAmount("");
    setThirdInstallMentAmount("");
    setFirstInstallMentEta("");
    setSecondInstallMentEta("");
    setThirdInstallMentEta("");
    setFirstInstallMentStatus(0);
    setSecondInstallMentStatus(0);
    setThirdInstallMentStatus(0);





  }

  const [isExpanded, setExpanded] = useState(false);
  const isExpandedHandler = (value) => {
    setExpanded(value);
  }

  return (
    <div className='studentForm-container '>
      <Sidebar isExpandedHandler={isExpandedHandler} />

      <div className='studentForm'>
        <Navbar adminName={props.AdminName} />
        <div className='studentForm-page page-container'>
          <div className="studentForm-page-container">
            <div className='student-page-container-heading'>

              {/* header container */}
              <span >Add Student</span>
            </div>
            <form noValidate onSubmit={AddStudentHandler}>
              <div className='student-info-detail-container'>

                <div className='student-info-detail-student-container'>
                  <div className='student-info-detail-student-container-subheading'>
                    <span>Student Details</span>
                  </div>
                  <div className='student-info-detail-student-container-textfield'>


                    {/* row one info */}

                    <div className='student-info-section '>



                      <TextField value={name} error={nameError} sx={{ flex: 1 }} label="Student Name" required helperText="Enter Student Name" onChange={(e) => setName(e.target.value)} />
                      <TextField value={gender} sx={{ flex: 1 }} error={genderError} select label="Gender" required onChange={(e) => setGender(e.target.value)} helperText="Select Gender">
                        {Gender.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField value={course} sx={{ flex: 1 }} error={courseError} select label="Course" required onChange={(e) => setCourse(e.target.value)} helperText="Select Course">
                        {Course.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className='student-info-section '>
                      <TextField value={date} sx={{ flex: 1 }} error={dateError} variant="outlined" helperText="Select Date Of Birth" type="date" onChange={(e) => setDate(e.target.value)} />
                      <TextField value={Class} sx={{ flex: 1 }} error={classError} select label="Class" required onChange={(e) => setClass(e.target.value)} helperText="Select Class">
                        {Batch.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField value={medium} sx={{ flex: 1 }} error={mediumError} required select helperText="Select Medium" label="Medium" onChange={(e) => setMedium(e.target.value)}>
                        {Medium.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className='student-info-section '>
                      <TextField value={Address} sx={{ flex: 1 }} error={addressError} helperText="Enter Address" label="Address" type="text" required onChange={(e) => setAddress(e.target.value)} />
                      <TextField value={AadharNumber} sx={{ flex: 1 }} error={aadhaError} label="Aadhar Number" type="text" helperText="Enter Aadhar Number" required
                        onChange={(e) => setAadharNumber(e.target.value)} />
                      <TextField value={board} sx={{ flex: 1 }} error={boardError} required select label="Board" helperText="Select Board" onChange={(e) => setBoard(e.target.value)} >
                        {Board.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                </div>
                <div className='student-info-detail-parent-container'>
                  <div className='student-info-detail-parent-container-subheading'>
                    <span>Parent Details</span>
                  </div>
                  <div className='student-info-detail-parent-container-textfield'>
                    <div className='parent-info-section '>
                      <TextField value={Fathername} sx={{ flex: 1 }} error={fatherNameError} label="Father Name" required helperText="Father Name" onChange={(e) => setFatherName(e.target.value)} />
                      <TextField value={FatherProfession} sx={{ flex: 1 }} error={fatherProfessionError} label="Father profession" helperText="Father Profession" required onChange={(e) => setFatherProfession(e.target.value)} />
                      <TextField value={PrimaryNumber} sx={{ flex: 1 }} error={primaryError} label="Primary Number" required helperText="Primary Number" onChange={(e) => setPrimaryNumber(e.target.value)} />
                    </div>
                    <div className='parent-info-section '>
                      <TextField value={MotherName} sx={{ flex: 1 }} error={motherNameError} label="Mother Name" required helperText="Mohter Name" onChange={(e) => setMotherName(e.target.value)} />
                      <TextField value={MotherProfession} sx={{ flex: 1 }} error={motherProfessionError} label="Mother profession" helperText="Mother Profession" required onChange={(e) => setMotherProfession(e.target.value)} />
                      <TextField value={AlternateNumber} sx={{ flex: 1 }} error={altNumberError} label="Alternate Number" required helperText="Alternate Number" onChange={(e) => setAlternateNumber(e.target.value)} />
                    </div>
                    <div className='parent-info-section '>
                      <TextField value={email} sx={{ flex: 0.317 }} error={emailError} label="Email" required type="email" helperText="Enter Parent Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className='student-info-detail-fee-container'>
                  <div className='student-info-detail-fee-container-subheading'>
                    <span>Fee Details</span>
                  </div>
                  <div className='student-info-detail-fee-container-textfield'>
                    <div className='fee-info-section section'>
                      <div className='fee-info-section-installment'>
                        <TextField
                          value={firstInstallMentAmount}
                          sx={{
                            height: "7vh"
                          }}
                          error={oneError}
                          required
                          onChange={(e) => setFirstInstallMentAmount(e.target.value)}
                          id="outlined-basic" label="1st InstallMent" variant="outlined" />
                        <div className="fee-info-section-installment-checkbox-date">
                          <Checkbox
                            checked={firstInstallMentStatus}
                            onChange={(e) => handleChange1(e)}
                            color="success"
                          />
                          {!firstInstallMentStatus &&
                            <TextField
                              sx={{
                                height: "5vh"
                              }}
                              variant="outlined"
                              type="date"
                              required
                              value={firstInsallMentEta}
                              helperText="Select a Date"
                              error={firstInstallMentError}
                              onChange={(e) => setFirstInstallMentEta(e.target.value)} />}
                        </div>


                      </div>
                      <div className='fee-info-section-installment'>
                        <TextField error={twoError}
                          sx={{ height: "7vh" }} value={secondInstallMentAmount} onChange={(e) => setSecondInstallMentAmount(e.target.value)} id="outlined-basic" label="2nd  InstallMent"
                          required
                          variant="outlined" />
                        <div className="fee-info-section-installment-checkbox-date">
                          <Checkbox
                            checked={secondInstallMentStatus} required onChange={(e) => handleChange2(e)} color="success" />
                          {!secondInstallMentStatus &&
                            <TextField sx={{ height: "5vh" }} variant="outlined" value={secondInsallMentEta} type="date" required
                              helperText="Select a Date" error={secondInstallMentError}
                              onChange={(e) => setSecondInstallMentEta(e.target.value)} />}
                        </div></div>
                      <div className='fee-info-section-installment'>
                        <TextField
                          error={thirdError}
                          sx={{ height: "7vh" }}
                          value={thirdInstallMentAmount}
                          onChange={(e) => setThirdInstallMentAmount(e.target.value)}
                          required
                          id="outlined-basic" label="3rd InstallMent" variant="outlined" />
                        <div className="fee-info-section-installment-checkbox-date">
                          <Checkbox
                            checked={thirdInstallMentStatus}
                            onChange={(e) => handleChange3(e)}
                            color="success"
                            {...label}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                          {!thirdInstallMentStatus &&
                            <TextField variant="outlined"
                              value={thirdInsallMentEta}
                              type="date"
                              error={thirdInstallMentError}
                              helperText="Select a Date"
                              onChange={(e) => setThirdInstallMentEta(e.target.value)} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='buttonSubmit'>
                  <button>Submit</button>
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

export default StudentForm