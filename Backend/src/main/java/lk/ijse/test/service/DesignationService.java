package lk.ijse.test.service;

import lk.ijse.test.dto.DesignationDTO;

import java.util.ArrayList;

public interface DesignationService {
    void saveDesignation(DesignationDTO designationDTO);

    ArrayList<DesignationDTO> getAll();
}
