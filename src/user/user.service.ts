import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    // 注入User实体
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // 列出用户
  list() {
    return this.userRepository.find();
  }

  // 保存用户
  @Transactional()
  save(user: User) {
    return this.userRepository.save(user);
  }

  // 更新用户
  update(user: User) {
    return this.userRepository.update({ id: user.id }, user);
  }

  // 删除用户
  delete(id: User['id']) {
    return this.userRepository.delete({ id });
  }
}
