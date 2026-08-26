package com.hospital.dao;

import com.hospital.model.Patient;
import java.util.List;

public interface PatientDAO {
    List<Patient> getAll();
    Patient getById(int id);
    int insert(Patient patient);
    int update(Patient patient);
    int delete(int id);
    Patient getByUserId(int userId);
}
