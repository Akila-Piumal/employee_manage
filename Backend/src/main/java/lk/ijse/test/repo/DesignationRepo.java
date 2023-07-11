package lk.ijse.test.repo;

import lk.ijse.test.entity.Designation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DesignationRepo extends JpaRepository<Designation, Integer> {
}
