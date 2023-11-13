import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import { generateDocument } from './doc';
import { getConfig } from './common/utils/ymlConfig';
import { logger } from './common/middleware/logger.middleware';

declare const module: any;

async function bootstrap() {
  // 初始化事务上下文
  initializeTransactionalContext();
  // 创建应用实例
  const app = await NestFactory.create(AppModule);
  // 启用版本控制
  app.enableVersioning({
    // 版本控制类型
    type: VersioningType.URI,
    // 默认版本
    defaultVersion: ['1'],
  });

  app.use(logger);

  // 生成文档
  generateDocument(app);

  // 监听端口
  await app.listen(getConfig('HTTP').port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
