import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

// 获取环境变量
const getEnv = () => process.env.RUNNING_ENV;

// 获取配置项
export const getConfig = (key?: string) => {
  // 读取配置文件并解析为对象
  const ymlInfo = yaml.load(
    readFileSync(join(process.cwd(), `config/.${getEnv()}.yml`), 'utf-8'),
  ) as Record<string, any>;

  // 如果指定了key，则返回指定的配置项
  if (key) {
    return ymlInfo[key];
  }

  // 否则返回整个配置对象
  return ymlInfo;
};
