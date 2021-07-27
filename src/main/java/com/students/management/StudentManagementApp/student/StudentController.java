package com.students.management.StudentManagementApp.student;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents(){

        return studentService.getAllStudents();
    }
    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student){
        //ResponseEntity zwraca statusy http - created zwraca 201 zamiast default 200
        studentService.addStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
