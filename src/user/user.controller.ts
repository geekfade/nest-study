import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '用户列表',
  })
  @Get()
  list() {
    return this.userService.list();
  }

  @ApiOperation({
    summary: '新增用户',
  })
  @Post()
  save(@Body() user: User) {
    return this.userService.save(user);
  }

  @ApiOperation({
    summary: '修改用户',
  })
  @Put()
  update(@Body() user: User) {
    return this.userService.update(user);
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
