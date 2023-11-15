import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/entities/employee.entity';

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
    if (employee?.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...reset } = employee;
      return reset;
    }
    return null;
  }

  /**
   * 用户登录
   *
   * @param {Employee} employee - 用户员工对象
   * @returns {Object} - 返回包含token的对象
   *  - token {string} - JWT令牌
   */
  async login(employee: Employee): Promise<object> {
    const payload = { username: employee.username, id: employee.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
