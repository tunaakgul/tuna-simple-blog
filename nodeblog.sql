-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Production Time: 12 Oca 2017, 17:24:43
-- Server Version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nodeblog`
--

-- --------------------------------------------------------

--
-- Table structure for `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8_turkish_ci NOT NULL,
  `mail` varchar(75) COLLATE utf8_turkish_ci NOT NULL,
  `postid` int(11) NOT NULL,
  `content` text COLLATE utf8_turkish_ci NOT NULL,
  `date` varchar(10) COLLATE utf8_turkish_ci NOT NULL,
  `website` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci AUTO_INCREMENT=10 ;

--
-- Table data `comment`
--

INSERT INTO `comment` (`id`, `name`, `mail`, `postid`, `content`, `date`, `website`, `isActive`) VALUES
(2, 'tuna', 'tuna.akgul@gmail.com', 6, 'qwewqeqw', '12/10/2016', NULL, 1),
(3, 'tuna', 'tuna.akgul@gmail.com', 6, '123', '10/01/2017', NULL, 1),
(4, 'tuna', 'tuna.akgul@gmail.com', 6, '54', '10/01/2017', 'www.tunaakgul.com', 1),
(5, 'tuna', 'adasda', 7, 'vxcv', '10/01/2017', 'asdasdd', 1),
(7, 'tuna', 'tuna.akgul@gmail.com', 7, 'sadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasd', '10/01/2017', 'sadsa', 1),
(8, 'tuna', 'tuna.akgul@gmail.com', 7, 'abhdhasbdsbhad', '12/10/2016', NULL, 1),
(9, 'tuna', 'tuna.akgul@gmail.com', 7, 'abhdhasbdsbhad', '12/10/2016', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `header` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `content` text COLLATE utf8_turkish_ci NOT NULL,
  `uid` int(11) NOT NULL,
  `date` varchar(10) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci AUTO_INCREMENT=10 ;

--
-- Tablo data `post`
--

INSERT INTO `post` (`id`, `header`, `content`, `uid`, `date`) VALUES
(7, 'Sample Blog Header', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum feugiat neque sit amet scelerisque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce pretium est vel ipsum consectetur condimentum non vel ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vel libero id neque dapibus ultricies nec sed ligula. Sed tempor mi tellus, vitae rutrum nisl posuere et. Donec rutrum imperdiet tempus. Etiam in ante sollicitudin lectus ultricies maximus. Sed placerat justo enim, vel ornare elit venenatis sit amet. Phasellus ut augue vel ante mattis congue. Aliquam magna ligula, porttitor quis interdum eget, fringilla non dolor. Cras volutpat aliquam lacus sit amet ultrices. Mauris vitae imperdiet elit. Cras maximus rutrum scelerisque. Nam bibendum orci odio, a euismod mauris lacinia ut.

Etiam sollicitudin quis massa at pharetra. Morbi dapibus justo urna, consectetur egestas enim consequat vitae. Morbi pretium lorem quis velit sollicitudin molestie. Suspendisse porttitor posuere lectus a fermentum. Proin eros orci, hendrerit eu placerat non, hendrerit non erat. Nam sagittis, leo et accumsan fringilla, nisi purus feugiat sem, quis sollicitudin turpis lectus eu mi. Proin tincidunt mi neque, eget dignissim purus condimentum non. Aenean quis eros mauris.', 1, '11/10/2016'),
(8, 'Sample Blog Header 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum feugiat neque sit amet scelerisque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce pretium est vel ipsum consectetur condimentum non vel ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vel libero id neque dapibus ultricies nec sed ligula. Sed tempor mi tellus, vitae rutrum nisl posuere et. Donec rutrum imperdiet tempus. Etiam in ante sollicitudin lectus ultricies maximus. Sed placerat justo enim, vel ornare elit venenatis sit amet. Phasellus ut augue vel ante mattis congue. Aliquam magna ligula, porttitor quis interdum eget, fringilla non dolor. Cras volutpat aliquam lacus sit amet ultrices. Mauris vitae imperdiet elit. Cras maximus rutrum scelerisque. Nam bibendum orci odio, a euismod mauris lacinia ut.

Etiam sollicitudin quis massa at pharetra. Morbi dapibus justo urna, consectetur egestas enim consequat vitae. Morbi pretium lorem quis velit sollicitudin molestie. Suspendisse porttitor posuere lectus a fermentum. Proin eros orci, hendrerit eu placerat non, hendrerit non erat. Nam sagittis, leo et accumsan fringilla, nisi purus feugiat sem, quis sollicitudin turpis lectus eu mi. Proin tincidunt mi neque, eget dignissim purus condimentum non. Aenean quis eros mauris.', 1, '11/10/2016'),
(9, 'Sample Blog Header 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum feugiat neque sit amet scelerisque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce pretium est vel ipsum consectetur condimentum non vel ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vel libero id neque dapibus ultricies nec sed ligula. Sed tempor mi tellus, vitae rutrum nisl posuere et. Donec rutrum imperdiet tempus. Etiam in ante sollicitudin lectus ultricies maximus. Sed placerat justo enim, vel ornare elit venenatis sit amet. Phasellus ut augue vel ante mattis congue. Aliquam magna ligula, porttitor quis interdum eget, fringilla non dolor. Cras volutpat aliquam lacus sit amet ultrices. Mauris vitae imperdiet elit. Cras maximus rutrum scelerisque. Nam bibendum orci odio, a euismod mauris lacinia ut.

Etiam sollicitudin quis massa at pharetra. Morbi dapibus justo urna, consectetur egestas enim consequat vitae. Morbi pretium lorem quis velit sollicitudin molestie. Suspendisse porttitor posuere lectus a fermentum. Proin eros orci, hendrerit eu placerat non, hendrerit non erat. Nam sagittis, leo et accumsan fringilla, nisi purus feugiat sem, quis sollicitudin turpis lectus eu mi. Proin tincidunt mi neque, eget dignissim purus condimentum non. Aenean quis eros mauris.', 1, '12/01/2017');

-- --------------------------------------------------------

--
-- Table structure for `token`
--

CREATE TABLE IF NOT EXISTS `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `token` varchar(30) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci AUTO_INCREMENT=19 ;

--
-- Tablo data `token`
--

INSERT INTO `token` (`id`, `uid`, `token`) VALUES
(1, 1, 'b640b6c256cdafc74ffc644fc59505'),
(2, 1, '3b59c937f4a563a6728845eac49a94'),
(3, 1, '47711d84ce46c69e210abbfd2f69a5'),
(4, 1, 'd3c0b7f8181dab385a007b95a3d8ab'),
(5, 1, 'f9415d8d0bd465a1f6a933a408996e'),
(6, 1, 'd96231fe50c5457c01acf6719b9477'),
(7, 1, '347f0d685beec8d1ee331c0b5a2fe0'),
(8, 1, 'ec0f991e0f9d612cbe519e8cb340cc'),
(9, 1, '3eb13e05e37a5d6cbfefeeb5458456'),
(10, 1, '30f01210e8fc17c75dfa3b33d4a6f7'),
(11, 1, 'aa914b9b921fc9ebc2500071c12bd4'),
(12, 1, '34e93922b2771f46299602c1f9da0c'),
(13, 1, '707546905e551533cc75d6c0818505'),
(14, 1, 'b8cc1d1b7f09d9a5c23bd7d16e728d'),
(15, 1, 'acb5765d68a8d082fffd2d9f54ef90'),
(16, 1, '90fa488b9c56e105649efeec78dbeb'),
(17, 1, '1172c2288cf6e65f1be05f19a98949'),
(18, 1, '5d1f91c31a7e292cf839b293b9ca52');

-- --------------------------------------------------------

--
-- Table structure for `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(20) COLLATE utf8_turkish_ci NOT NULL,
  `pass` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci AUTO_INCREMENT=2 ;

--
-- Tablo data `user`
--

INSERT INTO `user` (`id`, `uname`, `pass`) VALUES
(1, 'admin', '12345');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
