import { SetMetadata } from '@nestjs/common';

/**
 * 公共密钥：IS_PUBLIC_KEY
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * 设置元数据，将IS_PUBLIC_KEY的值设置为true
 */
export const isPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
