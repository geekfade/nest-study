import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import * as md5 from 'md5';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CustomException } from '../common/exceptions/custom.business';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({
    summary: '员工登陆',
  })
  @Post('login')
  async login(@Body() employee: Employee) {
    const { username, password } = employee;
    const _employee = await this.employeeService.findByUsername(username);

    // 判断是否存在该用户
    if (!_employee) {
      throw new CustomException('账号不存在，请重新输入');
    }

    // 判断是否被禁用
    if (_employee.status === 0) {
      throw new CustomException('当前员工已禁用');
    }

    // 判断密码是否正确,使用md5加密
    if (md5(password) !== _employee.password) {
      // 密码错误
      throw new CustomException('密码错误，请重新输入');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...rest } = _employee;
    return rest;
  }
}
