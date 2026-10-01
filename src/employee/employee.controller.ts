import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './schemas/employee.schema';
import { Profile } from './schemas/profile.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Post('profile')
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    return this.employeeService.createProfile(createProfileDto);
  }

  @Get()
  async getEmployees(): Promise<Employee[]> {
    return this.employeeService.getEmployees();
  }

  @Get(':id')
  async getEmployee(@Param('id') id: string): Promise<Employee | null> {
    return this.employeeService.getEmployee(id);
  }
}
