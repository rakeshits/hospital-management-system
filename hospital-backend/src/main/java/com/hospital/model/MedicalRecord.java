package com.hospital.model;

import java.sql.Date;

/** Maps to the medical_records table. */
public class MedicalRecord {

    private int recordId;
    private Integer patientId;
    private Integer doctorId;
    private Integer appointmentId;
    private String diagnosis;
    private String treatment;
    private String notes;
    private Date visitDate;

    public MedicalRecord() {}

    public int getRecordId() { return recordId; }
    public Integer getPatientId() { return patientId; }
    public Integer getDoctorId() { return doctorId; }
    public Integer getAppointmentId() { return appointmentId; }
    public String getDiagnosis() { return diagnosis; }
    public String getTreatment() { return treatment; }
    public String getNotes() { return notes; }
    public Date getVisitDate() { return visitDate; }

    public void setRecordId(int recordId) { this.recordId = recordId; }
    public void setPatientId(Integer patientId) { this.patientId = patientId; }
    public void setDoctorId(Integer doctorId) { this.doctorId = doctorId; }
    public void setAppointmentId(Integer appointmentId) { this.appointmentId = appointmentId; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }
    public void setTreatment(String treatment) { this.treatment = treatment; }
    public void setNotes(String notes) { this.notes = notes; }
    public void setVisitDate(Date visitDate) { this.visitDate = visitDate; }
}
