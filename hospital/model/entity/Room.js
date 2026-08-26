/**
 * Entity: Room
 * Maps to the `rooms` table.
 */
export default class Room {
  constructor({
    roomId       = null,
    roomNumber   = '',
    roomType     = '',    // 'general'|'semi-private'|'private'|'icu'|'operation'
    departmentId = null,
    capacity     = 1,
    occupied     = 0,
    pricePerDay  = 0,
    isAvailable  = true,
    floorNumber  = null,
    createdAt    = null,
  } = {}) {
    this.roomId       = roomId;
    this.roomNumber   = roomNumber;
    this.roomType     = roomType;
    this.departmentId = departmentId;
    this.capacity     = capacity;
    this.occupied     = occupied;
    this.pricePerDay  = pricePerDay;
    this.isAvailable  = isAvailable;
    this.floorNumber  = floorNumber;
    this.createdAt    = createdAt;
  }

  get availableBeds() {
    return this.capacity - this.occupied;
  }
}
