import React, { useState } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const EditPatientModal = ({ closeModal,user }) => {
  const oldName= user.name;
  const oldAppointmentDate= user.appointmentDate;
  const oldTime= user.showTime;
  const [name, setName] = useState(user.name);
  const [appointmentDate, setAppointmentDate] = useState(dayjs('2023-07-12T01:00'));
  const [time, setTime] = useState(dayjs('2023-07-12T01:00'));
  const [whatChanged, setWhatChanged] = useState("n/a")
  const [error, setError] = useState("");

  const showTime= time.format("HH:mm");
  const status= "unsent";

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = () => {
    if(name == "" || appointmentDate == "" || showTime == ""){
        setError("Please Provide A Valid Name, Appointment Date and Time")
    } else {
        if (oldName != name){
          whatChanged="name"
        }
        if (oldTime != showTime && oldAppointmentDate != appointmentDate){
          whatChanged= "time&appointmentDate"
        }
        else if (oldTime!= showTime){
          whatChanged= "time"
        }
        else if (oldAppointmentDate != appointmentDate){
          whatChanged= "appointmentDate"
        }
        axios.post("https://imara-health-backend.onrender.com/edit-user", {name,phoneNumber:user.phoneNumber,appointmentDate,showTime,status,whatChanged})
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
        <div className="buttonList">
            <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className="errorTag">{error}</div>
      </div>
    </div>
  );
}

export default EditPatientModal;