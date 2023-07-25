/*
Navicat MySQL Data Transfer

Source Server         : 测试
Source Server Version : 50549
Source Host           : localhost:3306
Source Database       : login

Target Server Type    : MYSQL
Target Server Version : 50549
File Encoding         : 65001

Date: 2020-08-31 16:07:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `sex` varchar(255) DEFAULT NULL,
  `age` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `hou` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES ('1', '小刘', null, '15', '北京', null);
INSERT INTO `students` VALUES ('2', '小张', '1', '12', '金华', null);
INSERT INTO `students` VALUES ('3', '小猴', '0', '13', '河南', null);
INSERT INTO `students` VALUES ('5', '老王头', '0', '30', '隔壁', null);
INSERT INTO `students` VALUES ('6', '小老王', '0', '12', '吉林', '3');
INSERT INTO `students` VALUES ('31', '小王头2', '1', '12', '吉林', null);
INSERT INTO `students` VALUES ('32', '123', ' ', '123', '123', null);
INSERT INTO `students` VALUES ('33', '1234', ' ', '1233', '123', null);
INSERT INTO `students` VALUES ('34', '12345', ' ', '1233', '123', null);
INSERT INTO `students` VALUES ('35', '123321', ' ', '124', '14', null);
INSERT INTO `students` VALUES ('36', '123312', ' ', '124', '412', null);
INSERT INTO `students` VALUES ('38', '1232314124', ' ', '321', '123', null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('admin', '123456', '1');
