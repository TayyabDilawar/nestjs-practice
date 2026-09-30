import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EvService {
  constructor(private configService: ConfigService) {}

  getGbUrl() {
    return this.configService.get<string>('DATABASE_URL');
  }

  getJwtSecret() {
    return this.configService.get<string>('JWT_SECRET');
  }
}
