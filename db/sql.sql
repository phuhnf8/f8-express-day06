-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.14.0.7165
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_test
CREATE DATABASE IF NOT EXISTS `db_test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_test`;

-- Dumping structure for table db_test.revoked_tokens
CREATE TABLE IF NOT EXISTS `revoked_tokens` (
  `access_token` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `out_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`access_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Track logout history';

-- Dumping data for table db_test.revoked_tokens: ~0 rows (approximately)
INSERT INTO `revoked_tokens` (`access_token`, `user_id`, `out_at`) VALUES
	('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZTFhMDY0Zi00ODUyLTRhMTgtOTBmZi0xYmJmZjYwZjQ5Y2UiLCJleHAiOjE3NzAxMTI4MDI5NjV9.KsCxpxSSW1jF793zKAn9O_ONDGoiexr1y9lE8RnLfio', 'be1a064f-4852-4a18-90ff-1bbff60f49ce', '2026-02-03 09:00:54'),
	('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZTFhMDY0Zi00ODUyLTRhMTgtOTBmZi0xYmJmZjYwZjQ5Y2UiLCJleHAiOjE3NzAxMTUzNzQzMzB9.9Wxmfo_C_PMVpKCjzJjblYNS-Hp_EpaNV_hzHidFbyI', 'be1a064f-4852-4a18-90ff-1bbff60f49ce', '2026-02-03 09:43:53');

-- Dumping structure for table db_test.todos
CREATE TABLE IF NOT EXISTS `todos` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Todo Id',
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Todo name',
  `created_by` varchar(36) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'From user',
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `status` enum('pending','done') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `FK_todos_created_by` (`created_by`),
  CONSTRAINT `FK_todos_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db_test.todos: ~0 rows (approximately)
INSERT INTO `todos` (`id`, `title`, `created_by`, `created_at`, `status`) VALUES
	('628d72f3-1a8c-4b34-93a5-fdce13a03749', 'Eat oranges', 'be1a064f-4852-4a18-90ff-1bbff60f49ce', '2026-02-03 09:43:48', 'pending'),
	('6829a3d3-2394-41be-b863-74606729e04a', 'Do laundry', 'be1a064f-4852-4a18-90ff-1bbff60f49ce', '2026-02-03 09:43:33', 'pending'),
	('751f58c8-9f62-4633-a636-31c3a85db01a', 'New Todo', 'be1a064f-4852-4a18-90ff-1bbff60f49ce', '2026-02-03 09:43:21', 'pending');

-- Dumping structure for table db_test.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'UUID username',
  `username` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `refresh_token` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Refresh token strategy',
  `refresh_token_ttl` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db_test.users: ~1 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `refresh_token`, `refresh_token_ttl`) VALUES
	('be1a064f-4852-4a18-90ff-1bbff60f49ce', 'phuhnf8', 'email@example.com', '$2b$10$PaFevb2KC9iWM8/WX330wO5bij0.K5dpNQEulzIJyYvOlLT/TOOVe', 'Mcjgndez4K53UMy0z4pF4Oqlnv4taywd', '2026-02-10 10:00:11');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
