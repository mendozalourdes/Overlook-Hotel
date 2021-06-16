//imports
import "./css/index.scss";
let dayjs = require("dayjs");
import apiCalls from "./apiCalls";
import BookingsRepository from "./bookingsRepository";
import Customer from "./customer";
import Room from "./rooms";
import Booking from "./booking";
import Hotel from "./hotel";
import domUpdates from "./domUpdates";

//image imports
import "./images/bed.jpg";
import "./images/hotel-bell.jpg";
import "./images/hotel.jpg";
import "./images/juniorSuite.jpg";
import "./images/luggagePlane.jpg";
import "./images/residentialSuite.jpg";
import "./images/singleRoom.jpg";
import "./images/suite.jpg";

//query selectors
let pageTitle = document.getElementById("pageTitle");
let totalCostInfo = document.getElementById("totalCostInfo");
let pastRoomsContainer = document.getElementById("pastRoomsContainer");
let bookRoomView = document.getElementById("bookRoomView");
let dashboardView = document.getElementById("dashboardView");
let bookNewRoomBtn = document.getElementById("bookNewRoomBtn");
let returnToDashBtn = document.getElementById("returnToDashBtn");
let findMyRoomBtn = document.getElementById("findMyRoomBtn");
let availableRoomsContainer = document.getElementById(
  "availableRoomsContainer"
);
let bookingFormContainer = document.getElementById("bookingFormContainer");
let bookingDateCalendar = document.getElementById("bookingDateCalendar");
let filterByTypeContainer = document.getElementById("filterByTypeContainer");
let calendarFindSection = document.getElementById("calendarFindSection");
let filterByTypeBtnSection = document.getElementById(
  "filter-by-type-button-section"
);
let bookRoomBtnSection = document.getElementById("bookRoomBtnSection");
let bookingSection = document.getElementById("bookingSection");
let bookRoomBtn = document.querySelector("book-room-button");
let emptyContainer = document.getElementById("emptyContainer");
let mainHeadingContainer = document.getElementById("mainHeadingContainer");
let logInPageView = document.getElementById("logInPageView");
let tempHeading = document.getElementById("tempHeading");
let loginForm = document.getElementById("login-form");
let loginButton = document.getElementById("login-form-submit");
let loginErrorMsg = document.getElementById("login-error-msg");
let startOverBtn = document.getElementById("startOverBtn");
let pageTitle1 = document.getElementById('pageTitle1')
let loginBody = document.getElementById('loginBody');

//variables
let customer,
  allRooms,
  booking,
  bookingRepository,
  allCustomers,
  hotel,
  roomNum,
  customerPassword,
  customerUsername;

//event listeners

window.onload = startUp();
window.addEventListener("click", renderBookRoomView);
window.addEventListener("click", returnToDashboard);
findMyRoomBtn.addEventListener("click", () =>
  domUpdates.generateRoomOptions(event, date, hotel, customer)
);
filterByTypeBtnSection.addEventListener("click", () =>
  domUpdates.generateRoomsByType(event, hotel)
);
availableRoomsContainer.addEventListener("click", () => bookRoom(event));
loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  logInUser();
});
window.addEventListener("click", (event) => {
  if (event.target.id === "startOverBtn") {
    domUpdates.renderBookingViewAgain();
  } else {
    event.preventDefault();
  }
});

function logInUser() {
  let customerID = determineUsername();
  customerUsername = loginForm.username.value;
  customerPassword = loginForm.password.value;

  if (
    customerUsername === `customer${customerID}` &&
    customerPassword === "overlook2021"
  ) {
    loginErrorMsg.innerHTML = "";
    loginErrorMsg.innerHTML = `<p id="login-error-msg">You have successfully logged in.</p>`;
    loginErrorMsg.style.opacity = 1;
    domUpdates.hide(logInPageView);
    domUpdates.show(dashboardView);
    domUpdates.hide(tempHeading);
    domUpdates.show(mainHeadingContainer);
    apiCalls.fetchOneCustomer(customerID);
    getCustomerFromLogIn(customerID);
  } else {
    loginErrorMsg.style.opacity = 1;
  }
}

