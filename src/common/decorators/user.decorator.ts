import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { TIdAndUsername } from 'src/types';
import { Employee } from '../../employee/entities/employee.entity';

// 导出一个名为User的参数装饰器，它接受TIdAndUsername类型的参数，并返回ExecutionContext类型的参数
export const User = createParamDecorator<
  TIdAndUsername,
  ExecutionContext,
  | Pick<Employee, TIdAndUsername>
  | Pick<Employee, TIdAndUsername>[TIdAndUsername]
>((data, ctx) => {
  // 获取当前请求的用户信息
  const user = ctx.switchToHttp().getRequest<Request>().user;
  // 如果data和user都存在，则返回user[data]
  if (data && user) {
    return user[data];
  }
  // 否则返回user
  return user;
});
