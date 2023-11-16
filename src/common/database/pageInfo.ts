/**
 * 基础页面类
 * @param page 当前页码
 * @param pageSize 每页大小
 * @param total 总记录数
 * @param records 记录数组
 */
export class BasePage<T> {
  constructor(
    private readonly page: number,
    private readonly pageSize: number,
    private readonly total: number,
    private readonly records: T[],
  ) {}
}
