// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********


//imports
import './css/index.scss';
let dayjs = require('dayjs');
import apiCalls from './apiCalls'
import BookingsRepository from './bookingsRepository';
import Customer from './customer';
import Room from './rooms';
import Booking from './booking';
import Hotel from './hotel';
import domUpdates from './domUpdates';

//image imports
import './images/bed.jpg'
import './images/hotel-bell.jpg'
import './images/hotel.jpg'
import './images/juniorSuite.jpg'
import './images/luggagePlane.jpg'
import './images/residentialSuite.jpg'
import './images/singleRoom.jpg'
import './images/suite.jpg'

//query selectors
let pageTitle = document.getElementById('pageTitle');
let totalCostInfo = document.getElementById('totalCostInfo');
let pastRoomsContainer = document.getElementById('pastRoomsContainer');
let bookRoomView = document.getElementById('bookRoomView');
let dashboardView = document.getElementById('dashboardView');
let bookNewRoomBtn = document.getElementById('bookNewRoomBtn');
let returnToDashBtn = document.getElementById('returnToDashBtn');
let findMyRoomBtn = document.getElementById('findMyRoomBtn');
let availableRoomsContainer = document.getElementById('availableRoomsContainer');
let bookingFormContainer = document.getElementById('bookingFormContainer');
let bookingDateCalendar = document.getElementById('bookingDateCalendar');
let filterByTypeContainer = document.getElementById('filterByTypeContainer');
let calendarFindSection = document.getElementById('calendarFindSection');
let filterByTypeBtnSection = document.getElementById('filter-by-type-button-section');
let bookRoomBtnSection = document.getElementById('bookRoomBtnSection');
let bookingSection = document.getElementById('bookingSection');
let bookRoomBtn = document.querySelector('book-room-button');
let emptyContainer = document.getElementById('emptyContainer')
let mainHeadingContainer = document.getElementById('mainHeadingContainer');
let logInPageView = document.getElementById('logInPageView')
let tempHeading = document.getElementById('tempHeading')
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");



// let findMyRoomBtn = document.getElementById('findMyRoomBtn')
// let checkAvailabilityBtn = document.getElementById('checkAvailabilityBtn');
// let searchRoomType = document.getElementById('searchRoomType');
// let roomTypeOption = document.getElementById('checkAvailability');
// let bookRoomBtn = document.getElementById('bookRoomBtn');
// let availableRoomsContainer = document.getElementById('availableRoomsContainer');
// let congratulationsMessage = document.getElementById('congratulationsMessage')
  
  //variables
  let customer, allRooms, booking, bookingRepository, allCustomers, hotel, roomNum, customerPassword, customerUsername;
  
  //event listeners

window.onload = startUp();
window.addEventListener('click', renderBookRoomView);
window.addEventListener('click', function (event) {
  console.log("eventTest", event.target)
} )
window.addEventListener('click', returnToDashboard);
findMyRoomBtn.addEventListener('click', () => domUpdates.generateRoomOptions(event, date, hotel, customer))
filterByTypeBtnSection.addEventListener('click', () => domUpdates.generateRoomsByType(event, hotel))
availableRoomsContainer.addEventListener('click', () =>  bookRoom(event))
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    logInUser();
})

// mainHeadingContainer.addEventListener('click', () => renderBookingsAgain(event))

// function renderBookingsAgain(event) {
//   if(event.target.id === 'returnToDashBtn') {
//     domUpdates.renderPastandFutureBookings(customer, bookingRepository, allRooms)
//   } 
// }


function logInUser(){
  let customerID = determineUsername();
  customerUsername = loginForm.username.value;
  customerPassword = loginForm.password.value;

  console.log("customerIDDDDD", customerID)

 if (customerUsername === `customer${customerID}` && customerPassword === "overlook2021") {
     alert("You have successfully logged in.");
     // location.reload();
     domUpdates.hide(logInPageView)
     domUpdates.show(dashboardView);
     domUpdates.hide(tempHeading);
     domUpdates.show(mainHeadingContainer);
      apiCalls.fetchOneCustomer(customerID);
      getCustomerFromLogIn(customerID)

 } else {
     loginErrorMsg.style.opacity = 1;
 }
}



