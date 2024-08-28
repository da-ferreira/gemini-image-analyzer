CREATE DATABASE IF NOT EXISTS `shopperdb`;
USE `shopperdb`;

CREATE TABLE `measurements` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`image_url` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`measure_value` DECIMAL(12,2) NULL DEFAULT NULL,
	`has_confirmed` TINYINT(4) NULL DEFAULT '0',
	`measure_uuid` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`customer_code` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`measure_datetime` TIMESTAMP NULL DEFAULT NULL,
	`measure_type` ENUM('WATER','GAS') NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `measure_type` (`measure_type`) USING BTREE,
	INDEX `customer_code` (`customer_code`) USING BTREE,
	INDEX `measure_uuid` (`measure_uuid`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;
