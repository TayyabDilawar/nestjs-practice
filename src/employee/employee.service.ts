import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schemas/employee.schema';
import { Model } from 'mongoose';
import { Profile } from './schemas/profile.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const newEmployee = new this.employeeModel(createEmployeeDto);
    return newEmployee.save();
  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const newProfile = new this.profileModel(createProfileDto);
    return newProfile.save();
  }

  async getEmployees(): Promise<Employee[]> {
    return this.employeeModel.find().populate('profile').exec();
  }

  async getEmployee(id: string): Promise<Employee | null> {
    return this.employeeModel.findById(id).populate('profile').exec();
  }
}
