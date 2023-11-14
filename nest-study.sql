DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(255) NOT NULL COMMENT '用户姓名',
  `birthday` datetime NOT NULL COMMENT '用户生日',
  `gender` varchar(2) NOT NULL COMMENT '用户性别 0 男 1 女',
  `id_number` varchar(18) NOT NULL COMMENT '身份证号码',
  `phone` varchar(11) NOT NULL COMMENT '手机号',
  `username` varchar(64) NOT NULL COMMENT '账户名称-登陆时的账号',
  `password` varchar(64) NOT NULL COMMENT '账户密码',
  `status` int NOT NULL DEFAULT '1' COMMENT '状态 0:禁用，1:正常',
  `avatar` varchar(255) NOT NULL COMMENT '头像',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `create_user` bigint NOT NULL COMMENT '创建人',
  `update_user` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `id_number` (`id_number`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COMMENT='员工信息表';

-- ----------------------------
-- Records of employee
-- ----------------------------
BEGIN;
INSERT INTO `employee` VALUES (1, '超级管理员', '2000-01-01 00:00:00', '0', '130725111111111111', '13333333333', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 1, 'https://tse4-mm.cn.bing.net/th/id/OIP-C.y2CeSO5xZJ1SjSskl1dqzwHaEo?w=279&h=180&c=7&r=0&o=5&dpr=2&pid=1.7', '2023-01-13 10:57:00', '2023-02-02 10:34:49', 1, 1);
INSERT INTO `employee` VALUES (2, '员工01', '2003-01-01 00:00:00', '0', '111111111111111111', '18888888888', 'user1', 'e10adc3949ba59abbe56e057f20f883e', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/d1769499-1690-434e-b030-049882fe23eb.jpg', '2023-02-01 14:57:25', '2023-02-01 14:57:25', 1, 1);
INSERT INTO `employee` VALUES (3, '员工02', '2003-01-01 00:00:00', '0', '211111111111111111', '18888888888', 'user2', 'e10adc3949ba59abbe56e057f20f883e', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/d1769499-1690-434e-b030-049882fe23eb.jpg', '2023-02-01 14:57:33', '2023-02-01 14:57:33', 1, 1);
INSERT INTO `employee` VALUES (4, '员工03', '2003-01-01 00:00:00', '0', '311111111111111111', '18888888888', 'user3', 'e10adc3949ba59abbe56e057f20f883e', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/d1769499-1690-434e-b030-049882fe23eb.jpg', '2023-02-01 14:57:46', '2023-02-01 14:57:46', 1, 1);
INSERT INTO `employee` VALUES (5, '员工04', '2003-01-01 00:00:00', '0', '411111111111111111', '18888888888', 'user4', 'e10adc3949ba59abbe56e057f20f883e', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/d1769499-1690-434e-b030-049882fe23eb.jpg', '2023-02-01 14:57:55', '2023-02-01 14:57:55', 1, 1);
INSERT INTO `employee` VALUES (6, '员工05', '2003-01-01 00:00:00', '0', '511111111111111111', '18888888888', 'user5', 'e10adc3949ba59abbe56e057f20f883e', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/d1769499-1690-434e-b030-049882fe23eb.jpg', '2023-02-01 14:58:05', '2023-02-01 14:58:05', 1, 1);
INSERT INTO `employee` VALUES (8, '员工06', '2003-01-01 00:00:00', '0', '611111111111111111', '18888888888', 'user6', 'e10adc3949ba59abbe56e057f20f883e', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/d1769499-1690-434e-b030-049882fe23eb.jpg', '2023-02-01 14:58:16', '2023-02-01 14:58:16', 1, 1);
INSERT INTO `employee` VALUES (9, '员工07', '2003-01-01 00:00:00', '0', '711111111111111111', '18888888888', 'user7', 'e10adc3949ba59abbe56e057f20f883e', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/d1769499-1690-434e-b030-049882fe23eb.jpg', '2023-02-01 14:58:28', '2023-02-01 14:58:28', 1, 1);
INSERT INTO `employee` VALUES (10, '员工08', '2003-01-01 00:00:00', '0', '811111111111111111', '18888888888', 'user8', 'e10adc3949ba59abbe56e057f20f883e', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/d1769499-1690-434e-b030-049882fe23eb.jpg', '2023-02-01 14:58:40', '2023-02-01 14:58:40', 1, 1);
INSERT INTO `employee` VALUES (11, '员工09', '2003-01-01 00:00:00', '0', '911111111111111111', '18888888888', 'user9', 'e10adc3949ba59abbe56e057f20f883e', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/d1769499-1690-434e-b030-049882fe23eb.jpg', '2023-02-01 14:58:54', '2023-02-01 14:58:54', 1, 1);
INSERT INTO `employee` VALUES (12, '员工10', '2003-01-01 00:00:00', '0', '101111111111111111', '18888888888', 'user10', 'e10adc3949ba59abbe56e057f20f883e', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/d1769499-1690-434e-b030-049882fe23eb.jpg', '2023-02-01 14:59:06', '2023-02-01 14:59:06', 1, 1);
COMMIT;