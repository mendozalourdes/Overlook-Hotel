class BookingsRepository {
    constructor(allBookings) {
        this.allBookings = allBookings
    }


        
    makeNewBooking(userID, date, roomNumber) {
        
        return {
            "userID": userID, 
            "date": date, 
            "roomNumber": roomNumber
        }

    }



}

export default BookingsRepository;