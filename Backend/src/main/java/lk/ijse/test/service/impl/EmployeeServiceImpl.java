package lk.ijse.test.service.impl;

import lk.ijse.test.dto.EmployeeDTO;
import lk.ijse.test.entity.Employee;
import lk.ijse.test.repo.EmployeeRepo;
import lk.ijse.test.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    EmployeeRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveEmployee(EmployeeDTO employeeDTO) {
        Employee entity = mapper.map(employeeDTO, Employee.class);
        repo.save(entity);
    }

    @Override
    public ArrayList<EmployeeDTO> getAll() {
        List<Employee> all = repo.findAll();
        return mapper.map(all,new TypeToken<ArrayList<EmployeeDTO>>(){}.getType());
    }
}
