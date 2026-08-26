package com.hospital.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Room — maps to the `rooms` table.
 *
 * DB column      → Java field
 * room_id        → roomId
 * room_number    → roomNumber
 * room_type      → roomType      ('general'|'semi-private'|'private'|'icu'|'operation')
 * department_id  → departmentId
 * capacity       → capacity
 * occupied       → occupied
 * price_per_day  → pricePerDay
 * is_available   → isAvailable
 * floor_number   → floorNumber
 * created_at     → createdAt
 */
public class Room {

    private int        roomId;
    private String     roomNumber;
    private String     roomType;
    private int        departmentId;
    private int        capacity;
    private int        occupied;
    private BigDecimal pricePerDay;
    private boolean    isAvailable;
    private Integer    floorNumber;
    private Timestamp  createdAt;

    public Room() {}

    public Room(int roomId, String roomNumber, String roomType, int departmentId,
                int capacity, int occupied, BigDecimal pricePerDay, boolean isAvailable,
                Integer floorNumber, Timestamp createdAt) {
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

    public int        getRoomId()       { return roomId;       }
    public String     getRoomNumber()   { return roomNumber;   }
    public String     getRoomType()     { return roomType;     }
    public int        getDepartmentId() { return departmentId; }
    public int        getCapacity()     { return capacity;     }
    public int        getOccupied()     { return occupied;     }
    public BigDecimal getPricePerDay()  { return pricePerDay;  }
    public boolean    isAvailable()     { return isAvailable;  }
    public Integer    getFloorNumber()  { return floorNumber;  }
    public Timestamp  getCreatedAt()    { return createdAt;    }

    public void setRoomId(int roomId)              { this.roomId       = roomId;       }
    public void setRoomNumber(String roomNumber)   { this.roomNumber   = roomNumber;   }
    public void setRoomType(String roomType)       { this.roomType     = roomType;     }
    public void setDepartmentId(int departmentId)  { this.departmentId = departmentId; }
    public void setCapacity(int capacity)          { this.capacity     = capacity;     }
    public void setOccupied(int occupied)          { this.occupied     = occupied;     }
    public void setPricePerDay(BigDecimal price)   { this.pricePerDay  = price;        }
    public void setAvailable(boolean available)    { this.isAvailable  = available;    }
    public void setFloorNumber(Integer floorNumber){ this.floorNumber  = floorNumber;  }
    public void setCreatedAt(Timestamp createdAt)  { this.createdAt    = createdAt;    }

    @Override
    public String toString() {
        return "Room{roomId=" + roomId + ", roomNumber='" + roomNumber + "', type='" + roomType + "'}";
    }
}
