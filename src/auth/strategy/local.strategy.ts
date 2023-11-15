import { Injectable } from '@nestjs/common'; // 导入Injectable装饰器
import { PassportStrategy } from '@nestjs/passport'; // 导入PassportStrategy装饰器
import { Strategy } from 'passport-local'; // 导入Strategy类
import { AuthService } from '../auth.service'; // 导入AuthService类
import { Employee } from '../../employee/entities/employee.entity'; // 导入Employee类
import { CustomException } from '../../common/exceptions/custom.exception'; // 导入CustomException类

@Injectable() // 注入服务
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // 构造函数注入AuthService实例
    super();
  }

  /**
   * 验证员工信息是否有效
   *
   * @param username - 员工的用户名
   * @param password - 员工的密码
   * @returns 员工信息
   * @throws 自定义异常 - 当员工信息验证失败时抛出
   */
  async validate(
    username: Employee['username'], // 限制参数username的类型为Employee的username属性
    password: Employee['password'], // 限制参数password的类型为Employee的password属性
  ) {
    const employee = await this.authService.validateEmployee(
      username, // 调用validateEmployee方法，传入username参数
      password, // 传入password参数
    ); // 调用validateEmployee方法，获取验证结果

    if (!employee) {
      // 如果员工信息不存在
      throw CustomException.throwForbidden(); // 抛出自定义异常
    }

    return employee; // 返回员工信息
  }
}
