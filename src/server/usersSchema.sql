-- --to run this file and update your local db run: psql -f localSchema.sql
DROP TABLE IF EXISTS teaching;
DROP TABLE IF EXISTS learning;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS instantSessionRequests CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS sessionsToUsers CASCADE;


CREATE TABLE teachers (
  ID SERIAL PRIMARY KEY,
  isAvailable BOOLEAN,
  favorite BOOLEAN,
  rating REAL,
  ratingCount INT DEFAULT 0,
  rate INT,
  summary TEXT

);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  authID TEXT,
  username VARCHAR,
  name VARCHAR,
  email VARCHAR,
  teacherID integer references teachers(id) ON DELETE CASCADE,
  teacher BOOLEAN,
  imageURL TEXT
);

CREATE TABLE subjects (
  ID SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE sessions (
  ID SERIAL PRIMARY KEY,
  studentID integer references users(id) ON DELETE CASCADE,
  teacherID integer references users(id) ON DELETE CASCADE,
  start TIMESTAMP,
  duration INT,
  confirmed BOOLEAN,
  price INT,
  paid BOOLEAN,
  subjectID INT references subjects(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  ID SERIAL PRIMARY KEY,
  teacherAuthID text,
  studentAuthID text,
  review text,
  rating INT
);

CREATE TABLE instantSessionRequests (
  ID SERIAL PRIMARY KEY,
  studentAuthID text,
  teacherAuthID text,
  subjectID INT references subjects(id) ON DELETE CASCADE
);

CREATE TABLE learning (
  userID INT references users(id) ON DELETE CASCADE,
  subjectID INT references subjects(id) ON DELETE CASCADE,
  progress INT default 0
);

CREATE TABLE teaching (
  userID INT references users(id) ON DELETE CASCADE,
  subjectID INT references subjects(id) ON DELETE CASCADE
);

INSERT INTO teachers (isAvailable, favorite, rating, rate)
  VALUES (true, false, 1, 25);

INSERT INTO teachers (isAvailable, favorite, rating, rate)
  VALUES (true, false, 2, 30);

INSERT INTO teachers (isAvailable, favorite, rating, rate)
  VALUES (true, false, 3, 10);

INSERT INTO teachers (isAvailable, favorite, rating, rate)
  VALUES (true, false, 4, 15);

INSERT INTO teachers (isAvailable, favorite, rating, rate)
  VALUES (true, false, 5, 18);

INSERT INTO teachers (isAvailable, favorite, rating, rate)
  VALUES (true, false, 5, 20);

INSERT INTO users (email, authid, username, name, teacher, teacherID, imageURL)
  VALUES ('hbp@hogwarts.com', 'auth0|57b686db71f98d48132d9aad', 'halfbloodprince', 'Severus Snape', true, 1, 'http://i.imgur.com/LJGZmw4.jpg');

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('hp@hogwarts.com', 'auth0|57b27e4e51f9235564a6f68b', 'chosen one', 'Harry Potter', false);

INSERT INTO users (email, authid, username, name, teacher, teacherID, imageURL)
  VALUES ('hagrid@gmail.com', 'auth0|57b27e8a71c16ce874b94fd0', 'Hagrid', 'Hagrid', true, 2, 'http://i.imgur.com/Vu6tPPB.jpg');

INSERT INTO users (email, authid, username, name, teacher, teacherID, imageURL)
  VALUES ('mmoody', 'auth0|57b27f3971c16ce874b94fd6', 'crazyeyes', 'Mad-Eye Moody', true, 3, 'https://67.media.tumblr.com/avatar_e476ba9d677e_128.png');

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('rweasly@yahoo.com', 'auth0|57b27fa071c16ce874b94fd8auth4', 'Ronald', 'Ron', false);

INSERT INTO users (email, authid, username, name, teacher, teacherID, imageURL)
  VALUES ('vmor@hotmail.com', 'auth0|57b27fd771c16ce874b94fda', 'Tom', 'Voldemort', true, 4, 'http://i.imgur.com/7ziYTnJ.jpg');

INSERT INTO users (email, authid, username, name, teacher, teacherID, imageURL)
  VALUES ('ddore@gmail.com', 'auth0|57b2801371c16ce874b94fdd', 'Headmaster', 'Dumbledore', true, 5, 'http://i.imgur.com/uJzJ4ix.jpg');

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('deathwatcher@crazy.com', 'auth0|57b2805971c16ce874b94fe0', 'crazy person', 'Luna Lovegood', false);

INSERT INTO users (email, authid, username, name, teacher, teacherID, imageURL)
  VALUES ('e@e.com', 'auth0|57b2818451f9235564a6f698', 'wolf?where?', 'Remus Lupin', true, 6, 'http://pm1.narvii.com/5806/dedc9b0d32bc72395d38d1efde1b4b65f0bc0a7f_128.jpg');

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('q@q.com', 'auth0|57b2817951f9235564a6f697', 'chosen one', 'Harry Potter', false);


INSERT INTO subjects (name)
  VALUES ('Potions');

INSERT INTO subjects (name)
  VALUES ('Defense against the dark arts');

INSERT INTO subjects (name)
  VALUES ('Care of Magical Creatures');

INSERT INTO subjects (name)
  VALUES ('Taco Making');

INSERT INTO subjects (name)
  VALUES ('Dueling');

INSERT INTO teaching (userID, subjectID)
  VALUES (1, 1);

INSERT INTO teaching (userID, subjectID)
  VALUES (1, 2);

INSERT INTO teaching (userID, subjectID)
  VALUES (1, 3);

INSERT INTO teaching (userID, subjectID)
  VALUES (3, 1);

INSERT INTO teaching (userID, subjectID)
  VALUES (3, 4);

INSERT INTO teaching (userID, subjectID)
  VALUES (4, 5);

INSERT INTO teaching (userID, subjectID)
  VALUES (2, 1);

INSERT INTO teaching (userID, subjectID)
  VALUES (7, 4);

INSERT INTO teaching (userID, subjectID)
  VALUES (6, 5);

INSERT INTO teaching (userID, subjectID)
  VALUES (6, 4);

INSERT INTO teaching (userID, subjectID)
  VALUES (7, 5);

INSERT INTO instantSessionRequests (studentAuthID, teacherAuthID, subjectID)
  VALUES ('auth0|57b27e4e51f9235564a6f68b', 'auth0|57b27ddd71c16ce874b94fcb', 1);

INSERT INTO instantSessionRequests (studentAuthID, teacherAuthID, subjectID)
  VALUES ('auth0|57b27e4e51f9235564a6f68b', 'auth0|57b27e8a71c16ce874b94fd0', 3);
