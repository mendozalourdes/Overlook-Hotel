class Hotel {
    constructor(allBookings, allRooms) {
        this.bookings = allBookings,
        this.rooms = allRooms, 
        this.availableRoomsByDate;
    }

    getAvailableRoomByDate(date) {
       const findDateMatches = this.bookings.bookings.reduce((acc, booking) => {

            if (date === booking.date & !acc.includes(booking.roomNumber)) {
                acc.push(booking.roomNumber)
            }

            return acc
        }, [])
        // console.log("findDateMatches", findDateMatches)
        // console.log("rooooooms", this.rooms)

        const findRoomsAvailableDate = this.rooms.filter(room => {

            if(!findDateMatches.includes(room.number)) {
                return room
            }

        })
        console.log("findAvail", findRoomsAvailableDate)

        if(!findRoomsAvailableDate) {
            return 'We are terribly sorry, but there are no rooms available given your requests.'
    }   else if (findRoomsAvailableDate) {
        this.availableRoomsByDate = findRoomsAvailableDate
        return this.availableRoomsByDate
    }
        
       }

       getAvailableRoomType(roomType) {
        let availableRooms = this.availableRoomsByDate
        const findByRoomType = availableRooms.filter(room => roomType === room.roomType)
    
        if(!findByRoomType) {
            return 'We are terribly sorry, but there are no rooms available given your requests.'
        } else if (findByRoomType) {
            return findByRoomType
        }
    
       }



}

export default Hotel;