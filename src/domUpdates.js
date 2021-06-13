let domUpdates = {

    getAllDataToDom(customer, bookingRepository, allRooms, hotel) {
        domUpdates.updateWelcomeMessage(customer)
        domUpdates.updateLifeCostInfo(customer, bookingRepository, allRooms)
        domUpdates.renderPastandFutureBookings(customer, bookingRepository, allRooms)
        // domUpdates.generateRoomOptions(event, date, hotel)
    },

    updateWelcomeMessage(customer) {
        let firstName = customer.name.split(' ')[0]
        pageTitle.innerHTML = `Welcome to Overlook Hotel, ${firstName}!`;

     },
    
     updateLifeCostInfo(customer, bookingRepository, allRooms) {
         
        //  console.log("bookingsRepoo22222", bookingRepository)
        let findBookings = customer.findAllBookings(bookingRepository, allRooms)
        // console.log("findBookingssssss", findBookings)
        let costResult = customer.getLifetimeBookingCost(bookingRepository, allRooms);
        // console.log("costResult", costResult)
        totalCostInfo.innerHTML =  `Lifetime Cost: $${costResult}`;

     },

    renderPastandFutureBookings(customer, bookingRepository, allRooms) {

        let myBookings = customer.findAllBookings(bookingRepository, allRooms)
        // console.log("myBookings", myBookings)
        pastRoomsContainer.innerHTML = '';

        // console.log("mybookingssss", myBookings)
        myBookings.forEach((booking, i) => {
            // console.log("booking", booking)
                pastRoomsContainer.innerHTML += 
                `
                <section class="past-bookings-info" id="pastBookingsInfo">
                <h1 class="past-room-reservations-header"> Past Reservation ${i + 1}: </h1>
                <p class="room-number" id="roomNumber">Room Number: ${booking.roomNumber} </p>
                <p class="date" id="date">Date: ${booking.date} </p>
                <p class="room-type" id="roomType">Room Type: ${booking.roomType}</p>
                <p class="bed-size" id="bedSize">Bed Size: ${booking.bedSize} & Number of Beds: ${booking.numBeds}  </p>
                <p class="cost-per-night" id="costPerNight">Cost Per Night: $${booking.costPerNight} </p>
                <p class="bidet" id="bidet">Did it have a bidet?:   ${booking.bidet} </p>
              </section>
              `

                //   pastRoomsContainer.insertAdjacentHTML('beforeend', cardHtml);
        })

    },

    generateRoomOptions(event, date, hotel) {
        let eventTarget = event.target.closest('.find-my-room-btn')
         date = "2020/02/14"
         console.log("date", date)
         console.log("testDate", hotel.bookings.bookings[0].date)
         console.log("hotelTESTING", hotel)
        if(eventTarget) {
            let getDates = hotel.getAvailableRoomByDate(date)
            console.log("getDates", getDates)
        }

    },





}



export default domUpdates;