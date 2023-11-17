/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { CustomException } from '../exceptions/custom.exception';
import { getConfig } from '../utils/ymlConfig';
const AipFaceClient = require('baidu-aip-sdk').face;

export interface FaceInfo {
  error_code: number;
  error_msg: string;
  log_id: number;
  timestamp: number;
  cached: number;
  result: {
    face_num: number;
    face_list: {
      face_token: string;
      location: {
        left: number;
        top: number;
        width: number;
        height: number;
        rotation: number;
      };
      face_probability: number;
      angle: {
        yaw: number;
        pitch: number;
        roll: number;
      };
      age: number;
      gender: {
        type: 'male' | 'female';
        probability: number;
      };
    }[];
  };
}

@Injectable()
export class BaiduFaceService {
  /**
   * 获取人脸客户端
   * @returns {AipFaceClient} 人脸客户端实例
   */
  static getFaceClient() {
    const { appId, accessKey, secretKey } = getConfig('BAIDU');

    return new AipFaceClient(appId, accessKey, secretKey);
  }

  /**
   * 异步获取人脸信息
   *
   * @param imageUrl - 图片的URL地址
   * @param imageType - 图片类型，默认为'URL'
   * @param options - 面部特征选项，默认为{ face_field: 'age,gender' }
   * @returns 人脸信息
   * @throws 自定义异常
   */
  async getFaceInfo(
    imageUrl: string,
    imageType = 'URL',
    options = {
      face_field: 'age,gender',
    },
  ) {
    console.log(
      '🚀 ~ file: face.service.ts:67 ~ BaiduFaceService ~ imageUrl:',
      imageUrl,
    );
    // 调用百度人脸检测接口，检测图片中的人脸信息
    const faceInfo: FaceInfo = await BaiduFaceService.getFaceClient().detect(
      // 图片的URL
      imageUrl,
      // 图片的类型
      imageType,
      // 检测的参数
      options,
    );
    console.log(
      '🚀 ~ file: face.service.ts:76 ~ BaiduFaceService ~ faceInfo:',
      faceInfo,
    );
    try {
      // 返回检测结果
      return faceInfo;
    } catch (error) {
      // 如果发生错误，抛出自定义错误
      throw new CustomException(error);
    }
  }
}
