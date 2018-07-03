-- Adminer 4.6.2 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `f_id` int(11) NOT NULL AUTO_INCREMENT,
  `f_title` varchar(99) NOT NULL,
  `f_file` varchar(99) NOT NULL,
  `f_datetime` datetime NOT NULL,
  `f_user` varchar(99) NOT NULL,
  PRIMARY KEY (`f_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `files` (`f_id`, `f_title`, `f_file`, `f_datetime`, `f_user`) VALUES
(12,	'Sample Title',	'document.txt',	'2018-06-09 13:28:58',	'1'),
(15,	'dfgdfgdfg',	'test.txt',	'2018-06-09 13:32:45',	'1'),
(16,	'Another File',	'test_1528531581973_.txt',	'2018-06-09 13:36:22',	'1'),
(17,	'My First File',	'test_1529139939050_.txt',	'2018-06-16 14:35:39',	'8');

DROP TABLE IF EXISTS `request`;
CREATE TABLE `request` (
  `r_id` int(11) NOT NULL AUTO_INCREMENT,
  `r_by` varchar(99) NOT NULL,
  `r_to` varchar(99) NOT NULL,
  `r_status` varchar(99) NOT NULL,
  `r_timestamp` datetime NOT NULL,
  PRIMARY KEY (`r_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `request` (`r_id`, `r_by`, `r_to`, `r_status`, `r_timestamp`) VALUES
(1,	'1',	'1',	'accepted',	'2018-05-31 17:59:05'),
(2,	'1',	'2',	'requested',	'2018-05-31 18:00:44'),
(4,	'1',	'7',	'requested',	'2018-06-01 11:01:31'),
(5,	'1',	'7',	'requested',	'2018-06-01 11:03:31'),
(6,	'7',	'5',	'requested',	'2018-06-08 17:55:26'),
(9,	'6',	'7',	'requested',	'2018-06-08 17:55:26'),
(10,	'7',	'1',	'accepted',	'2018-06-09 12:30:18'),
(11,	'7',	'2',	'requested',	'2018-06-09 12:30:20'),
(12,	'7',	'3',	'requested',	'2018-06-09 12:30:22'),
(13,	'7',	'4',	'requested',	'2018-06-09 12:30:24'),
(14,	'7',	'6',	'requested',	'2018-06-09 12:30:26'),
(15,	'9',	'8',	'accepted',	'2018-06-16 14:39:56');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_username` varchar(99) NOT NULL,
  `u_password` varchar(99) NOT NULL,
  `u_email` varchar(99) NOT NULL,
  `u_firstname` varchar(99) NOT NULL,
  `u_lastname` varchar(99) NOT NULL,
  `u_phone` varchar(99) NOT NULL,
  `u_address` varchar(99) NOT NULL,
  `u_user_type` varchar(99) NOT NULL,
  `u_profilePic` varchar(99) NOT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`u_id`, `u_username`, `u_password`, `u_email`, `u_firstname`, `u_lastname`, `u_phone`, `u_address`, `u_user_type`, `u_profilePic`) VALUES
(1,	'admin',	'admin',	'santosh',	'Santosh',	'Narwade',	'9175129361',	'Akola',	'Owner',	'ProfilePic_1_.png'),
(2,	'dsfsdf',	'sdfsdf',	'dsfsdf',	'sdfsdf',	'sdfsdf',	'sdfdf',	'sdfsdf',	'Owner',	''),
(3,	'dsfsdf',	'sdfsdf',	'dsfsdf',	'sdfsdf',	'sdfsdf',	'sdfdf',	'sdfsdf',	'Owner',	''),
(4,	'retert',	'ertert',	'ertertert',	'wrterter',	'tertert',	'ertert',	'ertert',	'Owner',	''),
(5,	'sdfsdfsdfsdfsd',	'fsdfsdf',	'dfsdfs',	'dfasdfsdaf',	'sdfsdfs',	'dfsdfs',	'dfsdfsdf',	'Owner',	''),
(6,	'sdfsdfsdfsdfsd',	'fsdfsdf',	'dfsdfs',	'dfasdfsdaf',	'sdfsdfs',	'dfsdfs',	'dfsdfsdf',	'Owner',	''),
(7,	'santoshs',	'santoshs',	'santosh@gmail.com',	'santosh',	'narwade',	'9175129361',	'Kamptee',	'User',	'ProfilePic_7_.png'),
(8,	'tejutule',	'teju',	'teju@gmail.com',	'tejuy',	'tule',	'945859345',	'Nagpur',	'Owner',	''),
(9,	'manoj',	'manoj',	'manoj@gmail.com',	'Manoj',	'manoj',	'74584543543',	'manoj ramtek',	'User',	'ProfilePic_9_.png');

-- 2018-07-03 12:55:39
