import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/entities/employee.entity';
import { TIdAndUsername } from '../types/index';

@Injectable()
/**
 * 提供身份验证服务
 */
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 验证员工
   * @param username - 员工的用户名
   * @param pass - 员工的密码
   * @returns 员工信息（如果验证成功）
   */
  async validateEmployee(
    username: Employee['username'],
    pass: Employee['password'],
  ) {
    // 根据用户名查找员工
    const employee = await this.employeeService.findByUsername(username);
    // 判断密码是否正确
    if (employee?.password === md5(pass)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...reset } = employee;
      return reset;
    }
    return null;
  }

  /**
   * 用户登录
   * @param {Employee} employee - 用户员工对象
   */
  async login(employee: Pick<Employee, TIdAndUsername>) {
    const payload = { username: employee.username, id: employee.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
