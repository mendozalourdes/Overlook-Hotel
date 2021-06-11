import chai from 'chai';
const expect = chai.expect;
import BookingsRepository from '../src/bookingsRepository'
import testBookings from './test-data-bookings';
import Booking from '../src/booking'
// import testRooms from './test-data-rooms.js'
// import testCustomers from './test-data-customers.js'

describe('Booking', () => {
    let booking1, booking2, booking3, booking4;
  
    beforeEach(() => {

      booking1 = new Booking(testBookings.bookings[0]);
      booking2 = new Booking(testBookings.bookings[1]);
      booking3 = new Booking(testBookings.bookings[2]);
      booking4 = new Booking(testBookings.bookings[3]);
      // console.log(bookings)

    });
  
    it('Should be a function', () => {
      expect(Booking).to.be.a('function');
    });

    it('should have a booking id', () => {
        expect(booking1.id).to.equal(testBookings.bookings[0].id);
        expect(booking2.id).to.equal(testBookings.bookings[1].id);
        expect(booking3.id).to.equal(testBookings.bookings[2].id);
        expect(booking4.id).to.equal(testBookings.bookings[3].id);
      });
    
      it('should have a user ID per booking', () => {
        expect(booking1.userID).to.equal(testBookings.bookings[0].userID);
        expect(booking2.userID).to.equal(testBookings.bookings[1].userID);
        expect(booking3.userID).to.equal(testBookings.bookings[2].userID);
        expect(booking4.userID).to.equal(testBookings.bookings[3].userID);
      });
    
      it('should have a date per booking', () => {
        expect(booking1.date).to.equal(testBookings.bookings[0].date);
        expect(booking2.date).to.equal(testBookings.bookings[1].date);
        expect(booking3.date).to.equal(testBookings.bookings[2].date);
        expect(booking4.date).to.equal(testBookings.bookings[3].date);
      });

      it('should have a room number per booking', () => {
        expect(booking1.roomNumber).to.equal(testBookings.bookings[0].roomNumber);
        expect(booking2.roomNumber).to.equal(testBookings.bookings[1].roomNumber);
        expect(booking3.roomNumber).to.equal(testBookings.bookings[2].roomNumber);
        expect(booking4.roomNumber).to.equal(testBookings.bookings[3].roomNumber);
      });

      it('should have a place to hold room service charges', () => {
        expect(booking1.roomServiceCharges).to.equal(testBookings.bookings[0].roomServiceCharges);
        expect(booking2.roomServiceCharges).to.equal(testBookings.bookings[1].roomServiceCharges);
        expect(booking3.roomServiceCharges).to.equal(testBookings.bookings[2].roomServiceCharges);
        expect(booking4.roomServiceCharges).to.equal(testBookings.bookings[3].roomServiceCharges);
      });



});
