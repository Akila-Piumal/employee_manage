package lk.ijse.test.service.impl;

import lk.ijse.test.dto.DesignationDTO;
import lk.ijse.test.entity.Designation;
import lk.ijse.test.repo.DesignationRepo;
import lk.ijse.test.service.DesignationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class DesignationServiceImpl implements DesignationService {

    @Autowired
    DesignationRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveDesignation(DesignationDTO designationDTO) {
        Designation entity = mapper.map(designationDTO, Designation.class);
        repo.save(entity);
    }
}
