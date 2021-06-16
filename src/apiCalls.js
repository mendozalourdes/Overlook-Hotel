import domUpdates from "./domUpdates";

import {
  startUp
} from './scripts';

// let randomNumber = Math.floor(Math.random() * 50);

const checkForError = (response) => {
    if (!response.ok) {
      console.error(`POST Request Error: ${err.message} ${response}`)
      throw new Error('Something went wrong, please try again.')
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
    .then(response => response.json())
    .catch(domUpdates.catchErrorMessage);
}

  
const fetchCustomersData = () => {
    return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
    .catch(domUpdates.catchErrorMessage);
}


const fetchBookingsData = () => {
    return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .catch(domUpdates.catchErrorMessage);
}

const fetchRoomsData = () => {
    return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
    .catch(domUpdates.catchErrorMessage);
}

function retrieveData() {
    return Promise.all([fetchCustomersData(), fetchBookingsData(), fetchRoomsData()])
  }

  function retrieveOneCustomerData(customerID) {
    return Promise.all([fetchOneCustomer(customerID)])
  }

  // function retrieveOneCustomerData(randomNumber) {
  //   return Promise.all([fetchOneCustomer(randomNumber)])
  // }

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
  

 