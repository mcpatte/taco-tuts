DROP DATABASE IF EXISTS tacobase;
CREATE DATABASE tacobase;

\c tacobase;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  name VARCHAR,
  email VARCHAR,
  teacher BOOLEAN
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
