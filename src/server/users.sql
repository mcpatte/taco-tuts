-- --to run this file and update your local db run: psql -f users.sql
DROP DATABASE IF EXISTS tacobase2;
CREATE DATABASE tacobase2;

\c tacobase2;

CREATE TABLE teachers (
  ID SERIAL PRIMARY KEY,
  isAvailable BOOLEAN,
  favorite BOOLEAN,
  rating INT
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  authID TEXT,
  username VARCHAR,
  name VARCHAR,
  email VARCHAR,
  teacherID integer references teachers(id) ON DELETE CASCADE,
  teacher BOOLEAN
);

CREATE TABLE subjects (
  ID SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE sessions (
  ID SERIAL PRIMARY KEY,
  start TIMESTAMP, 
  ending TIMESTAMP,
  subjectID integer references subjects(id) ON DELETE CASCADE
);


CREATE TABLE sessionsToUsers (
  userID integer references users(id) ON DELETE CASCADE,
  sessionID integer references sessions(id) ON DELETE CASCADE,
  isTeacher BOOLEAN
);

CREATE TABLE learning (
  userID integer references users(id) ON DELETE CASCADE,
  subjectID integer references subjects(id) ON DELETE CASCADE
);

CREATE TABLE teaching (
  userID integer references users(id) ON DELETE CASCADE,
  subjectID integer references subjects(id) ON DELETE CASCADE
);

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('hbp@hotwarts.com', 'auth1', 'halfbloodprince', 'Severus Snape', true);
  
INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('hp@hogwarts.com', 'auth8', 'chosen one', 'Harry Potter', false);

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('hagrid@gmail.com', 'auth7', 'Hagrid', 'Hagrid', true);

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('mmoody', 'auth5', 'crazyeyes', 'Mad-Eye Moody', true);

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('rweasly@yahoo.com', 'auth4', 'Ronald', 'Ron', false);

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('vmor@hotmail.com', 'auth6', 'Tom', 'Voldemort', true);

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('ddoor@gmail.com', 'auth3', 'Headmaster', 'Dumbledoor', true);

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('deathwatcher@crazy.com', 'auth9', 'crazy person', 'Luna Lovegood', false);

INSERT INTO subjects (name)
  VALUES ('Potions');

INSERT INTO subjects (name)
  VALUES ('Defense against the dark arts'); 

INSERT INTO subjects (name)
  VALUES ('Magical Creatures');

INSERT INTO subjects (name)
  VALUES ('Taco Making');

INSERT INTO subjects (name)
  VALUES ('Dueling');

INSERT INTO teaching (userID, subjectID)
  VALUES (1, 1);

INSERT INTO teaching (userID, subjectID)
  VALUES (4, 2);

INSERT INTO teaching (userID, subjectID)
  VALUES (5, 2);

INSERT INTO teaching (userID, subjectID)
  VALUES (6, 2);

INSERT INTO teaching (userID, subjectID)
  VALUES (3, 3);

INSERT INTO teaching (userID, subjectID)
  VALUES (7, 4);

INSERT INTO teaching (userID, subjectID)
  VALUES (7, 5);
