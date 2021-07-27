package com.students.management.StudentManagementApp.student;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

// service to czesc wykonawcza, tu piszemy funkcje z wykorzystaniem JPA, dzieki czemu nie musimy pisac wszystkich metod do
// komunikacji z baza danych od nowa
@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents(){

        return studentRepository.findAll();
    }

}
