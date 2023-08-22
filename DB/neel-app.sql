-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 22, 2023 at 05:16 AM
-- Server version: 5.7.36
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `neel-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_masters`
--

DROP TABLE IF EXISTS `admin_masters`;
CREATE TABLE IF NOT EXISTS `admin_masters` (
  `adminId` int(11) NOT NULL AUTO_INCREMENT,
  `imageFileName` varchar(255) DEFAULT NULL,
  `imageName` varchar(255) DEFAULT NULL,
  `imagePath` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `passwordText` varchar(255) NOT NULL,
  `passwordEncrypted` varchar(255) NOT NULL,
  `permission` varchar(255) DEFAULT NULL,
  `role` enum('superadmin','admin') NOT NULL,
  `token` varchar(200) NOT NULL,
  `status` enum('active','deactive') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`adminId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_masters`
--

INSERT INTO `admin_masters` (`adminId`, `imageFileName`, `imageName`, `imagePath`, `name`, `email`, `username`, `passwordText`, `passwordEncrypted`, `permission`, `role`, `token`, `status`, `createdAt`, `updatedAt`) VALUES
(1, NULL, NULL, NULL, 'NEELMANI GUPTA', 'neelmani@kwebmaker.com', 'wg@admin', 'wg@admin', '$2b$10$MMcee8dyyovDrErqgNb1zexXO2trzD0/WERblEZdGsRGYTqK9Ftc2', NULL, 'superadmin', 'A34ISgbDBlRfS4Bx1phf13nxW8zrZRee', 'active', '2023-05-01 07:47:46', '2023-06-20 10:37:49'),
(2, NULL, NULL, NULL, 'Test', 'test@kwebmaker.com', 'Test@123', 'Test@123', '$2b$10$X5aFFpIRq2/ypeOeoejp3enEOoXXbGM3uxeC13cYRedlew/WqLFbW', NULL, 'superadmin', 'pdEk7DNOuJbGpBeaA02R2uZa1ly6wFBp', 'active', '2023-05-01 07:47:46', '2023-06-15 10:39:38');

-- --------------------------------------------------------

--
-- Table structure for table `crop_masters`
--

DROP TABLE IF EXISTS `crop_masters`;
CREATE TABLE IF NOT EXISTS `crop_masters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `status` enum('1','0') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `firstname`, `lastname`, `address`, `age`, `salary`, `createdAt`, `updatedAt`) VALUES
(1, 'Neel', 'Gupta', 'Mumbai', 25, 1000, '2023-05-16 11:45:20', '2023-05-16 11:45:20'),
(2, 'MANI', 'Gupta', 'DELHI', 25, 1000, '2023-05-16 11:45:20', '2023-05-16 11:45:20');

-- --------------------------------------------------------

--
-- Table structure for table `iijs_exhibitor`
--

DROP TABLE IF EXISTS `iijs_exhibitor`;
CREATE TABLE IF NOT EXISTS `iijs_exhibitor` (
  `Exhibitor_ID` bigint(20) DEFAULT NULL,
  `sale_order_number` bigint(20) DEFAULT NULL,
  `Exhibitor_Gid` bigint(20) DEFAULT NULL,
  `Customer_No` bigint(20) DEFAULT NULL,
  `billing_bp_no` bigint(20) DEFAULT NULL,
  `Exhibitor_Name` varchar(1024) DEFAULT NULL,
  `Exhibitor_Contact_Person` varchar(1024) DEFAULT NULL,
  `Exhibitor_Designation` varchar(1024) DEFAULT NULL,
  `Exhibitor_Code` varchar(1024) DEFAULT NULL,
  `Exhibitor_Login` varchar(1024) DEFAULT NULL,
  `Exhibitor_Password` bigint(20) DEFAULT NULL,
  `Exhibitor_Address1` varchar(1024) DEFAULT NULL,
  `Exhibitor_Address2` varchar(1024) DEFAULT NULL,
  `Exhibitor_Address3` varchar(1024) DEFAULT NULL,
  `Exhibitor_City` varchar(1024) DEFAULT NULL,
  `Exhibitor_State` varchar(1024) DEFAULT NULL,
  `Exhibitor_Country_ID` varchar(1024) DEFAULT NULL,
  `Exhibitor_Pincode` bigint(20) DEFAULT NULL,
  `Exhibitor_Mobile` bigint(20) DEFAULT NULL,
  `Exhibitor_Phone` varchar(1024) DEFAULT NULL,
  `Exhibitor_Fax` varchar(1024) DEFAULT NULL,
  `Exhibitor_Email` varchar(1024) DEFAULT NULL,
  `Exhibitor_Email1` varchar(1024) DEFAULT NULL,
  `Exhibitor_Website` varchar(1024) DEFAULT NULL,
  `Exhibitor_HallNo` bigint(20) DEFAULT NULL,
  `Exhibitor_DivisionNo` varchar(1024) DEFAULT NULL,
  `Exhibitor_Section` varchar(1024) DEFAULT NULL,
  `Exhibitor_Scheme` varchar(1024) DEFAULT NULL,
  `Exhibitor_Area` bigint(20) DEFAULT NULL,
  `Exhibitor_StallNo1` varchar(1024) DEFAULT NULL,
  `Exhibitor_StallNo2` varchar(1024) DEFAULT NULL,
  `Exhibitor_StallNo3` varchar(1024) DEFAULT NULL,
  `Exhibitor_StallNo4` varchar(1024) DEFAULT NULL,
  `Exhibitor_StallNo5` varchar(1024) DEFAULT NULL,
  `Exhibitor_StallNo6` varchar(1024) DEFAULT NULL,
  `Exhibitor_StallNo7` varchar(1024) DEFAULT NULL,
  `Exhibitor_StallNo8` varchar(1024) DEFAULT NULL,
  `Exhibitor_StallNo9` varchar(1024) DEFAULT NULL,
  `Exhibitor_StallNo10` varchar(1024) DEFAULT NULL,
  `Exhibitor_StallNo11` varchar(1024) DEFAULT NULL,
  `Exhibitor_StallNo12` varchar(1024) DEFAULT NULL,
  `Exhibitor_StallType` varchar(1024) DEFAULT NULL,
  `Exhibitor_Premium` varchar(1024) DEFAULT NULL,
  `Exhibitor_Region` varchar(1024) DEFAULT NULL,
  `Exhibitor_IsActive` bigint(20) DEFAULT NULL,
  `comments` varchar(1024) DEFAULT NULL,
  `Exhibitor_Layout` varchar(1024) DEFAULT NULL,
  `Exhibitor_Subscribe` bigint(20) DEFAULT NULL,
  `Exhibitor_LastLogin` bigint(20) DEFAULT NULL,
  `Xml_ID` varchar(1024) DEFAULT NULL,
  `Exhibitor_Registration_ID` bigint(20) DEFAULT NULL,
  `amountPaid` varchar(1024) DEFAULT NULL,
  `amountUnpaid` varchar(1024) DEFAULT NULL,
  `event_name` varchar(1024) DEFAULT NULL,
  `year` bigint(20) DEFAULT NULL,
  `Catalog_CompanyLogo` varchar(1024) DEFAULT NULL,
  `exempt_gst` bigint(20) DEFAULT NULL,
  `allotted_women` bigint(20) DEFAULT NULL,
  `vendor` varchar(1024) DEFAULT NULL,
  `specific_area` varchar(1024) DEFAULT NULL,
  `isSafePdf` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `iijs_exhibitor`
--

INSERT INTO `iijs_exhibitor` (`Exhibitor_ID`, `sale_order_number`, `Exhibitor_Gid`, `Customer_No`, `billing_bp_no`, `Exhibitor_Name`, `Exhibitor_Contact_Person`, `Exhibitor_Designation`, `Exhibitor_Code`, `Exhibitor_Login`, `Exhibitor_Password`, `Exhibitor_Address1`, `Exhibitor_Address2`, `Exhibitor_Address3`, `Exhibitor_City`, `Exhibitor_State`, `Exhibitor_Country_ID`, `Exhibitor_Pincode`, `Exhibitor_Mobile`, `Exhibitor_Phone`, `Exhibitor_Fax`, `Exhibitor_Email`, `Exhibitor_Email1`, `Exhibitor_Website`, `Exhibitor_HallNo`, `Exhibitor_DivisionNo`, `Exhibitor_Section`, `Exhibitor_Scheme`, `Exhibitor_Area`, `Exhibitor_StallNo1`, `Exhibitor_StallNo2`, `Exhibitor_StallNo3`, `Exhibitor_StallNo4`, `Exhibitor_StallNo5`, `Exhibitor_StallNo6`, `Exhibitor_StallNo7`, `Exhibitor_StallNo8`, `Exhibitor_StallNo9`, `Exhibitor_StallNo10`, `Exhibitor_StallNo11`, `Exhibitor_StallNo12`, `Exhibitor_StallType`, `Exhibitor_Premium`, `Exhibitor_Region`, `Exhibitor_IsActive`, `comments`, `Exhibitor_Layout`, `Exhibitor_Subscribe`, `Exhibitor_LastLogin`, `Xml_ID`, `Exhibitor_Registration_ID`, `amountPaid`, `amountUnpaid`, `event_name`, `year`, `Catalog_CompanyLogo`, `exempt_gst`, `allotted_women`, `vendor`, `specific_area`, `isSafePdf`) VALUES
(1, 3300035349, 30545, 7000053920, 7000053920, 'KEYSTAR GEMS', 'PRITI SAVALIYA', 'HR', 'EXH1', 'EXH1', 123456, 'PLOT NO.5, BLOCK NO.4', 'KOHINOOR INDUSTRIAL ESTATE', 'VARACHHA ROAD', 'SURAT', '', 'IN', 395006, 9167626743, '9824050012', '', 'hr.keystargems@gmail.com', '', '', 1, '1A', 'lgd', 'BI1', 72, '1F 135', '', '', '', '', '', '', '', '', '', '', '', 'corner_3side', 'normal', 'RO-SRT', 1, '', '', 0, 0, '', 600888825, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(2, 3300033746, 29156, 7000057630, 7000057630, 'ARIHANT JEWEL CRAFT', 'ASHISH JAIN A', 'CEO', 'EXH2', 'EXH2', 123456, 'KUVEMPU ROAD', 'OPP. MUNICIPAL PARK', 'ROBERTSONPET, K G F', 'KOLAR', '', 'IN', 563122, 9844444945, '9632861444', '', 'arihantjewelcraft916@gmail.com', '', '', 4, '4A', 'plain_gold', 'BI1', 18, '4T 505A', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 600899496, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Kapur', NULL, 0),
(3, 3300035381, 31184, 7000066457, 7000066457, 'GREENLAB JEWELS PRIVATE LIMITED', 'CHANDRAKANT JOSHI', 'MARKETING MANAGER', 'EXH3', 'EXH3', 123456, 'OFFICE NO 508-509, INTERNATIONAL BUSINESS CENTRE', 'PIPLOD MAIN ROAD, SURAT', '', 'SURAT', '', 'IN', 395007, 8097340674, '9727158000', '', 'CJOSHI@GREENLAB.DIAMONDS', '', '', 1, '1D', 'diamond_colorstone', 'BI1', 16, '1A 1', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-SRT', 1, '', '', 0, 0, '', 600915147, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(4, 3300035061, 30373, 7000053968, 7000053968, 'RISHITH GEMS & JEWELS', 'AMIT AGARWAL', 'PROPRIETOR SON', 'EXH4', 'EXH4', 123456, '5-9-58/1 A-BLOCK SHOP NO 52,53', 'GR FLR, BABU KHAN ESTATE', 'BASHEERBAGH', 'HYDERABAD', '', 'IN', 500001, 9573713707, '91-40-66737754', '', 'rishithgems@gmail.com', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 10', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 600872717, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(5, 3300034925, 30218, 7000012075, 7000012075, 'ZUNDAA', 'TOSHIBA DARSHAN JARIWALA', 'PROPRIETOR', 'EXH5', 'EXH5', 123456, 'B-48, NANDBHUVAN INDL. ESTATE', 'MAHAKALI CAVES ROAD', 'ANDHERI (EAST)', 'MUMBAI', '', 'IN', 400093, 7718820070, '28322351', '', 'ACCOUNTS@ZUNDAA.COM', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 11', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 8980, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(6, 3300033458, 29166, 7000046089, 7000046089, 'INDIANA JEWEL', 'MANISH KACHHADIYA', 'PARTNER', 'EXH6', 'EXH6', 123456, '6 / 941 A / 3 FLOOR BHOY STREET', 'BHAVANIWAD', 'MAHIDHARPURA', 'SURAT', '', 'IN', 395003, 9824758283, '2612428083', '', 'info@indianajewel.com', '', '', 3, '3A', 'plain_gold', 'BI1', 9, '3L 371B', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-SRT', 1, '', '', 0, 0, '', 600873149, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(7, 3300033460, 29168, 7000063261, 7000063261, 'GANESH GOLD', 'ASHISH', 'PROPRIETOR', 'EXH7', 'EXH7', 123456, '1ST FLOOR, OLD NO 221', 'NEW NO,855,856 AND 857', 'SHOP NO.01, NAGARATHPET', 'BANGALORE', '', 'IN', 560002, 9663592926, '91-80-40848757', '', 'ashishj58@gmail.com', '', '', 4, '4B', 'plain_gold', 'BI1', 9, '4T 501F', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600866932, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Kapur', NULL, 0),
(8, 3300033435, 29173, 7000062995, 7000062995, 'RASHI GOLD', 'RAKESH', 'PARTNER', 'EXH8', 'EXH8', 123456, '1401,GIRIRAJ OSCAR , PLOT NO', '68.69.69A,71, SECTOR 20', 'KOPARKHAIRNE,THANE', 'MUMBAI', '', 'IN', 400709, 8080232328, '022-40050926', '', 'rashigold@outlook.com', '', '', 5, '5A', 'plain_gold', 'BI1', 9, '5V 545', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600899872, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(9, 3300033436, 29174, 7000061123, 7000061123, 'MAHAVIR JEWELLERS', 'BASTIMAL JAIN', 'PROPRIETOR', 'EXH9', 'EXH9', 123456, '114, DIAMOND PLAZA', '83/85, DHANJI STREET', 'KALBADEVI', 'MUMBAI', '', 'IN', 400003, 8879568969, '23420333', '', 'mjmahavir1@gmail.com', '', '', 5, '5B', 'plain_gold', 'BI1', 9, '5V 558', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600880466, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(10, 3300034653, 30936, 7000006017, 7000006017, 'M S DIAAGEM', 'ABISHEK DUGAR', 'PARTNER', 'EXH10', 'EXH10', 123456, 'NO.32 RAMASAMY STREET', '3RD FLOOR, MAY COMPLEX', 'T. NAGAR', 'chennai', '', 'IN', 600017, 9841850000, '4443327200', '', 'msdiaagem@gmail.com', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 12 ', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 600731220, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(11, 3300033439, 29181, 7000015607, 7000015607, 'SHUBH GOLD', 'ASHOK V JAIN', 'PARTNER', 'EXH11', 'EXH11', 123456, '176;RATILAL MANSION,', 'SHEIKH MEMON STREET', 'ZAVERI BAZAR', 'MUMBAI', '', 'IN', 400002, 9820494608, '22412666', '', 'shubhgold916@gmail.com', '', '', 2, '2B', 'plain_gold', 'BI1', 9, '2K 283', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 2858, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(12, 3300033758, 29184, 7000046251, 7000046251, 'DISHA GOLD AND PLATINUM', 'KAMLESH POKHARNA', 'PARTNER', 'EXH12', 'EXH12', 123456, 'CHANDRA DARSHAN BUILDING', '2ND FL.RF-7/A-81, PARSI GULLY', 'DHANJI STREET, ZAVERI BAZAR', 'MUMBAI', '', 'IN', 400003, 9833944346, '91-22-61838600', '', 'accounts@dishaaplatinum.com', '', '', 5, '5A', 'diamond_colorstone', 'BI1', 9, '5U 516', '', '', '', '', '', '', '', '', '', '', '', 'corner_3side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600866661, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(13, 3300033849, 29188, 7000061159, 7000061159, 'SUDARSHAN JEWELLERS', 'VICKY', 'HEAD MANAGEMENT', 'EXH13', 'EXH13', 123456, 'SHOP NO.2-3,U.G FLOOR', 'AURUM MARKET,NR.TELEPHONE EXCH', 'ZAVERI BAZAR', 'MUMBAI', '', 'IN', 400002, 9773542638, '22413699', '', 'sudarshanjewellerskc@gmail.com', '', '', 3, '3A', 'plain_gold', 'BI1', 16, '3L 323', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600888807, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(14, 3300033510, 29191, 7000064087, 7000064087, 'GIFT GOLD PVT. LTD.', 'GAUTAM KOTHARI', 'DIRECTOR', 'EXH14', 'EXH14', 123456, 'MEZZANINE FLOOR, OFFICE NO.', 'M-1, SNK PLAZA', '23/25 AGYARI LANE,ZAVERI BAZAR', 'MUMBAI', '', 'IN', 400003, 9819912266, '9819912266', '', 'giftgold1234@gmail.com', '', '', 3, '3B', 'plain_gold', 'BI1', 16, '3P 389', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600867020, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(15, 3300035392, 31351, 7000066440, 7000066440, 'MANOKAMANA JEWELS', 'ANISH AGARWAL', 'OPERATIONS', 'EXH15', 'EXH15', 123456, '2ND FLOOR, NO: 8-2-601/A/P4', 'DEVI SADAN, ZEHARA NAGAR', 'ROAD NO - 10, BANJARA HILLS', 'HYDERABAD', '', 'IN', 500034, 9395505501, '7207271616', '', 'manokamanajewels@gmail.com', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 13', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 600915109, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(16, 3300033890, 29193, 7000047307, 7000047307, 'CHINTAN GEMS', 'MANOJ SHAH', 'SALES MANAGER', 'EXH16', 'EXH16', 123456, '1401 GREENRIDGE TOWER 1', 'NEW LINK ROAD CHIKUWADI', 'BORIVALI WEST', 'MUMBAI', '', 'IN', 400092, 9819496542, '91-22-40050875', '', 'chintangemsnjewels@gmail.com', '', '', 5, '5A', 'diamond_colorstone', 'BI1', 9, '5V 536B', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600866266, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(17, 3300033513, 29196, 7000002133, 7000002133, 'SHRINGAR CREATIONS', 'SHRAY GUPTA', 'PARTNER', 'EXH17', 'EXH17', 123456, '28, CHINTAMAN CHOURAHA,', 'ITWARA ROAD,', 'SARAFA CHOWK,', 'BHOPAL', '', 'IN', 462001, 9754111333, '7554921314', '', 'SSG28CREATIONS@GMAIL.COM', '', '', 2, '2A', 'diamond_colorstone', 'BI1', 18, '2J 254A', '', '', '', '', '', '', '', '', '', '', '', 'corner_3side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600725638, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(18, 3300033783, 29197, 7000001439, 7000001439, 'ARIHANT DIAMONDS', 'K.KAMLESH KUMAR', 'PROPREITOR', 'EXH18', 'EXH18', 123456, '1123,R.G Street', 'R.G STREET', '', 'COIMBATORE', '', 'IN', 641001, 9363102470, '4222474755', '', 'arihantdiamondscbe@gmail.com', '', '', 4, '4B', 'diamond_colorstone', 'BI1', 18, '4R 471D', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 600723901, '', '', 'SIGNATURE', 2023, '', 0, 0, 'expro', NULL, 0),
(19, 3300035383, 31216, 7000066460, 7000066460, 'MK EXPORTS', 'KAPIL KUMAR', 'PURCHASE HEAD', 'EXH19', 'EXH19', 123456, 'SHOP NO. 116, FIRST FLOOR,', 'BLDG. NO. 2678/1,DIAMOND MALL,', 'MAIN GURUDWARA ROAD,KAROL BAGH', 'NEW DELHI', '', 'IN', 110005, 9810102725, '1145566026', '', 'mkexports18@gmail.com', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 14', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-DEL', 1, '', '', 0, 0, '', 600910107, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(20, 3300034464, 31150, 7000011532, 7000011538, 'SUVARNA SHILPI JEWELLERS PVT. LTD.', 'ALPESH ARVINDBHAI SONI', 'DIRECTOR', 'EXH20', 'EXH20', 123456, '106-107, ASHISH COMPLEX', 'SWASTIK CHAR RASTA', 'C.G. ROAD, NAVRANGPURA', 'AHMEDABAD', '', 'IN', 380009, 9824482824, '079-26460473', '', 'alpeshsoni1@yahoo.co.in', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 15', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-SRT', 1, '', '', 0, 0, '', 5149, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(21, 3300033515, 29203, 7000047480, 7000047480, 'MATRA SMURTI JEWELS', 'TARUN', 'PROPERTIER', 'EXH21', 'EXH21', 123456, '569/570, MACHINWALA CHAWL,', 'OLD AGRA ROAD,', 'OPP: BHARAT CINEMA, KHAR-W,', 'MUMBAI', '', 'IN', 400070, 9892629988, '9892629988', '', 'tjainsss1988@gmail.com', '', '', 3, '3B', 'plain_gold', 'BI1', 16, '3L 351', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600889945, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(22, 3300033790, 29204, 7000059156, 7000059156, 'N. J. ARTS', 'NARENDRABHAI RADHANPARA', 'PARTNER', 'EXH22', 'EXH22', 123456, 'ACHYUT 2', 'SHIVA MAHARAJ CLOSE STREET', 'NEAR KOTHARIA NAKA', 'RAJKOT', '', 'IN', 360001, 9824425354, '91-281-2235288', '', 'SKEVAL434@GMAIL.COM', '', '', 3, '3A', 'plain_gold', 'BI1', 9, '3L 374E', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-SRT', 1, '', '', 0, 0, '', 600870977, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(23, 3300034672, 30910, 7000002108, 7000002108, 'ENSHINE', 'ANIL PATEL', 'OWNER', 'EXH23', 'EXH23', 123456, '19,2ND FLOOR', 'JAY SWAMINARAYAN wadi Building', 'RUGHNATHPURA', 'SURAT', '', 'IN', 395003, 9825125035, '2612438700', '', 'info@enshine.in', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 16', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'RO-SRT', 1, '', '', 0, 0, '', 600725328, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(24, 3300035060, 30251, 7000006931, 7000038172, 'PRISM INTERNATIONAL', 'MR. MANISH P. JIVANI', 'PARTNER', 'EXH24', 'EXH24', 123456, '1705, PANCHRATNA,', 'M.P. MARG,', 'OPERA HOUSE,', 'MUMBAI', '', 'IN', 400004, 9820035047, '23628508', '', 'anandintlgroup@gmail.com', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 17', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600857604, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(25, 3300033748, 29210, 7000060853, 7000060853, 'SAMRUDDHI JEWELCRAFT PRIVATE LIMITED', 'NIKHIL JAIN', 'DIRECTOR', 'EXH25', 'EXH25', 123456, 'A- 1402, FLOOR-14TH,PLOT-CS NO', '1844/1845,ADITYA PEARL', 'A- WING, RAMWADI, KALBADEVI', 'MUMBAI', '', 'IN', 400002, 9819603187, '2261838452', '', 'samruddhijewelcraft@gmail.com', '', '', 5, '5A', 'plain_gold', 'BI1', 27, '5U 534C', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'Premium', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600907544, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(26, 3300033647, 29212, 7000000548, 7000000548, 'MANOJ JEWELLERS', 'SAGAR JAIN', 'SAGAR JAIN', 'EXH26', 'EXH26', 123456, 'AURUM MALL,7TH FL.,SHOP NO.701', 'SHAIKH MEMON STREET,', 'NEAR COTTON EXCHANGE BLDG,', 'MUMBAI', '', 'IN', 400002, 9820120330, '9820187663', '', 'manojjewellers009@yahoo.com', '', '', 2, '2B', 'plain_gold', 'BI1', 9, '2K 282', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 3036, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(27, 3300033652, 29213, 7000060797, 7000060797, 'SHREE SHUBHAM GOLD', 'RAHUL DHARMAWAT', 'PARTNER', 'EXH27', 'EXH27', 123456, 'GROUND FLOOR, SHOP NO 2,4 & 6', 'D.D.PLAZA CHS, 3RD AGYARI LANE', 'ZAVERI BAZAR', 'MUMBAI', '', 'IN', 400002, 9029033677, '2249784835', '', 'shreeshubhamgold@gmail.com', '', '', 4, '4B', 'plain_gold', 'BI1', 16, '4T 497', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600907500, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Kapur', NULL, 0),
(28, 3300033657, 29215, 7000003614, 7000003614, 'VITHRAAG JEWELS', 'J J RISHUB', 'PARTNER', 'EXH28', 'EXH28', 123456, 'SHOP NO.3 & 4, 2ND FLOOR', 'ARIHANT PLAZA, NO. 20/21', 'VEERAPPAN STREET, SOWCARPet', 'CHENNAI', '', 'IN', 600079, 9840870070, '4425382916', '', 'vithraagjewels@gmail.com', '', '', 2, '2A', 'plain_gold', 'BI1', 36, '2K 262A', '', '', '', '', '', '', '', '', '', '', '', 'corner_3side', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 600728781, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(29, 3300033653, 29217, 7000057273, 7000057273, 'NAMRATA JEWELS', 'BIVAS DAS', 'PROPRIETOR', 'EXH29', 'EXH29', 123456, 'D-118,AKRUL INDUSTRIAL ESTATE,', '1ST FLOOR, AKURLI ROAD,', 'KANDIVALI (EAST),', 'MUMBAI', '', 'IN', 400101, 9323143632, '91-22-28867654', '', 'NAMRATAJEWELS@GMAIL.COM', '', '', 5, '5B', 'plain_gold', 'BI1', 9, '5U 527E', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600871073, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(30, 3300034528, 29219, 7000050756, 7000050756, 'SANGEETA BOOCHRA JAIPUR', 'ABHINEET BOOCHRA', 'PARTNER', 'EXH30', 'EXH30', 123456, 'BOOCHRA HOUSE', 'C-38, BHAGWAN DAS ROAD', '', 'JAIPUR', '', 'IN', 302001, 9660000037, '9660000037', '', 'INFO@SANGEETABOOCHRA.COM', '', '', 3, '3A', 'silver', 'BI1', 18, '3Q 404D', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'RO-JAI', 1, '', '', 0, 0, '', 600895031, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(31, 3300033850, 29221, 7000060707, 7000060707, 'SUTRAM JEWELS PVT LTD', 'MEET JAIN', 'MANAGER', 'EXH31', 'EXH31', 123456, 'SHOP NO 1,SAFIYA MANZIL', 'DR MAHESHWARI ROAD,DONGRI', '', 'MUMBAI', '', 'IN', 400009, 9867773300, '9820761723', '', 'sutramjewels@gmail.com', '', '', 2, '2B', 'plain_gold', 'BI1', 16, '2J 274B', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600904014, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(32, 3300033785, 29223, 7000037986, 7000037986, 'MAYUR GOLD PVT. LTD.', 'YASH SISODIYA', 'DIRECTOR', 'EXH32', 'EXH32', 123456, '7/9,3RD AGYARI LANE, D.D.PLAza', '402/404,KHAU GALI', 'ZAVERI BAZAR', 'MUMBAI', '', 'IN', 400003, 8369277635, '8369277635', '', 'mg.mayurgold@gmail.com', '', '', 3, '3A', 'plain_gold', 'BI1', 16, '3L 324', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600869702, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(33, 3300033659, 29224, 7000003350, 7000003350, 'RAKSHIKA JEWELS LLP', 'DEEPAK KOTHARI', 'PARTNER', 'EXH33', 'EXH33', 123456, 'NO.C2 AND C3, 3RD FLOOR', 'SAKALAJEE MARKET', 'Avenue Road', 'BANGALORE', '', 'IN', 560002, 9341655666, '8041495557', '', 'deepakkotharib@gmail.com', '', '', 3, '3B', 'plain_gold', 'BI1', 16, '3L 348', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 600728280, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(34, 3300033788, 29226, 7000057275, 7000057275, 'TJ JEWELS', 'SHEETAL SONI', 'PARTNER', 'EXH34', 'EXH34', 123456, '68/72, GANPATI BHAVAN,', '1ST FLOOR,', 'DHANJI STREET, ZAVERI BAZAR,', 'MUMBAI', '', 'IN', 400003, 8425970098, '022-61832251', '', 'tjjewels2021@gmai.com', '', '', 4, '4B', 'plain_gold', 'BI1', 12, '4S 493D', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600898132, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Kapur', NULL, 0),
(35, 3300034469, 31135, 7000008595, 7000008595, 'GEM EXPORTS', 'AKSHAT GHIYA', 'PROPRIETOR', 'EXH35', 'EXH35', 123456, '1165', 'CHANDPOLE BAZAR', '', 'JAIPUR', '', 'IN', 302001, 9717067070, '4016357', '', 'info@tallinjewels.com', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 18', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-JAI', 1, '', '', 0, 0, '', 600858984, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(36, 3300034993, 30278, 7000004861, 7000004861, 'LABDHI DIAMOND', 'NITIN SHAH', 'PARTNER', 'EXH36', 'EXH36', 123456, '2ND FLOOR, A-210, PLOT 10/12', '99 GLITZ MALL', 'VITHALWADI, KALBADEVI ROAD', 'MUMBAI', '', 'IN', 400002, 9892056012, '2222443999', '', 'labdhidiamond9@gmail.com', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 19', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600730249, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(37, 3300033664, 29239, 7000006889, 7000006889, 'NAHAR DIAMOND', 'RITHESH KIRANCHAND NAHAR', 'MANAGING DIRECTOR', 'EXH37', 'EXH37', 123456, 'NO.48, 2ND FLOOR', 'MOHAN MANSION', 'KASTURIBA ROAD', 'BANGALORE', '', 'IN', 560001, 9844056615, '9844056615', '', 'nahardiamond@gmail.com', '', '', 3, '3B', 'diamond_colorstone', 'BI1', 27, '3P 412B', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 600717295, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(38, 3300033795, 29241, 7000047755, 7000047755, 'AQUA JEWELLERS', 'AMIT SHAH', 'PROPRIETOR', 'EXH38', 'EXH38', 123456, '1STFLR UNITNO A-102 RAMCHANDRA', 'lane,JASWANTI ALLIED BUSINESS', 'centre,MALAD WEST', 'MUMBAI', '', 'IN', 400064, 9820662751, '2235129512', '', 'aquajewellers08@gmail.com', '', '', 2, '2B', 'diamond_colorstone', 'BI1', 27, '2J 249A', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600888000, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(39, 3300035470, 29248, 7000061079, 7000061079, 'SHREENI JEWELLERS', 'HARSH DHAKAN', 'STAFF', 'EXH39', 'EXH39', 123456, '301 / 3RD FLOOR AMARPLAZA', 'NEAR RAM AND SHYAM GOLWADA', 'PALACE ROAD', 'RAJKOT', '', 'IN', 360001, 9327745322, '9825078310', '', 'dhakan.ashish@yahoo.in', '', '', 5, '5B', 'plain_gold', 'BI1', 9, '5U 529F', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-SRT', 1, '', '', 0, 0, '', 600873981, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(40, 3300033686, 29250, 7000000947, 7000000947, 'SHANKHESHWAR JEWELLERS', 'RISHI JAIN', 'PARTNER', 'EXH40', 'EXH40', 123456, '21, ABHINANDAN MARKET', '215/217,', 'KALBADEVI ROAD', 'MUMBAI', '', 'IN', 400002, 9820440910, '2222415813', '', 'sak_jewellers@hotmail.com', '', '', 3, '3A', 'plain_gold', 'BI1', 18, '3L 375', '', '', '', '', '', '', '', '', '', '', '', 'corner_3side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 3205353, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(41, 3300033797, 29251, 7000053137, 7000053137, 'ARINA GOLD LLP', 'HARSH DHAKAN', 'PARTNER', 'EXH41', 'EXH41', 123456, 'SUPERMALL 228 E SECOND FLOOR', 'NEAR LAL BUNGLOW C G ROAD AHMEDABAD', '', 'AHMEDABAD', '', 'IN', 380009, 9327745322, '9327745322', '', 'arinagoldllp@gmail.com', '', '', 4, '4B', 'plain_gold', 'BI1', 9, '4S 492D', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-SRT', 1, '', '', 0, 0, '', 600896998, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Kapur', NULL, 0),
(42, 3300034944, 29253, 7000007669, 7000007669, 'CAARA OVERSEAS PVT. LTD.', 'MR. VISHAL P. VORA', 'DIRECTOR', 'EXH42', 'EXH42', 123456, 'UNIT-48,NAND GHANSHYAM ESTATE,', '2ND FLOOR, NEAR PAPER BOX,', 'MAHAKALI CAVES ROAD,ANDHERI-E', 'MUMBAI', '', 'IN', 400093, 9820268508, '2249703648', '', 'vishalvora@caara.in', '', '', 4, '4B', 'diamond_colorstone', 'BI1', 18, '4R 474B', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600857989, '', '', 'SIGNATURE', 2023, '', 0, 0, 'expro', NULL, 0),
(43, 3300033579, 29254, 7000057606, 7000057606, 'SERAKI GOLD LLP', 'RAJENDRA M CHORDIYA', 'DIRECTOR', 'EXH43', 'EXH43', 123456, '703, SIDDHI DARSHAN, 7TH FLOOR', 'HINGWALA LANE,', 'GHATKOPAR (EAST),', 'MUMBAI', '', 'IN', 400077, 9323139988, '022-2235741070', '', 'serakigold@gmail.com', '', '', 3, '3A', 'plain_gold', 'BI1', 9, '3L 374B', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600897017, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(44, 3300033693, 29255, 7000053120, 7000053120, 'MIDAS TOUCH INTERNATIONAL PVT. LTD.', 'NAGINDER SINGH', 'DIRECTOR', 'EXH44', 'EXH44', 123456, 'A-22, FIRST FLOOR,', 'LAWRENCE ROAD,', '', 'AMRITSAR', '', 'IN', 143001, 9915556666, '9915556666', '', 'midastouchinternational@gmail.com', '', '', 3, '3B', 'diamond_colorstone', 'BI1', 16, '3Q 425', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-DEL', 1, '', '', 0, 0, '', 600897039, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(45, 3300033573, 29863, 7000009619, 7000009619, 'AMY JEWELLERY DESIGNERS', 'SACHU T RAZAKH', 'PROPRIETOR', 'EXH45', 'EXH45', 123456, '34/1845-A3, SAIRA PLAZA,', 'HIGH SCHOOL JUNCTION,', 'EDAPPALLY', 'COCHIN', '', 'IN', 682024, 8113995916, '8089206099', '', 'amyjewellerydesigners@gmail.com', '', '', 1, '1D', 'diamond_colorstone', 'BI1', 16, '1A 2', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 8930, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(46, 3300033695, 29259, 7000015786, 7000015786, 'SPARKLE DIAM PVT. LTD.', 'MR KINJAL SHAH', 'MANAGER SALES', 'EXH46', 'EXH46', 123456, 'MAROL INDUSTRIAL AREA,', 'PLOT NO. D-3,', 'ROAD NO. 16, MIDC,', 'MUMBAI', '', 'IN', 400093, 9819123123, '2228250073', '', 'kinjal@sparklediam.com', '', '', 3, '3A', 'diamond_colorstone', 'BI1', 54, '3P 408B', '', '', '', '', '', '', '', '', '', '', '', 'corner_3side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 3449, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(47, 3300033777, 29433, 7000051554, 7000051554, 'ROYAL GOLD', 'SHRAVAN KUMAR AGARWAL', 'PARTNER', 'EXH47', 'EXH47', 123456, 'THIRD FLOOR, 6-3-899/4, GOKULDHAM,', 'somajiguda', '', 'HYDERABAD', '', 'IN', 500082, 9849057171, '8121005071', '', 'royalgold.hyd@gmail.com', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 20', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 600889418, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(48, 3300034515, 29265, 7000005744, 7000005744, 'MANGALSUTRAM', 'PIYUSH', 'SALES', 'EXH48', 'EXH48', 123456, '108,1st floor,opp telephone ex', '37,sheik memon street,zaveri', 'bazar,mumbai=400002', 'MUMBAI', '', 'IN', 400002, 9892842102, '2233527202', '', 'mangalsutram@yahoo.in', '', '', 3, '3A', 'plain_gold', 'BI1', 18, '3N 380E', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'Premium', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600719465, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(49, 3300033696, 29267, 7000061098, 7000061098, 'SHREE AMBIKA GOLD', 'AMIT MANEKCHAND JAIN', 'PROPRIETOR', 'EXH49', 'EXH49', 123456, 'OFFICE NO 103, 99/103,1ST FLR', 'JEWEL CROWN BUILDNG', 'MUMBADEVI RD,TAMBAKATA,PYDHONI', 'MUMBAI', '', 'IN', 400003, 8080707091, '022-61834810', '', 'ambikajewels@gmail.com', '', '', 5, '5B', 'plain_gold', 'BI1', 9, '5U 526B', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600883962, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(50, 3300033698, 29268, 7000003571, 7000003571, 'DIVYA JEWELS', 'MANISH KUMAR MEHTA', 'PARTNER', 'EXH50', 'EXH50', 123456, 'Goldwin Gunjan', '19B Paddapukur Lane', '4Th Flr, 4A-4B', 'KOLKATA', '', 'IN', 700020, 9830013320, '3335473617', '', 'info@divyajewels.com', '', '', 4, '4B', 'diamond_colorstone', 'BI1', 18, '4R 461C', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'RO-KOL', 1, '', '', 0, 0, '', 600728433, '', '', 'SIGNATURE', 2023, '', 0, 0, 'expro', NULL, 0),
(51, 3300033699, 29269, 7000009345, 7000009345, 'SEJAL JEWELLERS', 'SHAILESH M. JAIN', 'PARTNER', 'EXH51', 'EXH51', 123456, '205, DIAMOND PLAZA', '2ND FLOOR', '83/85, DHANJI STREET', 'MUMBAI', '', 'IN', 400003, 9820957165, '022-33528384', '', 'sejaljewels@yahoo.com', '', '', 3, '3B', 'plain_gold', 'BI1', 9, '3L 367B', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 4420, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(52, 3300033833, 29270, 7000004176, 7000004176, 'HARDIK ZAVERI JEWELLERS', 'HARDIK JAWAHAR SAGAR', 'PARTNER', 'EXH52', 'EXH52', 123456, 'office no 212, jewel world', 'COTTON EXCHANGE BLDG', 'kalbadevi road', 'MUMBAI', '', 'IN', 400002, 9820081991, '22403363', '', 'hardikzaveri92@gmail.com', '', '', 3, '3A', 'plain_gold', 'BI1', 18, '3M 379B', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600717058, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(53, 3300033719, 29271, 7000060938, 7000060938, 'MAA JAGADAMBA JEWELLERS', 'CHETAN AGARWAL', 'PROPRIETOR', 'EXH53', 'EXH53', 123456, '3-5-141/3/3, Shanti Villa Street', 'No 3, , EDEN GARDEN', 'RAMKOTE', 'HYDERABAD', '', 'IN', 500001, 9032363609, '9032363609', '', 'maajagdambajwellers@gmail.com', '', '', 2, '2A', 'diamond_colorstone', 'BI1', 27, '2J 259A ', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 600868630, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(54, 3300033717, 29272, 7000009333, 7000009333, 'JEWEL CAST', 'MR. MANISH VASTIMAL JAIN', 'PROPRIETOR', 'EXH54', 'EXH54', 123456, '93/97, SHUKLA BHAVAN', '1ST FLR., ROOM NO. 2', '', 'MUMBAI', '', 'IN', 400003, 9820229430, '23719430', '', 'jewelcast@hotmail.com', '', '', 2, '2B', 'plain_gold', 'BI1', 9, '2K 294', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 3951, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(55, 3300035376, 30909, 7000066433, 7000066433, 'B GOKULCHAND JEWELLERS', 'CHETAN KUMAR', 'PROPRIETOR', 'EXH55', 'EXH55', 123456, '5-9-30/6,GROUND FLOOR', 'BASHEERBAGH', '', 'HYDERABAD', '', 'IN', 500063, 9849614208, '9849614208', '', 'bgokulchandjewellers@gmail.com', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 21', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 600915081, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(56, 3300033910, 29278, 7000001910, 7000001910, 'RITIKA CHAINS', 'AMIT', 'PROPRIETOR', 'EXH56', 'EXH56', 123456, '429-430, A-1,', 'SHAH AND NAHAR INDL. ESTATE,', 'DHANRAJ MILL COMPOUND,', 'MUMBAI', '', 'IN', 400013, 9322258726, '24979797', '', 'amit2886@gmail.com', '', '', 3, '3A', 'plain_gold', 'BI1', 16, '3L 335', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600725408, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(57, 3300033714, 29280, 7000009283, 7000009283, 'CLASSIC ORNAMENTS PVT. LTD.', 'RAKESH LALITKUMAR JAIN', 'DIRECTOR', 'EXH57', 'EXH57', 123456, '4TH FLOOR, 99/103', '401, JEWEL CROWN BUILDING', 'BHAGWAN BHUVAN,TAMBAKANTA LANE', 'MUMBAI', '', 'IN', 400003, 9821092062, '91-22-40042009', '', 'info@copl.in', '', '', 4, '4A', 'plain_gold', 'BI1', 72, '4T 482A', '', '', '', '', '', '', '', '', '', '', '', 'corner_3side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 58, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Kapur', NULL, 0),
(58, 3300033725, 29287, 7000006066, 7000006066, 'VARLAKSHMI JEWELLERY', 'NAVNEET AGARWAL', 'PARTNER', 'EXH58', 'EXH58', 123456, '501/B, 5TH FLOOR, R.K PLAZA', 'PUNJAGUTTA', '', 'HYDERABAD', '', 'IN', 500082, 9849032111, '4066369009', '', 'varlakshmijewellery@gmail.com', '', '', 4, '4B', 'diamond_colorstone', 'BI1', 16, '4R 470B', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 600730697, '', '', 'SIGNATURE', 2023, '', 0, 0, 'expro', NULL, 0),
(59, 3300033715, 29291, 7000038039, 7000038039, 'JINAYA JEWEL CAST LLP', 'MAYANK JAIN', 'ACCOUNTANT', 'EXH59', 'EXH59', 123456, 'RAJIV INDUSTRIAL ESTATE,', 'GALA NO. 14,', 'T.J. ROAD, SEWREE,', 'MUMBAI', '', 'IN', 400015, 9022920005, '223434466', '', 'ppjain202@gmail.com', '', '', 3, '3B', 'plain_gold', 'BI1', 16, '3L 346', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600877755, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(60, 3300033726, 29292, 7000057603, 7000057603, 'PUKHRAJ JUHARMAL MEHTA', 'NIKHIL MEHTA', 'OWNER SON', 'EXH60', 'EXH60', 123456, 'A-406, GLITZ MALL,', '4TH FLOOR, PLOT 10-12,', 'KALBADEVI ROAD, VITTHALWADI,', 'MUMBAI', '', 'IN', 400002, 9833005521, '91-22-22412922', '', 'NICKS1987.NM@GMAIL.COM', '', '', 5, '5B', 'plain_gold', 'BI1', 9, '5V 564', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600872061, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(61, 3300034432, 31189, 7000027838, 7000027838, 'ADASTRA JEWELRY PVT. LTD', 'ADITI MINDA', 'DIRECTOR', 'EXH61', 'EXH61', 123456, 'CC-1070, BHARAT DIAMOND', 'BOURSE, BANDRA KURLA', 'COMPLEX, BANDRA (EAST),', 'MUMBAI', '', 'IN', 400051, 9833223251, '22249738994', '', 'hello@adastrajewelry.com', '', '', 2, '2A', 'diamond_colorstone', 'BI1', 9, '2H 213', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600864948, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(62, 3300033749, 29296, 7000012314, 7000012314, 'RE JEWELS PVT. LTD.', 'MR. RAJEEV K. JAIN', 'DIRECTOR', 'EXH62', 'EXH62', 123456, '602-602/A, 6TH FLOOR,', 'PANCHRATNA,', 'M.P. MARG, OPERA HOUSE,', 'MUMBAI', '', 'IN', 400004, 9967222000, '9.12E+11', '', 'info@rejewels.com', '', '', 4, '4B', 'diamond_colorstone', 'BI1', 18, '4R 459A', '', '', '', '', '', '', '', '', '', '', '', 'corner_3side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 6508, '', '', 'SIGNATURE', 2023, '', 0, 0, 'expro', NULL, 0),
(63, 3300033544, 29299, 7000061008, 7000061008, 'PP ABHAY JEWELLERS PVT LTD', 'RISHABH PARAKH', 'DIRECOR', 'EXH63', 'EXH63', 123456, '302/2 EDWARD ROAD SADAR BAZAR', 'RAIPUR', 'RAIPUR', 'RAIPUR', '', 'IN', 492001, 7771800007, '0771 2555609', '', 'ppajwindia@gmail.com', '', '', 3, '3B', 'plain_gold', 'BI1', 16, '3L 352', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-KOL', 1, '', '', 0, 0, '', 600907685, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(64, 3300034898, 29301, 7000044083, 7000044083, 'SANATAN JEWELS PVT. LTD.', 'RAMBHAI', 'DIRECTOR', 'EXH64', 'EXH64', 123456, 'A-1 GREEN VILLE 31', 'SARDAD PATEL NAGAR', 'NAVARANGPURA', 'AHMEDABAD', '', 'IN', 380006, 9825019650, '99265401160', '', 'sanatanjewels@gmail.com', '', '', 5, '5B', 'plain_gold', 'BI1', 9, '5U 526A', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'RO-SRT', 1, '', '', 0, 0, '', 600873156, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(65, 3300033851, 29302, 7000066003, 7000066003, 'SWASTIK JEWELLERS', 'ANIL H..RANAWAT', 'PROPRIETOR', 'EXH65', 'EXH65', 123456, 'GROUND FLOOR, 7, A/8, GLITZ', 'MALL,KALBADEVI ROAD,', 'VITTHAL WADI, KALBADEVI', 'MUMBAI', '', 'IN', 400002, 9820035821, '022-61837057', '', 'anilranawat73@gmail.com', '', '', 4, '4B', 'plain_gold', 'BI1', 12, '4S 493C', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600882148, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Kapur', NULL, 0),
(66, 3300033918, 30161, 7000063124, 7000063124, 'NITYAS GEMS AND JEWELLERY PRIVATE LIMITED', 'RAJ MONPARA', 'SALES HEAD', 'EXH66', 'EXH66', 123456, '1ST FLOOR, 8, HARIKRUSHNA SOCIETY', 'SHYAMDHAM CHOWK, NANA VARACHHA,', 'SURAT, SURAT, GUJA', 'SURAT', '', 'IN', 395006, 7046218181, '8238220012', '', 'hello@nityas.in', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 22', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-SRT', 1, '', '', 0, 0, '', 600909867, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(67, 3300033827, 29305, 7000057314, 7000057314, 'TJ GOLD', 'SANNAY SHAH', 'SALES', 'EXH67', 'EXH67', 123456, '206, GOLDEN PLAZA,', '2ND FLOOR,93-95,DHANJI STREET', 'ZAVERI BAZAR,', 'MUMBAI', '', 'IN', 400003, 9699695383, '2249240875', '', 'Sanju_jain5@yahoo.com', '', '', 5, '5B', 'plain_gold', 'BI1', 9, '5V 528H', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600880822, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(68, 3300035364, 31358, 7000066422, 7000066422, 'AKALPYA DIAMONDS', 'KETAN SHAH', 'PARTNER', 'EXH68', 'EXH68', 123456, '356 3RD FLOOR ISCON EMPORIO', 'BESIDE DTAR BAZAAR JODHPUR CROSS ROAD', '', 'AHMEDABAD', '', 'IN', 380015, 9712966355, '7948466356', '', 'akalpyadiamonds@gmail.com', '', '', 2, '2A', 'diamond_colorstone', 'BI1', 9, '2H 210', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-SRT', 1, '', '', 0, 0, '', 600915043, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(69, 3300033828, 29309, 7000006991, 7000006991, 'SHRI RISHABH JEWELLERS', 'MANOJ GOLECHA', 'BUSINESS MANAGER', 'EXH69', 'EXH69', 123456, '126/128, TRIMURTI ESTATE,', '2ND FLOOR, OPP: KHARA KUWA,', 'ZAVERI BAZAR,', 'MUMBAI', '', 'IN', 400002, 9833906744, '66336771', '', 'manojgolecha70@gmail.com', '', '', 2, '2A', 'plain_gold', 'BI1', 9, '2K 321', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600857533, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(70, 3300033831, 29310, 7000057543, 7000057543, 'DANTARA DIAMONDS LLP', 'HARMESH DESAI', 'BUSINESS ASSOCIATE', 'EXH70', 'EXH70', 123456, '6,NAVKETAN INDUSTRIAL PREMISES', 'MAHAKALI CAVES ROAD,', 'ANDHERI (EAST),', 'MUMBAI', '', 'IN', 400093, 9892220077, '9892220077', '', 'dantara@dantaradiamonds.com', '', '', 4, '4A', 'diamond_colorstone', 'BI1', 18, '4R 458C', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600903908, '', '', 'SIGNATURE', 2023, '', 0, 0, 'expro', NULL, 0),
(71, 3300035365, 30896, 7000066434, 7000066434, 'INDERLAL BALMUKAND GEMS & JEWELS', 'JITENDER KUMAR GUPTA', 'PARTNER', 'EXH71', 'EXH71', 123456, 'Second Floor, 8-2-609/1/1/A', 'Arfath Arcade Shop No 3, Road NO 10', 'Banjara Hills', 'HYDERABAD', '', 'IN', 500034, 9391022163, '9391022163', '', 'ibgems.jewels@gmail.com', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 16, '1A 23', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 600914867, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(72, 3300033835, 29313, 7000027887, 7000027887, 'YASH JEWELLERS', 'JITENDRAKUMAR MUTHALIYA', 'PROPRIETOR', 'EXH72', 'EXH72', 123456, 'BHERUMAL HOUSE,', '2ND FLOOR, OFFICE NO. 203,', '147/149, SHEIKH MEMON STREET,', 'MUMBAI', '', 'IN', 400002, 9820649404, '9820649404', '', 'yashjewellers916@gmail.com', '', '', 5, '5B', 'plain_gold', 'BI1', 9, '5V 555', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600864910, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(73, 3300034443, 29315, 7000006019, 7000006019, 'DISHA ORNAMENTS', 'RAMESH PADALKAR', 'PROPRIETOR', 'EXH73', 'EXH73', 123456, '13 FLOOR 2ND PLOT 102 104', 'MOTIWALA BLDG,DHANJI STREET', 'ZAVERI BAZAR,MUMBADEVI', 'MUMBAI', '', 'IN', 400003, 9869001838, '022-23472224', '', 'Dishaornaments@gmail.com', '', '', 3, '3B', 'plain_gold', 'BI1', 16, '3Q 418', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600730323, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(74, 3300034392, 31248, 7000000463, 7000000463, 'MUNNII GOLD', 'DILESH J MEHTA', 'PROPERITER', 'EXH74', 'EXH74', 123456, '202-204 D D JEWELS,28', '1ST AGYARI L ANE KHARAKUVA', 'ZAVERI BAZAR', 'MUMBAI', '', 'IN', 400003, 9820399480, '2222438707', '', 'munniigold@gmail.com', '', '', 1, '1C', 'plain_gold', 'BI1', 16, '1A 27', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 1663, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(75, 3300034955, 30535, 7000017486, 7000017486, 'ALMAS JEWELS PRIVATE LIMITED', 'ATUL JAIN', 'DIRECTOR', 'EXH75', 'EXH75', 123456, '1188, MALIWARA,', 'CHANDNI CHOWK,', '', 'DELHI', '', 'IN', 110006, 9811114247, '011-43095522', '', 'almasjewel@gmail.com', '', '', 1, '1C', 'diamond_colorstone', 'BI1', 9, '1A 29A', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-DEL', 1, '', '', 0, 0, '', 493, '', '', 'SIGNATURE', 2023, '', 0, 0, 'P&I', NULL, 0),
(76, 3300033821, 29324, 7000045697, 7000045697, 'KUNDAN JEWELLERS', 'GIRISH SAKARIA', 'PROPRIETOR', 'EXH76', 'EXH76', 123456, '127/129, BHAGAT BUILDING,', '1ST FLOOR, ROOM NO. 3-B,', 'ZAVERI BAZAR,', 'MUMBAI', '', 'IN', 400002, 9821153836, '2223434337', '', 'kundan916@yahoo.com', '', '', 4, '4B', 'plain_gold', 'BI1', 9, '4T 491A', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 214136, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Kapur', NULL, 0),
(77, 3300033844, 29331, 7000006294, 7000006294, 'P HIRANI EXPORTS LLP', 'MR. JIGAR SURESH HIRANI', 'PARTNER', 'EXH77', 'EXH77', 123456, 'EE 8080 BHARAT DIAMOND', 'BOURSE, BANDRA KURLA', 'COMPLEX, BANDRA EAST,', 'MUMBAI', '', 'IN', 400051, 9820035914, '33926268', '', 'phiranitax@gmail.com', '', '', 3, '3B', 'diamond_colorstone', 'BI1', 18, '3P 393A', '', '', '', '', '', '', '', '', '', '', '', 'corner_3side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 121148, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(78, 3300033580, 29332, 7000002020, 7000002020, 'ABANS JEWELS PVT. LTD.', 'MEHUL PAREKH', 'CEO', 'EXH78', 'EXH78', 123456, '227, NARIMAN,BHAVAN,', '36-37-38a, 3RD FLOOR,', 'NARIMAN POINT,', 'MUMBAI', '', 'IN', 400021, 9004966000, '2249689859', '', 'mehul.parekh@abans.co.in', '', '', 3, '3A', 'diamond_colorstone', 'BI1', 18, '3N 397A', '', '', '', '', '', '', '', '', '', '', '', 'corner_3side', 'Premium', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600715688, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(79, 3300033845, 29333, 7000013267, 7000013267, 'SHREE OMKAR JEWELLER S (P) LTD', 'ARYAN SINGHANIA', 'MANAGING DIRECTOR', 'EXH79', 'EXH79', 123456, 'NO.1-9-292/9, RAMALAYA STREET', 'VIDYA NAGAR', '', 'HYDERABAD', '', 'IN', 500044, 9000040036, '9000040036', '', 'asinghania@shreeomkarjewellers.com', '', '', 3, '3B', 'diamond_colorstone', 'BI1', 27, '3P 414C', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'RO-CHE', 1, '', '', 0, 0, '', 215358, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(80, 3300033847, 29335, 7000050172, 7000050172, 'JEWEL & CHAINZ', 'JITHESH SOLANKI', 'PARTNER', 'EXH80', 'EXH80', 123456, '217, GROUND FLOOR', 'PLOT-205/219,A, GODIJI BLDG', 'KIKA STREET', 'MUMBAI', '', 'IN', 400002, 8451011188, '2266335136', '', 'jewelnchainz@gmail.com', '', '', 5, '5B', 'plain_gold', 'BI1', 9, '5V 557', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600893971, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(81, 3300033840, 29336, 7000003961, 7000003961, 'S.S.CHAINS JEWELLERY PRIVATE LIMITED', 'LAXMAN S JAIN', 'DIRECTOR', 'EXH81', 'EXH81', 123456, '409-410/A-1, SHAH & NAHAR INDS', 'ESTATE, S.J.MARG,', 'LOWER PAREL (W),', 'MUMBAI', '', 'IN', 400013, 9820377624, '22413000', '', 'SSGOLD92CHAINS@GMAIL.COM', '', '', 3, '3B', 'plain_gold', 'BI1', 16, '3L 353', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600716596, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(82, 3300033834, 29338, 7000002635, 7000002635, 'SETS JEWELLERY PVT. LTD.', 'MR. RAMESHCHANDRA S. BOHARA', 'DIRECTOR', 'EXH82', 'EXH82', 123456, '14, GOLDEN PLAZA,', '93-95, DHANJI STREET,', 'ZAVERI BAZAR,', 'MUMBAI', '', 'IN', 400003, 9821259396, '2261838373', '', 'SETSJEWELLERY@GMAIL.COM', '', '', 5, '5B', 'plain_gold', 'BI1', 18, '5U 524', '', '', '', '', '', '', '', '', '', '', '', 'corner_3side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 212951, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(83, 3300033891, 29340, 7000015658, 7000015658, 'SILVER CREATIONS PVT. LTD.', 'ANKITA TULSIANI', 'MERCHANDISER', 'EXH83', 'EXH83', 123456, '1403,', 'BEHIND LMB HOTEL', 'JOHARI BAZAR', 'JAIPUR', '', 'IN', 302003, 8209061308, '1414075032', '', 'silvercreations1403@gmail.com', '', '', 3, '3A', 'silver', 'BI1', 9, '3P 402D', '', '', '', '', '', '', '', '', '', '', '', 'corner_2side', 'normal', 'RO-JAI', 1, '', '', 0, 0, '', 9432, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(84, 3300033429, 29342, 7000006851, 7000006851, 'JHALAK JEWELLERS', 'RACHANA SHAH', 'HEAD', 'EXH84', 'EXH84', 123456, '108, CIEM INDUSTRIAL LIMITED,', 'OFF: RAMCHANDRA LANE,', 'KANCHPADA, MALAD (WEST),', 'MUMBAI', '', 'IN', 400064, 9167673067, '9167673067', '', 'jhalakjewellers09@gmail.com', '', '', 2, '2A', 'diamond_colorstone', 'BI1', 18, '2H 253C', '', '', '', '', '', '', '', '', '', '', '', 'corner_3side', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600729703, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(85, 3300033829, 29344, 7000058887, 7000058887, 'RUSHABH JEWELS', 'RUSHABH', 'PROPRIETOR', 'EXH85', 'EXH85', 123456, 'G Floor No 9 5th Cross 7th Main', 'Srirampuram Bangalore', '', 'BANGALORE', '', 'IN', 560021, 9945569681, '9945569681', '', 'rushabhpatwa88@gmail.com', '', '', 3, '3A', 'silver', 'BI1', 16, '3Q 437', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'HO-MUM (M)', 1, '', '', 0, 0, '', 600900670, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(86, 3300033819, 29347, 7000009549, 7000009549, 'RAJ JEWELLERS', 'AKASH MODI', 'DIRECTOR', 'EXH86', 'EXH86', 123456, 'B-11, DADU MARG', 'GOPAL bari', 'lane no.1', 'JAIPUR', '', 'IN', 302006, 9829048887, '9829048887', '', 'rajjewels@hotmail.com', '', '', 2, '2B', 'diamond_colorstone', 'BI1', 12, '2J 245G', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-JAI', 1, '', '', 0, 0, '', 600860214, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0),
(87, 3300034353, 31287, 7000061170, 7000061170, 'ANH JEWELS PRIVATE LIMITED', 'HARDIK SHAH', 'CO FOUNDER', 'EXH87', 'EXH87', 123456, 'Shop No. 1, Samavsaran Building', 'Opp. Jain Temple, Athwalines', '', 'SURAT', '', 'IN', 395007, 9825144476, '2612651325', '', 'finance@anhjewels.com', '', '', 2, '2A', 'diamond_colorstone', 'BI1', 9, '2H 205', '', '', '', '', '', '', '', '', '', '', '', 'normal', 'normal', 'RO-SRT', 1, '', '', 0, 0, '', 600907793, '', '', 'SIGNATURE', 2023, '', 0, 0, 'Balaji', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `newsId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `shortDesc` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `status` enum('1','0') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`newsId`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`newsId`, `title`, `slug`, `shortDesc`, `content`, `image`, `userId`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Alcohol - Science behind how much is too much', 'Alcohol-Science-behind-how-much-is-too-much', 'Alcohol - Science behind how much is too much', 'Alcohol - Science behind how much is too much', 'photo_1686054907057.png', 1, '1', '2023-06-01 12:27:03', '2023-06-08 13:08:41'),
(2, 'kindly-residence-address-update', 'kindly-residence-address-update', 'kindly-residence-address-update', 'kindly-residence-address-update', 'photo_1686054886044.jpeg', 1, '1', '2023-06-01 12:27:03', '2023-06-08 13:06:51'),
(12, 'zzvdsdv', 'zzvdsdv', 'dvs', '', 'photo_1686056209736.jpeg', NULL, '1', '2023-06-06 12:56:49', '2023-06-06 12:56:49'),
(13, 'sfasf', 'sfasf', '', '', 'photo_1686063996298.png', 1, '1', '2023-06-06 15:06:36', '2023-06-06 15:06:36'),
(14, 'logo', 'logo', 'dg', '', 'photo_1686064119798.png', 1, '1', '2023-06-06 15:08:39', '2023-06-06 15:08:39'),
(15, 'ffff', 'ffff', '', '', 'photo_1686065169420.jpeg', 1, '1', '2023-06-06 15:26:09', '2023-06-06 15:26:09'),
(16, 'ram ji ki katha', 'ram-ji-ki-katha', 'd', '', 'photo_1686148435682.jpeg', 1, '1', '2023-06-07 14:33:55', '2023-06-07 14:33:55'),
(17, 'sasf', 'sasf', '', '', 'photo_1686150796096.jpeg', 1, '1', '2023-06-07 15:13:16', '2023-06-07 15:13:16'),
(18, 'From Mines to Fingers: JCK Talks Highlights the Importance of Transparency in the Diamond Supply Chain', 'from-mines-to-fingers-jck-talks-highlights-the-importance-of-transparency-in-the-diamond-supply-chain', 'From Mines to Fingers: JCK Talks Highlights the Importance of Transparency in the Diamond Supply Chain', 'From Mines to Fingers: JCK Talks Highlights the Importance of Transparency in the Diamond Supply Chain', 'photo_1686228598662.png', 1, '1', '2023-06-08 12:49:58', '2023-08-06 07:51:32'),
(19, 'Explain Model View Controller In Node JS (Express JS) MongoDB In Hindi', 'explain-model-view-controller-in-node-js-express-js-mongodb-in-hindi', 'Explain Model View Controller In Node JS (Express JS) MongoDB In Hindi', 'Explain Model View Controller In Node JS (Express JS) MongoDB In Hindi', 'photo_1686314766553.png', NULL, '1', '2023-06-09 12:46:06', '2023-06-09 12:46:06'),
(20, 'Understanding ExpressJS Routing', 'understanding-expressjs-routing', 'Understanding ExpressJS Routing', '', 'photo_1686555637110.png', 1, '1', '2023-06-12 07:40:37', '2023-06-12 07:40:51');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('Ls95hiDqtlAiVeZYojPJClzSzj4pBip0', '2023-08-17 07:06:32', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-17T07:06:22.012Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"isLoggedIn\":true,\"adminId\":1,\"role\":\"superadmin\",\"email\":\"neelmani@kwebmaker.com\",\"username\":\"wg@admin\",\"name\":\"NEELMANI GUPTA\"}', '2023-08-16 07:06:22', '2023-08-16 07:06:32');

-- --------------------------------------------------------

--
-- Table structure for table `tutorials`
--

DROP TABLE IF EXISTS `tutorials`;
CREATE TABLE IF NOT EXISTS `tutorials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tutorials`
--

INSERT INTO `tutorials` (`id`, `title`, `description`, `published`, `createdAt`, `updatedAt`) VALUES
(1, 'kweb', 'dsfssd', NULL, '2023-05-16 10:58:23', '2023-05-16 10:58:23'),
(2, 'gjepc', 'vsdsdv', NULL, '2023-05-16 10:58:23', '2023-05-16 10:58:23');

-- --------------------------------------------------------

--
-- Table structure for table `useris`
--

DROP TABLE IF EXISTS `useris`;
CREATE TABLE IF NOT EXISTS `useris` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `useris`
--

INSERT INTO `useris` (`id`, `name`, `email`, `createdAt`, `updatedAt`, `status`) VALUES
(1, 'Mani Gupta', 'mani@gmail.com', '2023-05-20 16:35:27', '2023-08-06 07:52:46', '1'),
(2, 'Sheela', 'shili@gmail.com', '2023-05-21 14:11:19', '2023-08-06 07:52:43', '1'),
(3, 'kumail', 'kumail@gmail.com', '2023-05-21 14:11:19', '2023-05-23 05:52:06', '1'),
(4, 'laila', 'laila@gmail.com', '2023-05-20 16:35:27', '2023-05-20 16:35:27', '1'),
(5, 'sivi', 'sivi@gmail.com', '2023-05-21 14:11:19', '2023-05-31 12:52:35', '1'),
(6, 'Kunal', 'kunal@gmail.com', '2023-05-21 14:11:19', '2023-06-02 06:02:17', '1'),
(7, 'sultan', 'sultan@gmail.com', '2023-05-20 16:35:27', '2023-06-02 06:03:14', '1'),
(8, 'mangesh', 'mangesh@gmail.com', '2023-05-21 14:11:19', '2023-06-02 06:04:16', '1'),
(9, 'kiran', 'kiran@gjepcindia.com', '2023-05-21 14:11:19', '2023-05-24 13:33:16', '0'),
(10, 'Krishna', 'krishna@gjepcindia.com', '2023-05-20 16:35:27', '2023-05-24 13:34:27', '0'),
(11, 'akash', 'akash@gjepcindia.com', '2023-05-21 14:11:19', '2023-05-24 13:34:50', '0'),
(12, 'naheed', 'naheed@gjepcindia.com', '2023-05-21 14:11:19', '2023-05-21 14:11:19', '1'),
(13, 'Mani', 'mani@gmail.com', '2023-05-22 13:28:49', '2023-05-22 13:28:49', '1'),
(14, 'Maniratnam', 'maniratnam@gmail.com', '2023-05-22 13:29:16', '2023-05-23 12:21:40', '1'),
(15, 'sunny', 'sunny@gmail.com', '2023-05-22 13:36:17', '2023-05-23 12:21:53', '1'),
(16, 'kalu', 'kalu@gmail.com', '2023-05-22 13:36:21', '2023-05-23 12:22:06', '1'),
(17, 'Manish', 'manish@gmail.com', '2023-05-22 13:38:19', '2023-05-23 07:32:55', '1'),
(19, 'lalu', 'lalu@gmail.com', '2023-05-29 16:28:45', '2023-05-29 16:28:45', '1'),
(20, 'lalus', 'lalus@gmail.com', '2023-05-29 16:31:58', '2023-05-29 16:31:58', '1'),
(23, 'monicka', 'monicka@gmail.com', '2023-05-30 16:04:59', '2023-05-30 16:04:59', '1'),
(24, 'lolo', 'lolo@gmail.com', '2023-05-30 16:21:32', '2023-05-30 16:21:32', '1'),
(25, 'solo', 'solo@gmail.com', '2023-05-30 16:23:30', '2023-05-30 16:23:30', '1'),
(26, 'mumni', 'mun@gmail.com', '2023-05-31 06:39:43', '2023-05-31 06:39:43', '1'),
(27, 'piyu', 'piyu@gmail.com', '2023-05-31 12:51:22', '2023-05-31 12:51:22', '1'),
(28, 'nutan', 'nutan@gmail.com', '2023-06-05 12:41:44', '2023-06-05 12:41:44', '1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `age` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `createdAt`, `updatedAt`, `age`) VALUES
(1, 'Neel', 'neel@kwebmaker.com', '2023-05-20 15:53:54', '2023-05-20 15:53:54', 25);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
