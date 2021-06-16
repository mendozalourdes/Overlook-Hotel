

let dayjs = require("dayjs");



let domUpdates = {
  confirmationInfo() {
    domUpdates.hide(bookRoomBtn);
    availableRoomsContainer.innerHTML = "";
    availableRoomsContainer.innerHTML += `
        <p class="congratulations-message" id="congratulationsMessage"> Congratulations on your new booking!</p>
        `;

    window.setTimeout(domUpdates.renderBookingViewAgain, 2000);
  },

  renderBookingViewAgain() {
    domUpdates.hide(filterByTypeContainer);
    domUpdates.show(calendarFindSection);
    domUpdates.hide(emptyContainer);
    availableRoomsContainer.innerHTML = "";
  },

  show(element) {
    element.classList.remove("hidden");
  },

  hide(element) {
    element.classList.add("hidden");
  },

  getAllDataToDom(customer, bookingRepository, allRooms, hotel) {
    domUpdates.updateWelcomeMessage(customer);
    domUpdates.updateLifeCostInfo(customer, bookingRepository, allRooms);
    domUpdates.renderPastandFutureBookings(
      customer,
      bookingRepository,
      allRooms
    );
  },

  updateWelcomeMessage(customer) {
    let firstName = customer.name.split(" ")[0];
    pageTitle.innerHTML = `Welcome to Overlook Hotel, ${firstName}!`;
  },

  updateLifeCostInfo(customer, bookingRepository, allRooms) {
    let findBookings = customer.findAllBookings(bookingRepository, allRooms);
    let costResult = customer.getLifetimeBookingCost(
      bookingRepository,
      allRooms
    );
    totalCostInfo.innerHTML = `Lifetime Cost: $${costResult}`;
  },

  renderPastandFutureBookings(customer, bookingRepository, allRooms) {
    let myBookings = customer.findAllBookings(bookingRepository, allRooms);

    pastRoomsContainer.innerHTML = "";

    myBookings.forEach((booking, i) => {
      pastRoomsContainer.innerHTML += `
                <section class="room-info-container room-details-info past-bookings-info room-cards" id="pastBookingsInfo">
                    <article class="image-section">
                  <article class="image-container">
                    <img class="residential-suite image" id="residentialSuiteImage" alt="residential-suite-room"
                      src="./images/residentialSuite.jpg">
                  </article>
                </article>
                <article class="text-section flex" id="textSection">
                  <h2 class="past-room-reservations-header"> Reservation ${
                    i + 1
                  }:</h2>
                  <article class="text-info-box flex">
                  <h1 class="room-type-name" id="roomTypeName">${
                    booking.roomType
                  } </h1>
                  <p class="room-number" id="roomNumber">Room Number: ${
                    booking.roomNumber
                  } </p>
                  <p class="date" id="date">Date: ${booking.date} </p>
                  <p class="bed-size" id="bedSize">Bed Size: ${
                    booking.bedSize
                  } & Number of Beds: ${booking.numBeds}  </p>
                  <p class="cost-per-night" id="costPerNight">Cost Per Night: $${
                    booking.costPerNight
                  } </p>
                  <p class="bidet" id="bidet">Did it have a bidet?:   ${
                    booking.bidet
                  } </p>
                  </article>
                </article>
              </section>
              `;
    });
  },

  generateRoomOptions(event, date, hotel, customer) {
    let eventTarget = event.target.closest(".find-my-room-btn");
    let currentDate = dayjs()
    let selectedDate;

     date = bookingDateCalendar.value
     let inputDate  = dayjs(date)

     if (inputDate.isAfter(currentDate)) {
       selectedDate = inputDate.format('YYYY/MM/DD')
    }  else {
      event.preventDefault();
       return alert("Please input a future date.")
    }

    availableRoomsContainer.innerHTML = "";
    let availableRooms;

    if (eventTarget) {
      availableRooms = hotel.getAvailableRoomByDate(selectedDate);
    }

    if (availableRooms.length > 0) {
      availableRooms.forEach((room) => {
        availableRoomsContainer.innerHTML += `
           <section class="available-room room-details-info ${room.number}" id="${room.number}" tabindex=0  role="button">
                  <h1 class="room-choice room-available-header" id="${room.number}"> Room Number ${room.number} </h1>
                  <p class="room-choice room-type" id="${room.number}">Room Type ${room.roomType} </p> 
                  <p class=" room-choice  bed-size" id="${room.number}">Bed Size: ${room.bedSize} & Number of Beds: ${room.numBeds} </p>
                  <p class="room-choice cost-per-night" id="${room.number}">Cost Per Night: $${room.costPerNight} </p>
                  <p class="room-choice bidet" id="bidet">Does it have a bidet?:  ${room.bidet} </p>
          </section>
  
           `;
      });

      domUpdates.show(filterByTypeContainer);
      domUpdates.hide(calendarFindSection);
    } else {
      availableRoomsContainer.innerHTML = `              
       <h1 class="apology-message"> We are so very sorry, but there are no rooms available given your criteria. Please try different options. </h1>
      `;
    }
  },

  generateRoomsByType(event, hotel) {
    let type;

    if (
      event.target.id === "residentialSuite" ||
      event.target.id === "juniorSuite" ||
      event.target.id === "suite" ||
      event.target.id === "singleRoom"
    ) {
      availableRoomsContainer.innerHTML = "";

      if (event.target.id === "residentialSuite") {
        type = "residential suite";
      } else if (event.target.id === "juniorSuite") {
        type = "junior suite";
      } else if (event.target.id === "suite") {
        type = "suite";
      } else if (event.target.id === "singleRoom") {
        type = "single room";
      }

      let getDates = hotel.getAvailableRoomByDate(date);
      let getRoomsByType = hotel.getAvailableRoomType(type);

      if (getRoomsByType.length > 0) {
        getRoomsByType.forEach((room) => {
          availableRoomsContainer.innerHTML += `
             <section class="available-room room-details-info ${room.number}" id="${room.number}" tabindex="0" role="button" >
                <div>
                    <h1 class="room-choice room-available-header" id="${room.number}"> Room Number ${room.number} </h1>
                    <p class="room-choice room-type" id="${room.number}">Room Type ${room.roomType} </p> 
                    <p class="room-choice bed-size" id="${room.number}">Bed Size: ${room.bedSize} & Number of Beds: ${room.numBeds} </p>
                    <p class="room-choice cost-per-night" id="${room.number}">Cost Per Night: $${room.costPerNight} </p>
                    <p class="room-choice bidet" id="bidet">Does it have a bidet?:  ${room.bidet} </p>
                </div>
                    <div class="book-room-button-section">
                        <button class="book-room-button button" id="${room.number}" type="button" name="button">Book This Room!</button>
                    </div>
             </section>
    
             `;
        });

        domUpdates.hide(filterByTypeContainer);
        domUpdates.hide(calendarFindSection);
        domUpdates.show(emptyContainer);
      } else {
        availableRoomsContainer.innerHTML = `              
       <h1 class="apology-message"> We are so very sorry, but there are no rooms available given your criteria. Please try different options. </h1>
      `;
      }
    } else {
      event.preventDefault();
    }
  },


  catchErrorMessage() {
      pageTitle1.innerText = 'Our servers are down, please try again later.'
  }, 


  bookingErrorMessage() {
    availableRoomsContainer.innerHTML = "";
    availableRoomsContainer.innerHTML += `
        <p class="error-message" id="errorMessage"> Sorry, that did not work. Please try again.</p>
        `;
  },
};



export default domUpdates;
