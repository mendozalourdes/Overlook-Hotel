import chai from 'chai';
const expect = chai.expect;
import Bookings from '../src/bookingsRepository'
import testBookings from './test-data-bookings.js';
// import testRooms from './test-data-rooms.js'
// import testCustomers from './test-data-customers.js'

describe('Bookings', () => {
    let bookingsRepository;
  
    beforeEach(() => {

      bookingsRepository = new Bookings(testBookings.bookings);
      // console.log(bookings)

    });
  
    it('Should be a function', () => {
      expect(Bookings).to.be.a('function');
    });

    it('should hold all of the information for every booking', () => {
        expect(bookingsRepository.allBookings).to.equal(testBookings.bookings);
    
      });
    

});
