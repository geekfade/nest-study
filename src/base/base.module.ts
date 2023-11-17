import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { checkDirAndCreate } from 'src/common/utils';
// import { webcrypto } from 'crypto';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';
import { AliOssModule } from 'src/common/ALI/oss.module';
import { BaiduFaceModule } from 'src/common/BAIDU/face.module';

@Module({
  imports: [
    AliOssModule,
    BaiduFaceModule,
    // 注册MulterModule，用于处理文件上传
    MulterModule.register({
      /*       // 设置存储路径
      storage: diskStorage({
        // 设置存储路径
        destination(req, file, callback) {
          const filePath = `public/uploads/${file.mimetype.split('/')[0]}/`;
          checkDirAndCreate(filePath);
          return callback(null, `./${filePath}`);
        },
        // 设置文件名
        filename(req, file, callback) {
          // 获取文件后缀
          const suffix = file.originalname.substring(
            file.originalname.lastIndexOf('.'),
          );
          // 生成文件名
          const fileName = Date.now() + '-' + webcrypto.randomUUID() + suffix;
          // 回调函数，返回文件名
          callback(null, fileName);
        },
      }), */
      fileFilter(req, file, callback) {
        return callback(null, true);
      },
    }),
  ],
  providers: [BaseService],
  controllers: [BaseController],
})
export class BaseModule {}