function determineUsername() {
  customerUsername = loginForm.username.value;
  let stringID;
  let customerID;

  if (customerUsername.length === 9) {
    stringID = customerUsername.slice(-1);
    customerID = parseInt(stringID);
  } else {
    stringID = customerUsername.slice(-2);
    customerID = parseInt(stringID);
  }

  let foundCustomer = allCustomers.find(
    (customer) => customer.id === customerID
  );
  if (foundCustomer) {
    return customerID;
  } else {
    loginErrorMsg.style.opacity = 1;
  }
}




export function startUp() {
  
  apiCalls.retrieveData().then((promise) => {
    const bookingsInstances = makeBookingInstances(promise[1]);

    bookingRepository = new BookingsRepository(bookingsInstances);
    allCustomers = makeCustomerInstances(promise[0]);
    allRooms = makeRoomsInstances(promise[2]);
    makeHotel(bookingRepository, allRooms);
  });
}

function getCustomerFromLogIn(customerID) {
  apiCalls.retrieveOneCustomerData(customerID).then((promise) => {
    makeOneCustomer(promise[0]);
    domUpdates.getAllDataToDom(customer, bookingRepository, allRooms, hotel);
  });
}

const makeBookingInstances = (apiBookingsData) => {
  const newBookings = apiBookingsData.bookings.map((booking) => {
    return new Booking(booking);
  });
  return newBookings;
};

const makeCustomerInstances = (apiCustomersData) => {
  const newCustomers = apiCustomersData.customers.map((customer) => {
    return new Customer(customer);
  });
  return newCustomers;
};

const makeRoomsInstances = (apiRoomsData) => {
  const newRooms = apiRoomsData.rooms.map((room) => {
    return new Room(room);
  });

  return newRooms;
};

function makeOneCustomer(apiCustomerData) {
  customer = new Customer(apiCustomerData);
}

function makeHotel(apiBookingsData, apiRoomsData) {
  hotel = new Hotel(apiBookingsData, apiRoomsData);
}

function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

function renderBookRoomView(event) {
  let eventTarget = event.target.closest(".book-new-room-btn");

  if (eventTarget) {
    hide(dashboardView);
    hide(bookNewRoomBtn);
    show(bookRoomView);
    show(returnToDashBtn);
  }
}

function returnToDashboard(event) {
  let eventTarget = event.target.closest(".return-to-dashboard");

  if (eventTarget) {
    hide(bookRoomView);
    hide(returnToDashBtn);
    show(dashboardView);
    show(bookNewRoomBtn);
    domUpdates.renderPastandFutureBookings(
      customer,
      bookingRepository,
      allRooms
    );
  }
}

function bookRoom(event) {
  if (event.target.classList.contains("book-room-button")) {
    let roomNum = parseInt(event.target.id);
    let date = dayjs(bookingDateCalendar.value).format("YYYY/MM/DD");
    let customerBooking = customer;
    apiCalls.bookNewRoom(customerBooking.id, date, roomNum);
  } else {
    event.preventDefault();
  }
}




///Use this code to run the page with a randomizer and 

// window.onload = startUp();


// function startUp () {
//   apiCalls.retrieveData()
//     .then((promise) => {
//       const bookingsRepo = makeBookingInstances(promise[1]);
//       allBookings = new BookingsRepository(bookingsRepo);
//       allCustomers = makeCustomerInstances(promise[0]);
//       allRooms = makeRoomsInstances(promise[2])
//       makeOneCustomer(promise[3])
//       console.log("oneCust", customer)
//       console.log("allRooms", allRooms)
//       console.log("allBookings", allBookings)
//       console.log("allCust", allCustomers)
//       // domUpdates.updateWelcomeMessage(allCustomers);
//       // domUpdates.renderPastBookings(allBookings, allCustomers)
//     })
// }

// function makeOneCustomer(apiCustomerData) {
//   // let randomNumber = Math.floor(Math.random() * apiCustomerData.customers.length);
//   customer = new Customer(apiCustomerData);

// }
