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
      errorTag.innerText = 'Sorry, that request did not work.';
      throw new Error('Sorry, that request did not work');
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
    return Promise.all([fetchCustomersData(), fetchBookingsData(), fetchRoomsData(), fetchOneCustomer(randomNumber)])
  }


  function bookNewRoom(user, date, roomNumber, customer) {
    return fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: customer.id,
        date: date,
        roomNumber: roomNumber
      }),
    })
      .then(checkForError)
      .catch(err => console.error(`POST Request Error: ${err.message}`))
  }
  
  
  export default {fetchCustomersData, fetchBookingsData, fetchRoomsData, retrieveData, bookNewRoom}
  