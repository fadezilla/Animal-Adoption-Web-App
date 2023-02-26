# DAB - Course Assignment 1
# Application Installation and Usage Instructions
"Npm install" in terminal and it will install all dependencies.

# Environment Variables
you need a database called adoptiondb, after you have that and run "npm start" it will create all the necesarry tables.

# Additional Libraries/Packages
none

# NodeJS Version Used
v18.13.0

# DATABASE
CREATE DATABASE adoptiondb;

# DATAINSERTS
INSERT INTO Species (Name)
VALUES
('Dwarf Hamster'),
('Tedy bear hamster'),
('Jack-Russel'),
('Budgy'),
('Tortouse'),
('Gold Fish'),
('Lizzard'),
('Bearder Dragon'),
('Parrot'),
('Corn snake');

INSERT INTO Sizes (Name)
VALUES
('small'),
('medium'),
('large');

INSERT INTO Animals (Name, SpeciesId, Birthday, SizeId, Adopted)
VALUES
('Coco', 1, '2020-02-12', 1, FALSE),
('Ted', 2, '2021-02-12', 1, FALSE),
('Coco', 3, '2020-02-12', 2, FALSE),
('Everrest', 4, '2019-02-12', 1, FALSE),
('Rocko', 5, '2020-02-12', 2, FALSE),
('Goldy', 6, '2023-02-12', 1, FALSE),
('Lizzy', 7, '2020-02-12', 2, FALSE),
('Goga', 8, '2018-02-12', 3, TRUE),
('Tweet Tweet', 9, '2020-02-12', 3, FALSE),
('Toothless', 10, '2017-02-12', 2, FALSE),
('Sophie', 1, '2020-02-12', 1, FALSE),
('Teddy', 2, '2021-02-12', 1, FALSE),
('Roger', 9, '2020-02-18', 3, FALSE);

INSERT INTO Temperaments (Name)
VALUES
('calm'), ('scared'), ('energetic'), ('happy'), ('lazy');

INSERT INTO AnimalTemperaments (AnimalId, TemperamentId)
VALUES
(1, 1), (1, 2), (2, 1), (2, 2),
(3, 3), (4, 1), (4, 4), (5, 2),
(5, 5), (6, 1), (7, 2), (7, 5),
(8, 1), (8, 3), (8, 2), (9, 1),
(9, 4), (10, 2), (11, 1), (11, 2),
(12, 1), (12, 2), (13, 1), (13, 4);

INSERT INTO users (FirstName, LastName, Username, Password, Role)
 VALUES ('System', 'admin', 'Admin', 'admin1234', 'admin'),
 ('user', '1','User','user1234','member');

 INSERT INTO Adoptions (animalId, userId, adoptionDate)
VALUES 
(1, 1, NOW()),
(8, 1, NOW());


# DATABASEACCESS
CREATE USER 'dabcaowner'@'localhost' IDENTIFIED BY 'dabca1234';
GRANT ALL PRIVILEGES ON *.* TO 'dabcaowner'@'localhost' WITH GRANT OPTION;

# DATABASEQUERIES
SELECT Name FROM (
  SELECT Name, COUNT(*) as count
  FROM Animals
  GROUP BY Name
  ORDER BY count DESC
  LIMIT 1
) as most_popular;

SELECT Animals.Name, Users.FirstName, Users.LastName
FROM Animals
INNER JOIN Adoptions ON Animals.id = Adoptions.animalId
INNER JOIN Users ON Adoptions.UserId = Users.Id
WHERE Animals.Adopted = true;

SELECT * FROM Animals
ORDER BY Birthday DESC;

SELECT * FROM Animals WHERE Birthday BETWEEN '2017-12-31' AND '2020-12-31';

SELECT Sizes.name, COUNT(*) AS 'Number of animals'
FROM Animals
JOIN Sizes ON Animals.SizeId = Sizes.id
GROUP BY Sizes.id;

DELIMITER //
CREATE TRIGGER `LizardAdopt` 
AFTER INSERT ON `Species` 
FOR EACH ROW 
BEGIN 
  IF NEW.Name = 'Lizard' THEN 
    SET @last_user_id = (SELECT MAX(id) FROM Users); 
    INSERT INTO Adoptions (AnimalId, UserId, adoptionDate) 
    VALUES ((SELECT MAX(id) FROM Animals), @last_user_id, NOW()); 
  END IF; 
END;


DELIMITER //