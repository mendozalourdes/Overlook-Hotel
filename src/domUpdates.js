let dayjs = require("dayjs");

let modal = document.getElementById("myModal");

let domUpdates = {
  confirmationInfo() {
    domUpdates.hide(bookRoomBtn);
    availableRoomsContainer.innerHTML = "";
    availableRoomsContainer.innerHTML += `
        <p class="congratulations-message" id="congratulationsMessage"> Congratulations on your new booking!</p>
        `;
  },

  bookingErrorMessage() {
    availableRoomsContainer.innerHTML = "";
    availableRoomsContainer.innerHTML += `
        <p class="error-message" id="errorMessage"> Sorry, that did not work. Please try again.</p>
        `;
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
    // domUpdates.generateRoomOptions(event, date, hotel)
  },

  updateWelcomeMessage(customer) {
    let firstName = customer.name.split(" ")[0];
    pageTitle.innerHTML = `Welcome to Overlook Hotel, ${firstName}!`;
  },

  updateLifeCostInfo(customer, bookingRepository, allRooms) {
    //  console.log("bookingsRepoo22222", bookingRepository)
    let findBookings = customer.findAllBookings(bookingRepository, allRooms);
    // console.log("findBookingssssss", findBookings)
    let costResult = customer.getLifetimeBookingCost(
      bookingRepository,
      allRooms
    );
    // console.log("costResult", costResult)
    totalCostInfo.innerHTML = `Lifetime Cost: $${costResult}`;
  },

  renderPastandFutureBookings(customer, bookingRepository, allRooms) {
    let myBookings = customer.findAllBookings(bookingRepository, allRooms);
    // console.log("myBookings", myBookings)
    pastRoomsContainer.innerHTML = "";

    // console.log("mybookingssss", myBookings)
    myBookings.forEach((booking, i) => {
      // console.log("booking", booking)
      pastRoomsContainer.innerHTML += `
                <section class="room-info-container past-bookings-info room-cards" id="pastBookingsInfo">
                    <article class="image-section">
                  <article class="image-container">
                    <img class="residential-suite image" id="residentialSuiteImage" alt="residential-suite-room"
                      src="./images/residentialSuite.jpg">
                  </article>
                </article>
                <article class="text-section flex" id="textSection">
                  <h2 class="past-room-reservations-header"> Past Reservation ${
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
    // console.log("hotelTest", hotel);
    console.log("testCustomer", customer);
    let eventTarget = event.target.closest(".find-my-room-btn");

    date = dayjs(bookingDateCalendar.value).format("YYYY/MM/DD");

    // console.log("date", date)
    // let availableRoomsContainer = document.getElementById('availableRoomsContainer');
    availableRoomsContainer.innerHTML = "";
    let availableRooms;

    if (eventTarget) {
      availableRooms = hotel.getAvailableRoomByDate(date);
      // console.log("available", availableRooms)
    }
    availableRooms.forEach((room) => {
      availableRoomsContainer.innerHTML += `
         <section class="available-room ${room.number}" id="${room.number}" tabindex=0  role="button">
                <h1 class="room-available-header" id="${room.number}"> Room Number ${room.number} </h1>
                <p class="room-type" id="${room.number}">Room Type ${room.roomType} </p> 
                <p class="bed-size" id="${room.number}">Bed Size: ${room.bedSize} & Number of Beds: ${room.numBeds} </p>
                <p class="cost-per-night" id="${room.number}">Cost Per Night: $${room.costPerNight} </p>
                <p class="bidet" id="bidet">Does it have a bidet?:  ${room.bidet} </p>
        </section>

         `;
    });

    domUpdates.show(filterByTypeContainer);
    domUpdates.hide(calendarFindSection);
  },

  generateRoomsByType(event, hotel) {
    // let availableRoomsContainer = document.getElementById('availableRoomsContainer');
    availableRoomsContainer.innerHTML = "";

    let type;

    // let eventTarget = event.target.closest('.filter-by-type-button-section');
    console.log("testEvent", event.target);
    

    if (event.target.id === "residentialSuite") {
      type = "residential suite";
    } else if (event.target.id === "juniorSuite") {
      type = "junior suite";
    } else if (event.target.id === "suite") {
      type = "suite";
    } else if (event.target.id === "singleRoom") {
      type = "single room";
    }
    console.log("typeee", type);

    let getDates = hotel.getAvailableRoomByDate(date);
    console.log("getDates", getDates);
    let getRoomsByType = hotel.getAvailableRoomType(type);
    console.log("getTypes", getRoomsByType);
 
    getRoomsByType.forEach((room) => {
      availableRoomsContainer.innerHTML += `
         <section class="room-choice available-room ${room.number}" id="${room.number}" tabindex="0" role="button" >
                <h1 class="room-choice room-available-header" id="${room.number}"> Room Number ${room.number} </h1>
                <p class="room-choice room-type" id="${room.number}">Room Type ${room.roomType} </p> 
                <p class="room-choice bed-size" id="${room.number}">Bed Size: ${room.bedSize} & Number of Beds: ${room.numBeds} </p>
                <p class="room-choice cost-per-night" id="${room.number}">Cost Per Night: $${room.costPerNight} </p>
                <p class="room-choice bidet" id="bidet">Does it have a bidet?:  ${room.bidet} </p>
         </section>

         `;
    });

    domUpdates.hide(filterByTypeContainer);
    domUpdates.hide(calendarFindSection);
    domUpdates.show(emptyContainer)
    // domUpdates.show(bookRoomBtnSection);
  },

  chooseRoom(event, allRooms, customer) {
    if (event.target.classList.contains("room-choice")) {
      let chosenRoomNumber = parseInt(event.target.id);

      availableRoomsContainer.innerHTML = "";
      let chosenRoom = allRooms.find(
        (room) => room.number === chosenRoomNumber
      );
      // console.log("findRoom", chosenRoom)

      availableRoomsContainer.innerHTML += `
        <div class="book-room-button-section " id="${chosenRoom.number}">
            <button class="book-room-button button" id="${chosenRoom.number}" type="button" name="button">Book This Room!</button>
        </div>
        <section class=" room-choice available-room-choice ${chosenRoom.number}" id="${chosenRoom.number}">
               <h1 class="room-choice room-available-header" id="${chosenRoom.number}"> Room Number ${chosenRoom.number} </h1>
               <p class="room-choice room-type" id="${chosenRoom.number}">Room Type ${chosenRoom.roomType} </p> 
               <p class="room-choice bed-size" id="${chosenRoom.number}">Bed Size: ${chosenRoom.bedSize} & Number of Beds: ${chosenRoom.numBeds} </p>
               <p class="room-choice cost-per-night" id="${chosenRoom.number}">Cost Per Night: $${chosenRoom.costPerNight} </p>
               <p class="room-choice bidet" id="bidet">Does it have a bidet?:  ${chosenRoom.bidet} </p>
        </section>

        `;
    }
  },
};

export default domUpdates;
