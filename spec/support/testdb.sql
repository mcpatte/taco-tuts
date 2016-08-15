DROP TABLE IF EXISTS teachers CASCADE;
CREATE TABLE teachers (
  ID SERIAL PRIMARY KEY,
  isAvailable BOOLEAN,
  favorite BOOLEAN,
  rating INT
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  authID TEXT,
  username VARCHAR,
  name VARCHAR,
  email VARCHAR,
  teacherID integer references teachers(id) ON DELETE CASCADE,
  teacher BOOLEAN
);

DROP TABLE IF EXISTS subjects CASCADE;
CREATE TABLE subjects (
  ID SERIAL PRIMARY KEY,
  name VARCHAR
);

DROP TABLE IF EXISTS sessions CASCADE;
CREATE TABLE sessions (
  ID SERIAL PRIMARY KEY,
  start TIMESTAMP,
  ending TIMESTAMP,
  subjectID integer references subjects(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS sessionsToUsers CASCADE;
CREATE TABLE sessionsToUsers (
  userID integer references users(id) ON DELETE CASCADE,
  sessionID integer references sessions(id) ON DELETE CASCADE,
  isTeacher BOOLEAN
);

DROP TABLE IF EXISTS learning;
CREATE TABLE learning (
  userID integer references users(id) ON DELETE CASCADE,
  subjectID integer references subjects(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS teaching;
CREATE TABLE teaching (
  userID integer references users(id) ON DELETE CASCADE,
  subjectID integer references subjects(id) ON DELETE CASCADE
);


