class Customer {
    constructor(customer) {
        this.id = customer.id, 
        this.name = customer.name,
        this.allBookings = [],
        this.bookedRoom = false;
    }
}

export default Customer;
