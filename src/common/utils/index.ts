import { existsSync, mkdirSync } from 'fs';
import moment from 'moment';

/**
 * 检查目录是否存在，如果不存在则创建
 * @param filePath 文件路径
 */
export const checkDirAndCreate = (filePath: string) => {
  const pathArr = filePath.split('/'); // 将文件路径按"/"分割成数组
  let checkPath = '.'; // 初始检查路径为当前目录
  for (let i = 0; i < pathArr.length; i++) {
    // 遍历文件路径数组
    checkPath += `/${pathArr[i]}`; // 拼接出需要检查的路径
    if (!existsSync(checkPath)) {
      // 判断检查路径是否存在
      mkdirSync(checkPath); // 不存在则创建目录
    }
  }
};

/**
 * 获取文件的后缀名
 * @param src 文件路径
 * @returns 文件后缀名
 */
export const getFileSuffix = (src: string) => {
  return src.substring(src.lastIndexOf('.'));
};

/**
 * 将一个新的对象的新值分配给旧对象的属性
 * @param oldVal 旧对象
 * @param newVal 新对象
 * @returns 分配新值后的旧对象
 */
export function classAssign<T extends object>(oldVal: T, newVal: T) {
  for (const k in newVal) {
    oldVal[k] = newVal[k];
  }
  return oldVal;
}

/**
 *
 * @param data
 * @returns 列表转树结构
 */
export function listToTree<T extends { id: string; pId: string }>(data: T[]) {
  const obj = {};
  data.forEach((w) => (obj[w.id] = w));
  type TParent = T & { children?: T[] };
  const parentList: TParent[] = [];
  data.forEach((w) => {
    const parent: TParent = obj[w.pId];
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(w);
    } else {
      parentList.push(w);
    }
  });
  return parentList;
}

/**
 *
 * @param val
 * @returns 字符串转数字
 */
export const stringToNumber = (val: string) => {
  return Number(val);
};

/**
 *
 * @param val
 * @returns 数字转字符串
 */
export const numberToString = (val: number) => {
  return String(val);
};

/**
 *
 * @param range
 * @param format
 * @returns 获取 查询mysql开始时间和结束时间
 */
export const getMysqlStartDateAndEndDate = (
  range: number,
  format = 'YYYY-MM-DD',
) => {
  const endDate = moment(new Date()).add(1, 'days').format(format);
  const startDate = moment(new Date())
    .subtract(range - 1, 'days')
    .format(format);
  return {
    startDate,
    endDate,
  };
};

/**
 *
 * @param range
 * @param format
 * @returns 构建时间范围数组
 */
export const getDateRangeList = (range: number, format = 'YYYY-MM-DD') => {
  const list: string[] = [];
  for (let i = 0; i < range; i++) {
    list.push(moment(new Date()).subtract(i, 'days').format(format));
  }
  return list;
};

/**
 *
 * @param date
 * @param format
 * @returns 日期格式化
 */
export const dateFormat = (date: Date | string, format = 'YYYY-MM-DD') => {
  return moment(date).format(format);
};
