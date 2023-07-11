package lk.ijse.test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class EmployeeDTO {
    private int employee;
    private String fullName;
    private String designation;
    private LocalDateTime dateOfJoining;
    private boolean isManager;
}
