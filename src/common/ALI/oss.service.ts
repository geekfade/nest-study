/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { webcrypto } from 'crypto';
import path from 'path';
import type { PutObjectResult } from 'ali-oss';

import { CustomException } from '../exceptions/custom.exception';
import { getConfig } from '../utils/ymlConfig';

const OSS = require('ali-oss');
const moment = require('moment');

@Injectable()
export class AliOssService {
  static getOssClient() {
    // 获取配置文件中的阿里云配置
    const { accessKeyId, accessKeySecret, oss } = getConfig('ALI');
    // 返回一个新的OSS客户端
    return new OSS({
      ...oss,
      accessKeyId,
      accessKeySecret,
    });
  }

  static getOssPath(suffix: string) {
    // 获取当前时间
    const ymd: string = moment().format('YYYY/MM/DD');
    // 返回oss路径
    return `${ymd}/${webcrypto.randomUUID()}${suffix}`;
  }

  /**
   * 将本地文件上传到阿里云OSS服务器
   * @param {string} url - 文件的本地路径
   * @param {string} suffix - 文件后缀名
   * @returns {Promise} - 返回上传结果的Promise对象
   * @throws {CustomException} - 抛出自定义异常
   */
  async putLocal(url: string, suffix: string) {
    try {
      // 调用AliOssService的getOssClient方法获取OSS客户端
      return AliOssService.getOssClient().put(
        // 调用AliOssService的getOssPath方法获取OSS路径
        AliOssService.getOssPath(suffix),
        // 调用path模块的normalize方法获取url
        path.normalize(url),
      );
    } catch (err) {
      // 抛出自定义异常
      throw new CustomException(err);
    }
  }

  /**
   * 将缓冲区内容上传到指定后缀的 OSS 对象存储
   *
   * @param buffer 要上传的缓冲区
   * @param suffix 上传对象的后缀
   * @returns Promise 包含上传结果的 OSS 对象
   * @throws CustomException 自定义异常
   */
  async putBuffer(buffer: Buffer, suffix: string): Promise<PutObjectResult> {
    try {
      // 调用AliOssService的getOssClient()方法获取OSS客户端
      return await AliOssService.getOssClient().put(
        // 调用AliOssService的getOssPath()方法获取OSS路径
        AliOssService.getOssPath(suffix),
        // 传入buffer
        buffer,
      );
    } catch (err) {
      // 抛出自定义异常
      throw new CustomException(err);
    }
  }

  /**
   * 删除指定路径的文件
   *
   * @param path 要删除的文件路径
   * @returns Promise
   * @throws CustomException
   */
  async deleteFile(path: string) {
    try {
      await AliOssService.getOssClient().delete(path);
    } catch (err) {
      throw new CustomException(err);
    }
  }
}
