package com.students.management.StudentManagementApp.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

// extends JPA - to interface
// repozytorium to miejsce odpowiedzialne na działaniach na bazie
// tutaj komunikujemy, że działania na bazie będą z wykorzystaniem JPA
@Repository
public interface StudentRepository  extends JpaRepository<Student, Long> {
    @Query("" +
            "SELECT CASE WHEN COUNT(s) > 0 THEN " +
            "TRUE ELSE FALSE END " +
            "FROM Student s " +
            "WHERE s.email = ?1"
    )
    Boolean selectExistsEmail(String email);
}