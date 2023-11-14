import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  @InjectRepository(Employee)
  private readonly employeeRepository: Repository<Employee>;

  /**
   * 根据员工的用户名查找员工信息
   * @param username - 员工的用户名
   * @returns 返回找到的员工信息
   */
  findByUsername(username: Employee['username']) {
    return this.employeeRepository.findOneBy({ username });
  }
}
