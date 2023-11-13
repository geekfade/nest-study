import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { knife4jSetup } from 'nestjs-knife4j';

/**
 * 生成API文档
 * @param app Nest应用实例
 */
export const generateDocument = (app: INestApplication) => {
  /**
   * 创建DocumentBuilder实例，用于构建API文档的配置
   */
  const config = new DocumentBuilder()
    .setTitle('nest-study')
    .setDescription('nest-study API的描述信息')
    .setVersion('1.0')
    .build();

  /**
   * 创建Swagger文档实例
   */
  const document = SwaggerModule.createDocument(app, config);

  /**
   * 配置Swagger模块，将文档暴露给外部使用
   */
  SwaggerModule.setup('api', app, document);

  // 初始化Knife4j，传入app和配置参数
  knife4jSetup(app, {
    // 配置Knife4j的urls参数，urls是一个数组，每个数组元素是一个对象
    urls: [
      {
        // 对象中的name属性表示版本名称
        name: '1.X版本',
        // 对象中的url属性表示接口路径
        url: `/api-json`,
        // 对象中的swaggerVersion属性表示接口文档版本
        swaggerVersion: '3.0',
        // 对象中的location属性表示接口文档路径
        location: `/api-json`,
      },
    ],
  });
};
