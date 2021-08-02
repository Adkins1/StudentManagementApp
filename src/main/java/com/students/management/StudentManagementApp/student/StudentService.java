package com.students.management.StudentManagementApp.student;

import com.students.management.StudentManagementApp.student.exceptions.BadRequestException;
import com.students.management.StudentManagementApp.student.exceptions.NotFoundException;
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

    public void addStudent(Student student) {
        //sprawdz czy email istnieje, wywal blad jak tak, dodaj studenta jak nie
        if(studentRepository.selectExistsEmail(student.getEmail())){
            throw new BadRequestException("Email does exist, use another one");
        }else{
            studentRepository.save(student);
        }

    }
    // dobrze jest rozdzielić na pliki osobne aby wywalalo inne błedy http
    public void deleteStudent(Student student) {
        // sprawdz czy obiekt istnieje, wywal bład, jezeli ok to delete
        if(studentRepository.findById(student.getId()).isEmpty()){
            throw new NotFoundException("Cannot delete, given item does not exist");
        }else{
            studentRepository.delete(student);
        }

    }

    public void updateStudent(Student student) {
        studentRepository.save(student);
    }
}
