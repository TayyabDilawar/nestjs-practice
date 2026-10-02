import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './employees.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async createEmployee(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeData);
    return this.employeeRepository.save(employee);
  }

  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async getEmployeeById(id: number): Promise<Employee | null> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async updateEmployee(
    id: number,
    employeeData: Partial<Employee>,
  ): Promise<Employee> {
    const employee = await this.getEmployeeById(id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    Object.assign(employee, employeeData);
    return this.employeeRepository.save(employee);
  }

  async deleteEmployee(id: number): Promise<{ message: string }> {
    const employee = await this.employeeRepository.delete(id);
    if (employee.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return { message: `Employee with ID ${id} has been deleted` };
  }

  async search(filters: {
    name?: string;
    department?: string;
  }): Promise<Employee[]> {
    const query = this.employeeRepository.createQueryBuilder('employee');

    if (filters.name) {
      query.andWhere('employee.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }
    if (filters.department) {
      query.andWhere('employee.department = :department', {
        department: filters.department,
      });
    }
    return query.getMany();
  }
}
