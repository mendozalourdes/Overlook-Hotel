// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
let dayjs = require('dayjs');
import apiCalls from './apiCalls'
import BookingsRepository from './bookingsRepository';
import Customer from './customer';
import Room from './rooms';
import Booking from './booking';

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



//variables
let customer, allRooms, booking, allBookings, allCustomers;


//event listeners

window.onload = function () {console.log("test")}

window.onload = startUp();





function startUp () {
    apiCalls.retrieveData()
      .then((promise) => {
        const bookingsRepo = makeBookingInstances(promise[1]);
        allBookings = new BookingsRepository(bookingsRepo);
        allCustomers = makeCustomerInstances(promise[0]);
        allRooms = makeRoomsInstances(promise[2])
        makeOneCustomer(promise[3])
        console.log("oneCust", customer)
        console.log("allRooms", allRooms)
        console.log("allBookings", allBookings)
        console.log("allCust", allCustomers)
        // domUpdates.updateWelcomeMessage(allCustomers);
        // domUpdates.renderPastBookings(allBookings, allCustomers)
      })
  }

const makeBookingInstances = (apiBookingsData) => {
    const newBookings = apiBookingsData.bookings.map(booking => {
        return new Booking(booking)
    })
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

 
