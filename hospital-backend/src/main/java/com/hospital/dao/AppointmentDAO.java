package com.hospital.dao;

import com.hospital.model.Appointment;
import java.util.List;

public interface AppointmentDAO {
    List<Appointment> getAll();
    Appointment getById(int id);
    List<Appointment> getByPatientId(int patientId);
    List<Appointment> getByDoctorId(int doctorId);
    int insert(Appointment appointment);
    int update(Appointment appointment);
    int delete(int id);
    int updateStatus(int id, String status);   // quick status change without full update
}
