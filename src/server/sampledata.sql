-- to run this file and update the remote database run: heroku pg:psql --app taco-tuts-staging < sampledata.sql

DROP TABLE IF EXISTS teaching;
DROP TABLE IF EXISTS learning;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  authID TEXT,
  username VARCHAR,
  name VARCHAR,
  email VARCHAR,
  teacher BOOLEAN,
  isAvailible BOOLEAN
);

CREATE TABLE subjects (
  ID SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE learning (
  userID integer references users(id) ON DELETE CASCADE,
  subjectID integer references subjects(id) ON DELETE CASCADE
);

CREATE TABLE teaching (
  userID integer references users(id) ON DELETE CASCADE,
  subjectID integer references subjects(id) ON DELETE CASCADE
);

INSERT INTO users (email, authid, username, name, teacher, isavailible)
  VALUES ('hbp@hotwarts.com', 'auth1', 'halfbloodprince', 'Severus Snape', true, true);

INSERT INTO users (email, authid, username, name, teacher, isavailible)
  VALUES ('hp@hogwarts.com', 'auth8', 'chosen one', 'Harry Potter', false, false);

INSERT INTO users (email, authid, username, name, teacher, isavailible)
  VALUES ('hagrid@gmail.com', 'auth7', 'Hagrid', 'Hagrid', true, true);

INSERT INTO users (email, authid, username, name, teacher, isavailible)
  VALUES ('mmoody', 'auth5', 'crazyeyes', 'Mad-Eye Moody', true, true);

INSERT INTO users (email, authid, username, name, teacher, isavailible)
  VALUES ('rweasly@yahoo.com', 'auth4', 'Ronald', 'Ron', false, false);

INSERT INTO users (email, authid, username, name, teacher, isavailible)
  VALUES ('vmor@hotmail.com', 'auth6', 'Tom', 'Voldemort', true, true);

INSERT INTO users (email, authid, username, name, teacher, isavailible)
  VALUES ('ddoor@gmail.com', 'auth3', 'Headmaster', 'Dumbledoor', true, true);

INSERT INTO users (email, authid, username, name, teacher, isavailible)
  VALUES ('deathwatcher@crazy.com', 'auth9', 'crazy person', 'Luna Lovegood', false, false);

INSERT INTO users (email, authid, username, name, teacher, isavailible)
  VALUES ('stu@gmail.com', 'auth0|57acab1d645d9d914448d2ee', 'stu', 'stu gene', false, false);

INSERT INTO users (email, authid, username, name, teacher, isavailible)
  VALUES ('teach@gmail.com', 'auth0|57acae2010d863e8542927e8', 'teach_dude88', 'super teach dude', true, true);

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

INSERT INTO teaching (userID, subjectID)
  VALUES (10, 2);

INSERT INTO teaching (userID, subjectID)
  VALUES (10, 5);
