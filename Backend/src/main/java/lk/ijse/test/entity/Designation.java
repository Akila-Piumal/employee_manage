package lk.ijse.test.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Designation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int designation_id;

    @Column(columnDefinition = "VARCHAR(45) DEFAULT NULL", length = 45)
    String name;

    @Column(columnDefinition = "VARCHAR(100) DEFAULT NULL", length = 100)
    String remark;
}
