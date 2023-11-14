import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { BaseExceptionFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { getConfig } from './common/utils/ymlConfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [getConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          ...getConfig('MYSQL_CONFIG'),
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    UserModule,
    EmployeeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 在依赖注入容器中提供APP_PIPE，并使用工厂方法创建ValidationPipe实例
    {
      provide: APP_PIPE,
      useFactory() {
        return new ValidationPipe({
          transform: true,
        });
      },
    },

    // 在依赖注入容器中提供APP_INTERCEPTOR，并使用ClassSerializerInterceptor类进行实例化
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },

    // 在依赖注入容器中提供APP_INTERCEPTOR，并使用TransformInterceptor类进行实例化
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },

    // 在依赖注入容器中提供APP_FILTER，并使用BaseExceptionFilter类进行实例化
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },

    // 在依赖注入容器中提供APP_FILTER，并使用HttpExceptionFilter类进行实例化
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
