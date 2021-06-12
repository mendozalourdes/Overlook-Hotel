import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/customer'
import testCustomers from './test-data-customers'
import testBookings from './test-data-bookings.js';
import testRooms from './test-data-rooms.js'

describe('Customer', () => {
    let customer1, customer2, customer3;
  
    beforeEach(() => {

      customer1 = new Customer(testCustomers.customers[0]);
      customer2 = new Customer(testCustomers.customers[1]);
      customer3 = new Customer(testCustomers.customers[2]);
  
    });
  
    it('Should be a function', () => {
      expect(Customer).to.be.a('function');
    });

    it('should have a customer ID', () => {
        expect(customer1.id).to.equal(1);
        expect(customer2.id).to.equal(2);
        expect(customer3.id).to.equal(3);
      });
    
      it('should have a customer name', () => {
        expect(customer1.name).to.equal("Leatha Ullrich");
        expect(customer2.name).to.equal("Rocio Schuster");
        expect(customer3.name).to.equal("Kelvin Schiller");
      });
    
      it('should default to having zero bookings', () => {
        expect(customer1.allBookings).to.deep.equal([]);
        expect(customer2.allBookings).to.deep.equal([]);
        expect(customer3.allBookings).to.deep.equal([]);
      }); 

      it('should default to having no current booked room', () => {
        expect(customer1.bookedRoom).to.equal(false);
        expect(customer2.bookedRoom).to.equal(false);
        expect(customer3.bookedRoom).to.equal(false);
      }); 


      it('should be able to find all bookings', () => {
       let findBookings =  customer1.findAllBookings(testBookings);
       let findBookings2 = customer2.findAllBookings(testBookings);
        let findBookings3 = customer3.findAllBookings(testBookings);
        expect(findBookings).to.deep.equal([testBookings.bookings[0], testBookings.bookings[3], testBookings.bookings[6], testBookings.bookings[9]])
        expect(findBookings2).to.deep.equal([testBookings.bookings[1], testBookings.bookings[4], testBookings.bookings[7]])
        expect(findBookings3).to.deep.equal([testBookings.bookings[2], testBookings.bookings[5], testBookings.bookings[8]])

      })

      it('should be able to determine lifetime cost', () => {
        let findLifetimeCost1 =  customer1.getLifetimeBookingCost(testBookings, testRooms);
        let findLifetimeCost2 = customer2.getLifetimeBookingCost(testBookings, testRooms);
        let findLifetimeCost3 = customer3.getLifetimeBookingCost(testBookings, testRooms);
         // console.log("find", findBookings)
         expect(findLifetimeCost1).to.deep.equal(1429.69);
         expect(findLifetimeCost2).to.deep.equal(1078.81);
         expect(findLifetimeCost3).to.deep.equal(1088.55);
     
       })


});
