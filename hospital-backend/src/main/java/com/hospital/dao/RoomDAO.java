package com.hospital.dao;

import com.hospital.model.Room;
import java.util.List;

public interface RoomDAO {
    List<Room> getAll();
    Room getById(int id);
    int  insert(Room room);
    int  update(Room room);
    int  delete(int id);
}
