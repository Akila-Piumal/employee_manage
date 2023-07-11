package lk.ijse.test.service;

import lk.ijse.test.dto.EmployeeDTO;

import java.util.ArrayList;

public interface EmployeeService {

    void saveEmployee(EmployeeDTO employeeDTO);

    ArrayList<EmployeeDTO> getAll();
}
