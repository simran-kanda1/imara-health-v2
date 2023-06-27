import React, { useState } from "react";
import axios from "axios";
import "./AddPatientModal.css";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const AddPatientModal = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(dayjs(new Date()));
  const [time, setTime] = useState(dayjs('2023-07-12T01:00'));
  const [status,setStatus]= useState("unsent");
  const [error, setError] = useState("");
  const whatChanged= "n/a";

  const showDate= dayjs(appointmentDate).format();
  const showTime= time.format("HH:mm");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = () => {
    if(name == "" || phoneNumber == "" || appointmentDate == "" || showTime == ""){
        setError("Please Provide A Valid Name, Phone Number, Appointment Date and Time")
    } else {
        axios.post("http://localhost:4000/add-user", {name,phoneNumber,appointmentDate,showTime,status,whatChanged})
        .then(response => {
            if(response.status == 500 || response.data.message == "Phone Number Already Registered"){
                setError(response.data.message);
            } else {
                setError("")
                closeModal();
            }
        })
        .catch(err => {
            setError(err);
        })
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-header">
        <h2>Add Patient</h2>
        <button onClick={closeModal} className="modal-close-btn">
          &times;
        </button>
      </div>
      <div className="modal-body">
        <div className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleChangeName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handleChangePhoneNumber}
            />
          </div>
          <div className="appointment-date-calendar">
            <label htmlFor="appointmentDate">Appointment Date:</label>
          </div>
          <div style={{margin: "1%"}}  >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                label="Select Date"
                type="text"
                id="appointmentDate"
                value={appointmentDate}
                onChange={setAppointmentDate}
              />
              <div className="appointment-date-time">
                <label htmlFor="time">Appointment Time:</label>
              </div>
              <DesktopTimePicker
                label="Select Time"
                id="time"
                value={time}
                onChange={setTime}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="displayUpdates">
          <p>Selected Appointment: {showDate.substring(0,10)} at {showTime}</p>
        </div>
        <div className="buttonList">
            <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className="errorTag">{error}</div>
      </div>
    </div>
  );
}

export default AddPatientModal;