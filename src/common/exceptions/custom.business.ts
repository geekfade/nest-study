import { HttpException, HttpStatus } from '@nestjs/common';
import { BUSINESS_ERROR_CODE } from './business.error.codes';

/**
 * 业务错误类型
 */
export type TBusinessError = {
  code: number;
  message: string;
};

/**
 * 自定义异常类
 */
export class CustomException extends HttpException {
  constructor(error: TBusinessError | string) {
    if (typeof error === 'string') {
      error = {
        code: BUSINESS_ERROR_CODE.COMMON,
        message: error,
      };
    }
    super(error, HttpStatus.OK);
  }

  /**
   * 抛出无权限异常
   */
  static throwForbidden() {
    throw new CustomException({
      code: BUSINESS_ERROR_CODE.ACCESS_FORBIDDEN,
      message: '抱歉哦，您无此权限！',
    });
  }
}
