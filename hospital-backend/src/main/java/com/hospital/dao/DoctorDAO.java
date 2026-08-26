package com.hospital.dao;

import com.hospital.model.Doctor;
import java.util.List;

public interface DoctorDAO {
    List<Doctor> getAll();
    Doctor getById(int id);
    Doctor getByUserId(int userId);
    List<Doctor> getByDepartment(int departmentId);
    int insert(Doctor doctor);
    int update(Doctor doctor);
    int delete(int id);
}
