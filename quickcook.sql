-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 26, 2022 at 05:49 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quickcook`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `userId` int(255) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productQnty` int(255) NOT NULL,
  `productCtgry` varchar(255) NOT NULL,
  `productImg` varchar(255) NOT NULL,
  `addedon` timestamp(6) NOT NULL,
  `addedBy` varchar(255) NOT NULL,
  `productPrice` double NOT NULL,
  `ratePerKg` varchar(255) NOT NULL,
  `productId` int(255) NOT NULL,
  `orderPlaced` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=589 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `userId`, `productName`, `productQnty`, `productCtgry`, `productImg`, `addedon`, `addedBy`, `productPrice`, `ratePerKg`, `productId`, `orderPlaced`) VALUES
(588, 124, 'Pumkin', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669395324.jpg', '2022-11-26 16:56:56.899000', 'Ashraf@123', 25, '25', 80, 'No'),
(587, 124, 'Potato', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669009749.jpg', '2022-11-26 16:56:55.017000', 'Ashraf@123', 25, '25', 76, 'No'),
(586, 124, 'Capsicum', 3, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-26 14:48:05.109000', 'Ashraf@123', 165, '55', 78, 'No'),
(585, 109, 'Capsicum', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-25 18:04:45.342000', 'Ashraf Jamal', 55, '55', 78, 'YES'),
(584, 109, 'Potato', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669009749.jpg', '2022-11-25 18:04:39.038000', 'Ashraf Jamal', 25, '25', 76, 'YES'),
(582, 109, 'Tomato', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661673042413.jpg', '2022-11-14 03:25:01.421000', 'Ashraf Jamal', 25, '25', 82, 'YES'),
(583, 109, 'Capsicum', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-18 20:22:15.219000', 'Ashraf Jamal', 55, '55', 78, 'YES'),
(581, 109, 'Orange', 1, 'Fruits', 'http://localhost:8000/product/picture/productImg_1661667977333.jpg', '2022-11-13 17:36:37.728000', 'Ashraf Jamal', 45, '45', 73, 'YES'),
(580, 109, 'Potato', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669009749.jpg', '2022-11-13 17:36:05.213000', 'Ashraf Jamal', 25, '25', 76, 'YES'),
(578, 109, 'Capsicum', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-13 13:03:26.054000', 'Ashraf Jamal', 55, '55', 78, 'YES'),
(579, 109, 'Potato', 2, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669009749.jpg', '2022-11-13 13:03:27.614000', 'Ashraf Jamal', 50, '25', 76, 'YES'),
(574, 109, 'Lychee', 1, 'Fruits', 'http://localhost:8000/product/picture/productImg_1661668042138.jpg', '2022-11-13 04:30:12.471000', 'Ashraf Jamal', 35, '35', 74, 'YES'),
(575, 109, 'Banana', 1, 'Fruits', 'http://localhost:8000/product/picture/productImg_1661667721009.jpg', '2022-11-13 04:30:22.513000', 'Ashraf Jamal', 35, '35', 71, 'YES'),
(576, 109, 'Capsicum', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-13 12:27:59.556000', 'Ashraf Jamal', 55, '55', 78, 'YES'),
(577, 109, 'Potato', 2, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669009749.jpg', '2022-11-13 12:28:01.862000', 'Ashraf Jamal', 50, '25', 76, 'YES'),
(572, 109, 'Orange', 1, 'Fruits', 'http://localhost:8000/product/picture/productImg_1661667977333.jpg', '2022-11-13 04:29:57.696000', 'Ashraf Jamal', 45, '45', 73, 'YES'),
(573, 109, 'Mango', 1, 'Fruits', 'http://localhost:8000/product/picture/productImg_1661667424789.jpg', '2022-11-13 04:30:01.794000', 'Ashraf Jamal', 55, '55', 70, 'YES'),
(570, 109, 'Capsicum', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-12 11:13:54.119000', 'Ashraf Jamal', 55, '55', 78, 'YES'),
(569, 109, 'Potato', 2, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669009749.jpg', '2022-11-12 11:13:40.276000', 'Ashraf Jamal', 50, '25', 76, 'YES'),
(568, 109, 'Capsicum', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-12 11:13:38.551000', 'Ashraf Jamal', 55, '55', 78, 'YES'),
(567, 109, 'Potato', 2, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669009749.jpg', '2022-11-12 11:12:19.097000', 'Ashraf Jamal', 50, '25', 76, 'YES'),
(566, 109, 'Capsicum', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-12 11:12:17.575000', 'Ashraf Jamal', 55, '55', 78, 'YES'),
(565, 109, 'Capsicum', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-12 11:11:33.052000', 'Ashraf Jamal', 55, '55', 78, 'YES'),
(564, 109, 'Chilli', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661668938959.jpg', '2022-11-12 11:11:21.374000', 'Ashraf Jamal', 10, '10', 75, 'YES'),
(563, 109, 'Potato', 2, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669009749.jpg', '2022-11-12 11:11:10.444000', 'Ashraf Jamal', 50, '25', 76, 'YES'),
(562, 109, 'Capsicum', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-12 11:10:57.652000', 'Ashraf Jamal', 55, '55', 78, 'YES'),
(561, 109, 'Capsicum', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-12 11:10:46.388000', 'Ashraf Jamal', 55, '55', 78, 'YES'),
(560, 109, 'Radish', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669341075.jpg', '2022-11-12 11:10:28.159000', 'Ashraf Jamal', 35, '35', 79, 'YES'),
(559, 109, 'Pumkin', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669395324.jpg', '2022-11-12 11:10:26.122000', 'Ashraf Jamal', 25, '25', 80, 'YES'),
(555, 109, 'Capsicum', 2, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-12 11:10:18.469000', 'Ashraf Jamal', 110, '55', 78, 'YES'),
(556, 109, 'Potato', 2, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669009749.jpg', '2022-11-12 11:10:21.835000', 'Ashraf Jamal', 50, '25', 76, 'YES'),
(558, 109, 'Brinjal', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661673121145.jpg', '2022-11-12 11:10:24.683000', 'Ashraf Jamal', 25, '25', 83, 'YES'),
(547, 109, 'Potato', 2, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669009749.jpg', '2022-11-09 18:49:31.004000', 'Ashraf Jamal', 50, '25', 76, 'YES'),
(557, 109, 'Chilli', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661668938959.jpg', '2022-11-12 11:10:23.329000', 'Ashraf Jamal', 10, '10', 75, 'YES'),
(540, 109, 'Capsicum', 2, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-09 18:47:44.356000', 'Ashraf Jamal', 110, '55', 78, 'YES'),
(539, 109, 'Capsicum', 2, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '2022-11-09 18:44:10.572000', 'Ashraf Jamal', 110, '55', 78, 'YES'),
(536, 114, 'Potato', 1, 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669009749.jpg', '2022-10-27 17:20:49.683000', 'TestTest', 25, '25', 76, 'YES'),
(538, 109, 'Lychee', 1, 'Fruits', 'http://localhost:8000/product/picture/productImg_1661668042138.jpg', '2022-11-04 18:05:19.549000', 'Ashraf Jamal', 35, '35', 74, 'YES');

-- --------------------------------------------------------

--
-- Table structure for table `deliveryaddress`
--

DROP TABLE IF EXISTS `deliveryaddress`;
CREATE TABLE IF NOT EXISTS `deliveryaddress` (
  `delvryAddId` int(25) NOT NULL AUTO_INCREMENT,
  `block` varchar(100) NOT NULL,
  `dist` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(8) NOT NULL,
  `landmark` varchar(150) NOT NULL,
  `houseno` varchar(150) DEFAULT NULL,
  `streetno` varchar(150) DEFAULT NULL,
  `add1` varchar(150) DEFAULT NULL,
  `userId` varchar(25) NOT NULL,
  `addedon` datetime(6) NOT NULL,
  `addedby` varchar(25) NOT NULL,
  `lastmodifiedby` varchar(25) DEFAULT NULL,
  `lastmodifiedon` datetime(6) DEFAULT NULL,
  `receivercontact` varchar(11) NOT NULL,
  PRIMARY KEY (`delvryAddId`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `deliveryaddress`
--

INSERT INTO `deliveryaddress` (`delvryAddId`, `block`, `dist`, `state`, `pincode`, `landmark`, `houseno`, `streetno`, `add1`, `userId`, `addedon`, `addedby`, `lastmodifiedby`, `lastmodifiedon`, `receivercontact`) VALUES
(20, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'Area One', 'JIkjis', 'nbdvghdvhgd', 'djshdgvs', '109', '2022-10-06 22:18:52.749000', 'Ashraf Jamal', NULL, NULL, '1111111111'),
(19, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'Area One', 'H-2', 'Aststrs Sss', 'shggdgd bdgd', '114', '2022-10-05 11:57:29.532000', 'TestTest', NULL, NULL, '1111111112'),
(18, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'ssasassassas', NULL, NULL, NULL, '114', '2022-10-05 11:43:23.047000', 'TestTest', NULL, NULL, '1111111111'),
(17, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'ssasassassassa', NULL, NULL, 'ddwff', '109', '2022-10-05 11:39:57.270000', 'Ashraf Jamal', NULL, NULL, '1111111111'),
(16, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'Area One', 'sasa', 'fg', 'ddwff', '109', '2022-10-05 11:39:31.986000', 'Ashraf Jamal', NULL, NULL, '1111111111'),
(15, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'Area One', 'dsdsds', 'dsdsdssz21`213', 'ddscc', '110', '2022-10-05 10:52:40.688000', 'Admin User', NULL, NULL, '9939176060'),
(13, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'ssasassas', NULL, NULL, NULL, '110', '2022-10-05 10:48:01.164000', 'Admin User', NULL, NULL, '1111111111'),
(14, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'Area One', NULL, NULL, NULL, '110', '2022-10-05 10:49:42.538000', 'Admin User', NULL, NULL, '1111111111'),
(21, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'ssasassas', NULL, NULL, NULL, '115', '2022-10-11 10:23:58.680000', 'Customer1', NULL, NULL, '8558888888'),
(22, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'Area One', NULL, NULL, NULL, '109', '2022-11-04 23:33:39.867000', 'Ashraf Jamal', NULL, NULL, '8888888888'),
(23, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'ssasassas', NULL, NULL, NULL, '109', '2022-11-10 00:13:51.942000', 'Ashraf Jamal', NULL, NULL, '5555555554'),
(24, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'ssasassassassa', 'sdasd', 'sd', NULL, '118', '2022-11-12 14:28:12.975000', 'farah nasreen', NULL, NULL, '7260945885'),
(25, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'ssasassassassa', NULL, NULL, NULL, '109', '2022-11-13 18:35:34.879000', 'Ashraf Jamal', NULL, NULL, '8877772526'),
(26, 'Kishanganj', 'Kishanganj', 'Bihar', '855107', 'ssasassassassa', NULL, NULL, NULL, '109', '2022-11-13 18:36:42.407000', 'Ashraf Jamal', NULL, NULL, '8877772526');

-- --------------------------------------------------------

--
-- Table structure for table `dlvryptnrlocatn`
--

DROP TABLE IF EXISTS `dlvryptnrlocatn`;
CREATE TABLE IF NOT EXISTS `dlvryptnrlocatn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(25) NOT NULL,
  `addedon` timestamp NOT NULL,
  `pincode` text NOT NULL,
  `landmark` varchar(255) NOT NULL,
  `status` varchar(10) NOT NULL,
  `addedby` varchar(25) NOT NULL,
  `lastmodifiedby` varchar(25) DEFAULT NULL,
  `lastmodifiedon` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dlvryptnrlocatn`
--

INSERT INTO `dlvryptnrlocatn` (`id`, `userId`, `addedon`, `pincode`, `landmark`, `status`, `addedby`, `lastmodifiedby`, `lastmodifiedon`) VALUES
(4, 131, '2022-11-23 20:16:31', '855107', 'Area One', 'Active', 'Delivery Boy Two', 'Ashraf@123', '2022-11-26 17:02:40'),
(5, 132, '2022-11-25 17:14:55', '799005', 'sascaccdcsdcsasassassas', 'Active', 'D3', 'Ashraf@123', '2022-11-26 17:02:41');

-- --------------------------------------------------------

--
-- Table structure for table `landmarks`
--

DROP TABLE IF EXISTS `landmarks`;
CREATE TABLE IF NOT EXISTS `landmarks` (
  `landMId` int(11) NOT NULL AUTO_INCREMENT,
  `pincode` varchar(255) NOT NULL,
  `landmark` varchar(255) NOT NULL,
  `SAID` varchar(255) NOT NULL,
  PRIMARY KEY (`landMId`),
  UNIQUE KEY `landmark` (`landmark`),
  UNIQUE KEY `sAId` (`landMId`)
) ENGINE=MyISAM AUTO_INCREMENT=142 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `landmarks`
--

INSERT INTO `landmarks` (`landMId`, `pincode`, `landmark`, `SAID`) VALUES
(139, '855115', 'ABC', '26'),
(141, '855115', 'jhvgh', '26'),
(140, '855115', 'ABC1', '26'),
(138, '855107', 'TEST THREE', '25'),
(137, '855107', 'TEST TWO', '25'),
(136, '855107', 'TEST ONE', '25');

-- --------------------------------------------------------

--
-- Table structure for table `modulepermission`
--

DROP TABLE IF EXISTS `modulepermission`;
CREATE TABLE IF NOT EXISTS `modulepermission` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `moduleId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=103 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `modulepermission`
--

INSERT INTO `modulepermission` (`id`, `userId`, `moduleId`) VALUES
(95, '124', '4'),
(94, '124', '3'),
(93, '124', '2'),
(92, '124', '1'),
(91, '123', '3'),
(90, '119', '5'),
(89, '116', '5'),
(88, '116', '4'),
(87, '116', '3'),
(86, '116', '2'),
(85, '116', '1'),
(84, '114', '4'),
(69, '113', '3'),
(67, '111', '3'),
(64, '110', '5'),
(63, '110', '4'),
(62, '110', '3'),
(61, '110', '2'),
(60, '110', '1'),
(83, '109', '5'),
(82, '109', '4'),
(81, '109', '3'),
(80, '109', '2'),
(79, '109', '1'),
(72, '108', '1'),
(96, '124', '5'),
(97, '127', '3'),
(98, '128', '3'),
(99, '129', '4'),
(100, '130', '3'),
(101, '131', '3'),
(102, '132', '3');

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
CREATE TABLE IF NOT EXISTS `modules` (
  `moduleId` int(6) NOT NULL AUTO_INCREMENT,
  `moduleName` varchar(255) NOT NULL,
  PRIMARY KEY (`moduleId`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`moduleId`, `moduleName`) VALUES
(1, 'Admin'),
(2, 'Common'),
(3, 'Delivery'),
(4, 'Catalogue'),
(5, 'Supplier');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` varchar(255) NOT NULL,
  `orderBy` varchar(255) NOT NULL,
  `orderOn` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `orderStatus` varchar(255) NOT NULL,
  `paymentStatus` varchar(255) NOT NULL,
  `paymentMode` varchar(255) NOT NULL,
  `Amount` varchar(255) NOT NULL,
  `productIds` varchar(25) NOT NULL,
  `addressId` varchar(25) NOT NULL,
  `RetrnReqBy` varchar(25) DEFAULT NULL,
  `RetrnReqOn` timestamp(6) NULL DEFAULT NULL,
  `RetrnReqResn` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=205 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `orderId`, `orderBy`, `orderOn`, `userId`, `orderStatus`, `paymentStatus`, `paymentMode`, `Amount`, `productIds`, `addressId`, `RetrnReqBy`, `RetrnReqOn`, `RetrnReqResn`) VALUES
(197, 'orderId_1668313818258109', 'Ashraf Jamal', '2022-11-13 10:00:18.278', '109', 'Delivered', 'Paid', 'COD', '35', '574', '22', NULL, NULL, NULL),
(198, 'orderId_1668313829302109', 'Ashraf Jamal', '2022-11-13 10:00:29.322', '109', 'Order Received', 'Pending', 'COD', '35', '575', '22', NULL, NULL, NULL),
(195, 'orderId_1668313213105109', 'Ashraf Jamal', '2022-11-13 09:50:13.131', '109', 'Order Received', 'Pending', 'COD', '25', '571', '16', NULL, NULL, NULL),
(196, 'orderId_1668313807588109', 'Ashraf Jamal', '2022-11-13 10:00:07.607', '109', 'Order Received', 'Pending', 'COD', '100', '572,573', '22', NULL, NULL, NULL),
(185, 'orderId_1668244788381118', 'farah nasreen', '2022-11-12 14:49:48.389', '118', 'Order Received', 'Pending', 'COD', '90', '554,552,553', '24', NULL, NULL, NULL),
(186, 'orderId_1668251442016109', 'Ashraf Jamal', '2022-11-12 16:40:42.022', '109', 'Order Received', 'Pending', 'COD', '255', '560,559,555,556,558,557', '22', NULL, NULL, NULL),
(187, 'orderId_1668251451551109', 'Ashraf Jamal', '2022-11-12 16:40:51.557', '109', 'Order Received', 'Pending', 'COD', '55', '561', '22', NULL, NULL, NULL),
(188, 'orderId_1668251464481109', 'Ashraf Jamal', '2022-11-12 16:41:04.487', '109', 'Order Received', 'Pending', 'COD', '55', '562', '22', NULL, NULL, NULL),
(189, 'orderId_1668251475794109', 'Ashraf Jamal', '2022-11-12 16:41:15.800', '109', 'Order Received', 'Pending', 'COD', '25', '563', '22', NULL, NULL, NULL),
(190, 'orderId_1668251487762109', 'Ashraf Jamal', '2022-11-12 16:41:27.768', '109', 'Order Received', 'Pending', 'COD', '10', '564', '22', NULL, NULL, NULL),
(191, 'orderId_1668251499066109', 'Ashraf Jamal', '2022-11-12 16:41:39.071', '109', 'Order Canceled', 'Pending', 'COD', '55', '565', '22', NULL, NULL, NULL),
(192, 'orderId_1668251556785109', 'Ashraf Jamal', '2022-11-12 16:42:36.793', '109', 'Order Received', 'Pending', 'COD', '80', '567,566', '22', NULL, NULL, NULL),
(193, 'orderId_1668251625224109', 'Ashraf Jamal', '2022-11-12 16:43:45.230', '109', 'Order Received', 'Pending', 'COD', '80', '569,568', '22', NULL, NULL, NULL),
(194, 'orderId_1668251641118109', 'Ashraf Jamal', '2022-11-12 16:44:01.123', '109', 'Order Received', 'Pending', 'COD', '55', '570', '22', NULL, NULL, NULL),
(183, 'orderId_1668019775645109', 'Ashraf Jamal', '2022-11-10 00:19:35.667', '109', 'Order Received', 'Pending', 'COD', '80', '547,540', '23', NULL, NULL, NULL),
(184, 'orderId_1668243520629118', 'farah nasreen', '2022-11-12 14:28:40.638', '118', 'Order Received', 'Pending', 'COD', '150', '551,550,549,548', '24', NULL, NULL, NULL),
(181, 'orderId_1667585127077109', 'Ashraf Jamal', '2022-11-04 23:35:27.083', '109', 'Order Delivered', 'Pending', 'COD', '35', '538', '22', NULL, NULL, NULL),
(182, 'orderId_1668019499881109', 'Ashraf Jamal', '2022-11-10 00:14:59.892', '109', 'Order Received', 'Pending', 'COD', '55', '539', '23', NULL, NULL, NULL),
(178, 'orderId_1666083634469109', 'Ashraf Jamal', '2022-10-18 14:30:34.476', '109', 'Order Received', 'Pending', 'COD', '125', '533,532,531', '17', NULL, NULL, NULL),
(179, 'orderId_1666890998874114', 'TestTest', '2022-10-27 22:46:38.881', '114', 'Order Received', 'Pending', 'COD', '10', '535', '19', NULL, NULL, NULL),
(180, 'orderId_1666891259825114', 'TestTest', '2022-10-27 22:50:59.833', '114', 'Order Received', 'Pending', 'COD', '25', '536', '18', NULL, NULL, NULL),
(199, 'orderId_1668342486850109', 'Ashraf Jamal', '2022-11-13 17:58:06.860', '109', 'Order Received', 'Pending', 'COD', '80', '576,577', '16', NULL, NULL, NULL),
(200, 'orderId_1668344613513109', 'Ashraf Jamal', '2022-11-13 18:33:33.520', '109', 'Order Received', 'Pending', 'COD', '105', '578,579', '23', NULL, NULL, NULL),
(201, 'orderId_1668361296721109', 'Ashraf Jamal', '2022-11-13 23:11:36.727', '109', 'Order Received', 'Pending', 'COD', '70', '581,580', '16', NULL, NULL, NULL),
(202, 'orderId_1668481336279109', 'Ashraf Jamal', '2022-11-15 08:32:16.292', '109', 'Order Received', 'Pending', 'COD', '25', '582', '26', NULL, NULL, NULL),
(203, 'orderId_1668803171642109', 'Ashraf Jamal', '2022-11-19 01:56:11.650', '109', 'Order Received', 'Pending', 'COD', '55', '583', '22', NULL, NULL, NULL),
(204, 'orderId_1669400424362109', 'Ashraf Jamal', '2022-11-25 23:50:24.377', '109', 'Order Received', 'Pending', 'COD', '80', '585,584', '20', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
CREATE TABLE IF NOT EXISTS `otp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `otpId` varchar(100) NOT NULL,
  `otp` int(6) NOT NULL,
  `addedOn` timestamp(6) NOT NULL,
  `addedBy` varchar(55) NOT NULL,
  `contact` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=126 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`id`, `otpId`, `otp`, `addedOn`, `addedBy`, `contact`) VALUES
(110, '4ry8i23nx538ctpmqo3lue', 593596, '2022-11-10 18:31:27.072000', 'Admin Admin', '8436513244'),
(109, 'o2wyza621jxr3uj68tjic', 876662, '2022-11-10 17:34:33.688000', 'pritam atta', '8001695524'),
(108, 'ugaab4175gznobmtrrfdj', 755698, '2022-11-10 17:33:11.362000', 'Ashraf Jamal', '6299623761'),
(107, 'pm0ve4p7d0nxfnnucrl7ec', 197482, '2022-11-10 17:31:51.180000', 'Admin Admin', '8436513244'),
(106, '5q4gle6zvcqs3n8c6zmooq', 347016, '2022-11-10 17:31:03.658000', 'Admin Admin', '8436513244'),
(105, 'h3w61xdngs90j6qj4fzm1ca', 628314, '2022-11-10 17:27:58.886000', 'Admin Admin', '8436513244'),
(104, '4jnrqgmxsq3oj4vn0jop8s', 910781, '2022-11-10 17:24:15.234000', 'Admin Admin', '8436513244'),
(103, '4y6wc06ncq92aabkw0pro8', 421220, '2022-11-10 17:18:52.401000', 'Ashraf Jamal', '6299623761'),
(102, '72xn2syuo9r8bfizmirn1b', 367907, '2022-11-10 17:11:52.390000', 'Admin Admin', '8436513244'),
(101, '2s462ga7kzkt2x2kx0cx', 590435, '2022-11-10 17:10:22.700000', 'Admin Admin', '8436513244'),
(100, '51olrphsmn9n9gtfmni9vr', 184004, '2022-11-10 16:59:43.535000', 'Admin Admin', '8436513244'),
(98, 'b2mvwhnlcftyk4n4t26wkj', 385676, '2022-11-09 20:31:59.148000', 'Ashraf Jamal', '6299623761'),
(97, 'd3jz8fxzh29wj03cjvt6t', 111855, '2022-11-09 20:27:27.517000', 'Ashraf Jamal', '6299623761'),
(96, 'bsujg7evwkva2ze36frlyn', 518561, '2022-11-09 20:22:34.241000', 'Ashraf Jamal', '6299623761'),
(95, '7ktibsuwqj4epdw1la0dc', 142792, '2022-11-09 19:07:03.066000', 'Ashraf Jamal', '6299623761'),
(88, '6nptbt0z1jg6043of3nocm', 892308, '2022-11-09 18:53:12.670000', 'Ashraf Jamal', '6299623761'),
(86, 'm26py8jv9k21wvoqfy5jx', 782312, '2022-11-09 18:51:38.158000', 'Ashraf Jamal', '6299623761'),
(85, 'qzuexw4kk098fi0pzz2loi', 798223, '2022-11-09 17:55:28.286000', 'Ashraf Jamal', '6299623761'),
(84, '7ugfl0h5a39ihudgba0ze8', 926752, '2022-11-09 17:02:44.409000', 'Ashraf Jamal', '6299623761'),
(83, 'kn7p4m73muw9v6jj461kq', 328478, '2022-11-09 16:59:38.113000', 'Ashraf Jamal', '6299623761'),
(53, 'pk2lmsbcjdgtgt7iph1rv', 225403, '2022-11-07 20:01:17.106000', 'Ashraf Jamal', '6299623761'),
(52, 'vuhry4vchan8vcmpir0yfa', 230265, '2022-11-07 20:00:20.092000', 'Ashraf Jamal', '6299623761'),
(51, 'h9m4jqk1z5itwyx2yv7wq', 421251, '2022-11-07 19:59:19.599000', 'Ashraf Jamal', '6299623761'),
(50, 'ceixbjfp29g5mb5ncao92n', 317554, '2022-11-06 17:17:54.412000', 'Ashraf Jamal', '6299623761'),
(48, 'pey287k81gnnhbl87qaqhn', 285608, '2022-11-06 17:15:36.149000', 'Ashraf Jamal', '6299623761'),
(49, 'pr2fr0b8dpom4i9p92hfw', 881657, '2022-11-06 17:16:24.494000', 'Ashraf Jamal', '6299623761'),
(111, 'qxf6ngaobuezysghmmbh2n', 275815, '2022-11-12 08:33:22.214000', 'Admin Admin', '8436513245'),
(112, 'jxp4q9op4fa2cf8c9je92l', 111939, '2022-11-12 10:11:36.671000', 'Ashraf Jamal', '6299623761'),
(113, 'iqghgarfnrq9auno4h9r9l', 108561, '2022-11-17 18:45:26.780000', 'Reza Samshi', '8877772526'),
(114, 'todta1khmk38zprpz62ek', 341946, '2022-11-19 11:23:55.424000', 'Ashraf@123', '9939173044'),
(116, '1sqm0s3723e2j9shmc2hpe', 289368, '2022-11-20 05:13:26.561000', 'Ashraf Jamal', '7777777777'),
(117, 'muv40742gvjjp8xz7fo67m', 456236, '2022-11-23 03:24:19.435000', 'Delivery Boy Two', '8123456789'),
(118, '16g4txw5u42m1y1p50nsx8', 823822, '2022-11-25 18:24:14.642000', 'Ashraf@123', '9939173044'),
(119, 'kbhyoa8xvjf9gdll89339', 223696, '2022-11-26 17:16:03.048000', 'Ashraf Jamal', '6299623761'),
(124, '0gqd82bfh7vs6oytsdej8ib', 120025, '2022-11-26 17:21:57.396000', 'Ashraf Jamal', '6299623761');

-- --------------------------------------------------------

--
-- Table structure for table `productctgrylist`
--

DROP TABLE IF EXISTS `productctgrylist`;
CREATE TABLE IF NOT EXISTS `productctgrylist` (
  `pcId` int(11) NOT NULL AUTO_INCREMENT,
  `pctgryName` varchar(255) NOT NULL,
  `pctgryImg` varchar(255) NOT NULL,
  `lastModifyBy` varchar(255) DEFAULT NULL,
  `lastModifyDate` timestamp(6) NULL DEFAULT NULL,
  `uploadedBy` varchar(255) DEFAULT NULL,
  `uploadedDate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pcId`),
  UNIQUE KEY `ctgryName` (`pctgryName`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productctgrylist`
--

INSERT INTO `productctgrylist` (`pcId`, `pctgryName`, `pctgryImg`, `lastModifyBy`, `lastModifyDate`, `uploadedBy`, `uploadedDate`) VALUES
(58, 'Fish', 'http://localhost:8000/category/picture/prodCtgryImg_1661666307830.jpeg', 'Ashraf Jamal', '2022-10-18 14:51:41.777000', 'Ashraf Jamal', '2022-08-28 11:28:27.837'),
(57, 'Chicken', 'http://localhost:8000/category/picture/prodCtgryImg_1661666287685.jpeg', 'Ashraf Jamal', '2022-09-06 19:10:59.628000', 'Ashraf Jamal', '2022-08-28 11:28:07.694'),
(60, 'Dairy Products', 'http://localhost:8000/category/picture/prodCtgryImg_1661666356967.jpeg', 'Ashraf Jamal', '2022-10-18 14:51:38.802000', 'Ashraf Jamal', '2022-08-28 11:29:16.976'),
(53, 'Vegitables', 'http://localhost:8000/category/picture/prodCtgryImg_1661666095349.jpg', 'Ashraf Jamal', '2022-09-06 19:11:09.482000', 'Ashraf Jamal', '2022-08-28 11:24:55.440'),
(54, 'Water', 'http://localhost:8000/category/picture/prodCtgryImg_1661666113910.jpg', 'Ashraf Jamal', '2022-09-09 20:51:57.095000', 'Ashraf Jamal', '2022-08-28 11:25:13.919'),
(52, 'Fruits', 'http://localhost:8000/category/picture/prodCtgryImg_1661666078816.jpg', 'Ashraf Jamal', '2022-09-11 11:38:20.487000', 'Ashraf Jamal', '2022-08-28 11:24:38.897');

-- --------------------------------------------------------

--
-- Table structure for table `productlist`
--

DROP TABLE IF EXISTS `productlist`;
CREATE TABLE IF NOT EXISTS `productlist` (
  `productId` int(255) NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) DEFAULT NULL,
  `productCtgry` varchar(255) DEFAULT NULL,
  `productImg` varchar(255) DEFAULT NULL,
  `productQnty` varchar(255) DEFAULT NULL,
  `addedon` timestamp(6) NULL DEFAULT NULL,
  `addedby` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `remainingQnty` varchar(255) DEFAULT NULL,
  `isOutOfStock` varchar(255) DEFAULT NULL,
  `ratePerKg` varchar(255) NOT NULL,
  `lastModifyBy` varchar(255) DEFAULT NULL,
  `lastModifyDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`productId`),
  UNIQUE KEY `productName` (`productName`)
) ENGINE=MyISAM AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productlist`
--

INSERT INTO `productlist` (`productId`, `productName`, `productCtgry`, `productImg`, `productQnty`, `addedon`, `addedby`, `userId`, `remainingQnty`, `isOutOfStock`, `ratePerKg`, `lastModifyBy`, `lastModifyDate`) VALUES
(77, 'Cauliflower', 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669202298.jpg', '5', '2022-08-28 06:46:42.334000', 'Ashraf Jamal', '109', '5', 'Y', '55', 'Ashraf Jamal', '2022-10-05 13:59:44'),
(78, 'Capsicum', 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669309086.jpg', '5', '2022-08-28 06:48:29.117000', 'Ashraf Jamal', '109', '5', 'N', '55', 'Ashraf Jamal', '2022-09-09 18:49:22'),
(76, 'Potato', 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669009749.jpg', '5', '2022-08-28 06:43:29.818000', 'Ashraf Jamal', '109', '5', 'N', '25', 'Ashraf Jamal', '2022-09-09 18:49:27'),
(75, 'Chilli', 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661668938959.jpg', '5', '2022-08-28 06:42:19.038000', 'Ashraf Jamal', '124', '5', 'Y', '100', 'Ashraf@123', '2022-11-26 14:52:22'),
(74, 'Lychee', 'Fruits', 'http://localhost:8000/product/picture/productImg_1661668042138.jpg', '5', '2022-08-28 06:27:22.175000', 'Ashraf Jamal', '109', '5', 'N', '35', 'Ashraf Jamal', '2022-09-24 15:10:43'),
(73, 'Orange', 'Fruits', 'http://localhost:8000/product/picture/productImg_1661667977333.jpg', '5', '2022-08-28 06:26:17.369000', 'Ashraf Jamal', '109', '5', 'N', '45', 'Ashraf Jamal', '2022-09-09 18:49:34'),
(72, 'Papaya', 'Fruits', 'http://localhost:8000/product/picture/productImg_1661667941826.jpg', '5', '2022-08-28 06:25:41.857000', 'Ashraf Jamal', '109', '5', 'N', '55', 'Ashraf Jamal', '2022-09-09 18:49:37'),
(70, 'Mango', 'Fruits', 'http://localhost:8000/product/picture/productImg_1661667424789.jpg', '5', '2022-08-28 06:17:04.828000', 'Ashraf Jamal', '109', '5', 'N', '55', 'Ashraf Jamal', '2022-08-28 06:20:02'),
(71, 'Banana', 'Fruits', 'http://localhost:8000/product/picture/productImg_1661667721009.jpg', '5', '2022-08-28 06:22:01.041000', 'Ashraf Jamal', '109', '5', 'N', '35', 'Ashraf Jamal', '2022-09-24 15:11:54'),
(79, 'Radish', 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669341075.jpg', '5', '2022-08-28 06:49:01.098000', 'Ashraf Jamal', '109', '5', 'N', '35', 'Ashraf Jamal', '2022-09-17 01:54:11'),
(80, 'Pumkin', 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661669395324.jpg', '5', '2022-08-28 06:49:55.352000', 'Ashraf Jamal', '109', '5', 'N', '25', 'Ashraf Jamal', '2022-09-17 01:54:07'),
(81, 'Watermelon', 'Fruits', 'http://localhost:8000/product/picture/productImg_1661672993782.jpg', '5', '2022-08-28 07:49:53.845000', 'Ashraf Jamal', '109', '5', 'N', '25', 'Ashraf Jamal', '2022-09-17 01:54:04'),
(82, 'Tomato', 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661673042413.jpg', '5', '2022-08-28 07:50:42.481000', 'Ashraf Jamal', '109', '5', 'N', '25', 'Ashraf Jamal', '2022-09-17 01:53:58'),
(83, 'Brinjal', 'Vegitables', 'http://localhost:8000/product/picture/productImg_1661673121145.jpg', '5', '2022-08-28 07:52:01.189000', 'Ashraf Jamal', '109', '5', 'N', '25', 'Ashraf Jamal', '2022-09-17 01:54:02');

-- --------------------------------------------------------

--
-- Table structure for table `productqntylist`
--

DROP TABLE IF EXISTS `productqntylist`;
CREATE TABLE IF NOT EXISTS `productqntylist` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `qnty` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productqntylist`
--

INSERT INTO `productqntylist` (`id`, `qnty`) VALUES
(12, '25'),
(11, '20'),
(10, '15'),
(9, '10'),
(8, '5'),
(7, '2');

-- --------------------------------------------------------

--
-- Table structure for table `profileimg`
--

DROP TABLE IF EXISTS `profileimg`;
CREATE TABLE IF NOT EXISTS `profileimg` (
  `profilePicId` int(255) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `uploadedon` timestamp(6) NULL DEFAULT NULL,
  `uploadedby` varchar(255) DEFAULT NULL,
  `updatedon` timestamp(6) NULL DEFAULT NULL,
  `profilePicUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`profilePicId`)
) ENGINE=MyISAM AUTO_INCREMENT=96 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profileimg`
--

INSERT INTO `profileimg` (`profilePicId`, `userId`, `uploadedon`, `uploadedby`, `updatedon`, `profilePicUrl`) VALUES
(34, '70', '2022-04-03 10:38:40.710000', 'Sup One', NULL, NULL),
(32, '68', '2022-04-03 10:38:17.110000', 'Sup One', NULL, NULL),
(33, '69', '2022-04-03 10:38:30.790000', 'Sup One', NULL, NULL),
(31, '67', '2022-04-03 09:23:07.385000', 'Sup Three', NULL, NULL),
(30, '66', '2022-04-03 09:17:15.416000', 'Sup Two', NULL, NULL),
(27, '62', '2022-04-03 08:12:44.615000', 'Ashraf Jamal', NULL, NULL),
(28, '64', '2022-04-03 08:33:55.285000', 'water supplier', NULL, NULL),
(29, '65', '2022-04-03 09:09:26.247000', 'Sup One', NULL, NULL),
(25, '56', '2022-04-02 16:40:35.072000', 'user four', NULL, NULL),
(26, '61', '2022-04-03 07:59:23.419000', 'sasaa dd', NULL, NULL),
(23, '54', '2022-04-02 16:27:41.054000', 'user two', NULL, NULL),
(24, '55', '2022-04-02 16:32:37.466000', 'User three', NULL, NULL),
(21, '52', '2022-04-02 16:11:45.178000', 'Ashraf Jamal', '2022-05-23 11:49:40.796000', 'http://localhost:5997/profile/picture/profilePic_1653306580766.jpeg'),
(22, '53', '2022-04-02 16:24:58.887000', 'user one', NULL, NULL),
(35, '71', '2022-04-03 10:39:54.668000', 'Sup Two', NULL, NULL),
(36, '72', '2022-04-03 10:40:02.079000', 'Sup Two', NULL, NULL),
(37, '73', '2022-04-03 10:40:09.120000', 'Sup Two', NULL, NULL),
(38, '74', '2022-04-03 11:02:29.384000', 'Sup Three', NULL, NULL),
(39, '75', '2022-04-03 11:02:39.637000', 'Sup Three', NULL, NULL),
(40, '76', '2022-04-03 11:03:00.427000', 'Sup Three', NULL, NULL),
(41, '77', '2022-07-03 18:32:49.493000', 'ssasasdddddddddddddddddddddddddddddddddd', NULL, NULL),
(42, '78', '2022-07-03 18:33:37.811000', 'ssasasdddddddddddddddddddddddddddddddddd', NULL, NULL),
(43, '79', '2022-07-03 18:34:24.997000', 'ssasasdddddddddddddddddddddddddddddddddd', NULL, NULL),
(44, '80', '2022-07-03 18:35:18.314000', 'ssasasdddddddddddddddddddddddddddddddddd', NULL, NULL),
(45, '81', '2022-07-03 18:35:43.368000', 'ssasasdddddddddddddddddddddddddddddddddd', NULL, NULL),
(46, '82', '2022-07-03 18:36:16.339000', 'Ahraf', NULL, NULL),
(47, '83', '2022-07-03 18:40:50.482000', 'Ahraf', NULL, NULL),
(48, '84', '2022-07-04 06:07:53.288000', 'Ahraf', NULL, NULL),
(49, '85', '2022-07-04 06:08:29.138000', 'Ahraf', NULL, NULL),
(50, '86', '2022-07-06 20:33:52.382000', 'saffu', NULL, NULL),
(51, '87', '2022-07-31 08:19:19.261000', 'asdsdds', NULL, NULL),
(52, '88', '2022-07-31 08:20:34.984000', 'asdsdds', NULL, NULL),
(53, '89', '2022-07-31 08:48:27.635000', 'Ashraf Jamal', NULL, NULL),
(54, '90', '2022-07-31 08:50:07.683000', 'Babu Bhai', NULL, NULL),
(55, '91', '2022-07-31 08:53:30.351000', 'Are Bhai', NULL, NULL),
(56, '92', '2022-07-31 09:05:16.286000', 'BAHU BHAI', NULL, NULL),
(57, '93', '2022-07-31 10:10:33.998000', 'Ashraf Jamal', NULL, NULL),
(58, '94', '2022-07-31 15:40:53.237000', 'Ashraf Jamal', NULL, NULL),
(59, '95', '2022-07-31 15:41:08.174000', 'dwqnbdv', NULL, NULL),
(60, '96', '2022-07-31 15:41:23.788000', 'Ashraf Jamal', NULL, NULL),
(61, '97', '2022-07-31 15:41:33.851000', 'Ashraf Jamal', NULL, NULL),
(62, '98', '2022-08-01 07:06:43.408000', 'Ashraf Jamal', NULL, NULL),
(63, '99', '2022-08-01 07:08:01.310000', 'Ashraf Jamal', NULL, NULL),
(64, '100', '2022-08-01 18:50:19.098000', 'Reza ', NULL, NULL),
(65, '101', '2022-08-07 10:45:21.529000', 'Po Po', NULL, NULL),
(66, '103', '2022-08-07 11:02:38.314000', 'Mr Khan', NULL, NULL),
(67, '104', '2022-08-07 11:12:04.075000', 'TEST TESS', NULL, NULL),
(68, '105', '2022-08-08 19:15:21.302000', 'Ashraf Jamal', NULL, NULL),
(69, '106', '2022-08-09 09:20:43.820000', 'koko', NULL, NULL),
(70, '107', '2022-08-09 09:25:50.814000', 'TWO TWO', NULL, NULL),
(71, '108', '2022-08-09 12:10:35.683000', 'Ashraf Jamal', NULL, NULL),
(72, '109', '2022-08-11 15:47:44.931000', 'Ashraf Jamal', NULL, NULL),
(73, '110', '2022-08-12 19:49:18.589000', 'Admin User', NULL, NULL),
(74, '111', '2022-08-12 20:24:03.036000', 'sdds', NULL, NULL),
(75, '112', '2022-08-14 15:44:58.962000', 'Ashraf JamalSb', NULL, NULL),
(76, '113', '2022-08-15 12:19:40.179000', 'Test', NULL, NULL),
(77, '114', '2022-09-28 04:27:13.388000', 'TestTest', NULL, NULL),
(78, '115', '2022-10-06 08:29:25.287000', 'Customer1', NULL, NULL),
(79, '116', '2022-11-04 18:40:30.144000', 'Admin Admin', NULL, NULL),
(80, '117', '2022-11-12 08:32:36.975000', 'Admin Admin', NULL, NULL),
(81, '118', '2022-11-12 08:54:55.386000', 'farah nasreen', NULL, NULL),
(82, '119', '2022-11-12 11:55:30.357000', 'demo@123', NULL, NULL),
(83, '120', '2022-11-12 11:57:30.766000', 'Test Test', NULL, NULL),
(84, '121', '2022-11-14 03:26:12.812000', 'Demo One', NULL, NULL),
(85, '122', '2022-11-14 03:26:46.486000', 'Demo', NULL, NULL),
(86, '123', '2022-11-15 03:10:00.750000', 'Ashraf Jamal', NULL, NULL),
(87, '124', '2022-11-15 20:25:46.041000', 'Ashraf@123', NULL, NULL),
(88, '125', '2022-11-17 18:35:59.424000', 'Reza Samshi', NULL, NULL),
(89, '126', '2022-11-18 20:16:54.600000', 'Ashraf', NULL, NULL),
(90, '127', '2022-11-19 11:40:54.226000', 'Delivery One', NULL, NULL),
(91, '128', '2022-11-19 20:08:25.563000', 'Delivery Two', NULL, NULL),
(92, '129', '2022-11-19 20:09:14.655000', 'De3ss', NULL, NULL),
(93, '130', '2022-11-21 17:14:18.267000', 'Delivery Boy One', NULL, NULL),
(94, '131', '2022-11-21 17:14:59.472000', 'Delivery Boy Two', NULL, NULL),
(95, '132', '2022-11-25 17:11:23.009000', 'D3', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `queries`
--

DROP TABLE IF EXISTS `queries`;
CREATE TABLE IF NOT EXISTS `queries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `query` varchar(255) NOT NULL,
  `queryDate` timestamp(6) NOT NULL,
  `contact` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `queries`
--

INSERT INTO `queries` (`id`, `fullname`, `query`, `queryDate`, `contact`) VALUES
(5, 'Ashraf Jamal', 'AHhshj jgdh  hghgfdgf dghgfhdggfdhgf gd dhd hdghf', '2022-04-04 05:33:08.664000', '9999999999'),
(4, 'Ashraf Jamal', 'Ashraf Jamal', '2022-04-02 16:16:36.384000', '6299623761'),
(6, 'Ashraf Jamal', 'Hey Bro ..', '2022-05-23 15:36:19.237000', '9999999999'),
(7, 'Ashraf Jamal', 'jhvhgfdfgdgfd', '2022-05-30 08:26:08.087000', '9999999999'),
(8, 'Ashraf Jamal', 'hghfhfghfghfhtgf hgfhf', '2022-06-05 14:35:53.264000', '9999999999'),
(9, 'Ashraf Jamal', 'vvggdfh hdh fthfh', '2022-06-20 14:44:41.550000', '9999999999'),
(10, 'Ashraf Jamal', 'bhghv hgfhgdfd gfdg dgdgfd gd', '2022-06-25 20:20:11.381000', '8888888888'),
(11, 'Ashraf Jmala', 'snmdbsvbs', '2022-06-27 15:52:45.578000', '9999999999');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `roleId` int(6) NOT NULL AUTO_INCREMENT,
  `tileId` int(6) NOT NULL,
  `roleName` varchar(255) NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`roleId`, `tileId`, `roleName`) VALUES
(1, 1, 'READ_USER'),
(2, 1, 'WRITE_USER'),
(3, 2, 'READ_ROLE'),
(4, 2, 'WRITE_ROLE'),
(5, 7, 'READ_PRODUCT'),
(6, 7, 'WRITE_PRODUCT'),
(7, 3, 'READ_CONSUMER'),
(8, 3, 'WRITE_CONSUMER'),
(9, 4, 'READ_ORDER'),
(10, 4, 'WRITE_ORDER'),
(11, 5, 'READ_CURRENT_ORDER'),
(12, 5, 'WRITE_CURRENT_ORDER'),
(13, 6, 'READ_DELIVERED_ORDER'),
(14, 6, 'WRITE_DELIVERED_ORDER'),
(15, 9, 'READ_SERVICE_ADDRESS'),
(16, 9, 'WRITE_SERVICE_ADDRESS'),
(17, 10, 'READ_QUERY_MANAGEMENT'),
(18, 10, 'WRITE_QUERY_MANAGEMENT'),
(19, 11, 'READ_CATEGORY_MANAGEMENT'),
(20, 11, 'WRITE_CATEGORY_MANAGEMENT'),
(21, 12, 'READ_TILE_MANAGEMENT'),
(22, 12, 'WRITE_TILE_MANAGEMENT'),
(23, 13, 'READ_MODULE_MANAGEMENT'),
(24, 13, 'WRITE_MODULE_MANAGEMENT'),
(25, 14, 'READ_ORDER_MANAGEMENT'),
(26, 14, 'WRITE_ORDER_MANAGEMENT'),
(28, 15, 'READ_DELIVERY_PARTNER'),
(29, 15, 'WRITE_DELIVERY_PARTNER');

-- --------------------------------------------------------

--
-- Table structure for table `rolepermission`
--

DROP TABLE IF EXISTS `rolepermission`;
CREATE TABLE IF NOT EXISTS `rolepermission` (
  `rpId` int(6) NOT NULL AUTO_INCREMENT,
  `userId` int(6) NOT NULL,
  `roleId` int(6) NOT NULL,
  PRIMARY KEY (`rpId`)
) ENGINE=MyISAM AUTO_INCREMENT=220 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rolepermission`
--

INSERT INTO `rolepermission` (`rpId`, `userId`, `roleId`) VALUES
(211, 124, 15),
(210, 124, 4),
(209, 124, 3),
(218, 124, 29),
(208, 124, 18),
(207, 124, 17),
(206, 124, 6),
(205, 124, 5),
(213, 124, 21),
(204, 124, 10),
(203, 124, 9),
(202, 124, 26),
(181, 113, 11),
(182, 113, 12),
(183, 113, 13),
(212, 124, 16),
(219, 124, 2),
(201, 124, 25),
(217, 124, 28),
(200, 124, 24),
(199, 124, 23),
(198, 124, 14),
(197, 124, 13),
(196, 124, 12),
(195, 124, 11),
(194, 124, 8),
(193, 124, 7),
(192, 124, 20),
(191, 124, 19),
(189, 109, 19),
(188, 108, 1),
(184, 113, 14),
(187, 108, 1),
(215, 124, 1),
(214, 124, 22);

-- --------------------------------------------------------

--
-- Table structure for table `serviceaddress`
--

DROP TABLE IF EXISTS `serviceaddress`;
CREATE TABLE IF NOT EXISTS `serviceaddress` (
  `addressId` int(255) NOT NULL AUTO_INCREMENT,
  `block` varchar(255) NOT NULL,
  `dist` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `pincode` varchar(255) NOT NULL,
  `addedBy` varchar(255) DEFAULT NULL,
  `addedOn` timestamp(6) NULL DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `lastModifiedOn` timestamp(6) NULL DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  PRIMARY KEY (`addressId`),
  UNIQUE KEY `pincode` (`pincode`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `serviceaddress`
--

INSERT INTO `serviceaddress` (`addressId`, `block`, `dist`, `state`, `pincode`, `addedBy`, `addedOn`, `lastModifiedBy`, `lastModifiedOn`, `status`, `userId`) VALUES
(25, 'Kochadhaman', 'Kishanganj', 'Bihar', '855107', 'Ashraf@123', '2022-11-26 15:28:22.696000', NULL, NULL, 'Y', '124'),
(26, 'TEST 1', 'Kishanganj', 'Bihar ', '855115', 'Ashraf@123', '2022-11-26 15:29:11.523000', NULL, NULL, 'Y', '124');

-- --------------------------------------------------------

--
-- Table structure for table `tilepermission`
--

DROP TABLE IF EXISTS `tilepermission`;
CREATE TABLE IF NOT EXISTS `tilepermission` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `userId` int(6) NOT NULL,
  `moduleId` int(6) NOT NULL,
  `tileId` int(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=178 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tilepermission`
--

INSERT INTO `tilepermission` (`id`, `userId`, `moduleId`, `tileId`) VALUES
(135, 109, 5, 4),
(134, 109, 5, 3),
(106, 113, 3, 6),
(105, 113, 3, 5),
(103, 111, 3, 6),
(102, 111, 3, 5),
(97, 110, 5, 4),
(96, 110, 5, 3),
(95, 110, 3, 6),
(94, 110, 3, 5),
(93, 110, 1, 11),
(92, 110, 1, 10),
(91, 110, 1, 9),
(90, 110, 1, 7),
(89, 110, 1, 2),
(88, 110, 1, 1),
(133, 109, 3, 6),
(139, 116, 1, 7),
(138, 116, 1, 2),
(137, 116, 1, 1),
(136, 109, 1, 14),
(132, 109, 3, 5),
(131, 109, 2, 13),
(130, 109, 2, 12),
(129, 109, 1, 11),
(128, 109, 1, 10),
(127, 109, 1, 9),
(126, 109, 1, 7),
(125, 109, 1, 2),
(124, 109, 1, 1),
(109, 108, 1, 1),
(140, 116, 1, 9),
(141, 116, 1, 10),
(142, 116, 1, 11),
(143, 116, 1, 14),
(144, 116, 5, 3),
(145, 116, 5, 4),
(146, 116, 2, 12),
(147, 116, 2, 13),
(148, 116, 3, 5),
(149, 116, 3, 6),
(150, 119, 5, 3),
(151, 119, 5, 4),
(152, 123, 3, 5),
(153, 123, 3, 6),
(154, 124, 1, 1),
(155, 124, 1, 2),
(156, 124, 1, 7),
(157, 124, 1, 9),
(158, 124, 1, 10),
(159, 124, 1, 11),
(160, 124, 1, 14),
(161, 124, 2, 12),
(162, 124, 2, 13),
(163, 124, 3, 5),
(164, 124, 3, 6),
(165, 124, 5, 3),
(166, 124, 5, 4),
(167, 127, 3, 5),
(168, 127, 3, 6),
(169, 128, 3, 5),
(170, 128, 3, 6),
(171, 130, 3, 5),
(172, 130, 3, 6),
(173, 131, 3, 5),
(174, 131, 3, 6),
(175, 132, 3, 5),
(176, 132, 3, 6),
(177, 124, 1, 15);

-- --------------------------------------------------------

--
-- Table structure for table `tiles`
--

DROP TABLE IF EXISTS `tiles`;
CREATE TABLE IF NOT EXISTS `tiles` (
  `tileId` int(6) NOT NULL AUTO_INCREMENT,
  `moduleId` int(6) NOT NULL,
  `tileName` varchar(55) NOT NULL,
  PRIMARY KEY (`tileId`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tiles`
--

INSERT INTO `tiles` (`tileId`, `moduleId`, `tileName`) VALUES
(1, 1, 'Users Management'),
(2, 1, 'Roles Management'),
(3, 5, 'Consumers Management'),
(4, 5, 'Order Management'),
(5, 3, 'Current orders'),
(6, 3, 'Delivered orders'),
(7, 1, 'Product Management'),
(9, 1, 'Service Address'),
(10, 1, 'Query Management'),
(11, 1, 'Category Management'),
(12, 2, 'Tile Management'),
(13, 2, 'Module Management'),
(14, 1, 'Order Management'),
(15, 1, 'Deliver Management');

-- --------------------------------------------------------

--
-- Table structure for table `useraddress`
--

DROP TABLE IF EXISTS `useraddress`;
CREATE TABLE IF NOT EXISTS `useraddress` (
  `address_Id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `block` varchar(255) NOT NULL,
  `dist` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `pincode` varchar(255) NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) NOT NULL,
  `address3` varchar(255) DEFAULT NULL,
  `address4` varchar(255) DEFAULT NULL,
  `contact` varchar(255) NOT NULL,
  PRIMARY KEY (`address_Id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `useraddress`
--

INSERT INTO `useraddress` (`address_Id`, `userId`, `block`, `dist`, `state`, `pincode`, `address1`, `address2`, `address3`, `address4`, `contact`) VALUES
(9, '68', 'Kolkata East', 'North 24 Parganas', 'West Bengal', '855106', 'ssasdhgfsdhsfsh', 'Marwari College', 'Safa Nager', 'Aanad Colony', '9999999911'),
(7, '64', 'Kolkata East', 'North 24 Parganas', 'West Bengal', '855106', 'ssasdhgfsdhsfsh', 'asasas', 'daf', 'Aanad Colony', '8585858585'),
(8, '52', 'Kolkata East', 'North 24 Parganas', 'West Bengalf', '855106', 'ssasdhgfsdhsfsh', 'asasas', 'daf', 'Aanad Colony', '6299623761');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `usercontact` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `accesstype` varchar(255) NOT NULL,
  `isdeleted` varchar(255) NOT NULL,
  `createdon` timestamp(6) NOT NULL,
  `createdby` varchar(255) NOT NULL,
  `accessId` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `lastModifiedOn` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `usercontact` (`usercontact`)
) ENGINE=MyISAM AUTO_INCREMENT=133 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `usercontact`, `password`, `accesstype`, `isdeleted`, `createdon`, `createdby`, `accessId`, `lastModifiedBy`, `lastModifiedOn`) VALUES
(108, 'pritam atta', '8001695524', '$2a$10$Ul2G0N073dPujuKUbY660uIjV7VtX0oqB7wh83s.YUfHUL0SYxlbK', 'Customer', 'N', '2022-08-09 12:10:35.682000', 'Ashraf Jamal', NULL, 'Ashraf Jamal', '2022-08-27 14:50:39.252000'),
(109, 'Ashraf Jamal', '6299623761', '$2a$10$XDK6INCwzsEeurMOcGCFduayk6Vy684LjkJf3ykiWriv7roQDKFdm', 'SuperAdmin', 'N', '2022-08-11 15:47:44.926000', 'pritam atta', NULL, 'Ashraf Jamal', '2022-08-20 13:09:22.171000'),
(110, 'Admin User', '1299623761', '$2a$10$JaJt0pNWadyCHGg0KZwh0.OfCe5YW1GCtZ6QDg0uL1RxoNVP4GPZ6', 'SuperAdmin', 'N', '2022-08-12 19:49:18.581000', 'Ashraf Jamal', NULL, NULL, NULL),
(111, 'sdds', '9999999999', '$2a$10$ahb91FXHjyeDmvUcWRHa/OVjcAQzrybwmNhEWeVv/qUDYGulRsqHa', 'Delivery', 'Y', '2022-08-12 20:24:03.036000', 'Admin User', NULL, 'Ashraf Jamal', '2022-08-29 19:21:21.134000'),
(112, 'Ashraf JamalSb', '6299623771', '$2a$10$64JfgmRBRpMSjelNJsFZmeIqWnwEQArjivOGSI7kUPFacTG3pC5zC', 'Customer', 'N', '2022-08-14 15:44:58.959000', 'Ashraf Jamal', NULL, NULL, NULL),
(113, 'Test', '2299623761', '$2a$10$bpREe2.tAxiT3PK1D.BnveL.1am4gGygnPDTMW0FNRtmeYX1OQcXu', 'Delivery', 'N', '2022-08-15 12:19:40.177000', 'Ashraf Jamal', NULL, 'Ashraf Jamal', '2022-08-15 18:48:20.828000'),
(114, 'TestTest', '1111111111', '$2a$10$QfnFZuSGNzVaHQ78FlxdweR88jbMHxQ3t/uN0urpBmyEy.9jpkqb.', 'Customer', 'N', '2022-09-28 04:27:13.380000', 'Ashraf Jamal', NULL, NULL, NULL),
(115, 'Customer1', '6299623711', '$2a$10$KTL1qBC.lCEVsoOMMMFZt.EYJQSbUTWk9ovtf69hiydXgkagjMAB2', 'Customer', 'N', '2022-10-06 08:29:25.285000', 'Ashraf Jamal', NULL, NULL, NULL),
(116, 'Admin Admin', '8436513244', '$2a$10$U97L/Md1NtoSqtmOwiFlouW8NMGoclx.J5Hu7d9PoA1L6c7Yofl7i', 'SuperAdmin', 'N', '2022-11-04 18:40:30.142000', 'Ashraf Jamal', NULL, NULL, NULL),
(117, 'Admin Admin', '8436513245', '$2a$10$Xc.rQ4inBRrj/uQEjKwFmuH1HUNhjZ3kbrnuLij2n5bb5cyRUeHs6', 'Customer', 'N', '2022-11-12 08:32:36.969000', 'self created', NULL, NULL, NULL),
(118, 'farah nasreen', '7260945885', '$2a$10$ChIrSS2PvkHkZN08I6mrHuhklIOG2qg/P2qYrNqSQ5jc5fjv01yhe', 'Customer', 'N', '2022-11-12 08:54:55.386000', 'self created', NULL, NULL, NULL),
(119, 'demo@123', '8436513211', '$2a$10$2yeoWaDNiFrAoYMKFAHaG.lBD12U4jB/ZwHsxWJ9MBFZJar3u4Coi', 'Supplier', 'N', '2022-11-12 11:55:30.352000', 'Ashraf Jamal', NULL, NULL, NULL),
(120, 'Test Test', '1234123412', '$2a$10$M7CMCsTeeIlwd3VDyg29NuThW33DzpC7BaXgE1aAM.kg.EBeSvqzy', 'Customer', 'N', '2022-11-12 11:57:30.764000', 'self created', NULL, NULL, NULL),
(121, 'Demo One', '1111111112', '$2a$10$Z.6aBBibB5UxkEqnaqsSp.7Vgp.pXOBISjERJrhz4EqlUfoiUqnt.', 'Customer', 'N', '2022-11-14 03:26:12.809000', 'self created', NULL, NULL, NULL),
(122, 'Demo', '1111111113', '$2a$10$BoosnbBSzRiUNKZYb85ST..fHoq7rWEJyIacMq4iMApV22xYyhWxS', 'Customer', 'N', '2022-11-14 03:26:46.485000', 'self created', NULL, NULL, NULL),
(123, 'Ashraf Jamal', '7777777777', '$2a$10$yPVVp4XHYbv.QSjML8jF3uDYVzOVRwAFaT/raUjYpU7JOxGMlq6Ri', 'Delivery', 'N', '2022-11-15 03:10:00.749000', 'Ashraf Jamal', NULL, NULL, NULL),
(124, 'Ashraf@123', '9939173044', '$2a$10$/n3Sh9M271A/EhSBNt5rt.kTv8/oYU5CMDNKLaRLL6y9Npyggktry', 'SuperAdmin', 'N', '2022-11-15 20:25:46.031000', 'Ashraf Jamal', NULL, NULL, NULL),
(125, 'Reza Samshi', '8877772526', '$2a$10$sN65dFH99EUvNB.uohrEneY0.uvNe2XyC06NtQZs3UxWUoM13qBGe', 'Customer', 'N', '2022-11-17 18:35:59.399000', 'self created', NULL, NULL, NULL),
(126, 'Ashraf', '5252552525', '$2a$10$xIfZK7JHHIwxEk4w1I.g4egs1JW4WMBswLoqAko2OsFQpG1qEEdnK', 'Customer', 'N', '2022-11-18 20:16:54.598000', 'self created', NULL, NULL, NULL),
(127, 'Delivery One', '3636363636', '$2a$10$Mbmpx9Sp959aK4/GpK6Of.eFHJsQodiQMxsZdQQydzkS7fE22QCOa', 'Delivery', 'Y', '2022-11-19 11:40:54.222000', 'Ashraf@123', NULL, NULL, NULL),
(128, 'Delivery Two', '4545454544', '$2a$10$uZCATpsspKj.3/AkPrEB2usoJbBXWX/Gn3hYMXreXoYsYnXxdexGq', 'Delivery', 'N', '2022-11-19 20:08:25.554000', 'Ashraf@123', NULL, NULL, NULL),
(129, 'De3ss', '9939173045', '$2a$10$q6nEoEfAqVqNa7V.yeP5iuxatZg6xWvm1K6F/Canm0Oysszrp4cUq', 'Customer', 'N', '2022-11-19 20:09:14.654000', 'Ashraf@123', NULL, NULL, NULL),
(130, 'Delivery Boy One', '9123456789', '$2a$10$FNvu0SOemD9asYlZmCg4buz.sffDt.yXnyms.B4SMElsVJU6Vfyt6', 'Delivery', 'N', '2022-11-21 17:14:18.266000', 'Ashraf@123', NULL, NULL, NULL),
(131, 'Delivery Boy Two', '8123456789', '$2a$10$YGn7WhWsqXQA8ZDT9rWIhOunZvei.qOJXNfPrrgtcF/4Db.WLy6Vy', 'Delivery', 'N', '2022-11-21 17:14:59.471000', 'Ashraf@123', NULL, NULL, NULL),
(132, 'D3', '3333333333', '$2a$10$tz2gfqG/HwRPpW0NDhK5YOjPUHyZNsC/xSGYNctIKEZ3vwlUmtdne', 'Delivery', 'N', '2022-11-25 17:11:22.998000', 'Ashraf@123', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `waterconsumer`
--

DROP TABLE IF EXISTS `waterconsumer`;
CREATE TABLE IF NOT EXISTS `waterconsumer` (
  `waterCus_Id` int(255) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `supplierId` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdon` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`waterCus_Id`),
  UNIQUE KEY `contact` (`contact`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `waterconsumer`
--

INSERT INTO `waterconsumer` (`waterCus_Id`, `userId`, `supplierId`, `contact`, `name`, `createdon`, `status`) VALUES
(17, '64', '56', '8585858585', 'Ashraf JamalLala', '2022-04-03 14:03:55.286', 'active'),
(18, '53', '65', '1111111111', 'Admin', '2022-04-03 16:07:25.405', 'active'),
(16, '63', '56', '1212121212', 'ma Ma', '2022-04-03 13:43:34.377', 'active'),
(15, '60', '56', 'sasa', 'asaasas', '2022-04-03 12:07:12.681', 'active'),
(14, '59', '56', '999999999913333', 'j', '2022-04-03 10:54:40.588', 'active'),
(13, '58', '56', '99999999991', 'j', '2022-04-03 10:54:34.926', 'active'),
(12, '57', '56', '9999999999', 'j', '2022-04-03 10:54:26.342', 'active'),
(11, '52', '56', '6299623761', 'Ashraf Jamal', '2022-04-03 10:52:02.893', 'active'),
(19, '68', '65', '9999999911', 'one one', '2022-04-03 16:08:17.111', 'active'),
(20, '69', '65', '9999999912', 'one two', '2022-04-03 16:08:30.790', 'active'),
(21, '70', '65', '9999999913', 'one three', '2022-04-03 16:08:40.711', 'active'),
(22, '71', '66', '9999999921', 'two one', '2022-04-03 16:09:54.669', 'active'),
(23, '72', '66', '9999999922', 'two two', '2022-04-03 16:10:02.079', 'active'),
(24, '73', '66', '9999999923', 'two three', '2022-04-03 16:10:09.121', 'active'),
(25, '74', '67', '9999999931', 'Three One', '2022-04-03 16:32:29.384', 'active'),
(26, '75', '67', '9999999932', 'Three Two', '2022-04-03 16:32:39.639', 'active'),
(27, '76', '67', '9999999933', 'Three Three', '2022-04-03 16:33:00.427', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `waterconsumerorders`
--

DROP TABLE IF EXISTS `waterconsumerorders`;
CREATE TABLE IF NOT EXISTS `waterconsumerorders` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `supplierId` varchar(255) NOT NULL,
  `orderon` timestamp(6) NOT NULL,
  `prodname` varchar(255) NOT NULL,
  `twenty_ltrs_qnty` varchar(255) DEFAULT NULL,
  `twenty_ltrs_price` int(6) DEFAULT NULL,
  `deliveryStatus` varchar(255) NOT NULL,
  `month` varchar(255) DEFAULT NULL,
  `ten_ltrs_qnty` varchar(255) DEFAULT NULL,
  `ten_ltrs_price` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8223 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `waterconsumerorders`
--

INSERT INTO `waterconsumerorders` (`id`, `userId`, `supplierId`, `orderon`, `prodname`, `twenty_ltrs_qnty`, `twenty_ltrs_price`, `deliveryStatus`, `month`, `ten_ltrs_qnty`, `ten_ltrs_price`) VALUES
(8173, '52', '56', '2022-04-03 07:21:40.741000', '2022-04-03', '1', 40, 'order placed', 'April 2022', '3', 60),
(8174, '52', '56', '2022-04-03 07:21:41.885000', '2022-04-03', '1', 40, 'order placed', 'April 2022', '3', 60),
(8175, '52', '56', '2022-04-03 07:21:42.679000', '2022-04-03', '1', 40, 'order placed', 'April 2022', '3', 60),
(8176, '52', '56', '2022-04-03 07:21:43.237000', '2022-04-03', '1', 40, 'order placed', 'April 2022', '3', 60),
(8177, '52', '56', '2022-04-03 07:21:43.576000', '2022-04-03', '1', 40, 'order placed', 'April 2022', '3', 60),
(8178, '52', '56', '2022-04-03 07:21:43.916000', '2022-04-03', '1', 40, 'order placed', 'April 2022', '3', 60),
(8179, '52', '56', '2022-04-03 07:21:44.238000', '2022-04-03', '1', 40, 'order placed', 'April 2022', '3', 60),
(8180, '52', '56', '2022-04-03 07:21:44.550000', '2022-04-03', '1', 40, 'order placed', 'April 2022', '3', 60),
(8181, '52', '56', '2022-04-03 07:21:44.852000', '2022-04-03', '1', 40, 'order placed', 'April 2022', '3', 60),
(8182, '52', '56', '2022-04-03 07:21:45.157000', '2022-04-03', '1', 40, 'order placed', 'April 2022', '3', 60),
(8183, '52', '56', '2022-04-03 07:21:45.524000', '2022-04-03', '1', 40, 'order placed', 'April 2022', '3', 60),
(8184, '52', '56', '2022-04-03 07:24:39.251000', '2022-04-03', '2', 80, 'order placed', 'April 2022', '2', 40),
(8185, '64', '56', '2022-04-03 08:37:18.079000', '2022-04-03', '1', 40, 'order placed', 'April 2022', '1', 20),
(8186, '68', '65', '2022-04-03 11:04:06.786000', '2022-04-03', '2', 80, 'delivered', 'April 2022', '3', 60),
(8190, '69', '65', '2022-04-03 11:05:44.826000', '2022-04-03', '2', 80, 'order placed', 'April 2022', '2', 40),
(8192, '70', '65', '2022-04-03 11:07:55.211000', '2022-04-03', '3', 120, 'order placed', 'April 2022', '2', 40),
(8193, '70', '65', '2022-04-03 11:08:14.160000', '2022-04-03', '3', 120, 'order placed', 'April 2022', '2', 40),
(8194, '71', '66', '2022-04-03 11:08:50.653000', '2022-04-03', '2', 40, 'order placed', 'April 2022', '2', 20),
(8195, '71', '66', '2022-04-03 11:08:56.615000', '2022-04-03', '3', 60, 'order placed', 'April 2022', '3', 30),
(8197, '72', '66', '2022-04-03 11:09:46.128000', '2022-04-03', '2', 40, 'order placed', 'April 2022', '2', 20),
(8198, '72', '66', '2022-04-03 11:09:51.689000', '2022-04-03', '2', 40, 'order placed', 'April 2022', '2', 20),
(8199, '74', '67', '2022-04-03 11:10:18.743000', '2022-04-03', '1', 20, 'order placed', 'April 2022', '2', 20),
(8200, '74', '67', '2022-04-03 11:10:20.245000', '2022-04-03', '1', 20, 'order placed', 'April 2022', '2', 20),
(8201, '75', '67', '2022-04-03 11:11:01.168000', '2022-04-03', '1', 20, 'order placed', 'April 2022', '2', 20),
(8202, '75', '67', '2022-04-03 11:11:02.521000', '2022-04-03', '1', 20, 'order placed', 'April 2022', '2', 20),
(8203, '75', '67', '2022-04-03 11:11:03.163000', '2022-04-03', '1', 20, 'order placed', 'April 2022', '2', 20),
(8204, '68', '65', '2022-04-03 23:16:22.477000', '2022-04-03', '1', 40, 'delivered', 'April 2022', '2', 40),
(8212, '52', '56', '2022-05-25 05:34:47.491000', '2022-05-25', '2', 80, 'order placed', 'May 2022', NULL, 0),
(8213, '52', '56', '2022-05-25 05:34:50.599000', '2022-05-25', '2', 80, 'order placed', 'May 2022', NULL, 0),
(8215, '52', '56', '2022-06-05 08:05:15.643000', '2022-06-05', '2', 80, 'order placed', 'June 2022', '2', 40),
(8216, '52', '56', '2022-06-05 08:05:20.993000', '2022-06-05', '2', 80, 'order placed', 'June 2022', '2', 40),
(8217, '52', '56', '2022-06-05 08:05:24.089000', '2022-06-05', '2', 80, 'order placed', 'June 2022', '2', 40),
(8218, '52', '56', '2022-06-24 16:54:38.138000', '2022-06-24', '2', 80, 'order placed', 'June 2022', NULL, 0),
(8219, '52', '56', '2022-06-24 16:54:48.353000', '2022-06-24', '2', 80, 'order placed', 'June 2022', NULL, 0),
(8220, '52', '56', '2022-06-24 16:54:49.216000', '2022-06-24', '2', 80, 'order placed', 'June 2022', NULL, 0),
(8221, '52', '56', '2022-06-24 16:54:52.118000', '2022-06-24', '2', 80, 'order placed', 'June 2022', '2', 40),
(8222, '52', '56', '2022-06-24 16:54:59.447000', '2022-06-24', '2', 80, 'order placed', 'June 2022', '2', 40);

-- --------------------------------------------------------

--
-- Table structure for table `waterinvoice`
--

DROP TABLE IF EXISTS `waterinvoice`;
CREATE TABLE IF NOT EXISTS `waterinvoice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `payedOn` timestamp(6) NULL DEFAULT NULL,
  `payedAmount` varchar(255) DEFAULT NULL,
  `dueAmount` varchar(255) DEFAULT NULL,
  `totalAmount` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `supplierId` varchar(255) DEFAULT NULL,
  `month` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `waterinvoice`
--

INSERT INTO `waterinvoice` (`id`, `userId`, `payedOn`, `payedAmount`, `dueAmount`, `totalAmount`, `status`, `supplierId`, `month`) VALUES
(37, '68', '2022-04-03 11:17:42.899000', '300', '220', '220', 'unpaid', '65', 'April 2022'),
(36, '64', '2022-04-03 08:44:53.749000', '60', '0', '60', 'paid', '56', 'April 2022'),
(35, '52', '2022-04-03 08:44:10.457000', '1220', '1220', '1220', 'unpaid', '56', 'April 2022'),
(38, '69', NULL, NULL, '120', '120', 'unpaid', '65', 'April 2022'),
(39, '70', '2022-04-03 19:55:11.346000', '120', '200', '320', 'left amount', '65', 'April 2022'),
(40, '71', NULL, NULL, '150', '150', 'unpaid', '66', 'April 2022'),
(41, '72', NULL, NULL, '120', '120', 'unpaid', '66', 'April 2022'),
(42, '74', NULL, NULL, '80', '80', 'unpaid', '67', 'April 2022'),
(43, '75', NULL, NULL, '120', '120', 'unpaid', '67', 'April 2022'),
(44, '52', NULL, NULL, '160', '160', 'unpaid', '56', 'May 2022'),
(45, '52', NULL, NULL, '840', '840', 'unpaid', '56', 'June 2022');

-- --------------------------------------------------------

--
-- Table structure for table `watersupplier`
--

DROP TABLE IF EXISTS `watersupplier`;
CREATE TABLE IF NOT EXISTS `watersupplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `supplierName` varchar(255) NOT NULL,
  `supplierContact` varchar(255) NOT NULL,
  `areaPincode` varchar(255) NOT NULL,
  `landmark` varchar(255) NOT NULL,
  `shopName` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `createdon` timestamp(6) NOT NULL,
  `twenty_ltrs_amount` varchar(255) NOT NULL,
  `ten_ltrs_amount` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shopName` (`shopName`),
  UNIQUE KEY `shopName_2` (`shopName`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `watersupplier`
--

INSERT INTO `watersupplier` (`id`, `userId`, `supplierName`, `supplierContact`, `areaPincode`, `landmark`, `shopName`, `state`, `address1`, `address2`, `status`, `createdon`, `twenty_ltrs_amount`, `ten_ltrs_amount`) VALUES
(11, '65', 'Sup One', '9999999991', '855107', 'Kishanganj', 'ONE', 'Bihar', 'Kishanganj', 'Kishanganj', 'active', '2022-04-03 09:15:57.129000', '40', '20'),
(10, '56', 'water supplier', '4444444444', '855107', 'Belwa', 'water water', 'Bihar', 'Kishanganj', 'Kishanganj', 'active', '2022-04-03 05:21:46.077000', '40', '20'),
(12, '66', 'Sup Two', '9999999992', '110001', 'New Delhi ', 'SUP TWO', 'Delhi', 'New Delhi', 'New Delhi', 'active', '2022-04-03 09:21:02.153000', '20', '10'),
(13, '67', 'Sup Three', '9999999993', '855107', 'Bagalbari', 'Sup Three', 'Bihar', 'Kishanganj', 'Kishanganj', 'active', '2022-04-03 11:01:51.385000', '20', '10');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
