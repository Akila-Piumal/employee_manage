package lk.ijse.test.controller;

import lk.ijse.test.dto.EmployeeDTO;
import lk.ijse.test.service.EmployeeService;
import lk.ijse.test.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    EmployeeService service;

    @GetMapping
    public ResponseUtil getAll(){
        ArrayList<EmployeeDTO> all = service.getAll();
        return new ResponseUtil("200","success",all);
    }

    @PostMapping
    public ResponseUtil saveEmployee(@RequestBody EmployeeDTO employeeDTO){
        service.saveEmployee(employeeDTO);
        return new ResponseUtil("200","employee Saved.",null);
    }

    @PutMapping
    public ResponseUtil updateEmployee(@RequestBody EmployeeDTO employeeDTO){
        service.updateEmployee(employeeDTO);
        return new ResponseUtil("200","Updated..!",null);
    }

    @DeleteMapping(params = "employee_id")
    public ResponseUtil deleteEmployee(int employee_id){
        service.deleteById(employee_id);
        return new ResponseUtil("200","Deleted..!",null);
    }

    @GetMapping(path = "/last")
    public ResponseUtil getLastEmployee(){
        EmployeeDTO lastEmployee = service.getLastEmployee();
        return new ResponseUtil("200","success",lastEmployee);
    }
}
