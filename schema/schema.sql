create burgerDB;

use burgerDB;

CREATE TABLE `burgers` (
  `burger_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `devourStatus` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`burger_id`)
);