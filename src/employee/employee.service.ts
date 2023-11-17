import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { BasePage } from '../common/database/pageInfo';
import { classAssign } from 'src/common/utils';
import { CustomException } from 'src/common/exceptions/custom.exception';

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

  /**
   * 创建员工
   * @param employee 员工信息
   * @returns 创建的员工对象
   */
  create(employee: Employee) {
    return this.employeeRepository.save(classAssign(new Employee(), employee));
  }

  /**
   * 根据id查找员工
   * @param id 员工id
   * @returns 返回找到的员工
   * @throws 抛出异常，当找不到员工时
   */
  async findById(id: string) {
    const employee = await this.employeeRepository.findOneBy({ id });

    if (!employee) {
      throw new CustomException('id不存在');
    }

    return employee;
  }

  /**
   * 更新员工信息
   * @param employee 需要更新的员工对象
   * @returns 更新成功返回true，否则返回false
   */
  async update(employee: Employee) {
    return !!(
      await this.employeeRepository.update(
        { id: employee.id },
        classAssign(new Employee(), employee),
      )
    ).affected;
  }

  /**
   * 删除员工
   * @param ids 要删除的员工id数组
   * @returns 是否成功删除
   */
  async delete(ids: string[]) {
    const count = await this.employeeRepository.countBy({
      id: In(ids),
      status: 1,
    });
    if (count > 0) {
      throw new CustomException('不能删除启用中的账号');
    }
    return !!(await this.employeeRepository.delete({ id: In(ids) })).affected;
  }

  /**
   * 设置员工状态
   * @param status - 员工状态
   * @param ids - 员工ID列表
   * @returns 若有任何一条记录被更新，则返回 true，否则返回 false
   */
  async setStatus(status: number, ids: string[]) {
    const employee = new Employee();
    employee.status = status;
    return !!(await this.employeeRepository.update({ id: In(ids) }, employee))
      .affected;
  }

  /**
   * 查询所有员工
   * @returns {Promise<Employee[]>} 员工列表
   */
  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }
}
