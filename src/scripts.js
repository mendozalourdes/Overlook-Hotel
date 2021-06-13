// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
// import './css/base.scss';
import './css/index.scss';
let dayjs = require('dayjs');
import apiCalls from './apiCalls'
import BookingsRepository from './bookingsRepository';
import Customer from './customer';
import Room from './rooms';
import Booking from './booking';
import Hotel from './hotel';
import domUpdates from './domUpdates';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
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
let navContainer = document.getElementById('navContainer');
let bookRoomView = document.getElementById('bookRoomView');
let dashboardView = document.getElementById('dashboardView');
let bookNewRoomBtn = document.getElementById('bookNewRoomBtn');
let returnToDashBtn = document.getElementById('returnToDashBtn');
let findMyRoomBtn = document.getElementById('findMyRoomBtn');

//variables
let customer, allRooms, booking, bookingRepository, allCustomers, hotel;

//event listeners

window.onload = startUp();
window.addEventListener('click', renderBookRoomView);
window.addEventListener('click', function (event) {
  console.log("eventTest", event.target)
} )
window.addEventListener('click', returnToDashboard);
// window.addEventListener('click', getAllData)
window.addEventListener('click', () => domUpdates.generateRoomOptions(event, date, hotel))



function startUp () {
    apiCalls.retrieveData()
      .then((promise) => {
        // console.log("promise1", promise[1])
        const bookingsInstances = makeBookingInstances(promise[1]);
  
        bookingRepository = new BookingsRepository(bookingsInstances);
        allCustomers = makeCustomerInstances(promise[0]);
        allRooms = makeRoomsInstances(promise[2])
        makeHotel(bookingRepository, allRooms)
        // console.log("hotelllll", hotel)
        makeOneCustomer(promise[3])
        // console.log("bookingsInstances", bookingsInstances)
        // console.log("oneCust", customer)
        // console.log("allRooms", allRooms)
        // console.log("bookingsRepoooo", bookingRepository)
        // console.log("allCust", allCustomers)
        domUpdates.getAllDataToDom(customer, bookingRepository, allRooms, hotel);
      //  getAllData(customer, bookingRepository, allRooms, hotel)
      console.log("customerID", customer)
        
      })
  }

  function getAllData(event, customer, bookingRepository, allRooms, hotel) {
    console.log("testHotel", hotel)
    domUpdates.generateRoomOptions(event, date, hotel)

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
    // let randomNumber = Math.floor(Math.random() * apiCustomerData.customers.length);
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
    }

  }



// let now = dayjs();

// console.log('This is the JavaScript entry file - your code begins here.');
// console.log("testDate", now)
// console.log("testNowFormat", now.format());

// console.log(now.format("YYYY-MM-DD"));

// const today = dayjs(new Date())
// let currentDate = new Date("2021/06/11")


// let parsedDate = Date.parse(currentDate);

// console.log("parsed", parsedDate)

// let inputDate = new Date("2020/02/16")

// let parsedInput = Date.parse(inputDate)

// console.log("parsedInput", parsedInput)

// const pastDate = dayjs("2018-10-22")
// const futureDate = dayjs("2022-01-01")

// console.log("today", today)

// console.log("pastDate", pastDate)
// console.log("futureDate", futureDate)

// console.log(pastDate.isBefore(today))

// console.log("future", futureDate.isBefore(today))

// const input = dayjs(arrivalDate.value).format('YYYY/MM/DD');
 
