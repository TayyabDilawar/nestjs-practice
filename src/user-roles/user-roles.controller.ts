import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles/roles.guard';
import { Role } from '../guards/roles/roles.enums';
import { Roles } from '../guards/roles/roles.decorator';

@Controller('user-roles')
export class UserRolesController {
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  getAdmin() {
    return { message: 'Only Admin can access this route' };
  }

  @Get('user')
  @UseGuards(RolesGuard)
  @Roles(Role.USER)
  getUser() {
    return { message: 'Only User can access this route' };
  }
}
