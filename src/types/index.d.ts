// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';
import { Employee } from '../employee/entities/employee.entity';
declare namespace NodeJS {
  interface ProcessEnv {
    RUNNING: string;
  }
}

/**
 * 定义一个类型 TIdAndUsername，表示'id'和'username'两个字符串的联合类型
 */
export type TIdAndUsername = 'id' | 'username';

declare module 'express' {
  /**
   * 在 express 的 Request 类型上扩展一个 user 属性，该属性的类型为 Employee 类型中的 TIdAndUsername 属性的子集
   */
  interface Request {
    user: Pick<Employee, TIdAndUsername>;
  }
}
