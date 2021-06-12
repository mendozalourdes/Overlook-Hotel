let domUpdates = {

    updateWelcomeMessage(customer) {
        let firstName = customer.name.split(' ')[0]
        pageTitle.innerHTML = `Welcome to Overlook Hotel, ${firstName}!`;

     },
    
     updateLifeCostInfo(customer, bookingRepository, allRooms) {
         console.log("bookingsRepoo22222", bookingRepository)
        let findBookings = customer.findAllBookings(bookingRepository)
        console.log("findBookingssssss", findBookings)
        let costResult = customer.getLifetimeBookingCost(bookingRepository, allRooms);
        console.log("costResult", costResult)
        // lifetimeCostInfo.innerText = 

     }






}



export default domUpdates;