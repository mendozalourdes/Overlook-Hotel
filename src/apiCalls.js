import domUpdates from "./domUpdates";


import {
  startUp
} from './scripts';

let randomNumber = Math.floor(Math.random() * 50);


const checkForError = (response) => {
    if (!response.ok) {
      throw new Error('Something went wrong, please try again,')
    } else {
      return response.json()
    }
  }

  function handleError(response) {
    if (!response.ok) {
      domUpdates.bookingErrorMessage()
      throw new Error('Sorry, that request did not work, please try again.');
    } else {
      return response => response.json()
    }
  }
  

  const fetchOneCustomer = (id) => {
    return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(response => checkForError(response))
    .catch(error => console.error(`Customer API Error: ${error.message}`));
}

  
const fetchCustomersData = () => {
    return fetch('http://localhost:3001/api/v1/customers')
    .then(response => checkForError(response))
    .catch(error => console.error(`Customers API Error: ${error.message}`));
}


const fetchBookingsData = () => {
    return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => checkForError(response))
    .catch(error => console.error(`Bookings API Error: ${error.message}`));
}

const fetchRoomsData = () => {
    return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => checkForError(response))
    .catch(error => console.error(`Rooms API Error: ${error.message}`));
}

function retrieveData() {
    return Promise.all([fetchCustomersData(), fetchBookingsData(), fetchRoomsData()])
  }

  function retrieveOneCustomerData(customerID) {
    return Promise.all([fetchOneCustomer(customerID)])
  }

  function bookNewRoom(customerID, date, roomNumber) {
    return fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: customerID,
        date: date,
        roomNumber: roomNumber
      }),
    })
      .then(handleError)
      .then(() => domUpdates.confirmationInfo())
      .then(() => retrieveData())
      .then(() => startUp())
      .then(() => console.log("You did it!"))
      .catch(err => console.error(`POST Request Error: ${err.message}`))
  }
  
  
  export default {fetchCustomersData, fetchBookingsData, fetchRoomsData, fetchOneCustomer, retrieveData, retrieveOneCustomerData, bookNewRoom}
  

 