package lk.ijse.test.controller;

import lk.ijse.test.dto.DesignationDTO;
import lk.ijse.test.service.DesignationService;
import lk.ijse.test.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin
@RequestMapping("/designation")
public class DesignationController {

    @Autowired
    DesignationService service;

    @GetMapping
    public ResponseUtil getAll(){
        ArrayList<DesignationDTO> all = service.getAll();
        return new ResponseUtil("200","success",all);
    }

    @PostMapping
    public ResponseUtil saveDesignation(@RequestBody DesignationDTO designationDTO){
        service.saveDesignation(designationDTO);
        return new ResponseUtil("200","Designation Added.",null);
    }
}
