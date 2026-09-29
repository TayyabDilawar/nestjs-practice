import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
  private students = [
    {
      id: 1,
      name: 'John Doe',
      age: 20,
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 22,
    },
  ];

  getAllStudents() {
    return this.students;
  }

  getStudentById(id: number) {
    const student = this.students.find((student) => student.id === id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  createStudent(student: { name: string; age: number }) {
    const newStudent = {
      id: this.students[this.students.length - 1]?.id + 1 || 1,
      ...student,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  // put
  updateStudent(id: number, updatedStudent: { name: string; age: number }) {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id,
    );
    if (studentIndex === -1) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    this.students[studentIndex] = {
      id,
      ...updatedStudent,
    };
    return this.students[studentIndex];
  }

  // patch
  partialUpdateStudent(
    id: number,
    updatedFields: Partial<{ name: string; age: number }>,
  ) {
    const student = this.getStudentById(id);
    Object.assign(student, updatedFields);
    return student;
  }

  // delete
  deleteStudent(id: number) {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id,
    );
    if (studentIndex === -1) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    const deletedStudent = this.students.splice(studentIndex, 1);
    return {
      message: `Student deleted successfully`,
      student: deletedStudent[0],
    };
  }
}
