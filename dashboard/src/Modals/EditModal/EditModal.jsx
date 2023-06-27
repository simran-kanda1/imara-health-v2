import React, { useState } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const EditPatientModal = ({ closeModal,user }) => {
  const oldName= user.name;
  const oldAppointmentDate= dayjs(user.appointmentDate).format();
  const oldTime= user.showTime;
  const [name, setName] = useState(user.name);
  const [appointmentDate, setAppointmentDate] = useState(dayjs(user.appointmentDate));
  const [time, setTime] = useState(dayjs('2023-07-12T01:00'));
  const [whatChanged, setWhatChanged] = useState("n/a");
  const [updated, setUpdated]= useState("")
  const [error, setError] = useState("");

  const showTime= time.format("HH:mm");
  const showDate= dayjs(appointmentDate).format();
  const status= "unsent";

  const handleChangeName = (event) => {
    setName(event.target.value);
    setUpdated("")
  };

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  const handleChanges = () => {
    if (oldName != name){
      setWhatChanged("name")
    }
    if (oldAppointmentDate != showDate){
      setWhatChanged("appointmentDate")
    }
    if (oldTime != showTime){
      setWhatChanged("time")
    }
    if (oldTime != showTime && oldAppointmentDate != showDate){
      setWhatChanged("time&appointmentDate")
    }
    setError("Successfully Updated")
    setUpdated("yes")
  };

  const handleSubmit = () => {
    if(name == "" || appointmentDate == "" || showTime == ""){
        setError("Please Provide A Valid Name, Appointment Date and Time")
    } else if (updated == ""){
        setError("Please Select 'Update Changes' Before Submitting")
    } else {
        axios.post("http://localhost:4000/edit-user", {name,phoneNumber:user.phoneNumber,appointmentDate,showTime,status,whatChanged})
        .then(response => {
            if(response.data.message == "Data Updated"){
                setError("")
                closeModal();
            } else {
                setError(response.data.message);
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
          <p>Current Appointment: {oldAppointmentDate.substring(0,10)} at {oldTime}</p>
          <p>Selected Appointment: {showDate.substring(0,10)} at {showTime}</p>
        </div>
        <div className="buttonList">
            <button onClick={handleChanges}>Update Changes</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className="errorTag">{error}</div>
      </div>
    </div>
  );
}

export default EditPatientModal;