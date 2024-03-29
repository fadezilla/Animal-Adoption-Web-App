# Animal Adoption Web Application

Welcome to the Animal Adoption Web Application! This project allows users to view and adopt animals from a provided list of animals. The application utilizes Node.js with Express.js for the backend and MySQL for database management.

## Technologies Used

- Node.js
- Express.js
- Sequelize
- MySQL
- PassportJS
- EJS (Embedded JavaScript) template engine
- Bootstrap

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the required dependencies.
4. Set up a MySQL database and configure the database connection in the `.env` file.
5. Manually run the SQL scripts provided below to create the necessary database, tables, and insert initial data.
6. Ensure environment variables are correctly set up, including the database credentials.

## Usage

1. Start the server by running `npm start`.
2. Open your web browser and navigate to the specified URL (e.g., `http://localhost:3000`).
3. Sign in using the provided credentials or sign up if you are a new user.
4. Explore the different pages using the navbar:
   - Home: Landing page
   - Animals: View all available animals and adopt them
   - Species (Admin only): Update species information
   - Temperament (Admin only): Update temperament information
   - Sign in/Sign up: Authentication pages
5. Adopt animals by clicking on the "Adopt" button next to each animal on the Animals page.
6. Admin users can update species and temperament information on the respective pages.

## Environment Variables

Make sure to set up the following environment variables in a `.env` file:

- `DB_HOST`: Hostname of the MySQL database
- `DB_USER`: MySQL database username
- `DB_PASSWORD`: MySQL database password
- `DB_NAME`: Name of the MySQL database

## Additional Libraries/Packages Used

- Sequelize: For database management and queries
- PassportJS: For user authentication
- Express-session: For managing user sessions
- dotenv: For loading environment variables from a `.env` file

## Node.js Version

This project is built using Node.js version [insert version].

## Database Creation and Data Insertion SQL Script

# DATABASE Creation Query
CREATE DATABASE adoptiondb;

# DATAINSERTS I USED IN THIS PROJECT
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

# DATABASEQUERIES I USED IN THIS PROJECT
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