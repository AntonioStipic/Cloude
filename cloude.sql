-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 17, 2016 at 09:50 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cloude`
--

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `value` longtext COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `extension` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `owner` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `salt` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `unique_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `value`, `name`, `extension`, `owner`, `salt`, `unique_id`) VALUES
(1, '%3Chtml%3E%0A%09%3Chead%3E%0A%09%09%3Ctitle%3ETest%3C%2Ftitle%3E%0A%09%3C%2Fhead%3E%0A%09%3Cbody%3E%0A%09%09%3Ch3%3EHello%20World!%3C%2Fh3%3E%0A%09%3C%2Fbody%3E%0A%3C%2Fhtml%3E', 'index', 'html', 'A', 'f27b79390961b69073c83673ef9993c6', '0a44486ef94bf36284e9ee79542bf00a'),
(2, 'Hello%202!', 'HelloWorld', 'txt', 'A', 'f27b79390961b69073c83673ef9993c6', '3e03833c8076bf67a816ba5970e69282'),
(3, 'This%20is%20%22h.txt%22%20-take%202', 'h', 'txt', 'A', 'f27b79390961b69073c83673ef9993c6', '359c5cbd67972ba2304439cd8eeccba0'),
(4, 'Hello.txt', 'Hello', 'txt', 'A', 'f27b79390961b69073c83673ef9993c6', '79cd3e176171d8f34119adf5756187d6'),
(5, 'Small%20hello.txt', 'hello', 'txt', 'A', 'f27b79390961b69073c83673ef9993c6', 'eb6d06b0e88c414488a48d469311ade7'),
(6, 'test_example.html', 'test_example', 'html', 'A', 'f27b79390961b69073c83673ef9993c6', '08ca446f3f646dd2487c239029f62ef5'),
(7, 'THIS%20IS%20SECRET', 'secret', 'txt', 'Antonio', '049edf1b8900bf6b7280f71a97700ec7', 'e97b4e4593a3986cdc43b9c7028a7a67'),
(8, '%7B%0A%20%20%22name%22%3A%20%22cloude%22%2C%0A%20%20%22version%22%3A%20%221.0.0%22%2C%0A%20%20%22description%22%3A%20%22Web%20service%20for%20development%22%2C%0A%20%20%22main%22%3A%20%22app.js%22%2C%0A%20%20%22scripts%22%3A%20%7B%0A%20%20%20%20%22test%22%3A%20%22echo%20%5C%22Error%3A%20no%20test%20specified%5C%22%20%26%26%20exit%201%22%0A%20%20%7D%2C%0A%20%20%22author%22%3A%20%22Antonio%20Stipic%22%2C%0A%20%20%22license%22%3A%20%22ISC%22%2C%0A%20%20%22dependencies%22%3A%20%7B%0A%20%20%20%20%22body-parser%22%3A%20%22%5E1.15.2%22%2C%0A%20%20%20%20%22express%22%3A%20%22%5E4.14.0%22%2C%0A%20%20%20%20%22jsonwebtoken%22%3A%20%22%5E7.1.9%22%2C%0A%20%20%20%20%22mon%22%3A%20%220.0.8%22%2C%0A%20%20%20%20%22mysql%22%3A%20%22%5E2.12.0%22%0A%20%20%7D%0A%7D%0A', 'package', 'json', 'undefined', '11872c7949b4ab1359265ca32f900922', '4718b14eeb2e15cde615343bee878c5b'),
(9, 'Hello', 'file', 'txt', 'Lara', '82c5d5e22c82265b0504def38c4e87bd', 'f0abe543c194146eeea6669e413ec8ce'),
(10, 'Facebook%3A%20i''vebeenlookingforawayout', 'lozinke', 'txt', 'Lara', '82c5d5e22c82265b0504def38c4e87bd', '13554aae2a7bbe3e6832fa5f71ff64b5'),
(13, 'Skillet%20-%20Awake%20and%20Alive%0AEminem%20-%20Mockingbird%0A', 'songs', 'list', 'Antonio', '049edf1b8900bf6b7280f71a97700ec7', 'd9bc93a660836c10dba86031359bf647'),
(14, '12345', 'secret', 'txt', 'A', 'f27b79390961b69073c83673ef9993c6', 'aea94604915b95113ce6509bc8725848'),
(19, '', '', 'asdf', 'A', 'f27b79390961b69073c83673ef9993c6', '405dd75b0e484b648168369704e7cf0f'),
(20, 'Hello%20World%20%5C%5C%5C%5C%5C%2F%2F%2F%2F%2F', 'abc', 'txt', 'A', 'f27b79390961b69073c83673ef9993c6', '4f06652f133e15a1c65448ea424cfd40'),
(21, '12345', 'secret2', 'txt', 'A', 'f27b79390961b69073c83673ef9993c6', '222b06df13d0448c462fd7fb8a90ead0'),
(23, '%3Chtml%3E%0Ahtmllllllll%0A%0A.....-.%20done', 'vjezba', 'html', 'A', 'f27b79390961b69073c83673ef9993c6', 'a86499ddf83f221b00c4afd27cf7deae');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `sessid` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `sessid`) VALUES
(1, 'A', '123', 'f27b79390961b69073c83673ef9993c6'),
(2, 'Antonio', '123', '049edf1b8900bf6b7280f71a97700ec7'),
(4, 'Lara', 'LOL', '82c5d5e22c82265b0504def38c4e87bd'),
(5, 'undefined', 'undefined', '11872c7949b4ab1359265ca32f900922');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_id` (`unique_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `sessid` (`sessid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
