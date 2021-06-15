class Customer {
    constructor(customer) {
        this.id = customer.id, 
        this.name = customer.name,
        this.allBookings = [],
        this.bookedRoom = false;
        this.availableRoomsByDate;
        // this.username = `customer${customer.id}`
    }

  
    findAllBookings(allBookings, rooms) {
    //    console.log(allBookings)
        const findBookings = allBookings.bookings.filter(booking => {
            // console.log("oneBOoking", booking)
            return booking.userID === this.id});

            // console.log("found", findBookings)
            let updatedBookings = []
           let updateBookingsInfo = findBookings.forEach(booking => {

                rooms.forEach(room => {

                    if(booking.roomNumber === room.number) {
                        booking.roomType = room.roomType
                        booking.costPerNight = room.costPerNight
                        booking.bedSize = room.bedSize
                        booking.bidet = room.bidet
                        booking.numBeds = room.numBeds
                    }

                    updatedBookings.push(booking)
                    // console.log("booking", booking)
                    // return booking
                })

            })

            // console.log("updateBOoking", updatedBookings)


        this.allBookings = findBookings
        // console.log(this.allBookings)
            return this.allBookings



      }

    getLifetimeBookingCost(allBookings, rooms) {
        // console.log("rooms", rooms)
        const allPastBookings = this.findAllBookings(allBookings, rooms)
        // console.log("alllll", allPastBookings)
        const getCost = allPastBookings.reduce((total, booking) => {
            rooms.forEach(room => {
                if(booking.roomNumber === room.number) {
       
                    total+=room.costPerNight
                }

                // console.log("booking", booking)
            })

       return total
        }, 0)
        return Number(getCost.toFixed(2))
    }
    // Number(x.toFixed(2));

}

export default Customer;
