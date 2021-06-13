import chai from 'chai';
const expect = chai.expect;
import BookingsRepository from '../src/bookingsRepository'
import testBookings from './test-data-bookings.js';
// import testRooms from './test-data-rooms.js'
// import testCustomers from './test-data-customers.js'

describe('Bookings Repository', () => {
    let bookingsRepository;
  
    beforeEach(() => {

      bookingsRepository = new BookingsRepository(testBookings);
      // console.log(bookings)

    });
  
    it('Should be a function', () => {
      expect(BookingsRepository).to.be.a('function');
    });

    it('should hold all of the information for every booking', () => {
        expect(bookingsRepository.bookings).to.equal(testBookings);
    
      });


      it('should be able to make a new booking', () => {

        const newBooking = bookingsRepository.makeNewBooking(1, "2020/06/13", 1);
        // console.log("newBook", newBooking)
        let answer = {
          "userID": 1, 
          "date": "2020/06/13", 
          "roomNumber": 1
      }
      expect(newBooking).to.deep.equal(answer);
      }); 
    
    
});
