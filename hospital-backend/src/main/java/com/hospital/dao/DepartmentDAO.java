package com.hospital.dao;

import com.hospital.model.Department;
import java.util.List;

public interface DepartmentDAO {
    List<Department> getAll();
    Department getById(int id);
    int insert(Department department);
    int update(Department department);
    int delete(int id);
}
