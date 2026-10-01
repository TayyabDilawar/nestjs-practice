import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  async createStudent(data: Partial<Student>): Promise<Student> {
    const createdStudent = new this.studentModel(data);
    return createdStudent.save();
  }

  async getStudents(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async getStudentById(id: string): Promise<Student | null> {
    return this.studentModel.findById(id).exec();
  }

  async updateStudent(
    id: string,
    data: Partial<Student>,
  ): Promise<Student | null> {
    return this.studentModel
      .findByIdAndUpdate(
        id,
        {
          name: data.name ?? null,
          age: data.age ?? null,
          email: data.email ?? null,
        },
        { overwrite: true, new: true },
      )
      .exec();
  }

  async patchStudent(
    id: string,
    data: Partial<Student>,
  ): Promise<Student | null> {
    return this.studentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteStudent(id: string): Promise<Student | null> {
    return this.studentModel.findByIdAndDelete(id).exec();
  }
}
