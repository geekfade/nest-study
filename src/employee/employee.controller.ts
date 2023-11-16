import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as md5 from 'md5';
import { EmployeeService } from './employee.service';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guard/local-auth.guard';
import { Employee } from './entities/employee.entity';
import { CustomException } from '../common/exceptions/custom.exception';
import { isPublic } from 'src/auth/constants';
import { TIdAndUsername } from '../types/index';
import { User } from '../common/decorators/user.decorator';

@ApiTags('员工模块')
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '员工登陆',
  })
  @isPublic()
  @UseGuards(LocalAuthGuard)
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
    const tokenObj = await this.authService.login(_employee);
    return { ...rest, ...tokenObj };
  }

  @ApiOperation({
    summary: '测试接口认证',
  })
  @Get('/test')
  test(@User() user: Pick<Employee, TIdAndUsername>) {
    return user;
  }

  @ApiOperation({
    summary: '分页',
  })
  @Get('page')
  page(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name?: string,
  ) {
    return this.employeeService.page(page, pageSize, name);
  }
}
