package com.hospital.dao;

import com.hospital.model.Role;
import java.util.List;

public interface RoleDAO {
    List<Role> getAll();
    Role getById(int id);
    Role getByName(String name);   // used by LoginServlet to resolve role string → roleId
    int  insert(Role role);
    int  update(Role role);
    int  delete(int id);
}
