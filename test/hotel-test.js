import chai from 'chai';
const expect = chai.expect;
import BookingsRepository from '../src/bookingsRepository'
import testBookings from './test-data-bookings';
import Booking from '../src/booking'
import testRooms from './test-data-rooms.js'
import testCustomers from './test-data-customers.js'
import Rooms from '../src/rooms'
import Customer from '../src/customer'
import Hotel from '../src/hotel'



describe('Hotel', () => {
    let hotel, customer1, customer2;
  
    beforeEach(() => {

     hotel = new Hotel (testBookings, testRooms)
     customer1 = new Customer(testCustomers.customers[0])
     customer2 = new Customer(testCustomers.customers[1])

    });
  
    it('Should be a function', () => {
      expect(Hotel).to.be.a('function');
    });

    it('should hold all bookings data ', () => {
        expect(hotel.bookings).to.equal(testBookings);
      });
    

    it('should hold all rooms data ', () => {
        expect(hotel.rooms).to.equal(testRooms);
      });

    it('should be able to determine room availability by date', () => {

    const checkAvailable1 = hotel.getAvailableRoomByDate("2020/02/14")
    // console.log("checkAvail", checkAvailable1)
    const availableRooms = [testRooms[0], testRooms[1], testRooms[2], testRooms[3], testRooms[4], testRooms[6], testRooms[7], testRooms[8], testRooms[9]]
    // console.log("answer", availableRooms)
    expect(checkAvailable1).to.deep.equal(availableRooms);
    
    }); 

    it('should be able to determine room availability by type', () => {

        const checkAvailable1 = hotel.getAvailableRoomByDate("2020/02/14")
        // console.log("checkAvail", checkAvailable1)
        const availableRooms = [testRooms[0], testRooms[1], testRooms[2], testRooms[3], testRooms[4], testRooms[6], testRooms[7], testRooms[8], testRooms[9]]
        // console.log("answer", availableRooms)
        const byType = hotel.getAvailableRoomType("junior suite");
        // console.log("answer", byType)
        const answer = [
          {
            number: 4,
            roomType: 'junior suite',
            bidet: false,
            bedSize: 'queen',
            numBeds: 1,
            costPerNight: 429.44
          },
          {
            number: 10,
            roomType: 'junior suite',
            bidet: true,
            bedSize: 'queen',
            numBeds: 2,
            costPerNight: 410.39
          }
        ]
        expect(byType).to.deep.equal(answer);
        
      }); 






});
