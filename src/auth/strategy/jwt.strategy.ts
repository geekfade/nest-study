import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Employee } from '../../employee/entities/employee.entity';
import { TIdAndUsername } from '../../types/index';
import { getConfig } from '../../common/utils/ymlConfig';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // 调用父类构造函数，传入参数
    super({
      // 从认证头中提取JWT
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 是否忽略过期
      ignoreExpiration: false,
      // 秘钥
      secretOrKey: getConfig('JWT')['secret'],
    });
  }

  /**
   * 验证函数
   *
   * @param payload - 员工信息对象，包含ID和用户名，并包含签发时间（iat）和过期时间（exp）
   * @returns 验证通过后返回包含ID和用户名的对象
   */
  async validate(
    payload: Pick<Employee, TIdAndUsername> & { iat: number; exp: number },
  ) {
    if (!process.env.id) {
      process.env.id = payload.id;
    }
    return {
      id: payload.id,
      username: payload.username,
    };
  }
}
