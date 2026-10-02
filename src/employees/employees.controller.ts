import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.entity';
import { SupabaseAuthGuard } from '../auth/supabase-auth/supabase-auth.guard';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async createEmployee(
    @Body() employeeData: Partial<Employee>,
  ): Promise<Employee> {
    return this.employeesService.createEmployee(employeeData);
  }

  @UseGuards(SupabaseAuthGuard)
  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return this.employeesService.getAllEmployees();
  }

  @Get('search')
  async searchEmployees(
    @Query('name') name?: string,
    @Query('department') department?: string,
  ): Promise<Employee[]> {
    const filters = { name, department };
    return this.employeesService.search(filters);
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: number): Promise<Employee | null> {
    return this.employeesService.getEmployeeById(id);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() employeeData: Partial<Employee>,
  ): Promise<Employee> {
    return this.employeesService.updateEmployee(id, employeeData);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: number): Promise<{ message: string }> {
    return this.employeesService.deleteEmployee(id);
  }
}
