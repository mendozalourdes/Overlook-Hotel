import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/customer'
import testCustomers from './test-data-customers'

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

});
