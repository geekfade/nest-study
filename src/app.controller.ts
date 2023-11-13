import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomException } from './common/exceptions/custom.business';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get()
  @Version('1')
  getHello1() {
    return this.configService.get('HTTP');
  }

  @Get('err')
  getErr() {
    throw new CustomException('自定义异常抛出');
  }
}
