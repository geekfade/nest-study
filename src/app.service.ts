import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: '张三',
      age: 18,
      sex: '男',
    };
  }
}
