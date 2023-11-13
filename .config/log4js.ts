import * as path from 'path';
const baseLogPath = path.resolve(__dirname, '../../logs'); // 日志要写入哪个目录

const log4jsConfig = {
  // 日志配置对象
  appenders: {
    // 控制台日志打印配置
    console: {
      type: 'console', // 打印到控制台
    },
    // 访问日志文件打印配置
    access: {
      type: 'dateFile', // 会写入文件，并且按照日期分类
      filename: `${baseLogPath}/access/access.log`, // 日志文件名，会命名为：access.当前时间.log
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd', // 时间格式
      daysToKeep: 60,
      numBackups: 3,
      category: 'http',
      keepFileExt: true, // 是否保留文件后缀
    },
    // 应用日志文件打印配置
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      // 日志文件按日期切割
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
    },
    // 错误日志文件打印配置
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      // 日志文件按日期切割
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
    },
    // 错误日志过滤器配置
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    // 默认日志配置
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'DEBUG',
    },
    // 信息日志配置
    info: {
      appenders: ['console', 'app', 'errors'],
      level: 'info',
    },
    // 访问日志配置
    access: {
      appenders: ['console', 'app', 'errors'],
      level: 'info',
    },
    // HTTP日志配置
    http: {
      appenders: ['access'],
      level: 'DEBUG',
    },
  },
  pm2: false, // 使用pm2来管理项目时打开
  pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
};
export default log4jsConfig;
