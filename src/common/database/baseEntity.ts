import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 基础实体
 */

@Entity()
export class BaseEntity {
  /**
   * id
   */
  @ApiProperty({
    description: 'id',
  })
  /**
   * 主键ID
   */
  @PrimaryGeneratedColumn({
    type: 'bigint',
    comment: '主键ID',
  })
  id: string;

  /**
   * 创建时间
   */
  @ApiProperty({
    description: '创建时间',
  })
  /**
   * 创建时间
   */
  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  /**
   * 更新时间
   */
  @ApiProperty({
    description: '更新时间',
  })
  /**
   * 更新时间
   */
  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  /**
   * 创建人
   */
  @ApiProperty({
    description: '创建人',
  })
  /**
   * 创建人
   */
  @Column({
    comment: '创建人',
  })
  createUser: string;

  /**
   * 更新人
   */
  @ApiProperty({
    description: '更新人',
  })
  /**
   * 更新人
   */
  @Column({
    comment: '更新人',
  })
  updateUser: string;

  @BeforeInsert()
  insert() {
    this.createTime = new Date();
    this.createUser = process.env.id;
  }

  @BeforeInsert()
  @BeforeUpdate()
  update() {
    this.updateTime = new Date();
    this.updateUser = process.env.id;
  }
}
