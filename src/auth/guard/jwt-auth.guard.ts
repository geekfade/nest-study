/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../constants';
import { CustomException } from 'src/common/exceptions/custom.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * 用于判断是否具有访问权限的守卫。
   *
   * @param context 上下文信息，包含请求的上下文信息
   * @returns 如果具有访问权限，则返回true；否则返回false
   */
  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获取上下文中的isPublic属性
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 如果isPublic属性为true，则返回true
    if (isPublic) {
      return true;
    }
    // 否则，调用父类的canActivate方法
    return super.canActivate(context);
  }

  /**
   * 处理请求
   * @param err 错误信息
   * @param user 用户信息
   * @param info 信息
   * @param context 上下文
   * @param status 状态（可选）
   * @returns 处理后的用户信息
   */
  override handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    // 如果err或者user为空，则抛出禁止访问异常
    if (err || !user) {
      throw CustomException.throwForbidden();
    }
    // 否则，返回user
    return user;
  }
}
