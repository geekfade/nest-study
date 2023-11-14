import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * @Catch装饰器表示该类为异常捕获装饰器，用于捕获并处理异常
 */
@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  /**
   * catch方法用于捕获并处理异常
   * @param exception 异常对象
   * @param host 异常主机对象
   */
  catch(exception: any, host: ArgumentsHost) {
    // 切换到 HTTP 请求
    const request = host.switchToHttp().getRequest<Request>();
    // 切换到 HTTP 响应
    const response = host.switchToHttp().getResponse<Response>();

    // 设置响应状态码为服务不可用，并发送响应信息
    response.status(HttpStatus.SERVICE_UNAVAILABLE).end({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
