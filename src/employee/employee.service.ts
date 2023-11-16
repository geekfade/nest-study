import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { BasePage } from '../common/database/pageInfo';

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

  /**
   * 根据页码和每页数量获取员工列表
   * @param page 页码
   * @param pageSize 每页数量
   * @param name 姓名过滤条件，默认为空字符串
   * @returns 返回包含员工列表和总数量的分页对象
   */
  async page(page: number, pageSize: number, name = '') {
    // 使用employeeRepository查询数据，并且根据name字段进行模糊查询
    const [employeeList, total] = await this.employeeRepository.findAndCount({
      // 根据name搜索
      where: {
        name: Like(`%${name}%`),
      },
      // 根据page和pageSize计算skip和take参数
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    // 返回一个BasePage对象
    return new BasePage(page, pageSize, total, employeeList);
  }
}
