package com.hospital.dao;

import com.hospital.model.Bill;
import java.util.List;

public interface BillDAO {
    List<Bill> getAll();
    Bill getById(int id);
    List<Bill> getByPatientId(int patientId);
    int insert(Bill bill);
    int update(Bill bill);
    int delete(int id);
    int updatePaymentStatus(int id, String status);
}
