package com.hospital.dao;

import com.hospital.model.MedicalRecord;
import java.util.List;

public interface MedicalRecordDAO {
    List<MedicalRecord> getAll();
    MedicalRecord getById(int id);
    List<MedicalRecord> getByPatientId(int patientId);
    List<MedicalRecord> getByDoctorId(int doctorId);
    int insert(MedicalRecord record);
    int update(MedicalRecord record);
    int delete(int id);
}
