CREATE TABLE `prueba`.`tblchips` (
  `idchips` INT NOT NULL,
  `chip_name` VARCHAR(255) NULL,
  PRIMARY KEY (`idchips`)
);

CREATE TABLE `prueba`.`piscina` (
  `idpiscina` INT NOT NULL,
  `temp` INT NOT NULL,
  `salina` INT NOT NULL,
  `fecha` LONG NULL,
  `idchips` INT NOT NULL,
  PRIMARY KEY (`idpiscina`),
  UNIQUE INDEX `idpiscina_UNIQUE` (`idpiscina` ASC) VISIBLE,
  CONSTRAINT `fk_piscina_tblchips`
    FOREIGN KEY (`idchips`)
    REFERENCES `prueba`.`tblchips` (`idchips`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


INSERT INTO `prueba`.`tblchips` (`idchips`, `chip_name`) VALUES (1, 'ChipA');
INSERT INTO `prueba`.`tblchips` (`idchips`, `chip_name`) VALUES (2, 'ChipB');
INSERT INTO `prueba`.`tblchips` (`idchips`, `chip_name`) VALUES (3, 'ChipC');

INSERT INTO `prueba`.`piscina` (`idpiscina`, `temp`, `salina`, `fecha`, `chip_name`) VALUES (1, 23, 31, 1627890123, 'ChipA');
INSERT INTO `prueba`.`piscina` (`idpiscina`, `temp`, `salina`, `fecha`, `chip_name`) VALUES (2, 21, 36, 1627891124, 'ChipB');
INSERT INTO `prueba`.`piscina` (`idpiscina`, `temp`, `salina`, `fecha`, `chip_name`) VALUES (3, 20, 39, 1627892125, 'ChipC');
INSERT INTO `prueba`.`piscina` (`idpiscina`, `temp`, `salina`, `fecha`, `chip_name`) VALUES (14, 28, 36, 1720563409, 'ChipA');
INSERT INTO `prueba`.`piscina` (`idpiscina`, `temp`, `salina`, `fecha`, `chip_name`) VALUES (5, 29, 38, 1627894127, 'ChipB');

SELECT * FROM `prueba`.`piscina`;

SELECT p.idpiscina, p.temp, p.salina, p.fecha, c.chip_name
FROM `prueba`.`piscina` p
JOIN `prueba`.`tblchips` c ON p.idchips = c.idchips
ORDER BY p.fecha DESC
LIMIT 1;

INSERT INTO `prueba`.`piscina` (`idpiscina`, `temp`, `salina`, `fecha`, `idchips`) VALUES (1, 25, 30, 1627890123, 1);
INSERT INTO `prueba`.`piscina` (`idpiscina`, `temp`, `salina`, `fecha`, `idchips`) VALUES (2, 26, 32, 1627891123, 2);
INSERT INTO `prueba`.`piscina` (`idpiscina`, `temp`, `salina`, `fecha`, `idchips`) VALUES (3, 27, 34, 1627892123, 3);
INSERT INTO `prueba`.`piscina` (`idpiscina`, `temp`, `salina`, `fecha`, `idchips`) VALUES (4, 28, 36, 1627893123, 1);
INSERT INTO `prueba`.`piscina` (`idpiscina`, `temp`, `salina`, `fecha`, `idchips`) VALUES (20, 12, 41, 1720579644, 1);


