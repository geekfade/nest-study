import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  /**
   * 转换拦截器
   * @param context 上下文执行器
   * @param next 调用下一个处理程序
   * @returns 返回一个Observable<Response<T>>类型的结果
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // 调用next.handle()，返回一个Observable
    return next.handle().pipe(
      // 使用map操作符，将返回的数据转换为Response<T>类型
      map((data) => ({
        data,
        status: 0,
        extra: {},
        message: 'success',
        success: true,
      })),
    );
  }
}
