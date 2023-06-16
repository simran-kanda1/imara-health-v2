require('dotenv').config()
const User = require("../models/user");
const accountSid = "ACa1b97b2067cf53d969ac42d8a8a8b827";
const authToken = "3456922b65d542853f412357f5854664";
const messagingSID = "MG846bcc10c03e185544ab15e1e63f8082";
const client = require('twilio')(accountSid, authToken);

const notificationWorker = () => {
    const currentDate = new Date();
    const searchString = getString(currentDate)
    User
    .find({"appointmentDate.date" : {$regex : searchString}})
    .then(data => {
        return data;
    })
    .then(data => {
        const servingData = data.map(element => {
            if(currentDate == appointmentDate){
                const medicines = element.medicines.map(medicine => {
                    if(appointmentDate.date.includes(searchString))
                        return `Appointment Date : "${appointmentDate.date}" `
                })
                const message = `Hello ${element.name}. We hope you are doing well. Here is your reminder for your upcoming appointment. It is scheduled for ${appointmentDate} at ${showTime}. Thank You, Have A great Day.`;
                return {number : element.phoneNumber , message : message};
            }
        })
        Promise.all(
            servingData.map(data => {
                return client.messages.create({
                    to: data.number,
                    from: messagingSID,
                    body: data.message
                });
            })
        )
        .then(messages => {
            console.log("Messages Sent");
        })
        .catch(err => console.error(err));
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = notificationWorker;