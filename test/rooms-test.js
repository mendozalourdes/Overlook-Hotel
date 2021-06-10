import chai from 'chai';
const expect = chai.expect;
import Room from '../src/rooms'
import testRooms from './test-data-rooms.js'

describe('Rooms', () => {
    let room1, room2, room3, room4;
  
    beforeEach(() => {

      room1 = new Room(testRooms.rooms[0]);
      room2 = new Room(testRooms.rooms[1]);
      room3 = new Room(testRooms.rooms[2]);
      room4 = new Room(testRooms.rooms[3]);
        // console.log("test", room1)
    });
  
    it('Should be a function', () => {
      expect(Room).to.be.a('function');
    });

    it('should have a number', () => {
        expect(room1.number).to.equal(1);
        expect(room2.number).to.equal(2);
        expect(room3.number).to.equal(3);
        expect(room4.number).to.equal(4);
      });
    
      it('should have a room type', () => {
        expect(room1.roomType).to.equal("residential suite");
        expect(room2.roomType).to.equal("suite");
        expect(room3.roomType).to.equal("single room");
        expect(room4.roomType).to.equal("junior suite");
      });
    
        
      it('should determine whether or not a room has a bidet', () => {
        expect(room1.bidet).to.equal(true);
        expect(room2.bidet).to.equal(false);
        expect(room3.bidet).to.equal(false);
        expect(room4.bidet).to.equal(false);
      }); 

      it('should determine a room bed size', () => {
        expect(room1.bedSize).to.equal("queen");
        expect(room2.bedSize).to.equal("full");
        expect(room3.bedSize).to.equal("king");
        expect(room4.bedSize).to.equal("queen");
      }); 

      it('should determine number of beds', () => {
        expect(room1.numBeds).to.equal(1);
        expect(room2.numBeds).to.equal(2);
        expect(room3.numBeds).to.equal(1);
        expect(room4.numBeds).to.equal(1);
      }); 

      it('should determine cost per night', () => {
        expect(room1.costPerNight).to.equal(358.4);
        expect(room2.costPerNight).to.equal(477.38);
        expect(room3.costPerNight).to.equal(491.14);
        expect(room4.costPerNight).to.equal(429.44);
      }); 

      it('should default to not being available', () => {
        expect(room1.isAvailable).to.equal(false);
        expect(room2.isAvailable).to.equal(false);
        expect(room3.isAvailable).to.equal(false);
        expect(room4.isAvailable).to.equal(false);
      }); 

});
