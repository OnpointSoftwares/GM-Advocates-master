-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2025 at 06:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gm_advocates_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `patient_name` varchar(255) NOT NULL,
  `doctor_name` varchar(255) NOT NULL,
  `appointment_date` datetime NOT NULL,
  `status` enum('pending','confirmed','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `subtitle1` varchar(255) DEFAULT NULL,
  `description1` text DEFAULT NULL,
  `desc1l1` text DEFAULT NULL,
  `desc1l2` text DEFAULT NULL,
  `desc1l3` text DEFAULT NULL,
  `desc1l4` text DEFAULT NULL,
  `desc1l5` text DEFAULT NULL,
  `subtitle2` varchar(255) DEFAULT NULL,
  `description2` text DEFAULT NULL,
  `subtitle3` varchar(255) DEFAULT NULL,
  `description3` text DEFAULT NULL,
  `desc3l1` text DEFAULT NULL,
  `desc3l2` text DEFAULT NULL,
  `desc3l3` text DEFAULT NULL,
  `desc3l4` text DEFAULT NULL,
  `desc3l5` text DEFAULT NULL,
  `description5` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `author`, `date`, `image`, `description`, `subtitle1`, `description1`, `desc1l1`, `desc1l2`, `desc1l3`, `desc1l4`, `desc1l5`, `subtitle2`, `description2`, `subtitle3`, `description3`, `desc3l1`, `desc3l2`, `desc3l3`, `desc3l4`, `desc3l5`, `description5`) VALUES
(14, 'Contract Law Article', 'Godfrey Orina', '2025-03-12', 'image', 'Contract law governs legally binding agreements between parties, ensuring enforceability and providing remedies for breaches. A valid contract requires an offer, acceptance, consideration, mutual intent, capacity, and legality. Contracts can be express (clearly stated) or implied (inferred from actions) and may be unilateral (one party makes a promise) or bilateral (both parties exchange promises). If breached, remedies include monetary damages, specific performance, or contract rescission. This legal framework ensures fairness in business and personal transactions, holding parties accountable to their commitments.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'jjj', 'nnn', '2025-03-22', 'jjjj', 'jjjj', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `report_date` date DEFAULT curdate(),
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `system_users`
--

CREATE TABLE `system_users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','editor','author','subscriber') NOT NULL DEFAULT 'subscriber',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` varchar(255) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `system_users`
--

INSERT INTO `system_users` (`id`, `username`, `email`, `password_hash`, `role`, `created_at`, `password`, `reset_token`) VALUES
(4, 'Onduso Bonface', 'ondusobonface9@gmail.com', '$2b$10$/H34eTG8teNFm/mqcVTlhePDkLzFEJYeO3038ly/1hkPnN8p07aIS', 'subscriber', '2025-03-13 08:33:42', '', NULL),
(5, 'John Muli', 'John@gmail.com', '$2b$10$w52KtKJrf1JJg17GaoaysuOI6ZWQqcqBroL3YCAPkORRJykWNAtdy', 'subscriber', '2025-03-13 08:35:18', '', NULL),
(6, 'onduso', 'ondusobonface@gmail.com', '$2b$10$FdSJSpjalZsF2KwDo2X0a.FUnvD2OwzmIebZms9CWghjDlkhg.eii', 'admin', '2025-03-13 17:31:49', '', NULL),
(8, 'Mary Ndugu', 'mary@mail.com', '$2b$10$f/RTLz7wPLD9xBsztbvSZ.tk6.oCRaqqOfCSQ/xSfKjeZggl7LrBq', 'admin', '2025-03-13 18:54:55', '', NULL),
(9, 'Jane', 'jane@gmail.com', '', 'subscriber', '2025-03-15 17:20:40', '$2b$10$THjs8FBoe2uQkuAiH6b3uOF2/wx7F/gp5YBejHNn53TeSgvrA95BC', NULL),
(10, 'Maina', 'maina@gmail.com', '', 'admin', '2025-03-15 17:40:26', '$2b$10$MLvmQ28ftYFL0is2pnxbjeb94BaJuFmNOiUab1ya6VYgt.AO0tw9.', NULL),
(11, 'James', 'James321@gmail.com', '', 'admin', '2025-03-15 17:46:48', '$2b$10$q2YutPYwUK6JKdymbIAHy.nZpKVw8iyILz8LIv2KUD9SoFg21BxEa', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `position` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_members`
--

INSERT INTO `team_members` (`id`, `full_name`, `position`, `email`, `phone`, `bio`, `profile_picture`, `created_at`) VALUES
(23, 'Anne Wanjiru', 'Adminstrator', 'annewanjiru@gmail.com', '0729820689', '\'Anne	is a	proficient professional,	and	has	worked	in	various	sectors.She	holds	a	diploma	in	Information Technology [IT], has worked	with different organizations and companies across the country. She manages and handles the daily business	operations of	the	firm to	 support theday-­‐to-­‐day  activities. Anne joined	G.M	 Orina and Co. Advocates in 2024.\"', '/uploads/1741808604996.jpg', '2025-03-12 19:43:25'),
(24, 'Andrew Wanga', 'Senior Partner', 'andrewwanga@gmail.com', '0729820899', '\"Andrew is a senior partner at G.M Orina & Co. Advocates. He specializes in Commercial Law, Real Estate Law and Financial Technology.\"', '/uploads/1741808950332.jpg', '2025-03-12 19:49:10'),
(25, 'Neema Joanne', 'Senior Partner', 'neemajoanne@gmail.com', '0729820899', '\"Neema Joanne is an Advocate of the High Court of Kenya and Senior Partner at G.M Orina & Co. Advocates. She holds a Bachelor of Laws Degree from Kisii University, Diploma in Law from Kenya School of Law and is currently pursuing Masters of Law at the University of Nairobi\"', '/uploads/1741809163768.jpg', '2025-03-12 19:52:43'),
(26, 'John Wekesa', 'Senior Partner', 'johnwekesa@gmail.com', '0729820689', '\"John is a noted thought leader and expert in engineering and construction law, tax law, employment and litigation. He is also a human rights defender and a trusted adviser on financial technology.\"', '/uploads/1741809471145.jpg', '2025-03-12 19:57:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `system_users`
--
ALTER TABLE `system_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `system_users`
--
ALTER TABLE `system_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `system_users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
