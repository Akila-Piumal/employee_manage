package lk.ijse.test.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, columnDefinition = "int(11)")
    int employee;

    @Column(columnDefinition = "VARCHAR(45) DEFAULT NULL", length = 45)
    String fullName;

    @Column(columnDefinition = "VARCHAR(50) DEFAULT NULL", length = 50)
    String designation;

    @Column(columnDefinition = "datetime DEFAULT NULL")
    LocalDateTime dateOfJoining;

    @Column(columnDefinition = "boolean DEFAULT false")
    boolean isManager;

}
