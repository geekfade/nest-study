import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomException, TBusinessError } from './custom.exception';

/**
 * 异常过滤器，用于捕获Http异常
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * 捕获异常方法
   * @param exception 异常对象
   * @param host 异常主机对象
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取请求和响应对象
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();

    // 如果异常是自定义异常，则获取响应信息
    if (exception instanceof CustomException) {
      const { code, message } = exception.getResponse() as TBusinessError;
      // 返回响应状态码为200，响应信息为自定义异常响应信息
      response.status(HttpStatus.OK).send({
        data: null,
        status: code,
        extra: {},
        message,
        success: false,
      });
      return; // 结束异常捕获
    }
    // 返回响应状态码为404，响应信息为异常响应信息
    response.status(HttpStatus.NOT_FOUND).send({
      statusCode: HttpStatus.NOT_FOUND,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse(),
    });
  }
}
