class Customer {
    constructor(customer) {
        this.id = customer.id, 
        this.name = customer.name,
        this.allBookings = [],
        this.bookedRoom = false;
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
        const allPastBookings = this.findAllBookings(allBookings)
        // console.log("alllll", allPastBookings)
        const getCost = allPastBookings.reduce((total, booking) => {
            rooms.rooms.forEach(room => {
                if(booking.roomNumber === room.number) {
                    total+=room.costPerNight
                }
            })

       return total
        }, 0)

        return getCost
    }

   getAvailableRoomByDate(date, allBookings, allRooms) {
    let findRoomByDate = allBookings.bookings.reduce((acc, booking) => {
        if(date !== booking.date) {
            acc.push(booking.roomNumber)
        }

       return acc 
    }, [])

    // console.log("find", findRoomByDate)

    const findRooms = allRooms.rooms.reduce((acc, room) => {
        
        findRoomByDate.forEach(number => {
            if(number === room.number) {
                acc.push(room)
            }
        })

    return acc
    }, [])
        //  console.log("2", findRooms)
    // console.log("availableRooms", availableRooms)

    return findRooms
   }


   getAvailableRoomByProperty(property,  ) {
       
   }


}

export default Customer;
