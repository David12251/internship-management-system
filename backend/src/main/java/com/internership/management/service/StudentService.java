package com.internership.management.service;
import com.internership.management.DTOs.StudentDTO;
import com.internership.management.entity.Student;
import com.internership.management.entity.User;
import com.internership.management.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public StudentDTO createStudent(User user, String firstName, String lastName, String university, String major, java.time.LocalDate graduationDate) {
        Student student = new Student(user, firstName, lastName, university, major, graduationDate);
        Student savedStudent = studentRepository.save(student);
        return new StudentDTO(savedStudent.getId(), savedStudent.getUser().getId(), savedStudent.getFirstName(),
                savedStudent.getLastName(), savedStudent.getUniversity(), savedStudent.getMajor(), savedStudent.getGraduationDate());
    }

    public Page<StudentDTO> getAllStudents(Pageable pageable) {
        return studentRepository.findAll(pageable)
                .map(student -> new StudentDTO(student.getId(), student.getUser().getId(), student.getFirstName(),
                        student.getLastName(), student.getUniversity(), student.getMajor(), student.getGraduationDate()));
    }

    public Page<StudentDTO> searchStudents(String keyword, Pageable pageable) {
        return studentRepository.searchStudents(keyword, pageable)
                .map(student -> new StudentDTO(student.getId(), student.getUser().getId(), student.getFirstName(),
                        student.getLastName(), student.getUniversity(), student.getMajor(), student.getGraduationDate()));
    }

    public StudentDTO getStudentByUserId(Long userId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new com.internership.management.exception.ResourceNotFoundException("Student not found"));
        return new StudentDTO(student.getId(), student.getUser().getId(), student.getFirstName(),
                student.getLastName(), student.getUniversity(), student.getMajor(), student.getGraduationDate());
    }
}