class Customer {
    constructor(customer) {
        this.id = customer.id, 
        this.name = customer.name,
        this.allBookings = [],
        this.bookedRoom = false;
        this.availableRoomsByDate;
    }

  
    findAllBookings(allBookings) {
    //    console.log(allBookings)
        const findBookings = allBookings.bookings.filter(booking => {
            // console.log("oneBOoking", booking)
            return booking.userID === this.id});
            // console.log("found", findBookings)
        this.allBookings = findBookings
        // console.log(this.allBookings)
            return this.allBookings
      }

    getLifetimeBookingCost(allBookings, rooms) {
        // console.log("rooms", rooms)
        const allPastBookings = this.findAllBookings(allBookings)
        // console.log("alllll", allPastBookings)
        const getCost = allPastBookings.reduce((total, booking) => {
            rooms.forEach(room => {
                if(booking.roomNumber === room.number) {
                    total+=room.costPerNight
                }
            })

       return total
        }, 0)

            // console.log("toFixed", Number.parseFloat(getCost).toFixed(2))
        return Number(getCost.toFixed(2))
    }
    // Number(x.toFixed(2));

}

export default Customer;
