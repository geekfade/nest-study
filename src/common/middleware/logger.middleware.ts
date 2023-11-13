import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Logger } from '../logger/log4js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  /**
   * 中间件，用于记录入站请求和出站响应。
   * @param req - 入站请求对象。
   * @param res - 出站响应对象。
   * @param next - 请求响应循环中的下一个中间件函数。
   */
  use(req: Request, res: Response, next: NextFunction) {
    const code = res.statusCode; // 响应状态码
    next();
    // 组装日志信息
    const logFormat = `Method:${req.method}
      Request original url: ${req.originalUrl}
      IP:${req.ip}
      Status code:${code} `;
    // 根据状态码进行日志类型区分
    if (code >= 500) {
      Logger.error(logFormat);
    } else if (code >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.access(logFormat);
      Logger.log(logFormat);
    }
  }
}

/**
 * 中间件，用于记录入站请求和出站响应。
 * @param req - 入站请求对象。
 * @param res - 出站响应对象。
 * @param next - 请求响应循环中的下一个中间件函数。
 */
export function logger(req: Request, res: Response, next: () => any) {
  const code = res.statusCode; // 响应状态码
  next();
  // 组装日志信息
  const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  Request original url: ${req.originalUrl}
  Method: ${req.method}
  IP: ${req.ip}
  Status code: ${code}
  Parameters: ${JSON.stringify(req.params, null, 4)}
  Query: ${JSON.stringify(req.query, null, 4)}
  Body: ${JSON.stringify(req.body, null, 4)}
  `;
  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    // Logger.log(logFormat);
  }
}
