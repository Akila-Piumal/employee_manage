package lk.ijse.test.repo;

import lk.ijse.test.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepo extends JpaRepository<Employee,Integer> {

    @Query(value = "select * from employee order by employee DESC Limit 1",nativeQuery = true)
    Employee getLastEmployee();
}
