class Hotel {
    constructor(allBookings, allRooms) {
        this.allBookings = allBookings
        this.allRooms = allRooms, 
        this.availableRoomsByDate;
    }

    getAvailableRoomByDate(date) {
        let findRoomByDate = this.allBookings.bookings.reduce((acc, booking) => {
            if(date !== booking.date) {
                acc.push(booking.roomNumber)
            }
           return acc 
        }, [])
    
        const findRooms = this.allRooms.rooms.reduce((acc, room) => {        
            findRoomByDate.forEach(number => {
                if(number === room.number) {
                    acc.push(room)
                }
            })
        return acc
        }, [])
            if(!findRooms) {
                return 'We are terribly sorry, but there are no rooms available given your requests.'
        }   else if (findRooms) {
            this.availableRoomsByDate = findRooms
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