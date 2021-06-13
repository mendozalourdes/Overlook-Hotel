class BookingsRepository {
    constructor(bookings) {
        this.bookings = bookings
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