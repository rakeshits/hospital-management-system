package com.hospital.model;

import java.sql.Date;

public class Patient {
    private int patient_id;
    private Integer user_id; // nullable link to users.user_id
    private String patient_code;
    private String first_name;
    private String last_name;
    private String gender;
    private Date dob;
    private String blood_group;
    private String phone;
    private String email;
    private String address;
    private String emergency_contact_name;
    private String emergency_contact_phone;
    private Date registration_date;
    private String status;

    public Patient() {
    }

    public Patient(int patient_id, Integer user_id, String patient_code, String first_name, String last_name, String gender, Date dob,
                   String blood_group, String phone, String email, String address, String emergency_contact_name,
                   String emergency_contact_phone, Date registration_date, String status) {
        this.patient_id = patient_id;
        this.user_id = user_id;
        this.patient_code = patient_code;
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.dob = dob;
        this.blood_group = blood_group;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.emergency_contact_name = emergency_contact_name;
        this.emergency_contact_phone = emergency_contact_phone;
        this.registration_date = registration_date;
        this.status = status;
    }

    public int getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(int patient_id) {
        this.patient_id = patient_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getPatient_code() {
        return patient_code;
    }

    public void setPatient_code(String patient_code) {
        this.patient_code = patient_code;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getBlood_group() {
        return blood_group;
    }

    public void setBlood_group(String blood_group) {
        this.blood_group = blood_group;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmergency_contact_name() {
        return emergency_contact_name;
    }

    public void setEmergency_contact_name(String emergency_contact_name) {
        this.emergency_contact_name = emergency_contact_name;
    }

    public String getEmergency_contact_phone() {
        return emergency_contact_phone;
    }

    public void setEmergency_contact_phone(String emergency_contact_phone) {
        this.emergency_contact_phone = emergency_contact_phone;
    }

    public Date getRegistration_date() {
        return registration_date;
    }

    public void setRegistration_date(Date registration_date) {
        this.registration_date = registration_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "patient_id=" + patient_id +
                ", user_id=" + user_id +
                ", patient_code='" + patient_code + '\'' +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", gender='" + gender + '\'' +
                ", dob=" + dob +
                ", blood_group='" + blood_group + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", emergency_contact_name='" + emergency_contact_name + '\'' +
                ", emergency_contact_phone='" + emergency_contact_phone + '\'' +
                ", registration_date=" + registration_date +
                ", status='" + status + '\'' +
                '}';
    }
}
