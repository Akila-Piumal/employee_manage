package lk.ijse.test.controller;

import lk.ijse.test.dto.DesignationDTO;
import lk.ijse.test.service.DesignationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/designation")
public class DesignationController {

    @Autowired
    DesignationService service;

    @PostMapping
    public String saveDesignation(@RequestBody DesignationDTO designationDTO){
        service.saveDesignation(designationDTO);
        return "Saved";
    }
}