function determineUsername () {

  customerUsername = loginForm.username.value;
  let stringID;
  let customerID;

  if (customerUsername.length === 9) {
    stringID = customerUsername.slice(-1)
    customerID = parseInt(stringID)
  } else {
    stringID = customerUsername.slice(-2)
    customerID = parseInt(stringID)
  }
console.log("allllll", allCustomers)
  let foundCustomer = allCustomers.find(customer => customer.id === customerID)
    console.log("foundCust", foundCustomer)
  console.log("customerID", customerID)

  if (foundCustomer) {
    // apiCalls.fetchOneCustomer(customerID);
    return customerID
  } else {
    loginErrorMsg.style.opacity = 1;
  }

}



export function startUp () {
    apiCalls.retrieveData()
      .then((promise) => {
        // console.log("promise1", promise[1])
        const bookingsInstances = makeBookingInstances(promise[1]);
  
        bookingRepository = new BookingsRepository(bookingsInstances);
        allCustomers = makeCustomerInstances(promise[0]);
        allRooms = makeRoomsInstances(promise[2])
        makeHotel(bookingRepository, allRooms)
        // console.log("hotelllll", hotel)
        // console.log("bookingsInstances", bookingsInstances)
        // console.log("oneCust", customer)
        // console.log("allRooms", allRooms)
        // console.log("bookingsRepoooo", bookingRepository)
        // console.log("allCust", allCustomers)
        // domUpdates.getAllDataToDom(customer, bookingRepository, allRooms, hotel);
      //  getAllData(customer, bookingRepository, allRooms, hotel)
      // console.log("customerID", customer)
        
      })
  }

function getCustomerFromLogIn(customerID) {
  apiCalls.retrieveOneCustomerData(customerID)
  .then((promise) => {
    makeOneCustomer(promise[0])
    console.log("amIACustomer", customer)
    domUpdates.getAllDataToDom(customer, bookingRepository, allRooms, hotel);
  })

}
  

const makeBookingInstances = (apiBookingsData) => {
    const newBookings = apiBookingsData.bookings.map(booking => {
        return new Booking(booking)
    })
    // console.log("newOnes", newBookings)
    return newBookings
}

const makeCustomerInstances = (apiCustomersData) => {
    const newCustomers = apiCustomersData.customers.map(customer => {
        return new Customer(customer)
    })
    return newCustomers
}
  
  const makeRoomsInstances = (apiRoomsData) => {
    const newRooms = apiRoomsData.rooms.map(room => {
        return new Room(room)
    })

    return newRooms
  }
    
  function makeOneCustomer(apiCustomerData) {
    customer = new Customer(apiCustomerData);

  }

  function makeHotel(apiBookingsData, apiRoomsData) {
    hotel = new Hotel(apiBookingsData, apiRoomsData);

  }


  function show(element) {
    element.classList.remove('hidden');
  }
  
  function hide(element) {
    element.classList.add('hidden');
  }
  

  function renderBookRoomView(event) {
    let eventTarget = event.target.closest('.book-new-room-btn')

    if(eventTarget) {
      hide(dashboardView);
      hide(bookNewRoomBtn);
      show(bookRoomView);
      show(returnToDashBtn);
    }

  }

  function returnToDashboard(event) {
    let eventTarget = event.target.closest('.return-to-dashboard')

    if(eventTarget) {
      hide(bookRoomView);
      hide(returnToDashBtn);
      show(dashboardView);
      show(bookNewRoomBtn);
      domUpdates.renderPastandFutureBookings(customer, bookingRepository, allRooms)
    }

  }


  function bookRoom(event) {
    if (event.target.classList.contains('book-room-button')) {
        let roomNum = parseInt(event.target.id)
        let date = dayjs(bookingDateCalendar.value).format('YYYY/MM/DD');
        let customerBooking = customer
        // roomNum = chosenRoom.number
        console.log("chosen", roomNum)
        console.log("dateVal", date)
        console.log("custttttID", customerBooking.id)
        apiCalls.bookNewRoom(customerBooking.id, date, roomNum)
        // domUpdates.renderPastandFutureBookings(customer, bookingRepository, allRooms)
        // console.log("customerRooms", customer)
    } else {
      event.preventDefault();
    }
  
  
  }