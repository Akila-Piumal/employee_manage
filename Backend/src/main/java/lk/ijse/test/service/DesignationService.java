package lk.ijse.test.service;

import lk.ijse.test.dto.DesignationDTO;
import lk.ijse.test.dto.EmployeeDTO;
import lk.ijse.test.entity.Employee;

import java.util.ArrayList;

public interface DesignationService {
    void saveDesignation(DesignationDTO designationDTO);

    ArrayList<DesignationDTO> getAll();

    void deleteById(int designation_id);

}
