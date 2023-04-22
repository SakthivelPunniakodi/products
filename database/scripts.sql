-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 22, 2023 at 02:16 PM
-- Server version: 8.0.33
-- PHP Version: 7.4.3-4ubuntu2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prod_123`
--

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `Id` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL DEFAULT '',
  `Price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Viewed` int NOT NULL DEFAULT '0',
  `IsActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`Id`, `Name`, `Description`, `Price`, `Viewed`, `IsActive`, `createdAt`, `updatedAt`) VALUES
(1, 'Lenovo D-Series 19.5 Inch Full HD ', 'Lenovo D-Series 19.5 Inch Full HD TN Panel with Fully Adjustable Tilt Stand, Seamless Connectivity, HDMI 1.4 +VGA, TUV Certified Flicker Free & Low Blue Light Monitor (D20-30)  (Response Time: 5 ms, 60 Hz Refresh Rate)', 98.10, 9, 1, '2023-04-22 09:25:40', '2023-04-22 11:16:50'),
(2, 'acer 21.5 inch Full HD LED Backlit ', 'acer 21.5 inch Full HD LED Backlit VA Panel with ZeroFrame Design, Ergonomic Stand, Acer Vision Care, Flicker Free Monitor (EK220Q)  (AMD Free Sync, Response Time: 1 ms, 100 Hz Refresh Rate)', 90.00, 0, 1, '2023-04-22 09:29:47', '2023-04-22 09:29:47'),
(3, 'Laptop', 'Dell laptop with 2Gb graphics', 124.00, 1, 1, '2023-04-22 11:16:25', '2023-04-22 11:17:18'),
(4, 'MOTOROLA g13', 'MOTOROLA g13 (Lavender Blue, 128 GB)  (4 GB RAM)', 121.88, 0, 1, '2023-04-22 12:06:25', '2023-04-22 12:06:25'),
(5, 'REDMI Note 12', 'REDMI Note 12 (Sunrise Gold, 64 GB)  (6 GB RAM)', 182.82, 0, 1, '2023-04-22 12:07:42', '2023-04-22 12:07:42'),
(6, 'realme C55', 'Realme C55 (Rainy Night, 128 GB)  (8 GB RAM)', 170.63, 0, 1, '2023-04-22 12:09:15', '2023-04-22 12:09:15'),
(7, 'realme C55 (Sunshower, 128 GB)  (8 GB RAM)', 'realme C55 (Sunshower, 128 GB)  (8 GB RAM)', 170.63, 0, 1, '2023-04-22 12:10:00', '2023-04-22 12:10:00'),
(8, 'Lenovo 23.8 inch Full HD', 'Lenovo 23.8 inch Full HD VA Panel 3-Side Near Edgeless with TUV Eye Care Monitor (D24-20)  (Response Time: 4 ms, 75 Hz Refresh Rate)', 103.59, 0, 1, '2023-04-22 12:10:47', '2023-04-22 12:10:47'),
(9, 'acer Nitro 23.8 inch Full HD LED Backlit', 'acer Nitro 23.8 inch Full HD LED Backlit IPS Panel Gaming Monitor (VG240Y)  (Response Time: 0.5 ms, 165 Hz Refresh Rate)', 110.59, 0, 1, '2023-04-22 12:14:26', '2023-04-22 12:14:26'),
(10, 'acer 27 inch Full HD LED Backlit ', 'acer 27 inch Full HD LED Backlit IPS Panel White Colour Monitor (HA270)  (Frameless, AMD Free Sync, Response Time: 4 ms, 75 Hz Refresh Rate)', 113.59, 0, 1, '2023-04-22 12:15:19', '2023-04-22 12:15:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
