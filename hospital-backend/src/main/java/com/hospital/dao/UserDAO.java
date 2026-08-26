package com.hospital.dao;

import com.hospital.model.User;
import java.util.List;

public interface UserDAO {
    List<User> getAll();
    User  getById(int id);
    User  getByEmail(String email);       // used by LoginServlet for credential lookup
    User  getByUsername(String username);
    List<User> getByRole(String roleName);// used by admin to list all doctors/patients/staff
    int   insert(User user);
    int   update(User user);
    int   delete(int id);
    int   setActive(int userId, boolean active);          // activate / deactivate
    int   updateLastLogin(int userId);                    // called on successful login
}
