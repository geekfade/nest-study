import {
  Controller,
  Headers,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isPublic } from 'src/auth/constants';
import { AliOssService } from '../common/ALI/oss.service';
import { BaiduFaceService } from '../common/BAIDU/face.service';
import { getFileSuffix } from '../common/utils';
// import { CustomException } from 'src/common/exceptions/custom.exception';

@ApiTags('公共模块')
@Controller('base')
export class BaseController {
  constructor(
    private readonly aliOssService: AliOssService,
    private readonly baiduFaceService: BaiduFaceService,
  ) {}

  /**
   * 上传本地文件
   *
   * @param file - 要上传的文件
   * @param host - 文件上传后返回的URL的主机地址
   * @returns 返回上传后的文件路径
   */
  @ApiOperation({
    summary: '上传本地',
  })
  @isPublic()
  @Post('/uploadLocal')
  @UseInterceptors(FileInterceptor('file'))
  uploadLocal(
    @UploadedFile() file: Express.Multer.File,
    @Headers('host') host: string,
  ) {
    // 判断host是否包含协议
    if (!host.includes('://')) {
      // 不包含协议，则添加http协议
      host = `http://${host}`;
    }
    // 返回文件路径
    return `${host}/${file.path}`;
  }

  /**
   * 上传阿里OSS
   * @api {post} /uploadOSS uploadOSS
   * @apiName uploadOSS
   * @apiGroup OSS
   *
   * @apiParam {File} file 上传的文件。
   *
   * @apiSuccess {string} url 上传成功后的文件URL。
   */
  @ApiOperation({
    summary: '上传阿里OSS',
  })
  @isPublic()
  @Post('/uploadOSS')
  @UseInterceptors(FileInterceptor('file'))
  async uploadOSS(@UploadedFile() file: Express.Multer.File) {
    // 获取文件后缀-文件上传
    const { url } = await this.aliOssService.putBuffer(
      file.buffer,
      getFileSuffix(file.originalname),
    );

    return url;

    // 调用百度人脸识别服务获取人脸信息
    // const faceInfo = await this.baiduFaceService.getFaceInfo(url);
    // // 如果人脸信息中的错误码不为0，即表示出现了错误
    // if (faceInfo.error_code !== 0) {
    //   // 如果删除文件操作失败，抛出自定义异常
    //   await this.aliOssService.deleteFile(name);
    //   throw new CustomException(faceInfo.error_msg);
    // }
    // // 返回包含url和人脸信息的对象
    // return { url, ...faceInfo };
  }
}
