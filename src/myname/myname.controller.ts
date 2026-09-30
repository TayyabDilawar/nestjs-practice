import { Body, Controller, Post } from '@nestjs/common';
import { UppercasePipe } from '../common/pipe/uppercase/uppercase.pipe';

@Controller('myname')
export class MynameController {
  @Post('custom')
  transformName(@Body('name', new UppercasePipe()) name: string) {
    return { message: `Name transformed to ${name}` };
  }
}
